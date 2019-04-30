//
// Form Radio
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormRadio: FormRadio
export default FormRadio
export interface FormRadio extends BvPlugin {}

// Component: b-form-radio
export interface BFormRadio extends Vue {}

// Component: b-form-radio-group
export interface BFormRadioGroup extends Vue {}
