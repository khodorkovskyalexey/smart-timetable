import { OmgtuRaspId } from 'src/rasp-context/core/types';

export interface GetLessonsByGroupFeatureDto {
  groupId: OmgtuRaspId;
  startAt: Date;
  endAt: Date;
}
