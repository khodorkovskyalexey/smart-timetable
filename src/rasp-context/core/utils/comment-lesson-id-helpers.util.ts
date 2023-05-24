import { InternalServerErrorException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { LessonType } from '../types';

export const getCommentLessonId = (lessonId: string, lessonType: LessonType) => {
  if (lessonType === LessonType.CUSTOM_EVENT && !isUUID(lessonId, '4')) {
    throw new InternalServerErrorException('Lesson id must be UUID v4');
  }

  return {
    customEventId: lessonType === LessonType.CUSTOM_EVENT ? lessonId : undefined,
    lessonEncodedId: lessonType === LessonType.OMGTU_LESSON ? lessonId : undefined,
  };
};
