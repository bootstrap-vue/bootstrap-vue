// Module to interop different Vue dist types (cjs vs esm)
import Vue from 'vue'

const _vue = Vue && Vue.__esModule ? Vue : { default: Vue }

export default _vue
