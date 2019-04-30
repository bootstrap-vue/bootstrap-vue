//
// Button Toolbar
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const ButtonToolbar: ButtonToolbar
export default ButtonToolbar
export interface ButtonToolbar extends BvPlugin {}

// Component: b-button-toolbar
export interface BButtonToolbar extends Vue {}
