import Vue from 'vue'

// Lazy load coadmorror, so that it apperas in a separate chunk
Vue.component('codemirror', () = import('../components/codemirror'  /* webpackChunkName: "codemirror" */))
