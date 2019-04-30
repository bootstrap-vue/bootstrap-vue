//
// Layout
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Layout: Layout
export default Layout
export interface Layoutt extends BvPlugin {}

// Component: b-container
export interface BContainer extends Vue {}

// Component: b-row
export interface BRow extends Vue {}

// Component: b-container
export interface BCol extends Vue {}

// Component: b-form-row
export interface BFormRow extends Vue {}
