import Vue, { PluginFunction, PluginObject } from 'vue'

import { BvEvent } from "./bv-event"
import { BModalComponent, BvModalEvent } from './components/modal'
import { BToastComponent, BToasterComponent } from './components/toast'

export { BvEvent, BvModalEvent }

// TypeScript cannot merge imported class with namespace, so declare subclasses instead

export class BModal extends BModalComponent {}
export class BToast extends BToastComponent {}
export class BToaster extends BToasterComponent {}
