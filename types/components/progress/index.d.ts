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
export declare class BProgress extends Vue {}

// Component: b-progress-bar
export declare class BProgressBar extends Vue {}
