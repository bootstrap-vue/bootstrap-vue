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
export interface BNavbar extends Vue {}

// Component: b-navbar-brand
export interface BNavbarBrand extends Vue {}

// Component: b-navbar-nav
export interface BNavbarNav extends Vue {}

// Component: b-navbar-toggle
export interface BNavbarToggle extends Vue {}
