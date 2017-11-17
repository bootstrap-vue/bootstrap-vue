# Navbar

> The component `<b-navbar>` is a wrapper that positions branding, navigation, and
other elements into a concise header. It’s easily extensible and thanks to the
`<b-collapse>` component, it can easily integrate responsive behaviors.

**Example:**
```html
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">NavBar</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="#">Link</b-nav-item>
      <b-nav-item href="#" disabled>Disabled</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

<!-- navbar-1.vue -->
```

## Color schemes

`<b-navbar>` supports the standard Bootstrap V4 available background color variants.
Set the `variant` prop to one of the following values to change the background color:
`primary`, `success`, `info`, `warning`, `danger`, `dark`, or `light`.

Control the text color by setting `type` prop to `light` for use with light background
color variants, or `dark` for dark background color variants.

## Placement

Control the placement of the navbar by setting one of two props:

| prop | type | default | description
| ---- | ---- | ------- | -----------
| `fixed` | String | `null` | Set to `top` for fixed to the top of the viewport, or `bottom` for fixed to the `bottom` of the viewport. 
| `sticky` | Boolean | `false` | Set to `true` to make the navbar stick to the top of the viewport (or parent container that has `position: relative` set) when scrolled.

**Notes:**

- Fixed positioning uses CSS `position: fixed`. You may need to adjust your document top/bottom padding or margin.
- CSS `position: sticky` (used for `sticky`) is not fully supported in every browser. For browsers that do not support `position: sticky`, it will fallback natively to `position: relative`.


## Supported Content

Navbars come with built-in support for a handful of sub-components. Choose from the following as needed:

- `<b-navbar-brand>` for your company, product, or project name.
- `<b-navbar-nav>` for a full-height and lightweight navigation (including support for dropdowns).
- `<b-nav-item>` for link (and router-link) action items
- `<b-nav-item-dropdown>` for navbar dropdown menus
- `<b-nav-text>` for adding vertically centered strings of text.
- `<b-nav-form>` for any form controls and actions.
- `<b-navbar-toggle>` for use with the `<b-collapse is-nav>` component.
- `<b-collapse is-nav>` for grouping and hiding navbar contents by a parent breakpoint.

### `<b-navbar-brand>`

The `<b-navbar-brand>` generates a link if `href` is provided, or a `<router-link>` if `to`
is provided. If neither is given it renders as a `<div>` tag. You can override the
tag type by setting the `tag` prop to the element you would like rendered:

```html
<div>
  <!-- As a link -->
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">BootstrapVue</b-navbar-brand>
  </b-navbar>
</div>

<!-- navbar-brand-1.vue -->
```

```html
<div>
  <!-- As a heading -->
  <b-navbar variant="faded" type="light">
    <b-navbar-brand tag="h1" class="mb-0">BootstrapVue</b-navbar-brand>
  </b-navbar>
</div>

<!-- navbar-brand-2.vue -->
```

Adding images to the `<b-navbar-brand>` will likely always require custom styles or utilities
to properly size. Here are some examples to demonstrate:

```html
<div>
  <!-- Just an image -->
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">
      <img src="https://placekitten.com/g/30/30" alt="BV">
    </b-navbar-brand>
  </b-navbar>
</div>

<!-- navbar-brand-3.vue -->
```

```html
<div>
  <!-- Image and text -->
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">
      <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="BV">
      BootstrapVue
    </b-navbar-brand>
  </b-navbar>
</div>

<!-- navbar-brand-4.vue -->
```

### `<b-navbar-nav>`

Navbar navigation links build on the `<b-navbar-nav>` parent component and requires the
use of `<b-collapse is-nav>` and `<b-nav-toggle>` toggler for proper responsive styling.
Navigation in navbars will also grow to occupy as much horizontal space as possible to
keep your navbar contents securely aligned.

`<b-navbar-nav>` supports the following components:

- `<b-nav-item>` for link (and router-link) action items
- `<b-nav-text>` for adding vertically centered strings of text.
- `<b-nav-item-dropdown>` for navbar dropdown menus
- `<b-nav-form>` for adding simple forms to the navbar.

**Note:** _The use of `<b-nav is-nav-bar>` inside a `<b-navbar>` has been deprecated.
Use component `<b-navbar-nav>` instead._

### `<b-nav-item>`

`<b-nav-item>` is the primary link (and `<router-link>`) component. Providing
a `to` prop value will generate a `<router-link>` while providing an `href` prop
value will generate a standard link.

Set the `<b-nav-item>` `active` prop will highlight the item as being the active page,
Disable a `<b-nav-item>` by setting the prop `disabled` to true.

Handle click events by specifying a handler for the `@click` event on `<b-nav-item>`.

### `<b-nav-text>`

Navbars may contain bits of text with the help of `<b-nav-text>`. This component
adjusts vertical alignment and horizontal spacing for strings of text.

```html
<div>
    <b-navbar toggleable type="light" variant="light">
        <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
        <b-navbar-brand>BootstrapVue</b-navbar-brand>
        <b-collapse is-nav id="nav_text_collapse">
            <b-navbar-nav>
                <b-nav-text>Navbar text</b-nav-text>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>

<!-- navbar-text-1.vue -->
```

### `<b-nav-item-dropdown>`

For `<b-nav-item-dropdown>` usage, see the [`<b-dropdown>`](/docs/components/dropdown) docs.
Note split dropdowns are not supported in `<b-navbar>` and `<b-navbar-nav>`.

```html
<div>
  <b-navbar type="dark" variant="primary" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item href="#">Link</b-nav-item>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

<!-- navbar-dropdown-1.vue -->
```

### `<b-nav-form>`

Use `<b-nav-form>` to place inline form controls into your navbar

```html
<div>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input class="mr-sm-2" type="text" placeholder="Search"></b-form-input>
      <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
  </b-navbar>
</div>

<!-- navbar-form-1.vue -->
```

Input groups work as well:

```html
<div>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-input-group left="@">
        <b-form-input class="mr-sm-2" type="text" placeholder="Username"></b-form-input>
      </b-input-group>
    </b-nav-form>
  </b-navbar>
</div>

<!-- navbar-form-2.vue -->
```

### `<b-navbar-toggle>` and `<b-collapse is-nav>`
Navbars are responsive by default, but you can easily modify them to change that. Responsive
behavior depends on our `<b-collapse>` component.

Wrap `<b-navbar-nav>` components in a `<b-collapse is-nav>` (**remember to set the `is-nav`
prop!**) to specify content that will collapse based on a particular breakpoint. Assign a
document unique `id` value on the `<b-collapse>`.

Use the `<b-navbar-toggle>` component to control the collapse component, and set the
`target` prop of `<b-navbar-toggle>` to the `id` of `<b-collapse>`.

Set the `toggleable` prop on `<b-navbar>` to the desired breakpoint you would like content
to automatically collapse at. Possible `toggleable`values are `sm`, `md`, and `lg`. Setting
`toggleable` to `true` (or with no explicit value) will set the breakpoint to `sm`, while
setting it to `false` will disable collapsing.

`<b-navbar-toggle>` components are left-aligned by default, but should they follow a sibling
element like `<b-navbar-brand>`, they’ll automatically be aligned to the far right. Reversing
your markup will reverse the placement of the toggler.

See the first example on this page for reference, and also refer to
[`<b-collapse>`](/docs/components/collapse) for details on the collapse component.


## Component aliases

| Component | Alias(es)
| --------- | ---------
| `<b-navbar-toggle>` | `<b-nav-toggle>`

Also see [`<b-nav>`](/docs/components/nav) for additional sub-component aliases.


## Component Reference
