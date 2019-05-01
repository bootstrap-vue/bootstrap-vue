//
// Form Select
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormSelectPlugin: FormSelectPlugin
export default FormSelectPlugin
export interface FormSelectPlugin extends BvPlugin {}

// Component: b-form-select
export interface BFormSelect extends Vue {}
