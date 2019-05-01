//
// Form Input
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormInputPlugin: FormInputPlugin
export default FormInputPlugin
export interface FormInputPlugin extends BvPlugin {}

// Component: b-form-input
export interface BFormInput extends Vue {
  focus: () => void
}
