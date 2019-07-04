import Vue from 'vue'
// import CodeMirror from '../components/codemirror'
const CodeMirror = () => import('../components/codemirror')

Vue.component('codemirror', CodeMirror)
