import { OmgtuRaspId } from 'src/rasp-context/core/types';

export interface GetLessonsByAuditoriumFeatureDto {
  auditoriumId: OmgtuRaspId;
  startAt: Date;
  endAt: Date;
}
