import { NotImplementedException } from '@nestjs/common';
import { Group, Lesson, Subject } from 'src/rasp-context/core/interfaces';
import { Auditorium } from 'src/rasp-context/core/interfaces/auditorium';
import { RaspTargetFilterType } from 'src/rasp-context/core/interfaces/rasp-target-filter';
import { encodeLessonId, formatLessonDate, getGroupId } from 'src/rasp-context/core/utils';
import { RaspOmgtuScheduleFor, ScheduleResponse } from 'src/third-parties/rasp-omgtu-skd';

export class LessonMapper {
  static parseRaspOmgtu(lessons: ScheduleResponse[]) {
    const coreLessons = lessons.map<Lesson>((lesson) => {
      const group: Group = {
        groupId: lesson.groupOid ? lesson.groupOid : undefined, // by default groupOid is 0
        groupListId: lesson.streamOid ? lesson.streamOid : undefined,
        subGroupId: lesson.subGroupOid ? lesson.subGroupOid : undefined,
        groupListName: lesson.stream,
        groupName: lesson.group,
        subGroupName: lesson.subGroup,
      };

      const subject: Subject = {
        id: lesson.disciplineOid,
        name: lesson.discipline,
      };

      const auditorium: Auditorium = {
        id: lesson.auditoriumOid,
        name: lesson.auditorium,
      };

      const lessonStartTime = formatLessonDate(lesson.date, lesson.beginLesson);

      return {
        id: encodeLessonId({
          groupId: getGroupId(group),
          startAt: lessonStartTime,
          subjectId: lesson.disciplineOid,
          lecturersIds: lesson.listOfLecturers.map((lecturer) => lecturer.lecturerOid),
        }),
        startAt: lessonStartTime,
        endAt: formatLessonDate(lesson.date, lesson.endLesson),
        group,
        lecturers: lesson.listOfLecturers.map((lecturer) => ({ id: lecturer.lecturerOid, name: lecturer.lecturer })),
        subject,
        auditorium,
      };
    });

    return coreLessons;
  }

  static parseRaspOmgtuScheduleFor(raspOmgtuScheduleFor: RaspOmgtuScheduleFor): RaspTargetFilterType {
    const mapper: { [P in RaspOmgtuScheduleFor]: () => RaspTargetFilterType } = {
      [RaspOmgtuScheduleFor.AUDITORIUM]: () => RaspTargetFilterType.AUDITORIUM,
      [RaspOmgtuScheduleFor.GROUP]: () => RaspTargetFilterType.GROUP,
      [RaspOmgtuScheduleFor.LECTURER]: () => RaspTargetFilterType.LECTURER,
      [RaspOmgtuScheduleFor.PERSON]: () => {
        throw new NotImplementedException(`${RaspOmgtuScheduleFor.PERSON} not implemented`);
      },
      [RaspOmgtuScheduleFor.STUDENT]: () => {
        throw new NotImplementedException(`${RaspOmgtuScheduleFor.STUDENT} not implemented`);
      },
    };

    return mapper[raspOmgtuScheduleFor]();
  }
}
