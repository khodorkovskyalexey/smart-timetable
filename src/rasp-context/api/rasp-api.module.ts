import { Module } from '@nestjs/common';
import { RaspFeaturesModule } from '../features/rasp-features.module';
import { GetLessonsByGroupController } from './v1/controllers/get-lessons-by-group/get-lessons-by-group.controller';
import { GetRaspTargetFiltersController } from './v1/controllers/get-rasp-target-filters/get-rasp-target-filters.controller';

const controllers = [GetLessonsByGroupController, GetRaspTargetFiltersController];

@Module({
  imports: [RaspFeaturesModule],
  controllers,
})
export class RaspApiModule {}
