class ShiftAutoFiller {
  static #defaultRemoteDay = ['火', '水'];
  static #zaitakuCoreTime10To14 = '90000040394904';
  #submitBtn;

  constructor() {
    this.#createButton();

    if (this.#isSchedulePage()) {
        this.#renderButton();
    } else {
        this.#showAlert();
    }
  }

  #isSchedulePage() {
    const pageTitle = document
        .querySelector(".htBlock-pageTitle")
        ?.childNodes[3].textContent.replace(/\r?\n/g, "");
    return pageTitle === 'スケジュール申請';
  }
  #renderButton () {
    document
        .getElementsByClassName("htBlock-headerPanel_inner")[0]
        .appendChild(this.#submitBtn);
  }

  #showAlert() {
    window.alert('スケジュール申請ページではありません。泣')
  }

  #createButton () {
    this.#generateButton();
    this.#styleButton();
    this.#setButtonEvent();
  }

  #generateButton () {
    this.#submitBtn = document.createElement('div');
  }

  #styleButton () {
    this.#submitBtn.innerHTML = '在宅勤怠の一括入力';
    this.#submitBtn.style.maxWidth = '100%';
    this.#submitBtn.style.height = '40px';
    this.#submitBtn.style.margin = '10px 20px';
    this.#submitBtn.style.lineHeight = '40px';
    this.#submitBtn.style.cursor = 'pointer';
    this.#submitBtn.style.background = '#1D9E48';
    this.#submitBtn.style.color = '#fff';
    this.#submitBtn.style.textAlign = 'center';
    this.#submitBtn.style.borderRadius = '4px';
    this.#submitBtn.addEventListener('mouseover', () => {
      this.#submitBtn.style.background = '#008735';
    });
    this.#submitBtn.addEventListener('mouseleave', () => {
      this.#submitBtn.style.background = '#1D9E48';
    });
  }

  #setButtonEvent() {
    this.#submitBtn.onclick = () => {
      const isConfirmed = window.confirm(
        `${ShiftAutoFiller.#defaultRemoteDay.join(' / ')}曜日がリモートのシフトを一括で選択しますか？`
      );
      if (isConfirmed) this.#selectRemoteShift();
    };
  }

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

const autoFiller = new ShiftAutoFiller;