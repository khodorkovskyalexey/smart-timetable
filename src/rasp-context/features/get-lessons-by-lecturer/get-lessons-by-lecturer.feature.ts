import { Injectable } from '@nestjs/common';
import { Lesson } from 'src/rasp-context/core/interfaces';
import { LessonRepository } from 'src/rasp-context/repositories/lesson/lesson.repository';
import { GetLessonsByLecturerFeatureDto } from './get-lessons-by-lecturer.feature.dto';

@Injectable()
export class GetLessonsByLecturerFeature {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async handle(dto: GetLessonsByLecturerFeatureDto): Promise<Lesson[]> {
    const { endAt, lecturerId, startAt } = dto;

    const lessons = await this.lessonRepository.getByLecturer(lecturerId, { start: startAt, end: endAt });

    return lessons;
  }
}
