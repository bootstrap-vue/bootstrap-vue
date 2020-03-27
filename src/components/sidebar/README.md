# Sidebar

> Otherwise known as off-canvas or side drawers, sidebars are fixed position toggleable slide out
> boxes, for use as navigation, menus or details, etc. They can be positioned on either the left
> (default) of the viewport or right.

## Overview

The `<b-sidebar>` component was introduced in BootstrapVue `v2.10.0`.

TBD

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

TBD

### Title

Sidebars should have a title (specifically for accessibility reasons). Easily set the title that
appears in the header either via the `title` prop or the `title` slot. Note the `title` slot takes
precedence over the `title` prop.

If the [`no-header` prop](#hiding-the-header) is set, then neither the `title` prop or `title` slot
have any effect.

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

Use the props `bg-variant` and `text-variant` to control the theme color of the background and text,
respectively.

Alternatively, you can apply styles or classes to specify the background and text colors.

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

TBD

### Padding

The sidebar by default has no padding. You can apply padding utility classes to the component, or
margin/padding utility classes to the content of the sidebar

### Z-index

The sidebar has a default `z-index` defined in SCSS/CSS. In some situations you may need to use
a different z-index to ensure the sidebar appears over other content. You can do so eitehr CSS
styles, or via the `z-index` prop.

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

TBD

### V-Model

The `v-model` reflects the current visibility state of the sidebar. While it can be used to control the
visibility state of the sidebar, it is reccomended to use the
[`v-b-toggle` directive](#v-b-toggle-directive) for accesibility reasons. If you do use the `v-model`
to show the sidebar, you should place the `aria-controls="id"` attribute (where `id` is the ID of the
sidebar) on the trigger element, and also set the `aria-explanded` attribute (also on the trigger
element) to either the string `'true'` (if the sidebar is open) or `'false`' (if the slidebar is
closed).

TBD

## Events

TBD

## Accessibility

TBD

## Implementation notes

TBD

## See also

- [`<b-collapse>` component](/docs/components/collapse)
- [`<b-button-close>` component](/docs/components/button#comp-ref-b-button-close)

