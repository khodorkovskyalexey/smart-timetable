import { Module } from '@nestjs/common';
import { RaspFeaturesModule } from '../features/rasp-features.module';
import { GetLessonsByGroupController } from './v1/controllers/get-lessons-by-group/get-lessons-by-group.controller';
import { GetLessonsByLecturerController } from './v1/controllers/get-lessons-by-lecturer/get-lessons-by-lecturer.controller';
import { GetRaspTargetFiltersController } from './v1/controllers/get-rasp-target-filters/get-rasp-target-filters.controller';

const controllers = [GetLessonsByGroupController, GetLessonsByLecturerController, GetRaspTargetFiltersController];

@Module({
  imports: [RaspFeaturesModule],
  controllers,
})
export class RaspApiModule {}
