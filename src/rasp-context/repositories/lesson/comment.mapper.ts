import { CommentEntityInterface } from 'src/infrastructure/database/interfaces';
import { Comment } from 'src/rasp-context/core/interfaces/comment';

export class CommentMapper {
  static parse(comment: CommentEntityInterface): Comment {
    return {
      id: comment.id,
      authorId: comment.authorId,
      text: comment.text,
    };
  }
}
