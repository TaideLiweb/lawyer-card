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
      allowTouchMove: false,
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

  // add-time 律師預約的時間選擇器套件初始化&功能

  let count = 0;
  let dateAry = [];
  let editIndex = false;
  let addTime = document.querySelector('.popup-content .popup-time .add-time');
  function handleDateAry(selectedDates) {
    var selectedDate = selectedDates[0];
    let month = selectedDate.getMonth() + 1;
    let day = selectedDate.getDate();
    let hours = selectedDate.getHours();
    let minutes = String(selectedDate.getMinutes());
    let amPm = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12 || 12;
    // 檢查是否有要編輯的index
    if (editIndex !== false) {
      dateAry[editIndex] = {
        month: month,
        day: day,
        amPm: amPm,
        hours: hours,
        minutes: minutes.length === 1 ? '0' + minutes : minutes,
        money: 5600,
      };
    } else {
      dateAry[count] = {
        month: month,
        day: day,
        amPm: amPm,
        hours: hours,
        minutes: minutes.length === 1 ? '0' + minutes : minutes,
        money: 5600,
      };
    }

    console.log(dateAry);
  }
  function renderDateAry() {
    // 填入已選擇時間
    let str = '';
    dateAry.forEach((item, index) => {
      str += `<div class="popup-time-item" data-index=${index}>
          <div>${item.month}/${item.day}</div>
          <div>${item.amPm}${item.hours}:${item.minutes}</div>
          <div>${item.money}/1h</div>
          <span class="remove-btn" data-index=${index}>x</span>
        </div>`;
    });
    document.querySelector('.time-item').innerHTML = str;
    // 控制加日期按鈕要不要出現

    if (dateAry.length > 4) {
      addTime.style.display = 'none';
    } else {
      addTime.style.display = 'block';
    }
  }

  const timeItem = document.querySelector('.time-item');
  if (timeItem) {
    timeItem.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.classList.contains('remove-btn')) {
          let currentIndex = e.target.dataset.index;
          dateAry.splice(currentIndex, 1);
          renderDateAry();
          count -= 1;
          console.log(count);
        } else if (e.target.classList.contains('popup-time-item')) {
          let currentIndex = e.target.dataset.index;
          // 點擊已存在日期時賦予要被編輯的 index
          editIndex = currentIndex;
          calendar.open();
        }
      },
      false
    );
  }

  if (timeItem) {
    addTime.addEventListener('click', function () {
      // 按+的時候編輯狀態改回 false
      editIndex = false;
      calendar.open();
    });
  }

  let calendar = flatpickr('.popup-content .popup-time .add-time', {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    locale: 'zh',
    minDate: 'today',
    disableMobile: 'true',
    minuteIncrement: 30, // 每 30 分鐘為一個選項
    // hourIncrement: 1,
    numInput: false,
    defaultDate: 'today',
    clickOpens: false,
    positionElement: document.querySelector('.time-item'),
    onReady: function (selectedDates, dateStr, instance) {
      document.querySelector('.flatpickr-hour').setAttribute('readonly', '');
      document.querySelector('.flatpickr-minute').setAttribute('readonly', '');

      document.querySelector('.flatpickr-calendar').insertAdjacentHTML(
        'beforeend',
        `<div class="primary-btn date-confirm">
          <button>確定</button>
        </div>`
      );
      // 點擊時間確認按鈕的監聽事件
      document.querySelector('.date-confirm').addEventListener('click', () => {
        // 渲染 DateAry
        renderDateAry();
        this.close();

        // 如果有編輯的 index 就不 count+1
        if (count === 5 || editIndex !== false) return;
        count += 1;
      });
    },
    onOpen: function (selectedDates, dateStr, instance) {
      // 如果編輯的 index 是 false 就點開有預設值
      if (selectedDates !== undefined && editIndex === false) {
        console.log('onOpen');
        handleDateAry(selectedDates);
      }
    },
    onChange: function (selectedDates, dateStr, instance) {
      handleDateAry(selectedDates);
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
  const iconNotify = document.querySelector('.icon-notify');

  // 即時諮詢 tab
  tabHandle('.service-method .popup-tab-item', '.pre-consult', 'block');
  // 進度通知表單 tab
  tabHandle(
    '.progress-notify .popup-tab-item',
    '.progress-notify .rwd-table',
    'table'
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
      popupPrevious.style.display = 'none';
      document.querySelector(`.timely-consult`).style.display = 'block';
      serviceMethodTab.style.display = 'flex';
    });
    // 邀請通知按鈕-查看狀況
    inviteNotifyStatus.addEventListener('click', () => {
      hiddenPopup();
      previousStep = 'reserve-consult';
      document.querySelector(`.progress-notify`).style.display = 'block';
    });
    // header 小鈴鐺-查看狀況
    iconNotify.addEventListener('click', () => {
      hiddenPopup();
      popupPrevious.style.display = 'block';
      previousStep = 'reserve-consult';
      document.querySelector(`.progress-notify`).style.display = 'block';
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

  // 有 lawyer-card-popup 才執行，有空可整合
  if (document.querySelector('.lawyer-card-popup')) {
    let lawyerCard = document.querySelectorAll('.lawyer-card-intro');
    // 點擊卡片出現 popup
    for (let i = 0; i < lawyerCard.length; i++) {
      lawyerCard[i].addEventListener('click', () => {
        document.querySelector('.lawyer-card-popup').style.display = 'block';
      });
    }

    document
      .querySelector('.lawyer-card-background')
      .addEventListener('click', function () {
        document.querySelector('.lawyer-card-popup').style.display = 'none';
      });
  }
  // 有 complaint-share-popup 才執行，有空跟 lawyer-card-popup 整合
  if (document.querySelector('.complaint-share-popup')) {
    let lawyerCard = document.querySelectorAll('.complaint-share-file');
    // 點擊卡片出現 popup
    for (let i = 0; i < lawyerCard.length; i++) {
      lawyerCard[i].addEventListener('click', () => {
        document.querySelector('.complaint-share-popup').style.display =
          'block';
      });
    }

    document
      .querySelector('.complaint-share-background')
      .addEventListener('click', function () {
        document.querySelector('.complaint-share-popup').style.display = 'none';
      });
  }
  let complaintTypeItem = document.querySelectorAll('.complaint-type li');
  for (let i = 0; i < complaintTypeItem.length; i++) {
    complaintTypeItem[i].addEventListener('click', () => {
      window.location.href = 'complaint';
    });
  }
});
