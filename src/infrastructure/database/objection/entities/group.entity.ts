import { InternalServerErrorException } from '@nestjs/common';
import { AnyQueryBuilder } from 'objection';
import { GroupEntityInterface } from '../../interfaces';
import { ObjectionEntityBase } from './base.entity';

export class GroupEntity extends ObjectionEntityBase implements GroupEntityInterface {
  static tableName = 'groups';

  groupOmgtuRaspId: number;

  subgroupOmgtuRaspId: number;

  groupListOmgtuRaspId: number;

  name: string;

  static get modifiers() {
    return {
      findOneByGroupId(query: AnyQueryBuilder, groupId: number) {
        if (!groupId) {
          throw new InternalServerErrorException('Group id missing');
        }

        query.where((query) =>
          query
            .where({ groupOmgtuRaspId: groupId })
            .orWhere({ subgroupOmgtuRaspId: groupId })
            .orWhere({ groupListOmgtuRaspId: groupId }),
        );
      },
    };
  }
}
