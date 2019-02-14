window.app = new Vue({
  el: '#app',
  data: {
    currentPage: 1
  },
  mounted() {
    this.$nextTick(() => {
      this.currentPage = 2
    })
  },
  methods: {
    pageGen(num) {
      return `Page ${num})`
    },
    linkGen(num) {
      return `#page/${num})`
    }
  }
})
