//
// Progress
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const ProgressPlugin: ProgressPlugin
export default ProgressPlugin
export interface ProgressPlugin extends BvPlugin {}

// Component: b-progress
export interface BProgress extends Vue {}

// Component: b-progress-bar
export interface BProgressBar extends Vue {}
