//
// Breadcrumb
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const BreadcrumbPlugin: BreadcrumbPlugin
export default BreadcrumbPlugin
export interface BreadcrumbPlugin extends BvPlugin {}

// Component: b-breadcrumb
export interface BBreadcrumb extends Vue {}

// Component: b-breadcrumb-item
export interface BBreadcrumbItem extends Vue {}

// Component: b-breadcrumb-link
export interface BBreadcrumbLink extends Vue {}
