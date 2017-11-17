window.app = new Vue({
  el: '#app',
  data: {
    text: '',
    textformatter: '',
    textlazy: '',
    radio: '',
    check: ''
  },
  methods: {
    format (value) {
      return value.toLowerCase()
    }
  }
})
