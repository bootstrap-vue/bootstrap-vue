window.app = new Vue({
  el: '#app',
  data: {
    breakpoints: ['sm', 'md', 'lg', 'xl'],
    breakpointObjs: [
      { sm: true, key: 'sm' },
      { md: true, key: 'md' },
      { lg: true, key: 'lg' },
      { xl: true, key: 'xl' }
    ],
    sizes: Array.from({ length: 12 }).map((_, i) => i + 1)
  }
})
