import { LessonType } from 'src/rasp-context/core/types';

export interface CreateCommentFeatureDto {
  userId: string;
  text: string;
  lessonType: LessonType;
  lessonId: string;
}
