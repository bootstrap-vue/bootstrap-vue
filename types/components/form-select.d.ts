//
// Form Select
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const FormSelect: FormSelect
export default FormSelect
export interface FormSelect extends BvPlugin {}

// Component: b-form-select
export interface BFormSelect extends Vue {}
