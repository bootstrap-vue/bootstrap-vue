//
// Tabs
//
import Vue from 'vue'
import { BvPlugin, BvComponent } from '../../'

// Plugin
export declare const TabsPlugin: BvPlugin
export default TabsPlugin

// Component: b-tabs
export declare class BTabs extends BvComponent {}

// Component: b-tab
export declare class BTab extends BvComponent {
  activate: () => boolean
  deactivate: () => boolean
}
