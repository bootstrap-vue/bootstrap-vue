//
// Form Textarea
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormTextareaPlugin: FormTextareaPlugin
export default FormTextareaPlugin
export interface FormTextareaPlugin extends BvPlugin {}

// Component: b-form-textarea
export interface BFormTextarea extends Vue {
  focus: () => void
}
