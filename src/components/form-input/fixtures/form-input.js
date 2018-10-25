window.app = new Vue({
  el: '#app',
  data: {
    text: '',
    textformatter: '',
    textlazy: '',
    radio: '',
    check: '',
    default: 'Default'
  },
  methods: {
    format (value) {
      return value.toLowerCase()
    }
  }
})
