import SubmitButton from './components/SubmitButton';
import Validater from './Validator';
import HtmlPicker from './helpers/HtmlPicker';
import { DateHelper } from './helpers/DateHelper';
import { DEFAULT_REMOTE_DAY, REMOTE_10_14_SHIFT_ID } from './Constant';

class ShiftAutoFiller {
  private submitBtn: SubmitButton;

  constructor() {
    Validater.isSchedulePage(HtmlPicker.pageTitle);
    Validater.buttonExists();

    this.submitBtn = new SubmitButton(this.selectRemoteShift)
    this.submitBtn.render();
  }

  // ボタンを生成するときに引数としてこの内容を渡す。
  private selectRemoteShift() {
    const targetDates = this.extractTargetDates();
    targetDates.forEach(targetDate => {
      const selectEl = document.getElementById('requestedSchedulePatternList_' + targetDate) as HTMLSelectElement;
      selectEl.value = REMOTE_10_14_SHIFT_ID;
    });
  }

  private extractTargetDates () {
    const remoteDates = HtmlPicker.DatesOfMonth.filter(date => DEFAULT_REMOTE_DAY.includes(DateHelper.whichDayOfWeek(date)));
    return remoteDates.filter((date) => !HtmlPicker.HolidaysOfMonth.includes(date));
  }
}

new ShiftAutoFiller;