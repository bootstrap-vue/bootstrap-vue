//
// VBModal
//
import Vue, { DirectiveOptions } from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const VBModalPlugin: VBModalPlugin
export default VBModalPlugin
export interface VBModalPlugin extends BvPlugin {}

// directive: v-b-modal
export interface VBModal extends DirectiveOptions {}
