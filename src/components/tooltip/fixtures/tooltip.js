window.app = new Vue({
  el: '#app',
  data: {
    title: 'Tooltip Title'
  },
  methods: {
    titleMethod() {
      return 'title method'
    },
    configMethod() {
      return {
        title: 'Title: ' + Date.now(),
        trigger: 'click blur',
        position: 'bottom',
        delay: { show: 200, hide: 100 },
        boundary: 'window',
        animation: false
      }
    }
  }
})
