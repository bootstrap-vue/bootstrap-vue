declare module 'bootstrap-vue' {
  import { Component, AsyncComponent, DirectiveOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

  import Modal, { BModalComponent as BModal } from './components/modal'
  import Toast, { BToastComponent as BToast, BToasterComponent as BToaster } from './components/modal'

  export const Alert: BvPlugin
  export const BAlert: Component | AsyncComponent

  export const Badge: BvPlugin
  export const BBadge: Component | AsyncComponent

  export {
    Modal,
    BModal
  }

  export const Spinner: BvPlugin
  export const BSpinner: Component | AsyncComponent

  export {
    Toast,
    BToast,
    BToaster
  }
}
