window.app = new Vue({
  el: '#app',
  data: {
    items: [
      {
        text: 'Home',
        href: 'https://bootstrap-vue.github.io'
      },
      {
        text: 'Admin',
        href: '#',
        active: false
      },
      {
        text: 'Manage',
        href: '#'
      },
      {
        text: 'Library'
      }
    ],
    items2: [
      {
        text: 'Home',
        href: 'https://bootstrap-vue.github.io'
      },
      {
        text: 'Admin',
        href: '#',
        active: true
      },
      {
        text: 'Manage',
        href: '#'
      },
      {
        text: 'Library'
      }
    ]
  }
})
