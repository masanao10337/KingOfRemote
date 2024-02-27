// TODO: make this class JSX
import { DEFAULT_REMOTE_DAY } from "../Constant";

class SubmitButton {
  private submitBtn: HTMLDivElement;

  constructor (pickUpRemoteShift: () => void) {
    this.generateButton();
    this.styleButton();
    this.setButtonEvent(pickUpRemoteShift);
  }

  public render (): void {
      if(this.submitBtn === undefined) throw new Error('SubmitButton is not generated');

      document
      .getElementsByClassName("htBlock-headerPanel_inner")[0]
      .appendChild(this.submitBtn);
  }


  private generateButton ():void {
    this.submitBtn = document.createElement('div');
    this.submitBtn.id = 'remote_shift_at_once';
  }

  private styleButton (): void {
    this.submitBtn.innerHTML = '在宅勤怠の一括入力';
    this.submitBtn.style.cssText = `
        max-width: 100%;
        height: 40px;
        margin: 10px 20px;
        line-height: 40px;
        cursor: pointer;
        background: #1D9E48;
        color: #fff;
        text-align: center;
        border-radius: 4px;
    `;
    this.submitBtn.addEventListener('mouseover', () => {
      this.submitBtn.style.background = '#008735';
    });
    this.submitBtn.addEventListener('mouseleave', () => {
      this.submitBtn.style.background = '#1D9E48';
    });
  }

  private setButtonEvent(pickUpRemoteShift: () => void): void {
    this.submitBtn.onclick = () => {
      const isConfirmed = window.confirm(
        `${DEFAULT_REMOTE_DAY.join(' / ')}曜日がリモートのシフトを一括で選択しますか？`
      );
      if (isConfirmed) pickUpRemoteShift();
    };
  }
}

export default SubmitButton;