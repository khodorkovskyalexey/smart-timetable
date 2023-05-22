import { Injectable } from '@nestjs/common';
import { Lesson } from 'src/rasp-context/core/interfaces';
import { LessonRepository } from 'src/rasp-context/repositories/lesson/lesson.repository';
import { CreateCustomEventFeatureDto } from './create-custom-event.feature.dto';

@Injectable()
export class CreateCustomEventFeature {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async handle(dto: CreateCustomEventFeatureDto): Promise<Lesson> {
    const { userId, auditoriumName, endAt, name, startAt } = dto;
    const { name: groupName, groupId, groupListId, subGroupId } = dto.group;

    const lessons = await this.lessonRepository.createCustomEvent({
      auditoriumName,
      endAt,
      lecturerId: userId,
      name,
      startAt,
      groupName,
      groupOmgtuRaspId: groupId,
      subgroupOmgtuRaspId: subGroupId,
      groupListOmgtuRaspId: groupListId,
    });

    return lessons;
  }
}
