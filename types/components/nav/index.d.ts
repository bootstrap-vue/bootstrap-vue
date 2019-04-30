//
// Nav
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Nav: Alert
export default Nav
export interface Nav extends BvPlugin {}

// Component: b-nav
export interface BNav extends Vue {}

// Component: b-nav-form
export interface BNavForm extends Vue {}

// Component: b-nav-item
export interface BNavItem extends Vue {}

// Component: b-nav-item-dropdown
export interface BNavItemDropdown extends Vue {}

// Component: b-nav-text
export interface BNavText extends Vue {}
