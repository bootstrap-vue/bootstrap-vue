//
// Dropdown
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const DropdownPlugin: DropdownPlugin
export default DropdownPlugin
export interface DropdownPlugin extends BvPlugin {}

// Component: b-dropdown
export interface BDropdown extends Vue {}

// Component: b-dropdown-item
export interface BDropdownItem extends Vue {}

// Component: b-dropdown-item-button
export interface BDropdownItemButton extends Vue {}

// Component: b-dropdown-divider
export interface BDropdownDivider extends Vue {}

// Component: b-dropdown-form
export interface BDropdownForm extends Vue {}

// Component: b-dropdown-text
export interface BDropdownText extends Vue {}

// Component: b-dropdown-group
export interface BDropdownGroup extends Vue {}

// Component: b-dropdown-header
export interface BDropdownHeader extends Vue {}
