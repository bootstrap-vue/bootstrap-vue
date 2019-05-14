//
// Form Radio
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormRadioPlugin: FormRadioPlugin
export default FormRadioPlugin
export interface FormRadioPlugin extends BvPlugin {}

// Component: b-form-radio
export declare class BFormRadio extends Vue {}

// Component: b-form-radio-group
export declare class BFormRadioGroup extends Vue {}
