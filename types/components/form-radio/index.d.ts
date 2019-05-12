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
export interface BFormRadio extends Vue {}

// Component: b-form-radio-group
export interface BFormRadioGroup extends Vue {}
