class Validator {
  static isSchedulePage(pageTitle: string): void {
    if(!(pageTitle === 'スケジュール申請')) {
      return window.alert('スケジュール申請ページではありません。泣');
    }
  }

  // NOTE: HTML構造を意識しなければいけないので、改善の余地あり？
  static buttonExists(): void {
    if(!!document.getElementById('remote_shift_at_once')) {
      return window.alert('ボタンは一つあれば十分ではないですか？');
    }
  }
}

export default Validator;