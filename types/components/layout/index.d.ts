//
// Layout
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const LayoutPlugin: LayoutPlugin
export default LayoutPlugin
export interface LayoutPlugin extends BvPlugin {}

// Component: b-container
export declare class BContainer extends Vue {}

// Component: b-row
export declare class BRow extends Vue {}

// Component: b-container
export declare class BCol extends Vue {}

// Component: b-form-row
export declare class BFormRow extends Vue {}
