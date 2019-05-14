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
export declare class BDropdown extends Vue {}

// Component: b-dropdown-item
export declare class BDropdownItem extends Vue {}

// Component: b-dropdown-item-button
export declare class BDropdownItemButton extends Vue {}

// Component: b-dropdown-divider
export declare class BDropdownDivider extends Vue {}

// Component: b-dropdown-form
export declare class BDropdownForm extends Vue {}

// Component: b-dropdown-text
export declare class BDropdownText extends Vue {}

// Component: b-dropdown-group
export declare class BDropdownGroup extends Vue {}

// Component: b-dropdown-header
export declare class BDropdownHeader extends Vue {}
