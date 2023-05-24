import { LessonType } from 'src/rasp-context/core/types';

export interface UpdateCommentFeatureDto {
  userId: string;
  text: string;
  lessonType: LessonType;
  lessonId: string;
}
