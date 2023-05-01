document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.comment-swiper')) {
    const commentSwiper = new Swiper('.comment-swiper', {
      spaceBetween: 50,
      slidesPerView: 3,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
});
