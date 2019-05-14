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
export declare class BFormCheckbox extends Vue {}

// Component: b-form-checkbox-group
export declare class BFormCheckboxGroup extends Vue {}
