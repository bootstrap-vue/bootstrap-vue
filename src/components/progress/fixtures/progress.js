window.app = new Vue({
  el: '#app',
  data: {
    progress: Math.random() * 100
  },
  methods: {
    clicked () {
      this.progress = Math.random() * 100
    }
  }
})
