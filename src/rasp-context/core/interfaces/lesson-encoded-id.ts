import { OmgtuRaspId } from '../types';

export type LessonEncodedId = string;

export interface LessonEncodedIdPayload {
  startAt: Date;
  groupId: OmgtuRaspId;
  lecturersIds: OmgtuRaspId[];
  subjectId: OmgtuRaspId;
}
