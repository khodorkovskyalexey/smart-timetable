import { Injectable } from '@nestjs/common';
import { Comment } from 'src/rasp-context/core/interfaces/comment';
import { LessonRepository } from 'src/rasp-context/repositories/lesson/lesson.repository';
import { UpdateCommentFeatureDto } from './update-comment.feature.dto';

@Injectable()
export class UpdateCommentFeature {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async handle(dto: UpdateCommentFeatureDto): Promise<Comment> {
    const { userId, lessonId, lessonType, text } = dto;

    const comment = await this.lessonRepository.updateComment({
      authorId: userId,
      lessonId,
      lessonType,
      text,
    });

    return comment;
  }
}
