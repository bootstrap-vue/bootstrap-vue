declare module 'bootstrap-vue' {
  import { Component, AsyncComponent, DirectiveOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

  export const Alert: BvPlugin
  export const BAlert: Component | AsyncComponent

  export const Badge: BvPlugin
  export const BBadge: Component | AsyncComponent

  export const Modal: BvPlugin
  export const BModal: Component | AsyncComponent

  export const Spinner: BvPlugin
  export const BSpinner: Component | AsyncComponent

  export const Toast: BvPlugin
  export const BToast: Component | AsyncComponent
  export const BToaster: Component | AsyncComponent
}
