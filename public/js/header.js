document.addEventListener('DOMContentLoaded', () => {
  let navSwitch = false;
  let logoList = document.querySelector('.logo-list');
  let nav = document.querySelector('.nav');
  let moblieSearch = document.querySelector('.moblie-search');
  let moblie = window.matchMedia('(max-width: 768px)');
  // 手機與電腦模式的導覽列點擊事件
  document.querySelector('.nav-md .logo-img').addEventListener('click', () => {
    navSwitch = !navSwitch;

    if (moblie.matches) {
      if (navSwitch !== true) {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'block';
      }
    } else {
      if (navSwitch !== true) {
        logoList.style.display = 'none';
      } else {
        logoList.style.display = 'block';
      }
    }
  });

  let userListSwitch = false;
  let userList = document.querySelector('.user-list');
  document
    .querySelector('header .icon-personal')
    .addEventListener('click', () => {
      userListSwitch = !userListSwitch;
      if (userListSwitch !== true) {
        userList.style.display = 'none';
      } else {
        userList.style.display = 'block';
      }
    });

  document.addEventListener(
    'click',
    function () {
      logoList.style.display = 'none';
      userList.style.display = 'none';
      moblieSearch.style.display = 'none';
    },
    true
  );
  if (moblie.matches) {
    document
      .querySelector('.header .serch-bar')
      .addEventListener('click', () => {
        moblieSearch.style.display = 'flex';
        document.querySelector('.moblie-search input').focus();
      });
  }
});
