//
// Form Checkbox
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const FormCheckbox: FormCheckbox
export default FormCheckbox
export interface FormCheckbox extends BvPlugin {}

// Component: b-form-checkbox
export interface BFormCheckbox extends Vue {}

// Component: b-form-checkbox-group
export interface BFormCheckboxGroup extends Vue {}
