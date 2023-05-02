import tabHandle from './tab.js'

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.comment-swiper')) {
        const swiperPrev = document.querySelector('.comment-swiper .swiper-prev')
        const swiperNext = document.querySelector('.comment-swiper .swiper-next')
        const commentSwiper = new Swiper('.comment-swiper', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 45,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 45,
                },
            },
        })
        swiperPrev.addEventListener('click', () => {
            commentSwiper.slidePrev()
        })
        swiperNext.addEventListener('click', () => {
            commentSwiper.slideNext()
        })
    }
    if (document.querySelector('.lawyer-post-swiper')) {
        const swiperPrev = document.querySelector('.lawyer-post-swiper .swiper-prev')
        const swiperNext = document.querySelector('.lawyer-post-swiper .swiper-next')
        const lawyerPostSwiper = new Swiper('.lawyer-post-swiper', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 45,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 45,
                },
            },
        })
        swiperPrev.addEventListener('click', () => {
            lawyerPostSwiper.slidePrev()
        })
        swiperNext.addEventListener('click', () => {
            lawyerPostSwiper.slideNext()
        })
    }
    if (document.querySelector('.my-post-swiper')) {
        const swiperPrev = document.querySelector('.my-post-swiper .swiper-prev')
        const swiperNext = document.querySelector('.my-post-swiper .swiper-next')
        const myPostSwiper = new Swiper('.my-post-swiper', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 45,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 45,
                },
            },
        })
        swiperPrev.addEventListener('click', () => {
            myPostSwiper.slidePrev()
        })
        swiperNext.addEventListener('click', () => {
            myPostSwiper.slideNext()
        })
    }
    if (document.querySelector('.post-collect-swiper')) {
        const swiperPrev = document.querySelector('.post-collect-swiper .swiper-prev')
        const swiperNext = document.querySelector('.post-collect-swiper .swiper-next')
        const postCollectwiper = new Swiper('.post-collect-swiper', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 45,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 45,
                },
            },
        })
        swiperPrev.addEventListener('click', () => {
            postCollectwiper.slidePrev()
        })
        swiperNext.addEventListener('click', () => {
            postCollectwiper.slideNext()
        })
    }
    // 我的文章 tab
    const personPostTabItem = document.querySelectorAll('.person-post-tab-item')
    const personPost = document.querySelectorAll('.person-post')
    if (personPostTabItem !== null) {
        tabHandle(personPostTabItem, personPost, 'block')
    }
    // 諮詢紀錄 tab
    const pconsultRecordTabItem = document.querySelectorAll('.consult-record-tab-item')
    const consultRecord = document.querySelectorAll('.consult-record')
    if (pconsultRecordTabItem !== null) {
        tabHandle(pconsultRecordTabItem, consultRecord, 'block')
    }
})
