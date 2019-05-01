//
// PaginationNav
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const PaginationNavPlugin: PaginationNavPlugin
export default PaginationNavPlugin
export interface PaginationNavPlugin extends BvPlugin {}

// Component: b-pagination-nav
export interface BPaginationNav extends Vue {}
