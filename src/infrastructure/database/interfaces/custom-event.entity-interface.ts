import { BaseEntityInterface } from './base.entity-interface';
import { CommentEntityInterface } from './comment.entity-interface';
import { GroupEntityInterface } from './group.entity-interface';
import { UserEntityInterface } from './user.entity-interface';

export interface CustomEventEntityInterface extends BaseEntityInterface {
  lecturerId: string;
  groupId: string;
  name: string;
  auditoriumName: string;
  startAt: Date;
  endAt: Date;

  group?: GroupEntityInterface;
  lecturer?: UserEntityInterface;
  comment?: CommentEntityInterface;
}
