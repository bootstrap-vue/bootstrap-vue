//
// Collapse
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const CollapsePlugin: CollapsePlugin
export default CollapsePlugin
export interface CollapsePlugin extends BvPlugin {}

// Component: b-collapse
export interface BCollapse extends Vue {}
