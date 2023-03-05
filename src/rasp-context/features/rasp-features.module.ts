import { Module } from '@nestjs/common';
import { RaspRepositoriesModule } from '../repositories/rasp-repositories.module';
import { GetLessonsFeature } from './get-lessons/get-lessons.feature';
import { GetRaspTargetFiltersFeature } from './get-rasp-target-filters/get-rasp-target-filters.feature';

const features = [GetLessonsFeature, GetRaspTargetFiltersFeature];

@Module({
  imports: [RaspRepositoriesModule],
  providers: features,
  exports: features,
})
export class RaspFeaturesModule {}
