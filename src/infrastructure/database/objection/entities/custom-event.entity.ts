import { InternalServerErrorException } from '@nestjs/common';
import { AnyQueryBuilder, RelationMappings } from 'objection';
import { CustomEventEntityInterface } from '../../interfaces';
import { ObjectionEntityBase } from './base.entity';
import { GroupEntity } from './group.entity';
import { UserEntity } from './user.entity';

export class CustomEventEntity extends ObjectionEntityBase implements CustomEventEntityInterface {
  static tableName = 'custom_events';

  lecturerId: string;

  groupId: string;

  name: string;

  auditoriumName: string;

  startAt: Date;

  endAt: Date;

  group?: GroupEntity;

  lecturer?: UserEntity;

  static get modifiers() {
    return {
      searchByDates(query: AnyQueryBuilder, startAt: string, endAt: string) {
        if (!startAt || !endAt) {
          throw new InternalServerErrorException('Dates missing');
        }

        query.whereRaw('(?::timestamp <= "startAt" AND "endAt" <= ?::timestamp)', [startAt, endAt]);
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      group: {
        relation: ObjectionEntityBase.BelongsToOneRelation,
        modelClass: GroupEntity,
        join: {
          from: `${CustomEventEntity.tableName}.groupId`,
          to: `${GroupEntity.tableName}.id`,
        },
      },
      lecturer: {
        relation: ObjectionEntityBase.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: `${CustomEventEntity.tableName}.lecturerId`,
          to: `${UserEntity.tableName}.id`,
        },
      },
    };
  }
}
