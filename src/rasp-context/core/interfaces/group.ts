import { OmgtuRaspId } from '../types';

export interface Group {
  groupId?: OmgtuRaspId;
  groupName?: string;

  groupListId?: OmgtuRaspId;
  groupListName?: string;

  subGroupId?: OmgtuRaspId;
  subGroupName?: string;
}
