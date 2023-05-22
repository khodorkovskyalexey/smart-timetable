import { OmgtuRaspId } from 'src/rasp-context/core/types';

interface CreateCustomEventGroupFeatureDto {
  groupId?: OmgtuRaspId;
  groupListId?: OmgtuRaspId;
  subGroupId?: OmgtuRaspId;
  name: string;
}

export interface CreateCustomEventFeatureDto {
  userId: string;
  name: string;
  group: CreateCustomEventGroupFeatureDto;
  auditoriumName: string;
  startAt: Date;
  endAt: Date;
}
