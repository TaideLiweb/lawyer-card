document.addEventListener('DOMContentLoaded', () => {
  const videoMeeting = document.querySelector('.video-meeting');
  const videoChat = document.querySelector('.video-chat');
  const messageBoard = document.querySelector('.message-board');
  const closePhone = document.querySelector('.close-phone');
  const ratingStars = document.querySelectorAll('.rating-stars>img');
  const consultCompletedPopup = document.querySelector('.consult-completed');

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
});
