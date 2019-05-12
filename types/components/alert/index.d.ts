//
// Alert
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const AlertPlugin: AlertPlugin
export default AlertPlugin
export interface AlertPlugin extends BvPlugin {}

// Component: b-alert
export interface BAlert extends Vue {}
