//
// Tabs
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const TabsPlugin: TabsPlugin
export default TabsPlugin
export interface TabsPlugin extends BvPlugin {}

// Component: b-tabs
export interface BTabs extends Vue {}

// Component: b-tab
export interface BTab extends Vue {}
