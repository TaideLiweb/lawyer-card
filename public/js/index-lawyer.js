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

  document
    .querySelector('.case-consult-popup .popup-close')
    .addEventListener('click', () => {
      document.querySelector('.case-consult-popup').style.display = 'none';
    });
  document
    .querySelector('.case-consult-popup .consult-btn')
    .addEventListener('click', () => {
      if (!document.querySelector('.case-consult-popup .benefit').checked) {
        document.querySelector('.case-consult-popup .new-case').style.display =
          'none';
        document.querySelector(
          '.case-consult-popup .reject-case'
        ).style.display = 'block';
      }
    });
});
