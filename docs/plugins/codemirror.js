import Vue from 'vue'

// Lazy load coadmorror, so that it appears in a separate chunk
Vue.component('codemirror', () => ({
  delay: 100,
  loading: {
    render(h) {
      return h('div', { staticClass: 'text-center pt-5', style: { minHeight: '300px' } }, [
        h('b-spinner')
      ])
    }
  },
  component: import(/* webpackChunkName: "codemirror-vue" */ '../components/codemirror')
}))
