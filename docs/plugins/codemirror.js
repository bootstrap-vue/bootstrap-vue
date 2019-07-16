import Vue from 'vue'

// Lazy load coadmorror, so that it appears in a separate chunk
Vue.component('codemirror', () => {
  return {
    component: import('../components/codemirror' /* webpackChunkName: "codemirror" */),
    loading: {
      render(h) {
        return h('div', { style: { minHeight: '300px' } }, [h()])
      }
    }
  }
})
