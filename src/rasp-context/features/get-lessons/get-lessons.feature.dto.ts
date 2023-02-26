import { OmgtuRaspId } from 'src/rasp-context/core/types';

export interface GetLessonsFeatureDto {
  groupId: OmgtuRaspId;
  startAt: Date;
  endAt: Date;
}
