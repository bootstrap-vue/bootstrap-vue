//
// Button Toolbar
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const ButtonToolbarPlugin: ButtonToolbarPlugin
export default ButtonToolbarPlugin
export interface ButtonToolbarPlugin extends BvPlugin {}

// Component: b-button-toolbar
export interface BButtonToolbar extends Vue {}
