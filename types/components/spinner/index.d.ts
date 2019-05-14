//
// Spinner
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const SpinnerPlugin: SpinnerPlugin
export default SpinnerPlugin
export interface SpinnerPlugin extends BvPlugin {}

// Component: b-alert
export declare class BSpinner extends Vue {}
