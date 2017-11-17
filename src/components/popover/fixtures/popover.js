window.app = new Vue({
  el: '#app',
  data: {
    triggerExamples: [
      'click',
      'focus',
      'hover', ['click', 'focus'],
      ['click', 'hover'],
      ['focus', 'hover']
    ]
  },
  methods: {
    triggersToString (input) {
      if (Array.isArray(input)) {
        return input.join(' + ')
      }
      return input
    }
  }
})
