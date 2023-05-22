import { Module } from '@nestjs/common';
import { RaspRepositoriesModule } from '../repositories/rasp-repositories.module';
import { CreateCustomEventFeature } from './create-custom-event/create-custom-event.feature';
import { GetLessonsByAuditoriumFeature } from './get-lessons-by-auditorium/get-lessons-by-auditorium.feature';
import { GetLessonsByGroupFeature } from './get-lessons-by-group/get-lessons-by-group.feature';
import { GetLessonsByLecturerFeature } from './get-lessons-by-lecturer/get-lessons-by-lecturer.feature';
import { GetRaspTargetFiltersFeature } from './get-rasp-target-filters/get-rasp-target-filters.feature';

const features = [
  GetLessonsByGroupFeature,
  GetLessonsByLecturerFeature,
  GetLessonsByAuditoriumFeature,
  GetRaspTargetFiltersFeature,
  CreateCustomEventFeature,
];

@Module({
  imports: [RaspRepositoriesModule],
  providers: features,
  exports: features,
})
export class RaspFeaturesModule {}
