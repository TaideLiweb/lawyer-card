import tabHandle from './tab.js';

document.addEventListener('DOMContentLoaded', () => {
  // 輪播套件初始化
  const lawyerSwiper = new Swiper('.lawyer-swiper', {
    spaceBetween: 50,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  if (document.querySelector('.lawyer-card-swiper')) {
    const swiperPrev = document.querySelector(
      '.lawyer-card-swiper .swiper-prev'
    );
    const swiperNext = document.querySelector(
      '.lawyer-card-swiper .swiper-next'
    );
    const lawyerCardSwiper = new Swiper('.lawyer-card-swiper', {
      slidesPerView: 2,
      spaceBetween: 30,
      grid: {
        rows: 2,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 3,
          spaceBetween: 45,
          grid: {
            rows: 2,
          },
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 45,
          grid: {
            rows: 2,
          },
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 60,
          grid: {
            rows: 2,
          },
        },
      },
    });

    swiperPrev.addEventListener('click', () => {
      lawyerCardSwiper.slidePrev();
    });
    swiperNext.addEventListener('click', () => {
      lawyerCardSwiper.slideNext();
    });
  }

  if (document.querySelector('.complaint-type-swiper')) {
    const swiperPrev = document.querySelector(
      '.complaint-type-swiper-wrapper .swiper-prev'
    );
    const swiperNext = document.querySelector(
      '.complaint-type-swiper-wrapper .swiper-next'
    );
    const complaintTypeSwiper = new Swiper('.complaint-type-swiper', {
      slidesPerView: 4,
      spaceBetween: 20,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        // 576: {
        //   slidesPerView: 3,
        //   spaceBetween: 45,
        //   grid: {
        //     rows: 2,
        //   },
        // },
        768: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 9,
          spaceBetween: 30,
        },
      },
    });
    const complaintContentSwiper = new Swiper('.complaint-content-swiper', {
      slidesPerView: 1,
      thumbs: {
        swiper: complaintTypeSwiper,
      },
    });

    swiperPrev.addEventListener('click', () => {
      complaintContentSwiper.slidePrev();
    });
    swiperNext.addEventListener('click', () => {
      complaintContentSwiper.slideNext();
    });
  }

  // 時間選擇器套件初始化&功能

  let count = 0;

  flatpickr('.popup-content .popup-time .add-time', {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    locale: 'zh',
    minDate: 'today',
    disableMobile: 'true',
    minuteIncrement: 30, // 每 30 分鐘為一個選項
    // hourIncrement: 1,
    numInput: false,
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
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      // Utilize dayElem.dateObj, which is the corresponding Date
      // dummy logic
      dayElem.innerHTML += "<span class='event'>$5600</span>";
    },
  });

  // 切換popup

  let previousStep = null;
  let currentStep = null;

  const popup = document.querySelector('.popup');
  const popupPrevious = document.querySelector('.popup-previous');

  const serviceMethodTab = document.querySelector('.popup-tab.service-method');
  const choiceLawyerPopup = document.querySelector(
    '.popup-content.choice-lawyer'
  );
  const noChoiceLawyerPopup = document.querySelector(
    '.popup-content.no-choice-lawyer'
  );
  const inviteNotifyPopup = document.querySelector(
    '.popup-content.invite-notify'
  );
  const matchLawyerBtn = document.querySelectorAll('.match-lawyer-btn');
  const inviteNotifyStatus = document.querySelector(
    '.invite-notify .status>button'
  );
  const inviteNotifyBackIndex = document.querySelector(
    '.invite-notify .back-index>button'
  );

  // 即時諮詢 tab
  tabHandle('.service-method .popup-tab-item', '.pre-consult', 'block');
  // 進度通知表單 tab
  tabHandle(
    '.progress-notifiy .popup-tab-item',
    '.progress-notifiy .rwd-table',
    'block'
  );
  // 法律常識 tab
  tabHandle(
    '.law-knowledge-tab .law-knowledge-tab-item',
    '.law-knowledge-content',
    'flex'
  );
  // 首頁三大功能 tab
  tabHandle(
    '.main-section-tab .main-section-tab-item',
    '.main-section',
    'block'
  );
  // 律師排行 tab
  tabHandle('.lawyer-rank-tab-item', '.lawyer-rank-content', 'block');
  // 隱藏所有 popup-content
  function hiddenPopup() {
    document.querySelectorAll('.popup .popup-content').forEach((element) => {
      element.style.display = 'none';
    });
  }
  function removePreviousClass() {
    popupPrevious.classList.remove('choice-lawyer');
  }

  // 有 popup 才執行

  if (popup) {
    // 預約諮詢的下一步
    document
      .querySelector('.pre-consult.reserve-consult .primary-btn>button')
      .addEventListener('click', () => {
        serviceMethodTab.style.display = 'none';
        hiddenPopup();
        popupPrevious.style.display = 'block';
        previousStep = 'reserve-consult';
        // 預約諮詢給選時間
        document.querySelector('.popup-time').style.display = 'flex';
        // 上一步加上 choice-lawyer
        popupPrevious.classList.add('choice-lawyer');
        document
          .querySelector('.choice-lawyer textarea')
          .setAttribute('rows', '4');
        choiceLawyerPopup.style.display = 'flex';
      });

    // 即時諮詢的下一步
    document
      .querySelector('.pre-consult.timely-consult .primary-btn>button')
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
          // 上一步加上 choice-lawyer-timely
          popupPrevious.classList.add('choice-lawyer');
          document
            .querySelector('.choice-lawyer textarea')
            .setAttribute('rows', '8');

          document.querySelector('.popup-time').style.display = 'none';
        }
        // 選擇自動媒合出現填寫資料 popup

        if (
          document.querySelector('.pre-consult.timely-consult .auto').checked
        ) {
          noChoiceLawyerPopup.style.display = 'block';
        }
      });

    // 配對律師按鈕
    matchLawyerBtn.forEach((element) => {
      element.addEventListener('click', () => {
        removePreviousClass();
        if (previousStep === 'timely-consult') {
          window.location.href = '/con-call';
        }
        if (previousStep === 'reserve-consult') {
          hiddenPopup();
          previousStep = 'reserve-choice-lawyer';
          inviteNotifyPopup.style.display = 'block';
        }
      });
    });
    // 邀請通知按鈕-回到首頁
    inviteNotifyBackIndex.addEventListener('click', () => {
      hiddenPopup();
      document.querySelector(`.timely-consult`).style.display = 'block';
      serviceMethodTab.style.display = 'flex';
    });
    // 邀請通知按鈕-查看狀況
    inviteNotifyStatus.addEventListener('click', () => {
      hiddenPopup();
      previousStep = 'reserve-consult';
      document.querySelector(`.progress-notifiy`).style.display = 'block';
    });
    // 上一步按鈕 function
    function previousHandle() {
      removePreviousClass();
      hiddenPopup();

      switch (previousStep) {
        case 'reserve-consult':
          popupPrevious.style.display = 'none';
          document.querySelector(`.${previousStep}`).style.display = 'block';
          serviceMethodTab.style.display = 'flex';
          break;
        case 'timely-consult':
          popupPrevious.style.display = 'none';
          document.querySelector(`.${previousStep}`).style.display = 'block';
          serviceMethodTab.style.display = 'flex';
          break;
        case 'reserve-choice-lawyer':
          document.querySelector(`.choice-lawyer`).style.display = 'flex';
          popupPrevious.classList.add('choice-lawyer');
          previousStep = 'reserve-consult';
          break;
        default:
          break;
      }
    }

    popupPrevious.addEventListener('click', previousHandle);
  }
  // 有 lawyer-card-popup 才執行
  if (document.querySelector('.lawyer-card-popup')) {
    document
      .querySelector('.lawyer-card-background')
      .addEventListener('click', function () {
        document.querySelector('.lawyer-card-popup').style.display = 'none';
      });
  }
});
