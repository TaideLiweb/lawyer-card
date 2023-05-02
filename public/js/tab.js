export default function tabHandle(tab, container, displayType) {
    tab.forEach((element) => {
        element.addEventListener('click', (e) => {
            // 初始化每個 tab 、 content 狀態
            for (let i = 0; i < tab.length; i++) {
                tab[i].classList.remove('active')
                container[i].style.display = 'none'
            }
            // 點選的 DOM 加上 active
            e.currentTarget.classList.add('active')
            // 用 data-tab-target 取得要顯示的 content
            document.querySelector(`.${e.currentTarget.dataset.tabTarget}`).style.display = displayType
        })
    })
}
