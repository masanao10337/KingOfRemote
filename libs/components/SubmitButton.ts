import { DEFAULT_REMOTE_DAY } from "../Constant";

class SubmitButton {
  #submitBtn: HTMLDivElement;

  constructor (pickUpRemoteShift: () => void) {
    this.#generateButton();
    this.#styleButton();
    this.#setButtonEvent(pickUpRemoteShift);
  }

  get submitBtn (): HTMLDivElement {
    if(this.#submitBtn === undefined) throw new Error('SubmitButton is not generated');
    return this.#submitBtn;
  }

  render (): void {
      if(this.#submitBtn === undefined) throw new Error('SubmitButton is not generated');

      document
      .getElementsByClassName("htBlock-headerPanel_inner")[0]
      .appendChild(this.#submitBtn);
  }

  #generateButton ():void {
    this.#submitBtn = document.createElement('div');
    this.#submitBtn.id = 'remote_shift_at_once';
  }

  #styleButton (): void {
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

  #setButtonEvent(pickUpRemoteShift: () => void): void {
    this.#submitBtn.onclick = () => {
      const isConfirmed = window.confirm(
        `${DEFAULT_REMOTE_DAY.join(' / ')}曜日がリモートのシフトを一括で選択しますか？`
      );
      if (isConfirmed) pickUpRemoteShift();
    };
  }
}

export default SubmitButton;