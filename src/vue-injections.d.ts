/**
 * Augment the typings of Vue.js
 */
import Vue from 'vue'
import { BvModal } from './components/modal'
import { BvToast } from './components/toast'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $bvModal: BvModal
    readonly $bvToast: BvToast
  }
}


// TODO: figure out why it cannot be 'vue' like said in docs
// @ts-ignore: works on Vue 3, fails in Vue 2
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Access to the plugins related functions on Modal/Toast
     */
    $bvModal: BvModal extends Record<'$bvModal', infer T> ? T : BvModal
    $bvToast: BvToast extends Record<'$bvToast', infer T> ? T : BvToast


  }
}
