import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import {
  CommentEntity,
  CustomEventEntity,
  GroupEntity,
  UserEntity,
} from 'src/infrastructure/database/objection/entities';
import { Lesson } from 'src/rasp-context/core/interfaces';
import { RaspTargetFilter } from 'src/rasp-context/core/interfaces/rasp-target-filter';
import { RaspOmgtuScheduleFor, RaspOmgtuSdkService } from 'src/third-parties/rasp-omgtu-skd';
import { OmgtuLessonMapper } from './omgtu-lesson.mapper';
import { CustomEventMapper } from './custom-event.mapper';
import { getGroupId } from 'src/rasp-context/core/utils';
import { Comment } from 'src/rasp-context/core/interfaces/comment';
import { LessonType } from 'src/rasp-context/core/types';
import { getCommentLessonId } from 'src/rasp-context/core/utils/comment-lesson-id-helpers.util';
import { CommentMapper } from './comment.mapper';

@Injectable()
export class LessonRepository {
  constructor(private readonly raspOmgtuSdkService: RaspOmgtuSdkService) {}

  async updateComment(params: {
    authorId: string;
    text: string;
    lessonType: LessonType;
    lessonId: string;
  }): Promise<Comment> {
    const { authorId, lessonId, lessonType, text } = params;
    const { customEventId, lessonEncodedId } = getCommentLessonId(lessonId, lessonType);

    const commentQb = CommentEntity.query()
      .select('id')
      .limit(1)
      .first()
      .throwIfNotFound(new NotFoundException('Comment not found'));
    if (customEventId) {
      commentQb.where({ customEventId });
    }
    if (lessonEncodedId) {
      commentQb.where({ lessonEncodedId });
    }

    const [comment, customEvent] = await Promise.all([
      commentQb,
      lessonType === LessonType.CUSTOM_EVENT
        ? CustomEventEntity.query().select('id').findOne({ id: lessonId, lecturerId: authorId })
        : undefined,
    ]);

    if (lessonType === LessonType.CUSTOM_EVENT && !customEvent) {
      throw new ForbiddenException('You can comment only own custom event');
    }

    const updatedComment = await comment.$query().patchAndFetch({
      authorId,
      text,
    });

    return CommentMapper.parse(updatedComment);
  }

  async createComment(params: {
    authorId: string;
    text: string;
    lessonType: LessonType;
    lessonId: string;
  }): Promise<Comment> {
    const { authorId, lessonId, lessonType, text } = params;
    const { customEventId, lessonEncodedId } = getCommentLessonId(lessonId, lessonType);

    const existingCommentQb = CommentEntity.query().select('id').limit(1).first();
    if (customEventId) {
      existingCommentQb.where({ customEventId });
    }
    if (lessonEncodedId) {
      existingCommentQb.where({ lessonEncodedId });
    }

    const [existingComment, customEvent] = await Promise.all([
      existingCommentQb,
      lessonType === LessonType.CUSTOM_EVENT
        ? CustomEventEntity.query().select('id').findOne({ id: lessonId, lecturerId: authorId })
        : undefined,
    ]);

    if (existingComment) {
      throw new BadRequestException('Comment for this lesson already exist');
    }

    if (lessonType === LessonType.CUSTOM_EVENT && !customEvent) {
      throw new ForbiddenException('You can comment only own custom event');
    }

    const comment = await CommentEntity.query().insertAndFetch({
      authorId,
      text,
      customEventId,
      lessonEncodedId,
    });

    return CommentMapper.parse(comment);
  }

  async createCustomEvent(params: {
    lecturerId: string;
    groupOmgtuRaspId?: number;
    subgroupOmgtuRaspId?: number;
    groupListOmgtuRaspId?: number;
    groupName: string;
    name: string;
    auditoriumName: string;
    startAt: Date;
    endAt: Date;
  }): Promise<Lesson> {
    const groupId = getGroupId({
      groupId: params.groupOmgtuRaspId,
      subGroupId: params.subgroupOmgtuRaspId,
      groupListId: params.groupListOmgtuRaspId,
    });

    if (!groupId) {
      throw new InternalServerErrorException('Group id required');
    }

    let group = await GroupEntity.query().select('id').modify('findOneByGroupId', groupId).limit(1).first();

    if (!group) {
      group = await GroupEntity.query().select('id').insertAndFetch({
        groupOmgtuRaspId: params.groupOmgtuRaspId,
        subgroupOmgtuRaspId: params.subgroupOmgtuRaspId,
        groupListOmgtuRaspId: params.groupListOmgtuRaspId,
        name: params.groupName,
      });
    }

    const customEvent = await CustomEventEntity.query()
      .insertAndFetch({
        id: uuidV4(),

        name: params.name,
        auditoriumName: params.auditoriumName,
        lecturerId: params.lecturerId,
        groupId: group.id,
        startAt: params.startAt,
        endAt: params.endAt,

        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .withGraphFetched({ group: true, lecturer: true, comment: true });

    return CustomEventMapper.parse(customEvent);
  }

  async getByGroup(groupId: number, dates: { start: Date; end: Date }): Promise<Lesson[]> {
    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    const customEventsQuery = CustomEventEntity.query()
      .whereIn(
        // whereIn because may not be in smart-timetable database
        'groupId',
        GroupEntity.query().select('id').modify('findOneByGroupId', groupId).limit(1),
      )
      .withGraphFetched({ group: true, lecturer: true, comment: true })
      .modify('searchByDates', startDate, endDate);

    const [raspOmgtuLessons, customEvents] = await Promise.all([
      this.raspOmgtuSdkService.schedulesForGroup(groupId, startDate, endDate),
      customEventsQuery,
    ]);

    const lessonComments = await CommentEntity.query().whereIn(
      'lessonEncodedId',
      raspOmgtuLessons.map(OmgtuLessonMapper.parseId),
    );

    return _.union(
      OmgtuLessonMapper.parseRaspOmgtu(raspOmgtuLessons, lessonComments),
      CustomEventMapper.parseMany(customEvents),
    );
  }

  async getByLecturer(lecturerId: number, dates: { start: Date; end: Date }): Promise<Lesson[]> {
    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    const customEventsQuery = CustomEventEntity.query()
      .whereIn(
        // whereIn because may not be in smart-timetable database
        'lecturerId',
        UserEntity.query().select('id').findOne({ lecturerOmgtuRaspId: lecturerId }),
      )
      .withGraphFetched({ group: true, lecturer: true, comment: true })
      .modify('searchByDates', startDate, endDate);

    const [raspOmgtuLessons, customEvents] = await Promise.all([
      this.raspOmgtuSdkService.schedulesForLecturer(lecturerId, startDate, endDate),
      customEventsQuery,
    ]);

    const lessonComments = await CommentEntity.query().whereIn(
      'lessonEncodedId',
      raspOmgtuLessons.map(OmgtuLessonMapper.parseId),
    );

    return _.union(
      OmgtuLessonMapper.parseRaspOmgtu(raspOmgtuLessons, lessonComments),
      CustomEventMapper.parseMany(customEvents),
    );
  }

  async getByAuditorium(auditoriumId: number, dates: { start: Date; end: Date }): Promise<Lesson[]> {
    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    const raspOmgtuLessons = await this.raspOmgtuSdkService.schedulesForAuditorium(auditoriumId, startDate, endDate);

    const lessonComments = await CommentEntity.query().whereIn(
      'lessonEncodedId',
      raspOmgtuLessons.map(OmgtuLessonMapper.parseId),
    );

    return OmgtuLessonMapper.parseRaspOmgtu(raspOmgtuLessons, lessonComments);
  }

  async getRaspTargetFilters(filter: string): Promise<RaspTargetFilter[]> {
    const targetFilters = await Promise.all([
      this.raspOmgtuSdkService.search(RaspOmgtuScheduleFor.GROUP, filter),
      this.raspOmgtuSdkService.search(RaspOmgtuScheduleFor.AUDITORIUM, filter),
      this.raspOmgtuSdkService.search(RaspOmgtuScheduleFor.LECTURER, filter),
    ]).then((res) => [...res.flat()]);

    const sortedTargetFilters = targetFilters.sort((a, b) => (a.label < b.label ? -1 : 1));

    try {
      const coreTargetFilters = sortedTargetFilters.map<RaspTargetFilter>(({ id, type, label, description }) => ({
        id,
        type: OmgtuLessonMapper.parseRaspOmgtuScheduleFor(type),
        title: label,
        description,
      }));

      return coreTargetFilters;
    } catch (error) {
      throw new NotImplementedException((error as Error).message);
    }
  }
}
