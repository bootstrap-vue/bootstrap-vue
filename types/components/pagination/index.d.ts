//
// Pagination
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const PaginationPlugin: PaginationPlugin
export default PaginationPlugin
export interface PaginationPlugin extends BvPlugin {}

// Component: b-pagination
export interface BPagination extends Vue {}
