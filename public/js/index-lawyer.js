document.addEventListener('DOMContentLoaded', () => {
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
