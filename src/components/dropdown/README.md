# Dropdowns

> Dropdowns are toggleable, contextual overlays for displaying lists of links and actions in a
> dropdown menu format.

`<b-dropdown>` (or known by its shorter alias of `<b-dd>`) components are toggleable, contextual
overlays for displaying lists of links and more. They're toggled by clicking (or pressing space or
enter when focused), not by hovering; this is an
[intentional design decision](http://markdotto.com/2012/02/27/bootstrap-explained-dropdowns/).

```html
<div>
  <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
    <b-dropdown-item>First Action</b-dropdown-item>
    <b-dropdown-item>Second Action</b-dropdown-item>
    <b-dropdown-item>Third Action</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item active>Active action</b-dropdown-item>
    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown.vue -->
```

## Button content

You can customize the text of the dropdown button by using either the `text` prop (shown in previous
examples), or use the `button-content` slot instead of the `text` prop. The `button-content` slot
allows you to use basic HTML and icons in the button content.

If both the prop `text` and slot `button-content` are present, the slot `button-content` will take
precedence.

```html
<div>
  <b-dropdown text="Button text via Prop">
    <b-dropdown-item href="#">An item</b-dropdown-item>
    <b-dropdown-item href="#">Another item</b-dropdown-item>
  </b-dropdown>

  <b-dropdown>
    <template slot="button-content">
      Custom <strong>Content</strong> with <em>HTML</em> via Slot
    </template>
    <b-dropdown-item href="#">An item</b-dropdown-item>
    <b-dropdown-item href="#">Another item</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-button-content.vue -->
```

## Positioning

Dropdown supports various positioning such as left and right aligned, dropdown and dropup, and
supports auto-flipping (dropdown to dropup, and vice-versa) when the menu would overflow off of the
visible screen area.

### Menu alignment

The dropdown menu can either be left aligned (default) or right aligned with respect to the button
above it. To have the dropdown aligned on the right, set the `right` prop.

```html
<div>
  <b-dropdown id="dropdown-left" text="Left align" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown id="dropdown-right" right text="Right align" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-right.vue -->
```

### Dropup

Turn your dropdown menu into a drop-up menu by setting the `dropup` prop.

```html
<div>
  <b-dropdown id="dropdown-dropup" dropup text="Drop-Up" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-dropup.vue -->
```

### Drop right or left

Turn your dropdown menu into a drop-right menu by setting the `dropright` prop. Or, turn it into a
drop-left menu by setting the `dropleft` right prop to true.

`dropright` takes precedence over `dropleft`. Neither `dropright` or `dropleft` have any effect if
`dropup` is set.

```html
<div>
  <b-dropdown id="dropdown-dropright" dropright text="Drop-Right" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-dropright-dropleft.vue -->
```

### Auto "flipping"

By default, dropdowns may flip to the top, or to the bottom, based on their current position in the
viewport. To disable this auto-flip feature, set the `no-flip` prop.

### Menu offset

Like to move your menu away from the toggle buttons a bit? Then use the `offset` prop to specify the
number of pixels to push right (or left when negative) from the toggle button:

- Specified as a number of pixels: positive for right shift, negative for left shift.
- Specify the distance in CSS units (i.e. `0.3rem`, `4px`, `1.2em`, etc) passed as a string.

```html
<div>
  <b-dropdown id="dropdown-offset" offset="25" text="Offset Dropdown" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-offset.vue -->
```

### Boundary constraint

By default, dropdowns are visually constrained to its scroll parent, which will suffice in most
situations. However, if you place a dropdown inside an element that has `overflow: scroll` (or
similar) set, the dropdown menu may - in some situations - get cut off. To get around this, you can
specify a boundary element via the `boundary` prop. Supported values are `'scrollParent'` (the
default), `'viewport'`, `'window'` or a reference to an HTML element. The boundary value is passed
directly to Popper.js's `boundariesElement` configuration option.

**Note:** when `boundary` is any value other than the default of `'scrollParent'`, the style
`position: static` is applied to to the dropdown component's root element in order to allow the menu
to "break-out" of its scroll container. In some situations this may affect your layout or
positioning of the dropdown trigger button. In these cases you may need to wrap your dropdown inside
another element.

## Split button support

Create a split dropdown button, where the left button provides standard `click` event and link
support, while the right hand side is the dropdown menu toggle button.

```html
<div>
  <b-dropdown split text="Split Dropdown" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-split.vue -->
```

### Split button link support

The left split button defaults to an element of type `<button>` (a `<b-button>` to be exact). To
convert this button into a link or `<router-link>`, specify the href via the `split-href` prop or a
router link `to` value via the `split-to` prop, while maintaining the look of a button.

```html
<div>
  <b-dropdown split split-href="#foo/bar" text="Split Link" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-split-link.vue -->
```

## Styling options

Dropdowns support various props for styling the dropdown trigger button.

### Sizing

Dropdowns work with trigger buttons of all sizes, including default and split dropdown buttons.

Set the `size` prop to either `sm` for small button(s), or `lg` for large button(s).

```html
<div>
  <div>
    <b-dropdown size="lg" text="Large" class="m-2">
      <b-dropdown-item-button>Action</b-dropdown-item-button>
      <b-dropdown-item-button>Another action</b-dropdown-item-button>
      <b-dropdown-item-button>Something else here</b-dropdown-item-button>
    </b-dropdown>

    <b-dropdown size="lg" split text="Large Split" class="m-2">
      <b-dropdown-item-button>Action</b-dropdown-item-button>
      <b-dropdown-item-button>Another action</b-dropdown-item-button>
      <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
    </b-dropdown>
  </div>
  <div>
    <b-dropdown size="sm" text="Small" class="m-2">
      <b-dropdown-item-button>Action</b-dropdown-item-button>
      <b-dropdown-item-button>Another action</b-dropdown-item-button>
      <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
    </b-dropdown>

    <b-dropdown size="sm" split text="Small Split" class="m-2">
      <b-dropdown-item-button>Action</b-dropdown-item-button>
      <b-dropdown-item-button>Another action</b-dropdown-item-button>
      <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
    </b-dropdown>
  </div>
</div>

<!-- b-dropdown-sizes.vue -->
```

**Note:** _changing the size of the button(s) does not affect the size of the menu items!_

### Dropdown color variants

The dropdown toggle button can have one of the standard Bootstrap contextual variants applied by
setting the prop `variant` to `success`, `primary`, `info`, `danger`, `link`, `outline-dark`, etc.
(or custom variants, if defined). The default variant is `secondary`.

See the [Variant Reference](/docs/reference/color-variants) for a full list of built-in contextual
variants.

```html
<div>
  <b-dropdown text="Primary" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown text="Success" variant="success" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown text="Outline Danger" variant="outline-danger" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-variants.vue -->
```

You can also apply arbitrary classes to the toggle button via the `toggle-class` prop. This prop
accepts either a string or array of strings.

### Split button color variant

By default the left split button uses the same `variant` as the `toggle` button. You can give the
split button its own variant via the `split-variant` prop.

```html
<div>
  <b-dropdown
    split
    split-variant="outline-primary"
    variant="primary"
    text="Split Variant Dropdown"
    class="m-2"
  >
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-split-variant.vue -->
```

### Dropdown sub-component color variants

Many of the supported dropdown [sub-components](#dropdown-supported-sub-components) provide a
`variant` prop for controlling their text color.

### Hidden caret

The dropdown can be created with the toggle's caret visually hidden by setting the `no-caret` prop
to `true`. This is useful when the dropdown is to be displayed as an icon.

```html
<div>
  <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
    <template slot="button-content">&#x1f50d;<span class="sr-only">Search</span></template>
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-hidden-caret.vue -->
```

**Note:** The caret will always be shown when using `split` mode.

## Dropdown supported sub-components

The following components can be placed inside of your dropdowns. Using any other component or markup
may break layout and/or keyboard navigation.

| Sub-component              | Description                                                                                                                     | Aliases                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `<b-dropdown-item>`        | Action items that provide click, link, and `<router-link>`/`<nuxt-link>` functionality. Renders as an `<a>` element by default. | `<b-dd-item>`                                                    |
| `<b-dropdown-item-button>` | An alternative to `<b-dropdown-item>` that renders a menu item using a `<button>` element.                                      | `<b-dropdown-item-btn>`, `<b-dd-item-button>`, `<b-dd-item-btn>` |
| `<b-dropdown-divider>`     | A divider / spacer which can be used to separate dropdown items.                                                                | `<b-dd-divider>`                                                 |
| `<b-dropdown-text>`        | Free flowing text content in a menu.                                                                                            | `<b-dd-text>`                                                    |
| `<b-dropdown-form>`        | For placing form controls within a dropdown menu.                                                                               | `<b-dd-form>`                                                    |
| `<b-dropdown-group>`       | For grouping dropdown sub components with an optional header.                                                                   | `<b-dd-group>`                                                   |
| `<b-dropdown-header>`      | A header item, used to help identify a group of dropdown items.                                                                 | `<b-dd-header>`                                                  |

**Note:** _Nested sub-menus are **not** supported._

### `<b-dropdown-item>`

The `<b-dropdown-item>` is typically used to create a navigation link inside your menu. Use either
the `href` prop or the `to` prop (for router link support) to generate the appropriate navigation
link. If neither `href` nor `to` are provided, a standard `<a>` link will be generated with an
`href` of `#` (with an event handler that will prevent scroll to top behaviour by preventing the
default link action).

Disabled the dropdown item by setting the `disabled` prop.

### `<b-dropdown-item-button>`

Historically dropdown menu contents had to be links (`<b-dropdown-item>`), but that's no longer the
case with Bootstrap v4. Now you can optionally create `<button>` elements in your dropdowns by using
the `<b-dropdown-item-button>` sub-component. `<b-dropdown-item-button>` does not support the `href`
or `to` props.

Disabled the dropdown item button by setting the `disabled` prop.

```html
<div>
  <b-dropdown id="dropdown-buttons" text="Dropdown using buttons as menu items" class="m-2">
    <b-dropdown-item-button>I'm a button</b-dropdown-item-button>
    <b-dropdown-item-button active>I'm a active button</b-dropdown-item-button>
    <b-dropdown-item-button disabled>I'm a button, but disabled!</b-dropdown-item-button>
    <b-dropdown-item-button>I don't look like a button, but I am!</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-item-buttons.vue -->
```

When the menu item doesn't trigger navigation, it is recommended to use the
`<b-dropdown-item-button>` sub-component.

### `<b-dropdown-item-divider>`

Separate groups of related menu items with `<b-dropdown-divider>`.

```html
<div>
  <b-dropdown id="dropdown-divider" text="Dropdown with divider" class="m-2">
    <b-dropdown-item-button>First item</b-dropdown-item-button>
    <b-dropdown-item-button>Second item</b-dropdown-item-button>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button>Separated Item</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-item-divider.vue -->
```

### `<b-dropdown-text>`

Place any freeform text within a dropdown menu using the `<b-dropdown-text>` sub component or use
text and use spacing utilities. Note that you'll likely need additional sizing styles to
constrain/set the menu width.

```html
<div>
  <b-dropdown id="dropdown-text" text="Dropdown with text" class="m-2">
    <b-dropdown-text style="width: 240px;">
      Some example text that's free-flowing within the dropdown menu.
    </b-dropdown-text>
    <b-dropdown-text>And this is more example text.</b-dropdown-text>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button>First item</b-dropdown-item-button>
    <b-dropdown-item-button>Second Item</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-text.vue -->
```

`<b-dropdown-text>` has the BootstrapVue custom class `.b-dropdown-text` applied to it which sets
some basic styles which are suitable in most situations. By default it's width will be the same as
the widest `<b-dropdown-item>` content. You may need to place additional styles or helper classes on
the component.

By default `<b-dropdown-text>` renders using tag `<p>`. You can change the rendered tag by setting
the `tag` prop to any valid HTML5 tag on the `<b-dropdown-text>` sub-component.

### `<b-dropdown-form>`

Dropdowns support basic forms. Put a `<b-dropdown-form>` within a dropdown menu and place form
controls within the `<b-dropdown-form>`. The `<b-dropdown-form>` is based on the
[`<b-form>`](/docs/components/form) component, and supports the same props and attributes as a
regular form.

```html
<template>
  <div>
    <b-dropdown id="dropdown-form" text="Dropdown with form" ref="dropdown" class="m-2">
      <b-dropdown-form>
        <b-form-group label="Email" label-for="dropdown-form-email" @submit.stop.prevent>
          <b-form-input
            id="dropdown-form-email"
            size="sm"
            placeholder="email@example.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password" label-for="dropdown-form-password">
          <b-form-input
            id="dropdown-form-password"
            type="password"
            size="sm"
            placeholder="Password"
          ></b-form-input>
        </b-form-group>

        <b-form-checkbox class="mb-3">Remember me</b-form-checkbox>
        <b-button variant="primary" size="sm" @click="onClick">Sign In</b-button>
      </b-dropdown-form>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button>New around here? Sign up</b-dropdown-item-button>
      <b-dropdown-item-button>Forgot Password?</b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
  export default {
    methods: {
      onClick() {
        // Close the menu and (by passing true) return focus to the toggle button
        this.$refs.dropdown.hide(true)
      }
    }
  }
</script>

<!-- b-dropdown-form.vue -->
```

`<b-dropdown-form>` has the BootstrapVue custom class `.b-dropdown-form` applied to it which sets
some basic styles which are suitable in most situations. By default it's width will be the same as
the widest `<b-dropdown-item>` content. You may need to place additional styles or helper classes on
the component.

### `<b-dropdown-item-group>`

Group a set of dropdown sub components with an optional associated header. Place a
`<b-dropdown-divider>` between your `<b-dropdown-group>` and other groups or non-grouped dropdown
contents

```html
<div>
  <b-dropdown id="dropdown-header" text="Dropdown with group" class="m-2">
    <b-dropdown-item-button>
      Non-grouped Item
    </b-dropdown-item-button>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-group id="dropdown-group-1" header="Group 1">
      <b-dropdown-item-button>First Grouped item</b-dropdown-item-button>
      <b-dropdown-item-button>Second Grouped Item</b-dropdown-item-button>
    </b-dropdown-group>
    <b-dropdown-group id="dropdown-group-2" header="Group 2">
      <b-dropdown-item-button>First Grouped item</b-dropdown-item-button>
      <b-dropdown-item-button>Second Grouped Item</b-dropdown-item-button>
    </b-dropdown-group>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button>
      Another Non-grouped Item
    </b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-item-group.vue -->
```

Using `<b-dropdown-group>` instead of `<b-dropdown-header>` is the recommended method for providing
accessible grouped items with a header.

### `<b-dropdown-item-header>`

Add a header to label sections of actions in any dropdown menu.

```html
<div>
  <b-dropdown id="dropdown-header" text="Dropdown with header" class="m-2">
    <b-dropdown-header id="dropdown-header-label">
      Dropdown header
    </b-dropdown-header>
    <b-dropdown-item-button aria-describedby="dropdown-header-label">
      First item
    </b-dropdown-item-button>
    <b-dropdown-item-button aria-describedby="dropdown-header-label">
      Second Item
    </b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-item-header.vue -->
```

See Section [Dropdown headers and accessibility](#dropdown-headers-and-accessibility) for details on
making headers more accessible for users of assistive technologies.

Using the `<b-dropdown-group>` sub-component simplifies creating accessible grouped dropdown items
with an associated header.

#### Closing the menu via form interaction

Clicking buttons inside of a `<b-dropdown-form>` will not automatically close the menu. If you need
to close the menu using a button (or via the form submit event), call the `hide()` method on the
`<b-dropdown>` instance, as is shown in the above example.

The `hide()` method accepts a single boolean argument. If the argument is `true`, then focus will be
returned to the dropdown toggle button after the menu has closed. Otherwise the document will gain
focus once the menu is closed.

## Listening to dropdown changes via \$root events

To listen to any dropdown opening, use:

```js
export default {
  mounted() {
    this.$root.$on('bv::dropdown::show', bvEvent => {
      console.log('Dropdown is about to be shown', bvEvent)
    })
  }
}
```

Refer to the [Events](/docs/components/dropdown#component-reference) section of documentation for
the full list of events.

## Optionally scoped default slot

<span class="badge badge-info small">NEW in 2.0.0-rc.20</span>

The default slot is optionally scoped with the following scope available:

| Property or Method | Description                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `hide()`           | Can be used to close the dropdown menu. Accepts an optional boolean argument, which if `true` returns focus to the toggle button |

## Accessibility

Providing a unique `id` prop ensures ARIA compliance by automatically adding the appropriate
`aria-*` attributes in the rendered markup.

The default ARIA role is set to `menu`, but you can change this default to another role (such as
`navigation`) via the `role` prop, depending on your user case.

When a menu item doesn't trigger navigation, it is recommended to use the `<b-dropdown-item-button>`
sub-component (which is not announced as a link) instead of `<b-dropdown-item>` (which is presented
as a link to the user).

### Headers and accessibility

When using `<b-dropdown-header>` components in the dropdown menu, it is recommended to add an `id`
attribute to each of the headers, and then set the `aria-describedby` attribute (set to the `id`
value of the associated header) on each following dropdown items under that header. This will
provide users of assistive technologies (i.e. sight-impaired users) additional context about the
dropdown item:

```html
<div>
  <b-dropdown id="dropdown-aria" text="Dropdown ARIA" variant="primary" class="m-2">
    <b-dropdown-header id="dropdown-header-1">Groups</b-dropdown-header>
    <b-dropdown-item-button aria-describedby="dropdown-header-1">Add</b-dropdown-item-button>
    <b-dropdown-item-button aria-describedby="dropdown-header-1">Delete</b-dropdown-item-button>

    <b-dropdown-header id="dropdown-header-2">Users</b-dropdown-header>
    <b-dropdown-item-button aria-describedby="dropdown-header-2">Add</b-dropdown-item-button>
    <b-dropdown-item-button aria-describedby="dropdown-header-2">Delete</b-dropdown-item-button>

    <b-dropdown-divider></b-dropdown-divider>

    <b-dropdown-item-button>
      Something <strong>not</strong> associated with Users
    </b-dropdown-item-button>

  </b-dropdown>
</div>

<!-- b-dropdown-aria.vue -->
```

As a simplified alternative, use the `<b-dropdown-group>` instead to easily associate header text to
the contained dropdown sub-components.

### Keyboard navigation

Dropdowns support keyboard navigation, emulating native `<select>` behaviour.

Note that <kbd>DOWN</kbd> and <kbd>UP</kbd> will not move focus into `<b-dropdown-form>` sub
components, but users can still use <kbd>TAB</kbd> or <kbd>SHIFT</kbd>+<kbd>TAB</kbd> to move into
form controls within the menu.

## Implementation notes

<span class="badge badge-info small">NEW in 2.0.0-rc.19</span> The dropdown menu is rendered with
semantic `<ul>` and `<li>` elements for accessibility reasons. The `.dropdown-menu` is the `<ul>`
element, while dropdown items (items, buttons, text, form, headers, and dividers) are wrapped in an
`<li>` element. If creating custom items to place inside the dropdown menu, ensure they are wrapped
with a plain `<li>`.

On touch-enabled devices, opening a `<b-dropdown>` adds empty (noop) `mouseover` handlers to the
immediate children of the `<body>` element. This admittedly ugly hack is necessary to work around a
[quirk in iOS' event delegation](https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html),
which would otherwise prevent a tap anywhere outside of the dropdown from triggering the code that
closes the dropdown. Once the dropdown is closed, these additional empty `mouseover` handlers are
removed.

## See also

- [`<b-nav-item-dropdown>`](/docs/components/nav#dropdown-support) for dropdown support inside
  `<b-nav>` and `<n-navbar>`
- [Router Link Support](/docs/reference/router-links) reference for information about router-link
  specific props available on `<b-dropdown-item>`

<!-- Component reference added automatically from component package.json -->
