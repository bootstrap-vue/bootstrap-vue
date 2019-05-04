//
// InputGroup
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const InputGroupPlugin: InputGroupPlugin
export default InputGroupPlugin
export interface InputGroupPlugin extends BvPlugin {}

// Component: b-input-group-append
export interface BInputGroupAppend extends Vue {}

// Component: b-input-group-prepend
export interface BInputGroupPrepend extends Vue {}

// Component: b-input-group-text
export interface BInputGroupText extends Vue {}

// Component: b-input-group-addon
export interface BInputGroupAddon extends Vue {}
