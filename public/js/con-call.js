document.addEventListener('DOMContentLoaded', () => {
  let videoMeeting = document.querySelector('.video-meeting');
  let videoChat = document.querySelector('.video-chat');
  let messageBoard = document.querySelector('.message-board');
  let closePhone = document.querySelector('.close-phone');

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
  });
});
