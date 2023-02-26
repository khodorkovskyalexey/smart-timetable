import { Module } from '@nestjs/common';
import { RaspFeaturesModule } from '../features/rasp-features.module';
import { GetLessonsController } from './v1/controllers/get-lessons/get-lessons.controller';

const controllers = [GetLessonsController];

@Module({
  imports: [RaspFeaturesModule],
  controllers,
})
export class RaspApiModule {}
