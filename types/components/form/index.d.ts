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
export declare class BForm extends Vue {}

// Component: b-form-text
export declare class BFormText extends Vue {}

// Component: b-form-invalid-feedback
export declare class BFormInvalidFeedback extends Vue {}

// Component: b-form-valid-feedback
export declare class BFormValidFeedback extends Vue {}

// Component: b-form-datalist
export declare class BFormDatalist extends Vue {}
