import { Injectable } from '@nestjs/common';
import { Lesson } from 'src/rasp-context/core/interfaces';
import { RaspOmgtuSdkService } from 'src/third-parties/rasp-omgtu-skd';
import { LessonMapper } from './lesson.mapper';

@Injectable()
export class LessonRepository {
  constructor(private readonly raspOmgtuSdkService: RaspOmgtuSdkService) {}

  async getByGroup(groupId: number, dates: { start: Date; end: Date }): Promise<Lesson[]> {
    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    const raspOmgtuLessons = await this.raspOmgtuSdkService.schedulesForGroup(groupId, startDate, endDate);

    return LessonMapper.parseRaspOmgtu(raspOmgtuLessons);
  }
}
