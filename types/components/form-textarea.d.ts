//
// Form Textarea
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const FormTextarea: FormTextarea
export default FormTextarea
export interface FormTextarea extends BvPlugin {}

// Component: b-form-textarea
export interface BFormTextarea extends Vue {
  focus: () => void
}
