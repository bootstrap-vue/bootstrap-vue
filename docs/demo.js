window.app = new Vue({
  el: '#app',
  data: function () {
    return {
      buttons: [{
        text: 'First',
        value: 'first',
      }, {
        text: 'Second',
        value: 'second',
      }, {
        text: 'Third',
        value: 'third',
        disabled: true,
      }],
      selected:'-',
      breadcrumb: [
        {text: 'Home', link: '#', active: true},
        {text: 'Library', active: false}
      ]
    }
  }
});
