import { Injectable } from '@nestjs/common';
import { Lesson } from 'src/rasp-context/core/interfaces';
import { LessonRepository } from 'src/rasp-context/repositories/lesson/lesson.repository';
import { GetLessonsByAuditoriumFeatureDto } from './get-lessons-by-auditorium.feature.dto';

@Injectable()
export class GetLessonsByAuditoriumFeature {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async handle(dto: GetLessonsByAuditoriumFeatureDto): Promise<Lesson[]> {
    const { endAt, auditoriumId, startAt } = dto;

    const lessons = await this.lessonRepository.getByAuditorium(auditoriumId, { start: startAt, end: endAt });

    return lessons;
  }
}
