import { BaseEntityInterface } from './base.entity-interface';

export interface GroupEntityInterface extends BaseEntityInterface {
  groupOmgtuRaspId: number;
  subgroupOmgtuRaspId: number;
  groupListOmgtuRaspId: number;
  name: string;
}
