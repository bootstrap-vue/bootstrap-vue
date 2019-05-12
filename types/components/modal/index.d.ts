//
// Modals
//
import Vue, { VNode } from 'vue'
import { BvEvent } from '../../bv-event'
import { BvPlugin } from '../../bv-plugin'

// Modal Plugin
declare const ModalPlugin: ModalPlugin
export default ModalPlugin
export interface ModalPlugin extends BvPlugin {}

// Component: b-modal
export interface BModal extends Vue {
  // Public methods
  show: () => void
  hide: (trigger?: string) => void
}

//
// Types
//
export type BvMsgBoxData = boolean | null | any

//
// Interfaces
//
export interface BvModalEvent extends BvEvent {
  readonly trigger: string | null
  // Future
  // details: any | null
  // Deprecated
  readonly modalId: string | null
  cancel: () => void
}

export interface BvMsgBoxOptions {
  title?: string | VNode | Array<VNode>
  titleTag?: string
  size?: string
  centered?: boolean
  scrollable?: boolean
  noFade?: boolean
  noCloseOnBackdrop?: boolean
  noCloseOnEsc?: boolean
  headerBgVariant?: string
  headerBorderVariant?: string
  headerTextVariant?: string
  headerCloseVariant?: string
  headerClass?: string | string[] | Array<any>
  bodyBgVariant?: string
  bodyBorderVariant?: string
  bodyTextVariant?: string
  bodyClass?: string | string[] | Array<any>
  footerBgVariant?: string
  footerBorderVariant?: string
  footerTextVariant?: string
  footerClass?: string | string[] | Array<any>
  headerCloseLabel?: string
  buttonSize?: string
  cancelTitle?: string
  cancelVariant?: string
  okTitle?: string
  okVariant?: string
  // Catch all
  [key: string]: any
}

export interface BvModalMsgBoxResolver {
  (evt: BvModalEvent): any
}

export interface BvModalMsgBoxShortcutMethod {
  (message: string | VNode | Array<VNode>, options?: BvMsgBoxOptions): Promise<BvMsgBoxData>
  // Future
  //(message: string | VNode | Array<VNode>, title: string | VNode | Array<VNode>, options?: BvMsgBoxOptions): Promise<BvMsgBoxData>
}

// Not yet documented
// export interface BvModalMsgBoxMethod {
//   (message: string | VNode | Array<VNode>, options: BvMsgBoxOptions, resolver: BvModalMsgBoxResolver): Promise<BvMsgBoxData>
// }

export interface BvModal {
  // Show OK MsgBox
  msgBoxOk: BvModalMsgBoxShortcutMethod

  // Show Confirm MsgBox
  msgBoxCofirm: BvModalMsgBoxShortcutMethod

  // Show general MsgBox (not yet documented)
  // msgBox: BvModalMsgBoxMethod

  // Show a modal by id
  show: (id: string) => void

  // Hide a modal by id
  hide: (id: string) => void
}

//
// Vue Prototype Injections
//
declare module 'vue/types/vue' {
  interface Vue {
    // Modal injection
    readonly $bvModal: BvModal
  }
}
