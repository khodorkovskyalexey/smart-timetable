import { Group } from '../interfaces';

export const getGroupId = (group: Group) => {
  const id = group.groupId ?? group.groupListId ?? group.subGroupId;

  if (!id) {
    return undefined;
  }

  const idsCount = Number(!!group.groupId) + Number(!!group.groupListId) + Number(!!group.subGroupId);

  if (idsCount !== 1) {
    throw new Error(`Group must have only one id (now there are ${idsCount})`);
  }

  return id;
};
