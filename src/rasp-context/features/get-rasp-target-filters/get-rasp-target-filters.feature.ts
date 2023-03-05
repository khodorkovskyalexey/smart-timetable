import { Injectable } from '@nestjs/common';
import { RaspTargetFilter } from 'src/rasp-context/core/interfaces/rasp-target-filter';
import { LessonRepository } from 'src/rasp-context/repositories/lesson/lesson.repository';
import { GetRaspTargetFiltersFeatureDto } from './get-rasp-target-filters.feature.dto';

@Injectable()
export class GetRaspTargetFiltersFeature {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async handle(dto: GetRaspTargetFiltersFeatureDto): Promise<RaspTargetFilter[]> {
    const { searchFilter } = dto;

    const targetFilters = await this.lessonRepository.getRaspTargetFilters(searchFilter);

    return targetFilters;
  }
}
