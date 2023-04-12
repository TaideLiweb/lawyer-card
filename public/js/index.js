document.addEventListener('DOMContentLoaded', () => {
  // 輪播套件初始化
  const swiper = new Swiper('.swiper', {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // 時間選擇器套件初始化&功能

  let count = 0;

  flatpickr('.popup-content .popup-time .add-time', {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    locale: 'zh',
    minDate: 'today',
    onClose: function (selectedDates, dateStr, instance) {
      let addTime = document.querySelector(
        '.popup-content .popup-time .add-time'
      );
      var selectedDate = selectedDates[0];
      let year = selectedDate.getFullYear();
      let month = selectedDate.getMonth() + 1;
      let day = selectedDate.getDate();
      let time = selectedDate.getTime();
      let hours = selectedDate.getHours();
      let minutes = String(selectedDate.getMinutes());
      let amPm = hours < 12 ? 'AM' : 'PM';
      hours = hours % 12 || 12;
      console.log('所選時間： ' + hours + ':' + minutes + ' ' + amPm);
      console.log('所選日期： ' + year + ' 年 ' + month + ' 月 ' + day + ' 日');

      addTime.insertAdjacentHTML(
        'beforebegin',
        `<div class="popup-time-item item-${count}">
          <div>${month}/${day}</div>
          <div>${amPm}${hours}:${
          minutes.length === 1 ? '0' + minutes : minutes
        }</div>
          <div>5600/1h</div>
        </div>`
      );
      let popupTimeItem = document.querySelectorAll(
        '.popup-content .popup-time .popup-time-item'
      );

      if (popupTimeItem.length > 4) {
        addTime.style.display = 'none';
      }
      // todo 如何刪除元素
      document.querySelector(`.popup-time-item.item-${count}`).addEventListener(
        'click',
        (e) => {
          e.currentTarget.remove();
          // 重新抓 DOM 數量
          let popupTimeItem = document.querySelectorAll(
            '.popup-content .popup-time .popup-time-item'
          );
          if (popupTimeItem.length < 5) {
            addTime.style.display = 'block';
          }
        },
        false
      );
      count = count + 1;
    },
  });

  // 切換popup

  let previousStep = null;
  let currentStep = null;

  const popupPrevious = document.querySelector('.popup-previous');

  const serviceMethodTab = document.querySelector('.popup-tab.service-method');
  const serviceMethodTabItem = document.querySelectorAll(
    '.service-method .popup-tab-item'
  );

  const preConsultPopup = document.querySelectorAll('.pre-consult');
  const choiceLawyerPopup = document.querySelector(
    '.popup-content.choice-lawyer'
  );
  const noChoiceLawyerPopup = document.querySelector(
    '.popup-content.no-choice-lawyer'
  );
  const matchLawyerBtn = document.querySelectorAll('.match-lawyer-btn');
  // 即時諮詢 tab
  serviceMethodTabItem.forEach((element) => {
    element.addEventListener('click', (e) => {
      // 初始化每個 tab 、 content 狀態
      for (let i = 0; i < serviceMethodTabItem.length; i++) {
        serviceMethodTabItem[i].classList.remove('active');
        preConsultPopup[i].style.display = 'none';
      }
      // 點選的 DOM 加上 active
      e.currentTarget.classList.add('active');
      // 用 data-service-method 取得要顯示的 content
      document.querySelector(
        `.${e.currentTarget.dataset.serviceMethod}`
      ).style.display = 'block';
    });
  });

  // 隱藏所有 popup-content
  function hiddenPopup() {
    document.querySelectorAll('.popup .popup-content').forEach((element) => {
      element.style.display = 'none';
    });
  }

  // 預約諮詢的下一步
  document
    .querySelector('.pre-consult.reserve-consult .consult-btn>button')
    .addEventListener('click', () => {
      serviceMethodTab.style.display = 'none';
      hiddenPopup();
      popupPrevious.style.display = 'block';
      previousStep = 'reserve-consult';
      // 預約諮詢給選時間
      document.querySelector('.popup-time').style.display = 'none';

      choiceLawyerPopup.style.display = 'flex';
    });

  // 即時諮詢的下一步
  document
    .querySelector('.pre-consult.timely-consult .consult-btn>button')
    .addEventListener('click', () => {
      serviceMethodTab.style.display = 'none';
      hiddenPopup();
      popupPrevious.style.display = 'block';
      previousStep = 'timely-consult';

      // 選擇挑選律師出現選律師 popup
      if (
        document.querySelector('.pre-consult.timely-consult .choice').checked
      ) {
        choiceLawyerPopup.style.display = 'flex';
        // 即時諮詢不給選時間
        document.querySelector('.popup-time').style.display = 'none';
      }
      // 選擇自動媒合出現填寫資料 popup

      if (document.querySelector('.pre-consult.timely-consult .auto').checked) {
        noChoiceLawyerPopup.style.display = 'block';
      }
    });

  // 配對律師按鈕
  console.log(matchLawyerBtn);
  matchLawyerBtn.forEach((element) => {
    element.addEventListener('click', () => {
      if (previousStep === 'timely-consult') {
        window.location.href = '/con-call';
      }
    });
  });

  // 上一步按鈕 function
  function previousHandle() {
    hiddenPopup();
    popupPrevious.style.display = 'none';
    switch (previousStep) {
      case 'reserve-consult':
        document.querySelector(`.${previousStep}`).style.display = 'block';
        serviceMethodTab.style.display = 'flex';
        break;
      case 'timely-consult':
        document.querySelector(`.${previousStep}`).style.display = 'block';
        serviceMethodTab.style.display = 'flex';
        break;
      default:
        break;
    }
  }

  popupPrevious.addEventListener('click', previousHandle);
});
