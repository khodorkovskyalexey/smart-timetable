import { LessonType } from '../types';
import { Auditorium } from './auditorium';
import { Group } from './group';
import { Lecturer } from './lecturer';
import { LessonEncodedId } from './lesson-encoded-id';
import { Subject } from './subject';

export interface Lesson {
  id: LessonEncodedId;
  startAt: Date;
  endAt: Date;
  group: Group;
  subject: Subject;
  auditorium: Auditorium;
  lecturers: Lecturer[];
  type: LessonType;
}
