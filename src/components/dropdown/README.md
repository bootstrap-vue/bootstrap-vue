# Dropdowns

> Dropdowns are toggleable, contextual overlays for displaying lists of links and actions
in a dropdown menu format.

`<b-dropdown>` (or known by its shorter alias of `<b-dd>`) components are toggleable,
contextual overlays for displaying lists of links and more. They’re toggled by
clicking (or pressing space or enter when focused), not by hovering; this is an
[intentional design decision](http://markdotto.com/2012/02/27/bootstrap-explained-dropdowns/).

```html
<div>
  <b-dropdown id="ddown1" text="Dropdown Button" class="m-md-2">
    <b-dropdown-item>First Action</b-dropdown-item>
    <b-dropdown-item>Second Action</b-dropdown-item>
    <b-dropdown-item>Third Action</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item>Something else here...</b-dropdown-item>
    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
  </b-dropdown>
</div>

<!-- dropdown.vue -->
```


## Dropdown supported sub-components
The following components can be placed inside of your dropdowns. Using any other
component or markup may break lauout and/or keyboard navigation.

| Sub-component | Description | Aliases
| --------- | ----------- | -------
| `<b-dropdown-item>` | Action items that provide click, link, and `<router-link>` functionality. renders as an `<a>` element by default. | `<b-dd-item>`
| `<b-dropdown-item-button>` | An alternative to `<b-dropdown-item>` that renders a menu item using a `<button>` element. | `<b-dropdown-item-btn>`, `<b-dd-item-button>`, `<b-dd-item-btn>`
| `<b-dropdown-header>` | A header item, used to help identify a group of dropdown items. | `<b-dd-header>`
| `<b-dropdown-divider>` | A divider / spacer which can be used to separate dropdown items. | `<b-dd-divider>`

**Note:** _Nested sub-menus are **not** supported._

### `<b-dropdown-item>`
The `<b-dropdown-item>` is typically used to create a navigation link inside your menu.
Use either the `href` prop or the `to` prop (for router link support) to generate the
apropriate navigation link. IF neither `href` nor `to` are provided, a standard `<a>`
link will be generated with an `href` of `#` (with an event hander that will prevent
scroll to top behaviour by preventing the default link action).

Disabled the dropdown item by setting the `disabled` prop.

### `<b-dropdown-item-button>`
Historically dropdown menu contents had to be links (`<b-dropdown-item>`), but that’s no
longer the case with Bootstrap v4. Now you can optionally create `<button>` elements in
your dropdowns by using the `<b-dropdown-item-button>` sub-component.
`<b-dropdown-itmem-button>` does not support the `href` or `to` props.

Disabled the dropdown item button by setting the `disabled` prop.

```html
<div>
  <b-dropdown id="ddown-buttons" text="Dropdown using buttons as menu items" class="m-2">
    <b-dropdown-item-button>I'm a button</b-dropdown-item-button>
    <b-dropdown-item-button>I'm also a button</b-dropdown-item-button>
    <b-dropdown-item-button disabled>I'm a button, but disabled!</b-dropdown-item-button>
    <b-dropdown-item-button>I don't look like a button, but I am!</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- dropdown-item-buttons.vue -->
```

When the menu item doesn't trigger navigation, it is reccomended to use
the `<b-dropdown-item-button>` sub-component

### `<b-dropdown-item-divider>`
Separate groups of related menu items with `<b-dropdown-divider>`.

```html
<div>
  <b-dropdown id="ddown-divider" text="Dropdown with divider" class="m-2">
    <b-dropdown-item-button>First item</b-dropdown-item-button>
    <b-dropdown-item-button>Second item</b-dropdown-item-button>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button>Separated Item</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- dropdown-item-divider.vue -->
```

### `<b-dropdown-item-header>`
Add a header to label sections of actions in any dropdown menu.

```html
<div>
  <b-dropdown id="ddown-header" text="Dropdown with header" class="m-2">
    <b-dropdown-header>Dropdown header</b-dropdown-header>
    <b-dropdown-item-button>First item</b-dropdown-item-button>
    <b-dropdown-item-button>Second Item</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- dropdown-item-header.vue -->
```

See Section [Dropdown headers and accessibility](#dropdown-headers-and-accessibility)
for details on making headers more accessible for users of assistive technologies.


## Positioning
Dropdown supports various positioning such as left and right aligned, drodown and dropup, and
supports auto-flipping (dropdown to dropup, and vice-versa) when the menu would
overflow off of the visible screen area.

### Menu left and right alignment
The dropdown menu can either be left aligned (default) or right aligned with respect
to the button above it. To have the dropdown aligned on the right, set the `right` prop.

```html
<div>
  <b-dropdown id="ddown-left" text="Left align" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="ddown-right" right text="Right align" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- dropdown-right.vue -->
```

### Dropup
Turn your dropdown menu into a drop-up menu by setting the `dropup` prop.

```html
<div>
  <b-dropdown id="ddown-dropup" dropup text="Drop-Up" variant="info" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- dropdown-dropup.vue -->
```

### Auto "flipping"
By default, dropdowns may flip to the top, or to the bottom, based on
their current position in the viewport. To disable this auto-flip feature, set
the `no-flip` prop.

### Menu offset
Like to move your menu away from the toggle buttons a bit? Then use the `offset`
prop to specify the number of pixels to push right (or left when negative) from
the toggle button:

- Specified as a number of pixels: positive for right shift, negative for left shift.
- Specify the distance in CSS units (i.e. `0.3rem`, `4px`, `1.2em`, etc) passed as a string.

```html
<div>
  <b-dropdown id="ddown-offset" offset="25" text="Offset Dropdown" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- dropdown-offset.vue -->
```

### Boundary constraint
By default, dropdowns are visually constrained to its scroll parent, which will suffice
in most situations.  However, if you place a dropdown inside an element that has `overflow: scroll`
(or similar) set, the drodpwon menu may - in some situations - get cut off.  To get around this,
you can sepcify a boundary element via the `boundary` prop.  Supported values are `'scrollParent'`
(the default), `'viewport'`, `'window'` or a reference to an HTML element. The boundary value
is passed directly to Popper.js's `boundariesElement` configurtion option.

**Note:** when `boundary` is any value other than the default of `'scrollParent'`, the style
`position: static` is applied to to the dropdown component's root element in order to allow the
menu to "break-out" of its scroll container. In some situations this may affect your layout or
positioning of the dropdown trigger button. In these cases you may need to wrap your
dropdown inside another element.

## Split button support
Create a split dropdown button, where the left button provides standard
`click` event support, while the right hand side is the dropdown menu toggle button.

```html
<div>
  <b-dropdown id="ddown-split" split text="Split Dropdown" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- dropdown-split.vue -->
```

## Hidden Caret
The dropdown can be created with the caret hidden by setting the `no-caret` prop to `true`.
This is useful when the dropdown is to be displayed as an icon.

**Note:** The caret will always be shown when using `split` mode.

```html
<div>
  <b-dropdown variant="link" size="lg" no-caret>
    <template slot="button-content">
      &#x1f50d;<span class="sr-only">Search</span>
    </template>

    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- dropdown-hidden-toggle.vue -->
```

## Sizing
Dropdowns work with trigger buttons of all sizes, including default and split
dropdown buttons.

Set the `size` prop to either `sm` for small button(s), or `lg` for large button(s).

```html
<div>
  <b-dropdown id="ddown-lg" size="lg" text="Large" class="m-2">
    <b-dropdown-item-button>Action</b-dropdown-item-button>
    <b-dropdown-item-button>Another action</b-dropdown-item-button>
    <b-dropdown-item-button>Something else here</b-dropdown-item-button>
  </b-dropdown>
  <b-dropdown id="ddown-lg-split" size="lg" split text="Large Split" class="m-2">
    <b-dropdown-item-button>Action</b-dropdown-item-button>
    <b-dropdown-item-button>Another action</b-dropdown-item-button>
    <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
  </b-dropdown>
  <br>
  <b-dropdown id="ddown-sm" size="sm" text="Small" class="m-2">
    <b-dropdown-item-button>Action</b-dropdown-item-button>
    <b-dropdown-item-button>Another action</b-dropdown-item-button>
    <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
  </b-dropdown>
  <b-dropdown id="ddown-sm-split" size="sm" split text="Small Split" class="m-2">
    <b-dropdown-item-button>Action</b-dropdown-item-button>
    <b-dropdown-item-button>Another action</b-dropdown-item-button>
    <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- dropdown-sizes.vue -->
```

**Note:** _changing the size of the button(s) does not affect the size of the menu items!_


## Dropdown color variants
The dropdown trigger buttons can have one of the standard Boostrap contextual variants applied
by setting the prop `variant` to `success`, `primary`, `info`, `danger`, `link` etc.

See the [Variant Reference](/docs/reference/variants) for a list of supported contextual variants.


## Accessibility
Providing a unique `id` prop ensures ARIA compliance by automatically adding
the appropriate `aria-*` attributes in the rendered markup.

The default ARIA role is set to `menu`, but you can change this default to another role
(such as `navigation`) via the `role` prop, depending on your user case.

When a menu item doesn't trigger navigation, it is reccomended to use the
`<b-dropdown-item-button>` sub-component (which is not announced as a link) instead of
`<b-dropdown-item>` (which is presented as a link to the user).

### Dropdown headers and accessibility
When using `<b-dropdown-header>` components in the dropdown menu, it is recommended to add an
`id` attribute to each of the headers, and then set the `aria-describedby` attribute (set to the `id`
value of the associated header) on each following dropdown items under that header. To improve
on this, wrap the header and related menu items in a `<div>` with `role="group"`.
This will provide users of assistive technologies (i.e. sight-impaired users) additional
context about the dropdown item:

```html
<div>
  <b-dropdown id="ddown-aria" text="Dropdown ARIA" variant="primary" class="m-2">
    <div role="group" aria-lableledby="header1">
      <b-dropdown-header id="header1">Groups</b-dropdown-header>
      <b-dropdown-item-button aria-describedby="header1">Add</b-dropdown-item-button>
      <b-dropdown-item-button aria-describedby="header1">Delete</b-dropdown-item-button>
    </div>
    <div role="group" aria-lableledby="header2">
      <b-dropdown-header id="header2">Users</b-dropdown-header>
      <b-dropdown-item-button aria-describedby="header2">Add</b-dropdown-item-button>
      <b-dropdown-item-button aria-describedby="header2">Delete</b-dropdown-item-button>
    </div>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button>Something <strong>not</strong> associated with user</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- dropdown-aria.vue -->
```

### Dropdown keyboard navigation
Dropdowns support keyboard navigation, emulating native `<select>` behaviour.

| Keypress | Action
| -------- | ------
| <kbd>DOWN</kbd> | Will highlight the next lower non-disabled item in the menu.
| <kbd>UP</kbd> | Will highlight the next higher non-disabled item in the menu.
| <kbd>ENTER</kbd> or <kbd>SPACE</kbd> | Will click the highlighted menu item.
| <kbd>ESC</kbd> | Will close the dropdown and return focus to the trigger button.
| <kbd>TAB</kbd> | Will close the dropdown and jump to the next focusable control on the page.
| <kbd>SHIFT</kbd>+<kbd>TAB</kbd> | Will close the dropdown and jump to the previous focusable control on the page.


## Dropdown component aliases
- `<b-dropdown>` can be used via it's shorter alias of `<b-dd>`
- `<b-dropdown-item>` can be used via it's shorter alias of `<b-dd-item>`
- `<b-dropdown-item-button>` can be used by the shorter aliases `<b-dropdown-item-btn>`, `<b-dd-item-button>` and `<b-dd-item-btn>`
- `<b-dropdown-header>` can be used via it's shorter alias of `<b-dd-header>`
- `<b-dropdown-divider>` can be used via it's shorter alias of `<b-dd-divider>`

## Implementation Note
On touch-enabled devices, opening a `<b-dropdown>` adds empty (noop) `mouseover`
handlers to the immediate children of the `<body>` element. This admittedly ugly
hack is necessary to work around a
[quirk in iOS’ event delegation](https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html),
which would otherwise prevent a tap anywhere outside of the dropdown from
triggering the code that closes the dropdown. Once the dropdown is closed, these
additional empty `mouseover` handlers are removed.


## Component Reference
