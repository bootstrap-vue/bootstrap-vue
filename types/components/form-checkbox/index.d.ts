//
// Form Checkbox
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormCheckboxPlugin: FormCheckboxPlugin
export default FormCheckboxPlugin
export interface FormCheckboxPlugin extends BvPlugin {}

// Component: b-form-checkbox
export interface BFormCheckbox extends Vue {}

// Component: b-form-checkbox-group
export interface BFormCheckboxGroup extends Vue {}
