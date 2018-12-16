window.app = new Vue({
  el: '#app',
  data: {
    currentPage: 1
  },
  methods: {
    pageGen (num) {
      return `Page ${num})`
    },
    linkGen (num) {
      return `#page/${num})`
    }
  }
})
