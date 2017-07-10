# Navs

> Navigation available in Bootstrap share general markup and styles,
  from the base `b-nav` class to the active and disabled states.
  Swap modifier props to switch between each style.

```html
<div>
  <b-nav>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>

  <br>
  <br>

  <b-nav tabs>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>

  <br>
  <br>

  <b-nav pills>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- nav.vue -->
```

### Link Appearance
The base `b-nav` component is built with flexbox and provides a strong
foundation for building all types of navigation components. It includes
some style overrides (for working with lists), some link padding for larger
hit areas, and basic disabled styling. No active states are included in the base nav.

Two style variations are dupported: `tabs` and `pills`, which support active state styling.
These variants are mutually exclusive - use only one style or the other.

#### Tabs:
Make the nav look like tabs by setting the prop `tabs`.

```html
<b-nav tabs>
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item>Another Link</b-nav-item>
  <b-nav-item disabled>Disabled</b-nav-item>
</b-nav>
```

#### Pills:
Use the pill style by setting the prop `pills`.

```html
<b-nav pills>
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item>Another Link</b-nav-item>
  <b-nav-item disabled>Disabled</b-nav-item>
</b-nav>
```

### Fill and justify
Force your `b-nav` content to extend the full available width.

#### fill:
To proportionately fill all available space with your `b-nav-item`s, set
the `fill` prop. Notice that all horizontal space is occupied, but not
every nav item has the same width.

#### Justified:
For equal-width elements, set prop `justified` instead. All horizontal space
will be occupied by nav links, but unlike `fill` above, every nav item will be
the same width.

### Vertical variation
By default navs appear on a horizontal line. Stack your navigation by setting
the `vertical` prop.

### Dropdown support
Use the `b-nav-item-dropdown` to place dropdown items within your nav.

```html
<b-nav pills>
  <b-nav-item active>Active</b-nav-item>
  <b-nav-item>Link</b-nav-item>
  <b-nav-item-dropdown text="Dropdown 1,2,3" right-alignment>
    <b-dropdown-item>one</b-dropdown-item>
    <b-dropdown-item>two</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item>three</b-dropdown-item>
  </b-nav-item-dropdown>
</b-nav>
```

### Using in Navbar
When using `b-nav` within a `b-navbar`, set the `navbar-nav` prop.

### Tabbed content
See the [`b-tabs`](./tabs) component.

### Regarding accessibility
If you’re using `b-nav` to provide a navigation bar, be sure to add a
`role="navigation"` to the most logical parent container of `b-nav`, or wrap
a `<nav>` element around `b-nav`. Do not add the role to the `b-nav` itself,
as this would prevent it from being announced as an actual list by assistive technologies.

### See Also
- [`b-tabs`](./tabs) to create tabbable panes of local content, even via dropdown menus.
- [`b-navbar`](./navbar) a wrapper that positions branding, navigation, and other elements in a concise header.
- [`b-dropdown`](./dropdown) for components that you can place inside `b-nav-item-dropdown`
