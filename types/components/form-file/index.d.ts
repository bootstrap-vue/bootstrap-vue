//
// Form File
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const FormFilePlugin: FormFilePlugin
export default FormFilePlugin
export interface FormFilePlugin extends BvPlugin {}

// Component: b-form-file
export interface BFormFile extends Vue {
  focus: () => void
  reset: () => void
}
