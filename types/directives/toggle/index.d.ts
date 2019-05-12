//
// VBToggle
//
import Vue, { DirectiveOptions } from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const VBTogglePlugin: VBTogglePlugin
export default VBTogglePlugin
export interface VBTogglePlugin extends BvPlugin {}

// directive: v-b-toggle
export interface VBToggle extends DirectiveOptions {}
