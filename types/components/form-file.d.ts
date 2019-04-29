//
// Form File
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const FormFile: FormFile
export default FormFile
export interface FormFile extends BvPlugin {}

// Component: b-form-file
export interface BFormFile extends Vue {
  reset: () => void
}
