//
// Nav
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const NavPlugin: NavPlugin
export default NavPlugin
export interface NavPlugin extends BvPlugin {}

// Component: b-nav
export declare class BNav extends Vue {}

// Component: b-nav-form
export declare class BNavForm extends Vue {}

// Component: b-nav-item
export declare class BNavItem extends Vue {}

// Component: b-nav-item-dropdown
export declare class BNavItemDropdown extends Vue {}

// Component: b-nav-text
export declare class BNavText extends Vue {}
