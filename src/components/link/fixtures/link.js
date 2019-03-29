const clickSpy = jest.fn()
const disabledClickSpy = jest.fn()
const btnHrefClick = jest.fn()

window.app = new Vue({
  el: '#app',
  data: {
    href: 'https://bootstrap-vue.github.io/',
    clickSpy,
    disabledClickSpy,
    btnHrefClick,
    testData: {}
  },
  methods: {
    handleClick(e) {
      clickSpy.apply(this, arguments)
    },
    handleDisabledClick(e) {
      this.testData.disabled_event = e
      disabledClickSpy.apply(this, arguments)
    },
    handleBtnHrefClick(e) {
      btnHrefClick.apply(this, arguments)
    }
  }
})
