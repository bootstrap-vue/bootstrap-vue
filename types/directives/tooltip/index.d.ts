//
// VBTooltip
//
import Vue, { DirectiveOptions } from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const VBTooltipPlugin: VBTooltipPlugin
export default VBTooltipPlugin
export interface VBTooltipPlugin extends BvPlugin {}

// directive: v-b-tooltip
export interface VBTooltip extends DirectiveOptions {}
