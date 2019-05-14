//
// Buttons
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const ButtonPlugin: ButtonPlugin
export default ButtonPlugin
export interface ButtonPlugin extends BvPlugin {}

// Component: b-button
export declare class BButton extends Vue {}

// Component: b-button-close
export declare class BButtonClose extends Vue {}
