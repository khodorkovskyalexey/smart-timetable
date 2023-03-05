import { GroupResponseDto, GroupResponseDtoParams } from './group.response.dto';
import { LecturerResponseDto, LecturerResponseDtoParams } from './lecturer.response.dto';
import { SubjectResponseDto, SubjectResponseDtoParams } from './subject.response.dto';

export interface LessonResponseDtoParams {
  id: string;
  startAt: Date;
  endAt: Date;
  group: GroupResponseDtoParams;
  subject: SubjectResponseDtoParams;
  lecturers: LecturerResponseDtoParams[];
}

export class LessonResponseDto {
  constructor(params: LessonResponseDtoParams) {
    const assignObject: LessonResponseDto = {
      id: params.id,
      startAt: params.startAt,
      endAt: params.endAt,
      group: new GroupResponseDto(params.group),
      subject: new SubjectResponseDto(params.subject),
      lecturers: params.lecturers.map((lecturer) => new LecturerResponseDto(lecturer)),
    };

    Object.assign(this, assignObject);
  }

  id: string;
  startAt: Date;
  endAt: Date;
  group: GroupResponseDto;
  subject: SubjectResponseDto;
  lecturers: LecturerResponseDto[];
}
