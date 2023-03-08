import { Injectable } from '@nestjs/common';
import { Lesson } from 'src/rasp-context/core/interfaces';
import { LessonRepository } from 'src/rasp-context/repositories/lesson/lesson.repository';
import { GetLessonsByGroupFeatureDto } from './get-lessons-by-group.feature.dto';

@Injectable()
export class GetLessonsByGroupFeature {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async handle(dto: GetLessonsByGroupFeatureDto): Promise<Lesson[]> {
    const { endAt, groupId, startAt } = dto;

    const lessons = await this.lessonRepository.getByGroup(groupId, { start: startAt, end: endAt });

    return lessons;
  }
}
