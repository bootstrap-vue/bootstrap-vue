# Navs

> Navigation available in Bootstrap share general markup and styles,
from the base `<b-nav>` class to the `active` and `disabled` states.
Swap modifier props to switch between each style.

```html
<div>
  <b-nav>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- nav-default.vue -->
```

## Overview

The base `<b-nav>` component is built with flexbox and provides a strong
foundation for building all types of navigation components. It includes
some style overrides (for working with lists), some link padding for larger
hit areas, and basic disabled styling. No active states are included in the base nav.

## Link Appearance

Two style variations are supported: `tabs` and `pills`, which support `active` state styling.
These variants are mutually exclusive - use only one style or the other.

### Tab style

Make the nav look like tabs by setting the prop `tabs`.

```html
<b-nav tabs>
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item>Another Link</b-nav-item>
  <b-nav-item disabled>Disabled</b-nav-item>
</b-nav>

<!-- nav-tabs.vue -->
```

### Pill style

Use the pill style by setting the prop `pills`.

```html
<b-nav pills>
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item>Another Link</b-nav-item>
  <b-nav-item disabled>Disabled</b-nav-item>
</b-nav>

<!-- nav-pills.vue -->
```

## Fill and justify

Force your `b-nav` content to extend the full available width.

### Fill

To proportionately fill all available space with your `<b-nav-item>` components,
set the `fill` prop. Notice that all horizontal space is occupied, but not
every nav item has the same width.

```html
<b-nav fill tabs>
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item>Link with a long name </b-nav-item>
  <b-nav-item disabled>Disabled</b-nav-item>
</b-nav>

<!-- nav-fill.vue -->
```

### Justified

For equal-width elements, set prop `justified` instead. All horizontal space
will be occupied by nav links, but unlike `fill` above, every `<b-nav-item>`
will be the same width.

```html
<b-nav justified tabs>
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item>Link with a long name </b-nav-item>
  <b-nav-item disabled>Disabled</b-nav-item>
</b-nav>

<!-- nav-justified.vue -->
```

## Vertical variation

By default `<b-nav>` appear on a horizontal line. Stack your navigation by setting
the `vertical` prop.

```html
<b-nav vertical class="w-25">
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item>Another Link</b-nav-item>
  <b-nav-item disabled>Disabled</b-nav-item>
</b-nav>

<!-- nav-vertical.vue -->
```

## Dropdown support

Use `<b-nav-item-dropdown>` to place dropdown items within your nav.

```html
<b-nav pills>
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item-dropdown id="nav7_ddown" text="Dropdown" right>
    <b-dropdown-item>one</b-dropdown-item>
    <b-dropdown-item>two</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item>three</b-dropdown-item>
  </b-nav-item-dropdown>
</b-nav>

<!-- nav-dropdown.vue -->
```

Refer to [`<b-dropdown>`](../dropdown) for a list of supported sub-components.

### `<b-nav-item-dropdown>` Component Alias

`<b-nav-item-dropdown>` can be used via it's shorter aliases of `<b-nav-item-dd>` and `<b-nav-dd>`.


## Using in Navbar

Using `<b-nav>` within a `<b-navbar>` has been deprecated as of Bootstrap-Vue v1.0.0-beta.10.
Please use the [`<b-navbar-nav>`](/docs/components/navbar) component instead.

Prop `is-nav-bar` has been deprecated and will be removed in a future release.

## Tabbed local content support

See the [`<b-tabs>`](./tabs) component for creating tabbable panes of local
content (not suited for navigation).

## Accessibility
If you’re using `<b-nav>` to provide a navigation bar, be sure to add a
`role="navigation"` to the most logical parent container of `<b-nav>`, or wrap
a `<nav>` element around `<b-nav>`. Do **not** add the role to the `<b-nav>` itself,
as this would prevent it from being announced as an actual list by assistive technologies.

When using a `<b-nav-item-dropdown>` in your `<b-nav>`, be sure to assign a unique `id`
prop value to the `<b-nav-dropdown>` so that the appropriate `aria-*` attributes can
be automatically generated.

## See Also

- [`<b-tabs>`](/docs/components/tabs) to create tabbable panes of local content, even via dropdown menus.
- [`<b-navbar>`](/docs/components/navbar) a wrapper that positions branding, navigation, and other elements in a concise header.
- [`<b-dropdown>`](/docs/components/dropdown) for sub-components that you can place inside `<b-nav-item-dropdown>`
- [Router Link Support reference](/docs/reference/router-links) for information about router-link specific props available on `<b-nav-item>`

## Component Reference
