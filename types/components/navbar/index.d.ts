//
// Navbar
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const NavbarPlugin: NavbarPlugin
export default NavbarPlugin
export interface NavbarPlugin extends BvPlugin {}

// Component: b-navbar
export declare class BNavbar extends Vue {}

// Component: b-navbar-brand
export declare class BNavbarBrand extends Vue {}

// Component: b-navbar-nav
export declare class BNavbarNav extends Vue {}

// Component: b-navbar-toggle
export declare class BNavbarToggle extends Vue {}
