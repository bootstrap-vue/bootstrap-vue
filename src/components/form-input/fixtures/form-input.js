window.app = new Vue({
  el: '#app',
  data: {
    text: '',
    textformatter: '',
    textlazy: '',
    radio: '',
    check: '',
    default: 'Default',
    number: 123.45
  },
  methods: {
    format (value) {
      return value.toLowerCase()
    }
  }
})
