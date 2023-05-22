import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from 'src/rasp-context/core/types';
import { AuditoriumResponseDto, AuditoriumResponseDtoParams } from './auditorium.response.dto';
import { GroupResponseDto, GroupResponseDtoParams } from './group.response.dto';
import { LecturerResponseDto, LecturerResponseDtoParams } from './lecturer.response.dto';
import { SubjectResponseDto, SubjectResponseDtoParams } from './subject.response.dto';

export interface LessonResponseDtoParams {
  id: string;
  startAt: Date;
  endAt: Date;
  group: GroupResponseDtoParams;
  subject: SubjectResponseDtoParams;
  auditorium: AuditoriumResponseDtoParams;
  lecturers: LecturerResponseDtoParams[];
  type: LessonType;
}

export class LessonResponseDto {
  constructor(params: LessonResponseDtoParams) {
    const assignObject: LessonResponseDto = {
      id: params.id,
      startAt: params.startAt,
      endAt: params.endAt,
      group: new GroupResponseDto(params.group),
      subject: new SubjectResponseDto(params.subject),
      auditorium: new AuditoriumResponseDto(params.auditorium),
      lecturers: params.lecturers.map((lecturer) => new LecturerResponseDto(lecturer)),
      type: params.type,
    };

    Object.assign(this, assignObject);
  }

  id: string;

  startAt: Date;

  endAt: Date;

  group: GroupResponseDto;

  subject: SubjectResponseDto;

  auditorium: AuditoriumResponseDto;

  lecturers: LecturerResponseDto[];

  @ApiProperty({
    enum: LessonType,
    name: 'LessonTypeEnum',
    example: LessonType.OMGTU_LESSON,
  })
  type: LessonType;
}
