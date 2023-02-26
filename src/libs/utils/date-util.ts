import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);

export type DateUtilType = string | Date;

export class DateUtil {
  static parse(param: DateUtilType) {
    return dayjs(param).toDate();
  }

  static parseUTC(param: DateUtilType) {
    return dayjs(param).utc().toDate();
  }

  static add(date: DateUtilType, { value, unit }: { value: number; unit: dayjs.ManipulateType }) {
    return dayjs(date).add(value, unit).toDate();
  }

  static now() {
    return dayjs().millisecond(0).toDate();
  }

  static utcNow() {
    return dayjs().millisecond(0).utc().toDate();
  }

  static unix(param: number) {
    return dayjs.unix(param).toDate();
  }
}
