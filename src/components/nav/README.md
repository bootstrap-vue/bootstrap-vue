# Navs

> Navigation available in Bootstrap share general markup and styles, from the base `<b-nav>` class
> to the `active` and `disabled` states. Swap modifier props to switch between each style.

```html
<div>
  <b-nav>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav.vue -->
```

## Overview

The base `<b-nav>` component is built with flexbox and provides a strong foundation for building all
types of navigation components. It includes some style overrides (for working with lists), some link
padding for larger hit areas, and basic disabled styling. No active states are included in the base
nav.

## Link appearance

Two style variations are supported: `tabs` and `pills`, which support `active` state styling. These
variants are mutually exclusive - use only one style or the other.

### Tab style

Make the nav look like tabs by setting the `tabs` prop.

```html
<div>
  <b-nav tabs>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-tabs.vue -->
```

### Pill style

Use the pill style by setting the `pills` prop.

```html
<div>
  <b-nav pills>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-pills.vue -->
```

### Small

Make the nav smaller by setting the `small` prop.

```html
<div>
  <b-nav small>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-small.vue -->
```

## Fill and justify

<span class="badge badge-info small">NEW in 2.0.0-rc19</span>

Force your `<b-nav>` content to extend the full available width.

### Fill

To proportionately fill all available space with your `<b-nav-item>` components, set the `fill`
prop. Notice that all horizontal space is occupied, but not every nav item has the same width.

```html
<div>
  <b-nav tabs fill>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Link with a long name </b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-fill.vue -->
```

### Justified

For equal-width elements, set the `justified` prop instead. All horizontal space will be occupied by
nav links, but unlike `fill` above, every `<b-nav-item>` will be the same width.

```html
<div>
  <b-nav tabs justified>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Link with a long name </b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-justified.vue -->
```

## Alignment

<span class="badge badge-info small">NEW in 2.0.0-rc19</span>

To align your `<b-nav-item>` components, use the `align` prop. Available values are `left`, `center`
and `right`.

```html
<div>
  <b-nav tabs align="center">
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Link with a long name </b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-alignment.vue -->
```

## Vertical variation

By default `<b-nav>` appear on a horizontal line. Stack your navigation by setting the `vertical`
prop.

```html
<div>
  <b-nav vertical class="w-25">
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-vertical.vue -->
```

## Dropdown support

Use `<b-nav-item-dropdown>` to place dropdown items within your nav.

```html
<div>
  <b-nav pills>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item-dropdown
      id="my-nav-dropdown"
      text="Dropdown"
      toggle-class="nav-link-custom"
      right
    >
      <b-dropdown-item>one</b-dropdown-item>
      <b-dropdown-item>two</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>three</b-dropdown-item>
    </b-nav-item-dropdown>
  </b-nav>
</div>

<!-- b-nav-dropdown.vue -->
```

Sometimes you want to add your own class names to the generated dropdown toggle button, that by
default have the classes `nav-link` and `dropdown-toggle`. Use the `toggle-class` prop to add them
(like above) which will produce something like:

```html
<li id="my-nav-dropdown" class="nav-item b-nav-dropdown dropdown">
  <a
    href="#"
    id="my-nav-dropdown__BV_button_"
    aria-haspopup="true"
    aria-expanded="false"
    class="nav-link dropdown-toggle nav-link-custom"
  ></a>
  ...
</li>
```

Refer to [`<b-dropdown>`](/docs/components/dropdown) for a list of supported sub-components.

### Optionally scoped default slot

<span class="badge badge-info small">NEW in 2.0.0-rc.20</span>

The dropdown default slot is optionally scoped with the following scope available:

| Property or Method | Description                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `hide()`           | Can be used to close the dropdown menu. Accepts an optional boolean argument, which if `true` returns focus to the toggle button |

## Using in navbar

Prop `is-nav-bar` has been deprecated and will be removed in a future release.

## Tabbed local content support

See the [`<b-tabs>`](/docs/components/tabs) component for creating tabbable panes of local content
(not suited for navigation).

## Accessibility

If you're using `<b-nav>` to provide a navigation bar, be sure to add a `role="navigation"` to the
most logical parent container of `<b-nav>`, or wrap a `<nav>` element around `<b-nav>`. Do **not**
add the role to the `<b-nav>` itself, as this would prevent it from being announced as an actual
list by assistive technologies.

When using a `<b-nav-item-dropdown>` in your `<b-nav>`, be sure to assign a unique `id` prop value
to the `<b-nav-dropdown>` so that the appropriate `aria-*` attributes can be automatically
generated.

## See also

- [`<b-tabs>`](/docs/components/tabs) to create tabbable panes of local content, even via dropdown
  menus.
- [`<b-navbar>`](/docs/components/navbar) a wrapper that positions branding, navigation, and other
  elements in a concise header.
- [`<b-dropdown>`](/docs/components/dropdown) for sub-components that you can place inside
  `<b-nav-item-dropdown>`
- [Router Link Support reference](/docs/reference/router-links) for information about router-link
  specific props available on `<b-nav-item>`

<!-- Component reference added automatically from component package.json -->
