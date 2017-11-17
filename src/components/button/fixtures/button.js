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
      // eslint-disable-next-line no-alert
      alert('You clicked, I listened.')
    }
  }
})
