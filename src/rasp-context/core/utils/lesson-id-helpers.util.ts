import { LessonEncodedId, LessonEncodedIdPayload } from '../interfaces';

export const encodeLessonId = (payload: LessonEncodedIdPayload) => {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

export const decodeLessonId = (lessonEncodedId: LessonEncodedId) => {
  return JSON.parse(Buffer.from(lessonEncodedId, 'base64').toString()) as LessonEncodedIdPayload;
};
