import { RelationMappings } from 'objection';
import { CommentEntityInterface } from '../../interfaces';
import { ObjectionEntityBase } from './base.entity';
import { CustomEventEntity } from './custom-event.entity';
import { UserEntity } from './user.entity';

export class CommentEntity extends ObjectionEntityBase implements CommentEntityInterface {
  static tableName = 'comments';

  customEventId?: string;

  lessonEncodedId?: string;

  authorId: string;

  text: string;

  author?: UserEntity;

  customEvent?: CustomEventEntity;

  static get relationMappings(): RelationMappings {
    return {
      author: {
        relation: ObjectionEntityBase.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: `${CommentEntity.tableName}.authorId`,
          to: `${UserEntity.tableName}.id`,
        },
      },
      customEvent: {
        relation: ObjectionEntityBase.BelongsToOneRelation,
        modelClass: CustomEventEntity,
        join: {
          from: `${CommentEntity.tableName}.customEventId`,
          to: `${CustomEventEntity.tableName}.id`,
        },
      },
    };
  }
}
