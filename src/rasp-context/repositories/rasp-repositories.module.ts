import { Module } from '@nestjs/common';
import { RaspOmgtuSdkModule } from 'src/third-parties/rasp-omgtu-skd';
import { LessonRepository } from './lesson/lesson.repository';

const repositories = [LessonRepository];

@Module({
  imports: [RaspOmgtuSdkModule],
  providers: repositories,
  exports: repositories,
})
export class RaspRepositoriesModule {}
