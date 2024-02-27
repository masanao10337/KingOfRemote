import submitButtonGenerator from './libs/submitButtonGenerator';

class ShiftAutoFiller {
  static #defaultRemoteDay = ['火', '水'];
  static #zaitakuCoreTime10To14 = '90000065476630';
  #submitBtn;

  constructor() {
    if (!this.#isSchedulePage()) return window.alert('スケジュール申請ページではありません。泣');
    if (this.#buttonExists()) return window.alert('ボタンは一つあれば十分ではないですか？');

      this.#renderButton();
  }

  #isSchedulePage() {
    return this.#getPageTitle() === 'スケジュール申請';
  }

  #getPageTitle() {
    return document
    .querySelector(".htBlock-pageTitleSticky")
    ?.textContent
    .replace('このページのヘルプ', '') //ほとんどのページにこの文字列が含まれているので削除
    .trim();
  }

  #buttonExists() {
    return !!document.getElementById('remote_shift_at_once');
  }
  #renderButton () {
    document
        .getElementsByClassName("htBlock-headerPanel_inner")[0]
        .appendChild(this.#submitBtn);
  }

  // ボタンを生成するときに引数としてこの内容を渡す。
  #selectRemoteShift() {
    const targetDates = this.#extractTargetDates();
    targetDates.forEach(targetDate => {
      const selectEl = document.getElementById('requestedSchedulePatternList_' + targetDate);
      selectEl.value = ShiftAutoFiller.#zaitakuCoreTime10To14;
    });
  }

  #extractTargetDates () {
    const datesList = this.#getDatesOfMonthYYYYMMDD() ;
    const remoteDates = datesList.filter(date =>
        ShiftAutoFiller.#defaultRemoteDay.includes(this.#whichDayOfWeek(date))
    );
    return remoteDates.filter(
        (date) => !this.#getHoliDaysYYYYMMDD().includes(date)
    );
  }

  #getDatesOfMonthYYYYMMDD () {
      const daysIdAttrList = Array.from(
          document.getElementsByName("requested_schedule_pattern_list")
      ).map((target) => target.id);

      return daysIdAttrList.map(id => id.slice(-8));
    }

  #whichDayOfWeek(dateStr) {
    const dayOfWeekList = [ '日', '月', '火', '水', '木', '金', '土' ];
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // 月は0から始まる
    const day = parseInt(dateStr.substring(6, 8), 10);
    const date = new Date(year, month, day);

    return dayOfWeekList[date.getDay()];
  }

  #getHoliDaysYYYYMMDD () {
    const holidaySundayList = Array.from(
        document.getElementsByClassName("holiday")
    ).map((target) => target.textContent);
    const holidaysList = holidaySundayList.filter(date => !date.includes('日'));

    return holidaysList.map(holiday => {
      return `${this.#getYear()}${holiday.match(/\d+/g).join('')}`;
    });
  }

  // FIXME:12月以外に翌年1月のシフトを入れようとすると、選択対象のyearが取れない。
  #getYear = () => {
    const date = new Date()
    return date.getMonth() === 11
      ? (date.getFullYear() + 1).toString()
      : date.getFullYear().toString();
  }
}

new ShiftAutoFiller;