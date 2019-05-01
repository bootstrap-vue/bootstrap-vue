//
// VBScrollspy
//
import Vue, { DirectiveOptions } from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const VBScrollspyPlugin: VBScrollspyPlugin
export default VBScrollspyPlugin
export interface VBScrollspyPlugin extends BvPlugin {}

// directive: v-b-modal
export interface VBScrollspy extends DirectiveOptions {}
