import { Module } from '@nestjs/common';
import { RaspFeaturesModule } from '../features/rasp-features.module';
import { GetLessonsController } from './v1/controllers/get-lessons/get-lessons.controller';
import { GetRaspTargetFiltersController } from './v1/controllers/get-rasp-target-filters/get-rasp-target-filters.controller';

const controllers = [GetLessonsController, GetRaspTargetFiltersController];

@Module({
  imports: [RaspFeaturesModule],
  controllers,
})
export class RaspApiModule {}
