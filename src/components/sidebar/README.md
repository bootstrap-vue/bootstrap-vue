# Sidebar

> Otherwise known as off-canvas or a side drawer, BootstrapVue's custom `<b-sidebar>` component is a
> fixed-position toggleable slide out box, which can be used for navigation, menus, details, etc. It
> can be positioned on either the left (default) or right of the viewport.

## Overview

You can place almost any content inside the `<b-sidebar>` optionally scoped default slot, such as
text, buttons, forms, images, or [vertical navs](/docs/components/nav#vertical-variation).

The component supports a header and built in close button, of which you can optional disabled and
provide your own header (ir needed), and can be easily toggled with our `v-b-toggle` directive.

The `<b-sidebar>` component was introduced in BootstrapVue `v2.10.0`.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar!" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<!-- b-sidebar.vue -->
```

If the content is taller than the available viewport height, vertical scrolling will automatically
be enabled via CSS.

## Styling

Several props are provided for contoling the appearance and pacement of the sidebar.

### Title

Sidebars should have a title (specifically for accessibility reasons). Easily set the title that
appears in the header either via the `title` prop or the `title` slot. Note the `title` slot takes
precedence over the `title` prop.

If the [`no-header` prop](#hiding-the-header) is set, then neither the `title` prop or `title` slot
have any effect.

If you do not provide a title, use either the `aria-label` or `aria-labelledby` props to provide an
accessible title for the sidebar. See the [Accessibility section](#accessibility) below for additional
details.

### Placement

By default the sidebar will be placed on the left side fo the viewport. Set the `right` prop to `true`
to have the sidebar appear on the right side of the viewport.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-right" right title="Sidebar!" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<!-- b-sidebar-right.vue -->
```

### Variants

Use the props `bg-variant` and `text-variant` to control the theme color variant of the background
and text, respectively. Alternatively, you can apply styles or classes to specify the background
and text colors.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-variant>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-variant" bg-variant="dark" text-variant="light" title="Sidebar!" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<!-- b-sidebar-variant.vue -->
```

The standard Bootstrap theme variants are `'white'`, `'light'`, `'dark'`, `'primary'`, `'secondary'`,
`'success'`, `'danger'`, `'warning'`, and `'info'`.

The default background variant is `'light'` and the default text variant is `'dark'`.

### Shadow

Prefer a sidebar with a backdrop shadow? Set the `shadow` prop to either boolean `true` for a medium
shadow, `'sm'` for a small shadow, or `'lg'` for a larger shadow. Set it to `false` (the default) for
no shadow.

### Borders

By default, `<b-sidebar>` has no borders. Use [border utility classes](/docs/reference/utility-classes)
to add border(s) to `<b-sidebar>`, or use CSS style overrides.

### Width

By default the width of `<b-sidebar>` is restricted to `320px` (100% on 'xs' screens). Simply
provide a style of `width` to change the width to a preferred value. The max width is set to `100%`.

### Padding

The sidebar by default has no padding. You can apply padding utility classes to the component, or
margin/padding utility classes to the content of the sidebar

### Disable slide transition

By default the sidebar will use a sliding transition when showing and hiding. You can disable the
slide transition via the `no-slide` prop.

**Note:** The BootstrapVue defined transition effect of this component is dependent on the
`prefers-reduced-motion` media query. See the
[reduced motion section of our accessibility documentation](/docs/reference/accessibility) for
additional details.

### Z-index

The sidebar has a default `z-index` defined in SCSS/CSS. In some situations you may need to use a
different `z-index` to ensure the sidebar appears over or under other content. You can do so either
via CSS styles, or via the `z-index` prop.

### Scoped default slot

TBD

### Hiding the header

You can hide the default header (including the close button) via the `no-header` prop. Note that you
will need to provide a method of closing the sidebar. The `default` slot is scoped, which includes a
`hide` method that can be used to close the sidebar.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-no-header" no-header shadow aria-labelledby="sidebar-no-header-title">
      <template v-slot:default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<!-- b-sidebar-no-header.vue -->
```

## Visibility control

### `v-b-toggle` directive

Using the `v-b-toggle` directive is the prefered method for toggling the visibility of the sidebar,
as it automatically handles applying the `aria-controls` and `aria-expanded` accessibility attributes
on the trigger element.

The majority of examples on this page use the `v-b-toggle` directive.

### V-Model

The `v-model` reflects the current visibility state of the sidebar. While it can be used to control the
visibility state of the sidebar, it is reccomended to use the
[`v-b-toggle` directive](#v-b-toggle-directive) for accesibility reasons. If you do use the `v-model`
to show the sidebar, you should place the `aria-controls="id"` attribute (where `id` is the ID of the
sidebar) on the trigger element, and also set the `aria-explanded` attribute (also on the trigger
element) to either the string `'true'` (if the sidebar is open) or `'false`' (if the slidebar is
closed).

## Events

The sidebar wil emit the `shown` event once the sidebar has opened, and the `hidden` event when the sidebar
has closed.

## Accessibility

TBD

## Implementation notes

BootstrapVue's Custom SCSS/CSS is required for proper styling, and positioning of the sidebar.

The Bootstrap v4 background (`'bg-*'`) and text (`'text-*'`) utility classes are used for controling the
background and font color, respectively.

## See also

- [`<b-collapse>` component](/docs/components/collapse)
- [`<b-button-close>` component](/docs/components/button#comp-ref-b-button-close)

