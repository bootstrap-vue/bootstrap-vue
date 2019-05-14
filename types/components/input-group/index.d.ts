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
export declare class BInputGroupAppend extends Vue {}

// Component: b-input-group-prepend
export declare class BInputGroupPrepend extends Vue {}

// Component: b-input-group-text
export declare class BInputGroupText extends Vue {}

// Component: b-input-group-addon
export declare class BInputGroupAddon extends Vue {}
