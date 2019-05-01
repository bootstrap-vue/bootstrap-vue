//
// VBScrollspy
//
import Vue, { DirectiveOptions } from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const VBScrollspyPlugin: VBScrollspyPlugin
export default VBScrollspyPlugin
export interface VBScrollspyPlugin extends BvPlugin {}

// directive: v-b-scrollspy
export interface VBScrollspy extends DirectiveOptions {}
