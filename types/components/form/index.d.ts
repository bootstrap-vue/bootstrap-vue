//
// Form
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Form: Form
export default Form
export interface Form extends BvPlugin {}

// Component: b-form
export interface BForm extends Vue {}

// Component: b-form-text
export interface BFormText extends Vue {}

// Component: b-form-invalid-feedback
export interface BFormInvalidFeedback extends Vue {}

// Component: b-form-valid-feedback
export interface BFormValidFeedback extends Vue {}

// Component: b-form-datalist
export interface BFormDatalist extends Vue {}
