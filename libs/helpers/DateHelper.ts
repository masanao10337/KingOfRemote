//NOTE: enumで実装した方が良いかも
import { DAYS_OF_WEEK, DEFAULT_REMOTE_DAY, DaysOfWeek } from "../Constant";

export class DateHelper {
  //TODO: 改善する。
  static whichDayOfWeek(dateStr: string): DaysOfWeek {
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // 月は0から始まる
    const day = parseInt(dateStr.substring(6, 8), 10);
    const date = new Date(year, month, day);

    return DAYS_OF_WEEK[date.getDay()];
  }

  // FIXME:12月以外に翌年1月のシフトを入れようとすると、選択対象のyearが取れない。
  static get current_year() {
    const date = new Date()
    return date.getMonth() === 11
      ? (date.getFullYear() + 1).toString()
      : date.getFullYear().toString();
  }

  static extractRemoteDays(dates: string[], holodays: string[]): string[] {
    const remoteDates = dates.filter(date => DEFAULT_REMOTE_DAY.includes(this.whichDayOfWeek(date)));
    return remoteDates.filter((date) => !holodays.includes(date));
  }
}