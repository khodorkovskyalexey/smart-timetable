import { Injectable, NotImplementedException } from '@nestjs/common';
import * as _ from 'lodash';
import { CustomEventEntity, GroupEntity, UserEntity } from 'src/infrastructure/database/objection/entities';
import { Lesson } from 'src/rasp-context/core/interfaces';
import { RaspTargetFilter } from 'src/rasp-context/core/interfaces/rasp-target-filter';
import { RaspOmgtuScheduleFor, RaspOmgtuSdkService } from 'src/third-parties/rasp-omgtu-skd';
import { OmgtuLessonMapper } from './omgtu-lesson.mapper';
import { CustomEventMapper } from './custom-event.mapper';

@Injectable()
export class LessonRepository {
  constructor(private readonly raspOmgtuSdkService: RaspOmgtuSdkService) {}

  async getByGroup(groupId: number, dates: { start: Date; end: Date }): Promise<Lesson[]> {
    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    const customEventsQuery = CustomEventEntity.query()
      .whereIn(
        // whereIn because may not be in smart-timetable database
        'groupId',
        GroupEntity.query()
          .select('id')
          .findOne((query) =>
            query
              .where({ groupOmgtuRaspId: groupId })
              .orWhere({ subgroupOmgtuRaspId: groupId })
              .orWhere({ groupListOmgtuRaspId: groupId }),
          ),
      )
      .withGraphFetched({ group: true, lecturer: true })
      .modify('searchByDates', startDate, endDate);

    const [raspOmgtuLessons, customEvents] = await Promise.all([
      this.raspOmgtuSdkService.schedulesForGroup(groupId, startDate, endDate),
      customEventsQuery,
    ]);

    return _.union(OmgtuLessonMapper.parseRaspOmgtu(raspOmgtuLessons), CustomEventMapper.parse(customEvents));
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
      .withGraphFetched({ group: true, lecturer: true })
      .modify('searchByDates', startDate, endDate);

    const [raspOmgtuLessons, customEvents] = await Promise.all([
      this.raspOmgtuSdkService.schedulesForLecturer(lecturerId, startDate, endDate),
      customEventsQuery,
    ]);

    return _.union(OmgtuLessonMapper.parseRaspOmgtu(raspOmgtuLessons), CustomEventMapper.parse(customEvents));
  }

  async getByAuditorium(auditoriumId: number, dates: { start: Date; end: Date }): Promise<Lesson[]> {
    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    const raspOmgtuLessons = await this.raspOmgtuSdkService.schedulesForAuditorium(auditoriumId, startDate, endDate);

    return OmgtuLessonMapper.parseRaspOmgtu(raspOmgtuLessons);
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
