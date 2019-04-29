declare module 'bootstrap-vue' {
  import { Component, AsyncComponent, DirectiveOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'
  import { BvEvent } from './bv-event'

  import Modal, { BModalComponent as BModal, BvModalEvent } from './components/modal'
  import Toast, { BToastComponent as BToast, BToasterComponent as BToaster } from './components/modal'

  export {
    BvEvent
  }

  export const Alert: BvPlugin
  export const BAlert: Component | AsyncComponent

  export const Badge: BvPlugin
  export const BBadge: Component | AsyncComponent

  export {
    Modal,
    BModal,
    BvModalEvent
  }

  export const Spinner: BvPlugin
  export const BSpinner: Component | AsyncComponent

  export {
    Toast,
    BToast,
    BToaster
  }
}
