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
export declare class BBreadcrumb extends Vue {}

// Component: b-breadcrumb-item
export declare class BBreadcrumbItem extends Vue {}

// Component: b-breadcrumb-link
export declare class BBreadcrumbLink extends Vue {}
