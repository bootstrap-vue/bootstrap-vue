//
// Dropdown
//
import Vue from 'vue'
import { BvPlugin, BvComponent } from '../../'

// Plugin
export declare const DropdownPlugin: BvPlugin

// Component: b-dropdown
export declare class BDropdown extends BvComponent {
  // Public methods
  show: () => void
  hide: (refocus?: boolean) => void
}

// Component: b-dropdown-item
export declare class BDropdownItem extends BvComponent {}

// Component: b-dropdown-item-button
export declare class BDropdownItemButton extends BvComponent {}

// Component: b-dropdown-divider
export declare class BDropdownDivider extends BvComponent {}

// Component: b-dropdown-form
export declare class BDropdownForm extends BvComponent {}

// Component: b-dropdown-text
export declare class BDropdownText extends BvComponent {}

// Component: b-dropdown-group
export declare class BDropdownGroup extends BvComponent {}

// Component: b-dropdown-header
export declare class BDropdownHeader extends BvComponent {}
