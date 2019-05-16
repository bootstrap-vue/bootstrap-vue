//
// Toast
//
import Vue, { VNode } from 'vue'
import { BvPlugin, BvComponent } from '../../'

// Toast Plugin
export declare const ToastPlugin: BvPlugin
export default ToastPlugin

// Component: b-toast
export declare class BToast extends BvComponent {
  show: () => void
  hide: () => void
}

// Component: b-toaster
export declare class BToaster extends BvComponent {}

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
  // (options?: BvToastOptions): void
  // (message: string | VNode | Array<VNode>, title: string | VNode | Array<VNode>, options?: BvToastOptions): void
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
