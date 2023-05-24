import { BaseEntityInterface } from './base.entity-interface';
import { CustomEventEntityInterface } from './custom-event.entity-interface';
import { UserEntityInterface } from './user.entity-interface';

export interface CommentEntityInterface extends BaseEntityInterface {
  customEventId?: string;
  lessonEncodedId?: string;
  authorId: string;
  text: string;

  author?: UserEntityInterface;
  customEvent?: CustomEventEntityInterface;
}
