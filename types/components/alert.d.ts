//
// Alert
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const Alert: Alert
export default Alert
export interface Alert extends BvPlugin {}

// Component: b-alert
export interface BAlert extends Vue {}
