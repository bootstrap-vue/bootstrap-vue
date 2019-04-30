//
// Form Input
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormInput: FormInput
export default FormInput
export interface FormInput extends BvPlugin {}

// Component: b-form-input
export interface BFormInput extends Vue {
  focus: () => void
}
