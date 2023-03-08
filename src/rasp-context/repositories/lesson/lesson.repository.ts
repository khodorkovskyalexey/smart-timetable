import { Injectable, NotImplementedException } from '@nestjs/common';
import { Lesson } from 'src/rasp-context/core/interfaces';
import { RaspTargetFilter } from 'src/rasp-context/core/interfaces/rasp-target-filter';
import { RaspOmgtuScheduleFor, RaspOmgtuSdkService } from 'src/third-parties/rasp-omgtu-skd';
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

  async getByLecturer(lecturerId: number, dates: { start: Date; end: Date }): Promise<Lesson[]> {
    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    const raspOmgtuLessons = await this.raspOmgtuSdkService.schedulesForLecturer(lecturerId, startDate, endDate);

    return LessonMapper.parseRaspOmgtu(raspOmgtuLessons);
  }

  async getByAuditorium(auditoriumId: number, dates: { start: Date; end: Date }): Promise<Lesson[]> {
    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    const raspOmgtuLessons = await this.raspOmgtuSdkService.schedulesForAuditorium(auditoriumId, startDate, endDate);

    return LessonMapper.parseRaspOmgtu(raspOmgtuLessons);
  }

  async getRaspTargetFilters(filter: string): Promise<RaspTargetFilter[]> {
    const targetFilters = await Promise.all([
      this.raspOmgtuSdkService.search(RaspOmgtuScheduleFor.GROUP, filter),
      this.raspOmgtuSdkService.search(RaspOmgtuScheduleFor.AUDITORIUM, filter),
      this.raspOmgtuSdkService.search(RaspOmgtuScheduleFor.LECTURER, filter),
    ]).then((res) => [...res.flat()]);

    const sortedTargetFilters = targetFilters.sort((a, b) => (a.label < b.label ? -1 : 1));

    try {
      const coreTargetFilters = sortedTargetFilters.map<RaspTargetFilter>(({ id, type, label, description }) => ({
        id,
        type: LessonMapper.parseRaspOmgtuScheduleFor(type),
        title: label,
        description,
      }));

      return coreTargetFilters;
    } catch (error) {
      throw new NotImplementedException((error as Error).message);
    }
  }
}
