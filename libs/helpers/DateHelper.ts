//NOTE: enumで実装した方が良いかも
export type DaysOfWeek = '日' | '月' | '火' | '水' | '木' | '金' | '土';

export class DateHelper {
  static whichDayOfWeek(dateStr: string): DaysOfWeek {
    const dayOfWeekList: DaysOfWeek[] = [ '日', '月', '火', '水', '木', '金', '土' ];
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // 月は0から始まる
    const day = parseInt(dateStr.substring(6, 8), 10);
    const date = new Date(year, month, day);

    return dayOfWeekList[date.getDay()];
  }

  // FIXME:12月以外に翌年1月のシフトを入れようとすると、選択対象のyearが取れない。
  static get current_year() {
    const date = new Date()
    return date.getMonth() === 11
      ? (date.getFullYear() + 1).toString()
      : date.getFullYear().toString();
  }
}