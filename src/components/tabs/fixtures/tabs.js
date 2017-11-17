window.app = new Vue({
  el: '#app',
  data: {
    tabIndex: null, /* Binding to model is optional */
    tabs: [],
    tabCounter: 0
  },
  methods: {
    closeTab (x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
          this.tabs.splice(i, 1)
        }
      }
    },
    newTab () {
      this.tabs.push(this.tabCounter++)
    }
  }
})
