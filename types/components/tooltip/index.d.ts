//
// Tooltip
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const TooltipPlugin: TooltipPlugin
export default TooltipPlugin
export interface TooltipPlugin extends BvPlugin {}

// Component: b-tooltip
export interface BTooltip extends Vue {}
