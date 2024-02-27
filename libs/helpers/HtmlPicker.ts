import { DateHelper } from "./DateHelper";

//TODO: YYYYMMDD形式の文字列型を作成する。
class HtmlPicker {
  public static  get pageTitle(): string {
    const targetText: string = document.querySelector(".htBlock-pageTitleSticky")?.textContent ?? '';
    return targetText.replace('このページのヘルプ', '').trim();
  }

  public static get DatesOfMonth(): string[] {
    return this.requestedScheduleIdAttrList.map(id => id.slice(-8));
  }

  public static get HolidaysOfMonth(): string[] {
    const holidaysList = this.holidaySundayList.filter(date => !(date?.includes('日')));
    return holidaysList.map(holiday => {
      if (holiday) {
        return `${DateHelper.current_year}${holiday.match(/\d+/g)?.join('')}`;
      }
      return '';
    })
  }

  // @return e.g. [requestedSchedulePatternList_20240301, requestedSchedulePatternList_20240302 ..]
  private static get requestedScheduleIdAttrList(): string[] {
    return Array.from(document.getElementsByName("requested_schedule_pattern_list")).map((target) => target.id);
  }


  // @return e.g. ['03/03（日）', '03/10（日）', '03/17（日）', '03/20（水）', '03/24（日）', '03/31（日）']
  private static get holidaySundayList():(string | null)[] {
    return Array.from(document.getElementsByClassName("holiday")).map((target) => target.textContent);
  }
}

export default HtmlPicker;