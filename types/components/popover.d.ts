//
// Popover
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const Popover: Popover
export default Popover
export interface Popover extends BvPlugin {}

// Component: b-popover
export interface BPopover extends Vue {}
