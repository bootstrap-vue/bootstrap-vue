//
// Form Group
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormGroupPlugin: FormGroupPlugin
export default FormGroupPlugin
export interface FormGroupPlugin extends BvPlugin {}

// Component: b-form-group
export interface BFormGroup extends Vue {}
