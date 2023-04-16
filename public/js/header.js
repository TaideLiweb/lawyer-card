document.addEventListener('DOMContentLoaded', () => {
  let navSwitch = false;

  // 手機與電腦模式的導覽列點擊事件
  document.querySelector('.nav-md .logo-img').addEventListener('click', () => {
    navSwitch = !navSwitch;
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
  });

  let userListSwitch = false;
  document
    .querySelector('header .icon-personal')
    .addEventListener('click', () => {
      userListSwitch = !userListSwitch;
      if (userListSwitch !== true) {
        document.querySelector('.user-list').style.display = 'none';
      } else {
        document.querySelector('.user-list').style.display = 'block';
      }
    });
});
