window.app = new Vue({
  el: '#app',
  data: {
    name: '',
    names: [],
    enableModal: true
  },
  methods: {
    clearName () {
      this.name = ''
    },
    submit (e) {
      if (!this.name) {
        return e.preventDefault()
      }

      this.names.push(this.name)
      this.clearName()
    }
  }
})
