//
// Button Group
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const ButtonGroupPlugin: ButtonGroupPlugin
export default ButtonGroupPlugin
export interface ButtonGroupPlugin extends BvPlugin {}

// Component: b-button-group
export declare class BButtonGroup extends Vue {}
