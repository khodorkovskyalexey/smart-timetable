import { Injectable } from '@nestjs/common';
import { Comment } from 'src/rasp-context/core/interfaces/comment';
import { LessonRepository } from 'src/rasp-context/repositories/lesson/lesson.repository';
import { CreateCommentFeatureDto } from './create-comment.feature.dto';

@Injectable()
export class CreateCommentFeature {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async handle(dto: CreateCommentFeatureDto): Promise<Comment> {
    const { userId, lessonId, lessonType, text } = dto;

    const comment = await this.lessonRepository.createComment({
      authorId: userId,
      lessonId,
      lessonType,
      text,
    });

    return comment;
  }
}
