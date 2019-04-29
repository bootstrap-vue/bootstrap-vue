//
// Pagination
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const Pagination: Pagination
export default Pagination
export interface Pagination extends BvPlugin {}

// Component: b-pagination
export interface BPagination extends Vue {}
