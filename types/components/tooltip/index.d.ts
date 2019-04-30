//
// Tooltip
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Tooltip: Tooltip
export default Tooltip
export interface Tooltip extends BvPlugin {}

// Component: b-tooltip
export interface BTooltip extends Vue {}
