window.app = new Vue({
  el: '#app',
  data: {
    dismissCountDown: null,
    showDismissibleAlert: false
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = 5
    }
  }
})
