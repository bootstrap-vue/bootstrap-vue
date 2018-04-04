window.app = new Vue({
  el: '#app',
  data: {
    variants: [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'outline-primary',
      'outline-secondary',
      'outline-success',
      'outline-warning',
      'outline-danger',
      'link'
    ],
    sizes: ['sm', '', 'lg'],
    btnToggle: null
  },
  methods: {
    handleClick (event) {
      // STUB!
    }
  }
})
