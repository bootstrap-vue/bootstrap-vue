//
// VBPopover
//
import Vue, { DirectiveOptions } from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const VBPopoverPlugin: VBPopoverPlugin
export default VBPopoverPlugin
export interface VBPopoverPlugin extends BvPlugin {}

// directive: v-b-popover
export interface VBPopover extends DirectiveOptions {}
