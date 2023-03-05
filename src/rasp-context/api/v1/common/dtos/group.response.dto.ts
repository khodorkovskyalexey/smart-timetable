export interface GroupResponseDtoParams {
  groupId?: number;
  groupName?: string;
  groupListId?: number;
  groupListName?: string;
  subGroupId?: number;
  subGroupName?: string;
}

export class GroupResponseDto {
  constructor(params: GroupResponseDtoParams) {
    const assignObject: GroupResponseDto = {
      groupId: params.groupId,
      groupListId: params.groupListId,
      groupListName: params.groupListName,
      groupName: params.groupName,
      subGroupId: params.subGroupId,
      subGroupName: params.subGroupName,
    };

    Object.assign(this, assignObject);
  }

  groupId?: number;

  groupName?: string;

  groupListId?: number;

  groupListName?: string;

  subGroupId?: number;

  subGroupName?: string;
}
