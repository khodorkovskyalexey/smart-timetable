import { Module } from '@nestjs/common';
import { RaspRepositoriesModule } from '../repositories/rasp-repositories.module';
import { GetLessonsByGroupFeature } from './get-lessons-by-group/get-lessons-by-group.feature';
import { GetLessonsByLecturerFeature } from './get-lessons-by-lecturer/get-lessons-by-lecturer.feature';
import { GetRaspTargetFiltersFeature } from './get-rasp-target-filters/get-rasp-target-filters.feature';

const features = [GetLessonsByGroupFeature, GetLessonsByLecturerFeature, GetRaspTargetFiltersFeature];

@Module({
  imports: [RaspRepositoriesModule],
  providers: features,
  exports: features,
})
export class RaspFeaturesModule {}
