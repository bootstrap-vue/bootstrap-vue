window.app = new Vue({
  el: '#app',
  data: {
    spies: []
  },
  methods: {
    handleClick() {
      this.spies.forEach(spy => spy.apply(undefined, arguments))
    }
  }
})
