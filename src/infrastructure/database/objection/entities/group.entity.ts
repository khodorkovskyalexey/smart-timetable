import { GroupEntityInterface } from '../../interfaces';
import { ObjectionEntityBase } from './base.entity';

export class GroupEntity extends ObjectionEntityBase implements GroupEntityInterface {
  static tableName = 'groups';

  groupOmgtuRaspId: number;

  subgroupOmgtuRaspId: number;

  groupListOmgtuRaspId: number;

  name: string;
}
