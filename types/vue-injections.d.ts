/**
 * Augment the typings of Vue.js
 */
import Vue from 'vue'
import { BvModal } from './components/modal'
import { BvToast } from './components/toast'

declare module 'vue/types/vue' {
  interface Vue {
    $BvModal: BvModal
    $bvToast: BvToast
  }
}
