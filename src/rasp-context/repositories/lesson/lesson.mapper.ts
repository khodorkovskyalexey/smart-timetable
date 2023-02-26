import { Group, Lesson, Subject } from 'src/rasp-context/core/interfaces';
import { encodeLessonId, formatLessonDate, getGroupId } from 'src/rasp-context/core/utils';
import { ScheduleResponse } from 'src/third-parties/rasp-omgtu-skd';

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
      };
    });

    return coreLessons;
  }
}
