import Vue from 'vue'

import { ModalComponent } from './modal'
import { ToastComponent } from './toast'
import { ToasterComponent } from './toaster'

eport interface ComponentOptions {
  [key: string]?: any
}

export interface InstallOptions {
  breakpoints?: string[]
  [key: string]?: ComponentOptions
}

export function install (vue: typeof Vue, options: InstalOptions): void

export class BModal extends ModalComponent {}
export class BToast extends ToastComponent {}
export class BToaster extends ToasterComponent {}
