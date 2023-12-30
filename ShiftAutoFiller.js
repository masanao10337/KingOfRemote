// 設定 **************************************************

// リモート勤務する曜日をセットして下さい。
const REMOTE_DAY_OF_WEEK = [ '火', '水' ];

// セレクトボックスでセットしたいvalue値をセットして下さい。
// 【在宅】コアタイム（10-14）のvalue値：'90000040394904'
// 【在宅】コアタイム（9-13）のvalue値：'90000040394805'
const SET_VALUE = '90000040394904';

// *******************************************************

const pageTitle = document.querySelector('.htBlock-pageTitle').childNodes[3].innerHTML.replace(/\r?\n/g, '');
const holidays = getHolidays();
if (pageTitle === 'スケジュール申請') {
  createButton();
}

function createButton() {
  const btn = document.createElement('div');
  btn.innerHTML = '在宅勤怠の一括入力';
  btn.style.maxWidth = '100%';
  btn.style.height = '40px';
  btn.style.margin = '10px 20px';
  btn.style.lineHeight = '40px';
  btn.style.cursor = 'pointer';
  btn.style.background = '#1D9E48';
  btn.style.color = '#fff';
  btn.style.textAlign = 'center';
  btn.style.borderRadius = '4px';
  btn.addEventListener('mouseover', () => {
    btn.style.background = '#008735';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.background = '#1D9E48';
  });
  btn.onclick = () => {
    var result = window.confirm(REMOTE_DAY_OF_WEEK.map(w => {return w + ' '}) + 'のシフトを一括で在宅申請しますか？');
    if (result) { setRemoteWorkShift(); }
  }
  document.getElementsByClassName('htBlock-headerPanel_inner')[0].appendChild(btn);
}

function setRemoteWorkShift() {
  const settingTargetIds = Array.from(document.getElementsByName('requested_schedule_pattern_list')).map(target => target.id);
  const targetDates = settingTargetIds.map(id => id.slice(-8));

  for (targetDate of targetDates) {
    if (isHoliday(targetDate, holidays)) { continue; }
    if(!REMOTE_DAY_OF_WEEK.includes(getDayOfWeek(targetDate))) { continue; }
    const setting_target = document.getElementById('requestedSchedulePatternList_' + targetDate);
    Array.from(setting_target.options).map(option => {
      if (option.value === SET_VALUE) {
        option.selected = true;
        setting_target.onchange();
      }
    });
  }
}

function getHolidays() {
  if (pageTitle != 'スケジュール申請') {
    return;
  }
  const holidaysArray = Array.from(document.getElementsByClassName('holiday')).map(target => target.textContent);
  let array = [];
  for (holiday of holidaysArray) {
    if (holiday.slice(6, 7) != '日') {
      const month = holiday.slice(0, 2);
      const day = holiday.slice(3, 5)
      array.push(month + day);
    }
  }

  return array;
}

function isHoliday(dateStr) {
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  return holidays.includes(month + day);
}

function getDayOfWeek(dateStr) {
  const dayOfWeekArray = [ '日', '月', '火', '水', '木', '金', '土' ];
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6) - 1; // Dateオブジェクトのmonthは0始まりなので1引く
  const day = dateStr.slice(6, 8);

  const date = new Date(year, month, day);
  return dayOfWeekArray[date.getDay()];
}
