declare module 'bootstrap-vue' {
  import { Component, AsyncComponent, DirectiveOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'
  import { BvEvent } from './bv-event'

  import Modal, { BModal, BvModalEvent } from './components/modal'
  import Toast, { BToast, BToaster } from './components/toast'
  import Table, { BTable } from './components/table'

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
    Table,
    BTable
  }

  export {
    Toast,
    BToast,
    BToaster
  }
}
