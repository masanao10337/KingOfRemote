import SubmitButton from './components/SubmitButton';
import Validater from './Validator';
import HtmlPicker from './helpers/HtmlPicker';
import { DateHelper } from './helpers/DateHelper';
import { REMOTE_10_14_SHIFT_ID } from './Constant';

class ShiftAutoFiller {
  private submitBtn: SubmitButton;

  constructor() {
    Validater.isSchedulePage(HtmlPicker.pageTitle);
    Validater.buttonExists();

    //TODO: DI
    this.submitBtn = new SubmitButton(this.selectRemoteShift)
    this.submitBtn.render();
  }

  private selectRemoteShift() {
    const targetDates = DateHelper.extractRemoteDays(
      HtmlPicker.DatesOfMonth,
      HtmlPicker.HolidaysOfMonth,
    );

    targetDates.forEach(targetDate => {
      const selectEl = document.getElementById('requestedSchedulePatternList_' + targetDate) as HTMLSelectElement;
      selectEl.value = REMOTE_10_14_SHIFT_ID;
    });
  }
}

new ShiftAutoFiller;