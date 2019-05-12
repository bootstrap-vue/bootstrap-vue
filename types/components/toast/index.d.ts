//
// Toast
//
import Vue, { VNode } from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Toast Plugin
declare const ToastPlugin: ToastPlugin
export default ToastPlugin
export interface ToastPlugin extends BvPlugin {}

// Component: b-toast
export interface BToast extends Vue {
  show: () => void
  hide: () => void
}

// Component: b-toaster
export interface BToaster extends Vue {}

//
// Interfaces
//
export interface BvToastOptions {
  // Commonly used props
  toaster?: string
  title?: string | VNode | Array<VNode>
  variant?: string
  solid?: boolean
  noAutoHide?: boolean
  noHoverPause?: boolean
  autoHideDelay?: number
  appendToast?: boolean
  isStatus?: boolean
  noFade?: boolean
  toastClass?: string | string[] | Array<any> | object | any
  headerClass?: string | string[] | Array<any> | object | any
  bodyClass?: string | string[] | Array<any> | object | any
  href?: string
  to?: string | object | any
  // Catch all
  [key: string]: any
}

export interface BvToastShortcutMethod {
  (message: string | VNode | Array<VNode>, options?: BvToastOptions): void
  // Future
  //(message: string | VNode | Array<VNode>, title: string | VNode | Array<VNode>, options?: BvToastOptions): void
}

export interface BvToast {
  // Show a toast
  toast: BvToastShortcutMethod

  // Show a toast by id
  show: (id: string) => void

  // Hide a toast by id (or hide all tosts)
  hide: (id?: string) => void
}

//
// Vue Prototype Injections
//
declare module 'vue/types/vue' {
  interface Vue {
    // Toast injection
    readonly $bvToast: BvToast
  }
}
