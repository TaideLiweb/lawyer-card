document.addEventListener('DOMContentLoaded', () => {
  const videoMeeting = document.querySelector('.video-meeting');
  const videoChat = document.querySelector('.video-chat');
  const messageBoard = document.querySelector('.message-board');
  const closePhone = document.querySelector('.close-phone');
  const ratingStars = document.querySelectorAll('.rating-stars>img');
  const consultCompletedPopup = document.querySelector('.consult-completed');
  const consultCompletedBtn = document.querySelector(
    '.consult-completed .primary-btn'
  );
  const jumpPage = document.querySelectorAll('.jump-page');
  const pairSuccess = document.querySelector('.pair-success');
  const paymentBtn = document.querySelector('.pair-success .primary-btn');
  const paymentSuccess = document.querySelector('.payment-success');

  let messageBoardSwitch = true;
  videoChat.addEventListener('click', () => {
    if (messageBoardSwitch) {
      messageBoard.style.display = 'block';
    } else {
      messageBoard.style.display = 'none';
    }
    messageBoardSwitch = !messageBoardSwitch;
  });

  closePhone.addEventListener('click', () => {
    videoMeeting.style.display = 'none';
    consultCompletedPopup.style.display = 'block';
  });

  ratingStars.forEach((element, index) => {
    element.addEventListener('click', () => {
      for (let i = 0; i < ratingStars.length; i++) {
        ratingStars[i].src = '/images/popup/vector.png';
      }
      for (let i = 0; i < index + 1; i++) {
        ratingStars[i].src = '/images/popup/vector-fill.png';
      }
    });
  });

  function jumpPageHidden() {
    jumpPage.forEach((element) => {
      element.style.display = 'none';
    });
  }
  setTimeout(() => {
    jumpPageHidden();
    pairSuccess.style.display = 'block';
  }, 3000);

  paymentBtn.addEventListener('click', () => {
    jumpPageHidden();
    paymentSuccess.style.display = 'block';
    setTimeout(() => {
      paymentSuccess.style.display = 'none';
      videoMeeting.style.display = 'flex';
    }, 3000);
  });
  consultCompletedBtn.addEventListener('click', () => {
    window.location.href = '/';
  });
});
