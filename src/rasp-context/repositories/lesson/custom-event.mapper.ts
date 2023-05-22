import { InternalServerErrorException } from '@nestjs/common';
import { CustomEventEntityInterface } from 'src/infrastructure/database/interfaces';
import { getFio } from 'src/libs/utils';
import { Group, Lecturer, Lesson, Subject } from 'src/rasp-context/core/interfaces';
import { Auditorium } from 'src/rasp-context/core/interfaces/auditorium';
import { LessonType } from 'src/rasp-context/core/types';

export class CustomEventMapper {
  static parse(customEvent: CustomEventEntityInterface): Lesson {
    if (!customEvent.group || !customEvent.lecturer) {
      throw new InternalServerErrorException('Group or lecturer not loaded');
    }

    const group: Group = {
      groupId: customEvent.group.groupOmgtuRaspId,
      subGroupId: customEvent.group.subgroupOmgtuRaspId,
      groupListId: customEvent.group.groupListOmgtuRaspId,
      groupName: customEvent.group.groupOmgtuRaspId ? customEvent.group.name : undefined,
      subGroupName: customEvent.group.subgroupOmgtuRaspId ? customEvent.group.name : undefined,
      groupListName: customEvent.group.groupListOmgtuRaspId ? customEvent.group.name : undefined,
    };

    const subject: Subject = {
      name: customEvent.name,
    };

    const auditorium: Auditorium = {
      name: customEvent.auditoriumName,
    };

    const lecturer: Lecturer = {
      id: customEvent.lecturer.lecturerOmgtuRaspId,
      name: getFio(customEvent.lecturer.firstName, customEvent.lecturer.lastName),
    };

    return {
      id: customEvent.id,
      startAt: customEvent.startAt,
      endAt: customEvent.endAt,
      group,
      lecturers: [lecturer],
      subject,
      auditorium,
      type: LessonType.CUSTOM_EVENT,
    };
  }

  static parseMany(customEvents: CustomEventEntityInterface[]) {
    return customEvents.map<Lesson>(CustomEventMapper.parse);
  }
}
