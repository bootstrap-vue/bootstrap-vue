//
// Popover
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const PopoverPlugin: PopoverPlugin
export default PopoverPlugin
export interface PopoverPlugin extends BvPlugin {}

// Component: b-popover
export interface BPopover extends Vue {}
