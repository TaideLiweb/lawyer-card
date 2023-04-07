document.addEventListener('DOMContentLoaded', () => {
  let navSwitch = true;

  // 手機與電腦模式的導覽列點擊事件
  document.querySelector('.nav-md .logo-img').addEventListener('click', () => {
    let moblie = window.matchMedia('(max-width: 768px)');
    if (moblie.matches) {
      if (navSwitch !== true) {
        document.querySelector('.nav').style.display = 'none';
      } else {
        document.querySelector('.nav').style.display = 'block';
      }
    } else {
      if (navSwitch !== true) {
        document.querySelector('.logo-list').style.display = 'none';
      } else {
        document.querySelector('.logo-list').style.display = 'block';
      }
    }
    navSwitch = !navSwitch;
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
});
