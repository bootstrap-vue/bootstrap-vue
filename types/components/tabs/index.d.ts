//
// Tabs
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Tabs: Tabs
export default Tabs
export interface Tabs extends BvPlugin {}

// Component: b-tabs
export interface BTabs extends Vue {}

// Component: b-tab
export interface BTab extends Vue {}
