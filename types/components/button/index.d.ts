//
// Buttons
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Button: Button
export default Button
export interface Button extends BvPlugin {}

// Component: b-button
export interface BButton extends Vue {}

// Component: b-button-close
export interface BButtonClose extends Vue {}
