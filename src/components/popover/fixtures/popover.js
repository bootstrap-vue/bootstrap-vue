window.app = new Vue({
  el: '#app',
  data: {
    triggerExamples: [
      'click',
      'focus',
      'hover',
      ['click', 'focus'],
      ['click', 'hover'],
      ['focus', 'hover']
    ]
  },
  methods: {
    triggersToString(input) {
      if (Array.isArray(input)) {
        return input.join(' + ')
      }
      return input
    },
    titleMethod() {
      return 'title method'
    },
    contentMethod() {
      return 'content method'
    },
    configMethod() {
      return {
        title: 'Title',
        content: 'Content:' + Date.now(),
        trigger: 'click blur',
        position: 'bottom',
        delay: { show: 200, hide: 100 },
        boundary: 'window',
        animation: false
      }
    }
  }
})
