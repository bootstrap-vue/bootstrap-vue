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
      <b-dropdown-item>One</b-dropdown-item>
      <b-dropdown-item>Two</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Three</b-dropdown-item>
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

The dropdown default slot is optionally scoped with the following scope available:

| Property or Method | Description                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `hide()`           | Can be used to close the dropdown menu. Accepts an optional boolean argument, which if `true` returns focus to the toggle button |

### Lazy dropdown

By default, `<b-nav-item-dropdown>` renders the menu contents in the DOM even when the menu is not
shown. When there are a large number of dropdowns rendered on the same page, performance could be
impacted due to larger overall memory utilization. You can instruct `<b-nav-item-dropdown>` to
render the menu contents only when it is shown by setting the `lazy` prop to true.

## Tabbed local content support

See the [`<b-tabs>`](/docs/components/tabs) component for creating tabbable panes of local content
(not suited for navigation).

## Card integration

Use a `<b-nav>` in a [`<b-card>`](/docs/components/card) header, by enabling the `card-header` prop
on `<b-nav>` and setting either the `pills` or `tabs` props:

**Tabs style:**

```html
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Inactive</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <b-button variant="primary">Go somewhere</b-button>
    </b-card-body>
  </b-card>
</div>

<!-- nav-card-tabs.vue -->
```

**Pill style:**

```html
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header pills>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Inactive</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <b-button variant="primary">Go somewhere</b-button>
    </b-card-body>
  </b-card>
</div>

<!-- nav-card-pills.vue -->
```

**Plain style:**

The `card-header` prop is only needed when you are applying `tabs` or `pills` style. Note that
Bootstrap v4 SCSS does not have special styling for `active` state plain style nav items.

```html
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Inactive</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <b-button variant="primary">Go somewhere</b-button>
    </b-card-body>
  </b-card>
</div>

<!-- nav-card-plain.vue -->
```

The `card-header` prop has no styling effect if the `<b-nav>` is in `vertical` mode.

### Using with Vue Router

Have your card `<b-nav>` control vue router nested routes via `<router-view>` or `<nuxt-child>`
components, to created tabbed content that changes with route URL:

```html
// On page with route `/some/route`
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
        <b-nav-item to="/some/route/" exact exact-active-class="active">Active</b-nav-item>
        <b-nav-item to="/some/route/foo" exact exact-active-class="active">Foo</b-nav-item>
        <b-nav-item to="/some/route/bar" exact exact-active-class="active">Bar</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body>
      <!-- Child route gets rendered in <router-view> or <nuxt-child> -->
      <router-view></router-view>
      <!-- Or if using Nuxt.js
      <nuxt-child></nuxt-child>
      -->
    </b-card-body>
  </b-card>
</div>
```

Note: Vue Router does not support defining active routes with hashes (`#`), which is why you must
define the "tab" content as child routes.

**Example router config for above:**

<!-- eslint-disable no-unused-vars, no-undef -->

```js
const routes = [
  {
    path: '/some/route',
    // We don't provide a name on this parent route, but rather
    // set the name on the default child route instead
    // name: 'some-route',
    component: SomeRouteComponent,
    // Child route "tabs"
    children: [
      // Note we provide the above parent route name on the default child tab
      // route to ensure this tab is rendered by default when using named routes
      { path: '', component: DefaultTabComponent, name: 'some-route' },
      { path: 'foo', component: FooTabComponent },
      { path: 'bar', component: BarTabComponent }
    ]
  }
]
```

One can also use Vue Router
[named routes](https://router.vuejs.org/guide/essentials/named-routes.html#named-routes) and/or
route params instead of path based routes.

For more details see:

- [Vue Router `<router-view>`](https://router.vuejs.org/api/#router-view)
- [Nuxt.JS `<nuxt-child>`](https://nuxtjs.org/api/components-nuxt-child)

## Accessibility

If you're using `<b-nav>` to provide a navigation bar, be sure to add a `role="navigation"` to the
most logical parent container of `<b-nav>`, or wrap a `<nav>` element around `<b-nav>`. Do **not**
add the role to the `<b-nav>` itself, as this would prevent it from being announced as an actual
list by assistive technologies.

When using a `<b-nav-item-dropdown>` in your `<b-nav>`, be sure to assign a unique `id` prop value
to the `<b-nav-dropdown>` so that the appropriate `aria-*` attributes can be automatically
generated.

### Tabbed interface accessibility

Note that navigation bars, even if visually styled as tabs, should **not** be given
`role="tablist"`, `role="tab"` or `role="tabpanel"` attributes. These are only appropriate for
[tabbed interfaces](/docs/components/tabs) that do not change the URL or `$route`, as described in
the [WAI ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel). See
[`<b-tabs>`](/docs/components/tabs) for dynamic tabbed interfaces that are compliant with WAI ARIA.

Tabbed interfaces should avoid using dropdown menus, as this causes both usability and accessibility
issues:

- From a usability perspective, the fact that the currently displayed tab’s trigger element is not
  immediately visible (as it’s inside the closed dropdown menu) can cause confusion.
- From an accessibility point of view, there is currently no sensible way to map this sort of
  construct to a standard WAI ARIA pattern, meaning that it cannot be easily made understandable to
  users of assistive technologies.

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
