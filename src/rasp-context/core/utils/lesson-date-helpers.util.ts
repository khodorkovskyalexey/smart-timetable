import { DateUtil } from 'src/libs/utils';

export const formatLessonDate = (date: string, time: string) => {
  return DateUtil.parse(`${date} ${time}`);
};
