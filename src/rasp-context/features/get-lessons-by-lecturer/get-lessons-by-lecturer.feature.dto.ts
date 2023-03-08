import { OmgtuRaspId } from 'src/rasp-context/core/types';

export interface GetLessonsByLecturerFeatureDto {
  lecturerId: OmgtuRaspId;
  startAt: Date;
  endAt: Date;
}
