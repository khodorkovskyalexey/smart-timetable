import { Module } from '@nestjs/common';
import { RaspFeaturesModule } from '../features/rasp-features.module';
import { CreateCommentController } from './v1/controllers/create-comment/create-comment.controller';
import { CreateCustomEventController } from './v1/controllers/create-custom-event/create-custom-event.controller';
import { GetLessonsByAuditoriumController } from './v1/controllers/get-lessons-by-auditorium/get-lessons-by-auditorium.controller';
import { GetLessonsByGroupController } from './v1/controllers/get-lessons-by-group/get-lessons-by-group.controller';
import { GetLessonsByLecturerController } from './v1/controllers/get-lessons-by-lecturer/get-lessons-by-lecturer.controller';
import { GetRaspTargetFiltersController } from './v1/controllers/get-rasp-target-filters/get-rasp-target-filters.controller';
import { UpdateCommentController } from './v1/controllers/update-comment/update-comment.controller';

const controllers = [
  GetLessonsByGroupController,
  GetLessonsByLecturerController,
  GetLessonsByAuditoriumController,
  GetRaspTargetFiltersController,
  CreateCustomEventController,
  CreateCommentController,
  UpdateCommentController,
];

@Module({
  imports: [RaspFeaturesModule],
  controllers,
})
export class RaspApiModule {}
