import tabHandle from './tab.js';
document.addEventListener('DOMContentLoaded', () => {
  // header case filter
  let caseFilterSwitch = false;
  document
    .querySelector('header .icon-filter')
    .addEventListener('click', () => {
      caseFilterSwitch = !caseFilterSwitch;
      if (caseFilterSwitch !== true) {
        document.querySelector('.case-filter').style.display = 'none';
      } else {
        document.querySelector('.case-filter').style.display = 'block';
      }
    });

  // 上線開關的點擊事件
  if (document.querySelector('.online-switch') !== null) {
    document
      .querySelector('.online-switch .online')
      .addEventListener('click', () => {
        document.querySelector(
          '.online-switch .online-switch-active'
        ).style.left = '50%';
      });

    document
      .querySelector('.online-switch .offline')
      .addEventListener('click', () => {
        document.querySelector(
          '.online-switch .online-switch-active'
        ).style.left = '0%';
      });
  }
  if (document.querySelector('.case-consult-popup') !== null) {
    document
      .querySelector('.case-consult-popup .popup-close')
      .addEventListener('click', () => {
        document.querySelector('.case-consult-popup').style.display = 'none';
      });

    document
      .querySelector('.case-consult-popup .primary-btn')
      .addEventListener('click', () => {
        if (!document.querySelector('.case-consult-popup .benefit').checked) {
          document.querySelector(
            '.case-consult-popup .new-case'
          ).style.display = 'none';
          document.querySelector(
            '.case-consult-popup .reject-case'
          ).style.display = 'block';
        }
      });
  }

  // lawyer-calendar 律師行事曆的時間選擇器套件初始化&功能
  flatpickr('.lawyer-calendar', {
    dateFormat: 'Y-m-d',
    locale: 'zh',
    minDate: 'today',
    disableMobile: 'true',
    static: true,
    position: 'right',
    readOnly: true,
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      // Utilize dayElem.dateObj, which is the corresponding Date
      // dummy logic
      if (Math.random() < 0.15)
        dayElem.innerHTML += "<span class='event'>3</span>";
      else if (Math.random() > 0.85)
        dayElem.innerHTML += "<span class='event'>2</span>";
    },
    onChange: function () {
      document.querySelector('.progress-notify-popup').style.display = 'block';
    },
  });

  // 進度通知表單 tab

  tabHandle(
    '.progress-notify-popup .popup-tab-item',
    '.progress-notify-popup .rwd-table',
    'table'
  );
  document
    .querySelector('.progress-notify-popup .popup-backbround')
    .addEventListener('click', function () {
      document.querySelector('.progress-notify-popup').style.display = 'none';
    });
});
