# Navbar

>  The navbar is a wrapper that positions branding, navigation, and other elements into a concise header.
  It’s easily extensible and thanks to our Collapse plugin, it can easily integrate responsive behaviors.

```html
<b-navbar toggleable type="light" variant="info" toggle-breakpoint="md">

  <b-nav-toggle target="nav_collapse"></b-nav-toggle>

  <b-navbar-brand href="#">NavBar</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-nav is-nav-bar>
      <b-nav-item href="#">Link</b-nav-item>
      <b-nav-item href="#" disabled>Disabled</b-nav-item>
    </b-nav>

    <!-- Right alignd nav items -->
    <b-nav is-nav-bar class="ml-auto">

      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item to="#">EN</b-dropdown-item>
        <b-dropdown-item to="#">ES</b-dropdown-item>
        <b-dropdown-item to="#">RU</b-dropdown-item>
        <b-dropdown-item to="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item to="#">Profile</b-dropdown-item>
        <b-dropdown-item to="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>

  </b-collapse>
</b-navbar>

<!-- navbar-1.vue -->
```

### Color schemes
`<b-navbar>` supports the standard Bootstrap V4 available background color variants.
Set the `variant` prop to one of the following values to change the background color: 
`primary`, `success`, `info`, `warning`, `danger`, `inverse`, or `faded`.

Control the text type by setting `type` prop to `light` for use with light background
color variants, or `inverse` for dark background color variants.


### Placement
Control the placement of the navbar by setting one of two props:

| prop | type | default | description
| ---- | ---- | ------- | -----------
| `fixed` | String | `null` | Set to `top` for fixed to the top of the viewport, or `bottom` for fixed to the `bottom` of the viewport
| `sticky` | Boolean | `false` | Set to `true` to make the navbar stickied to the top when scrolled. _Note that `position: sticky`, used for `sticky`, isn’t fully supported in every browser._


### Supported Content
Navbars come with built-in support for a handful of sub-components. Choose from the following as needed:
- `<b-navbar-brand>` for your company, product, or project name.
- `<b-nav is-nav-bar>` for a full-height and lightweight navigation (including support for dropdowns).
- `<b-nav-item>` for link (and router-link) action items
- `<b-nav-item-dropdown>` for navbar dropdown menus
- `<b-nav-text>` for adding vertically centered strings of text.
- `<b-navbar-form>` for any form controls and actions.
- `<b-navbar-toggler>` for use with the `<b-collapse>` component.
- `<b-collapse is-nav>` for grouping and hiding navbar contents by a parent breakpoint.

#### `<b-navbar-brand>`
The `<b-navbar-brand>` generates a link if `href` is provided, or a `<router-link>` if `to`
is provided.  If neither is given it renders as a `<div>` tag.  You can override the 
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
to properly size.  Here are some examples to demonstrate:

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

#### `<b-nav is-nav-bar>`
Navbar navigation links build on our `<b-nav>` parent component with their own modifier
class and require the use of `<b-collapse>` toggler for proper responsive styling.
Navigation in navbars will also grow to occupy as much horizontal space as possible to
keep your navbar contents securely aligned.

Be sure to set the prop `is-nav-bar` on `<b-nav>` for proper alignment!

`<b-nav>` in navbar context supports the folowing components:
- `<b-nav-item>` for link (and router-link) action items
- `<b-nav-text>` for adding vertically centered strings of text.
- `<b-nav-item-dropdown>` for navbar dropdown menus

#### `<b-nav-item>`
`<b-nav-item>` is the primary link (and `<router-link>`) component. Providing
a `to` prop value will generate a `<router-link>` while provinding an `href` prop
value will generate a standard link.

Set the `<b-nav-item>` `active` prop will highlight the item as being the active page,
Disable a `<b-nav-item>` by setting the prop `disabled` to true.

Handle click events by specifying a handler for the `@click` event on `<b-nav-item>`.


#### `<b-nav-text>`
Navbars may contain bits of text with the help of `<b-nav-text>`. This component
adjusts vertical alignment and horizontal spacing for strings of text.

```html
<div>
  <b-navbar toggleable type="light" variant="faded">
    <b-nav-toggle target="nav_text_collapse"></b-nav-toggle>
    <b-navbar-brand>BootstrapVue</b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-nav is-nav-bar>
        <b-nav-text>Navbar text</b-nav-text>
      </b-nav>
    </b-navbar>
</div>

<!-- navbar-text-1.vue -->
```

#### `<b-nav-item-dropdown>`
For `<b-nav-item-dropdown>` usage, see the [`<b-dropdown>`](./dropdown) docs.
Note split dropdowns are not supported in `<b-navbar>`.

```html
<div>
  <b-navbar type="inverse" variant="primary" toggleable>
    <b-nav-toggle target="nav_dropdown_collapse"></b-nav-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-nav is-nav-bar>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item href="#">Link</b-nav-item>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item to="#">EN</b-dropdown-item>
          <b-dropdown-item to="#">ES</b-dropdown-item>
          <b-dropdown-item to="#">RU</b-dropdown-item>
          <b-dropdown-item to="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item to="#">Account</b-dropdown-item>
          <b-dropdown-item to="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </b-collapse>
  </b-navbar>
</div>

<!-- navbar-dropdownr-1.vue -->
```

#### `<b-nav-form>`
Use `<b-nav-form>` to place inline form controls into your navbar

```html
<div>
  <b-navbar type="light" variant="faded">
    <b-nav-form>
      <b-form-input class="mr-sm-2" type="text" placeholder="Search">
      <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
  </b-navbar>
</div>

<!-- navbar-form-1.vue -->
```

Input groups work as well:

```html
<div>
  <b-navbar type="light" variant="faded">
    <b-nav-form>
      <b-input-group left="@">
        <b-form-input class="mr-sm-2" type="text" placeholder="Username">
      </b-input-group>
    </b-nav-form>
  </b-navbar>
</div>

<!-- navbar-form-2.vue -->
```

### Responsive collapsing content
Navbars are responsive by default, but you can easily modify them to change that. Responsive
behavior depends on our `<b-collapse>` component.

Wrap `<b-nav is-nav-bar>` components in a `<b-collapse is-nav>` (remember to set the `is-nav` prop!)
to specify content that will collapse based on a particular breakpoint.

Use `<b-nav-toggle>` to control the collapse component and set the `toggle-breakpoint` prop to
the breakpoint you would like content to automatically collapse. Possible values are `sm` (default),
`md`, and `lg`.

See the first example on this page for reference, and also refer to [`<b-collapse>`](./collapse) for
details on the collapse component.
