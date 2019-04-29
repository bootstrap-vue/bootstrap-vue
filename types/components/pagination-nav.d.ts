//
// PaginationNav
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const PaginationNav: PaginationNav
export default PaginationNav
export interface PaginationNav extends BvPlugin {}

// Component: b-pagination-nav
export interface BPaginationNav extends Vue {}
