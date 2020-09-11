# Sidebar

> Otherwise known as off-canvas or a side drawer, BootstrapVue's custom `<b-sidebar>` component is a
> fixed-position toggleable slide out box, which can be used for navigation, menus, details, etc. It
> can be positioned on either the left (default) or right of the viewport, with optional backdrop
> support.

## Overview

You can place almost any content inside the `<b-sidebar>`
[optionally scoped default slot](#scoped-default-slot), such as text, buttons, forms, images, or
[vertical navs](/docs/components/nav#vertical-variation).

The component supports a header and built in close button, of which you can optionally disable and
provide your own header (if needed), and can be easily toggled with our
[`v-b-toggle` directive](/docs/directives/toggle).

The component has minimal default styling, which provides you with great flexibility in laying out
the content of the sidebar.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
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
be enabled via CSS on the body of the sidebar.

## Styling

Several props are provided for controlling the appearance of the sidebar.

### Title

Sidebars should have a title (specifically for accessibility reasons). Easily set the title that
appears in the header either via the `title` prop or the `title` slot. Note the `title` slot takes
precedence over the `title` prop.

If the [`no-header` prop](#hiding-the-header) is set, then neither the `title` prop or `title` slot
have any effect.

If you do not provide a title, use either the `aria-label` or `aria-labelledby` props to provide an
accessible title for the sidebar. See the [Accessibility section](#accessibility) below for
additional details.

### Placement

By default the sidebar will be placed on the left side of the viewport. Set the `right` prop to
`true` to have the sidebar appear on the right side of the viewport.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
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
and text, respectively. Alternatively, you can apply styles or classes to specify the background and
text colors.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-variant>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-variant" title="Sidebar" bg-variant="dark" text-variant="light" shadow>
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

The standard Bootstrap theme variants are `'white'`, `'light'`, `'dark'`, `'primary'`,
`'secondary'`, `'success'`, `'danger'`, `'warning'`, and `'info'`.

The default background variant is `'light'` and the default text variant is `'dark'`.

### Shadow

Prefer a sidebar with a backdrop shadow? Set the `shadow` prop to either boolean `true` for a medium
shadow, `'sm'` for a small shadow, or `'lg'` for a larger shadow. Set it to `false` (the default)
for no shadow.

### Borders

By default, `<b-sidebar>` has no borders. Use
[border utility classes](/docs/reference/utility-classes) to add border(s) to `<b-sidebar>` (via the
`sidebar-class` prop <span class="badge badge-secondary">2.12.0+</span>), or use CSS style
overrides.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-border>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-border" sidebar-class="border-right border-danger">
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

<!-- b-sidebar-border.vue -->
```

### Width

By default the width of `<b-sidebar>` is set to `320px` (100% on 'xs' screens). Simply provide a
value via the `width` prop (i.e. `'180px'`, `'20em'`, etc.) to override this default. The max width
is set to `100%` via CSS.

### Padding

The sidebar by default has no padding. You can apply padding utility classes to the component, or
margin/padding utility classes to the content of the sidebar.

### Disable slide transition

By default the sidebar will use a sliding transition when showing and hiding. You can disable the
slide transition via the `no-slide` prop.

**Note:** The BootstrapVue defined transition effect of this component is dependent on the
`prefers-reduced-motion` media query. See the
[reduced motion section of our accessibility documentation](/docs/reference/accessibility) for
additional details.

When disabling the slid transition, the fade transition of the [optional backdrop](#backdrop) will
also be disabled.

### Z-index

The sidebar has a default `z-index` defined in SCSS/CSS. In some situations you may need to use a
different `z-index` to ensure the sidebar appears over or under other content. You can do so either
via CSS styles, or via the `z-index` prop.

### Scoped default slot

The `default` slot allows you to provide the body content for your sidebar. It is optionally scoped.
The examples in the following sections demonstrate the use of the default slot scope

You can apply arbitrary classes to the body section via the `body-class` prop.

### Header

By default, `<b-sidebar>` has a header with optional title and a close button. You can supply a
title via the `title` prop, or via the optionally scoped slot `title`.

You can apply arbitrary classes to the header section via the `header-class` prop, to override the
default padding, etc.

#### Hiding the default header

You can disable the default header (including the close button) via the `no-header` prop. Note that
you will need to provide a method of closing the sidebar. The `default` slot is scoped, which
includes a `hide()` method that can be used to close the sidebar.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
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

### Footer

`<b-sidebar>` provides a `footer` slot (optionally scoped), to allow you to provide content that
appears at the bottom of the sidebar. The `footer` slot is scoped, which includes a `hide()` method
that can be used to close the sidebar.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-footer>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" no-header shadow>
      <template v-slot:footer="{ hide }">
       <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <strong class="mr-auto">Footer</strong>
        <b-button size="sm" @click="hide">Close</b-button>
       </div>
      </template>
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

<!-- b-sidebar-footer.vue -->
```

You can apply arbitrary classes to the footer section via the `footer-class` prop.

### Lazy rendering

In some instances, you may not want the content rendered when the sidebar is not visible. Simply set
the `lazy` prop on `<b-sidebar>`. When `lazy` is `true`, the body and optional footer will _not_ be
rendered (removed from DOM) whenever the sidebar is closed.

### Backdrop

<span class="badge badge-info small">2.12.0+</span>

Add a basic backdrop when the side bar is open via the `backdrop` prop. When set to `true`, the
sidebar will show an opaque backdrop. Clicking on the backdrop will close the sidebar, unless the
`no-close-on-backdrop` prop is set to `true`.

Optionally (as of BootstrapVue v2.15.0+) you can use the `backdrop-variant` prop to control the
theme color variant of the backdrop. The default backdrop variant is `dark`.

```html
<template>
  <div>
    <b-button v-b-toggle.sidebar-backdrop>Toggle Sidebar</b-button>

    <b-sidebar
      id="sidebar-backdrop"
      title="Sidebar with backdrop"
      :backdrop-variant="variant"
      backdrop
      shadow
    >
      <div class="px-3 py-2">
        <b-form-group label="Backdrop variant" label-for="backdrop-variant">
          <b-form-select id="backdrop-variant" v-model="variant" :options="variants"></b-form-select>
        </b-form-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        variant: 'dark',
        variants: [
          'transparent',
          'white',
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ]
      }
    }
  }
</script>

<!-- b-sidebar-backdrop.vue -->
```

Note that when the sidebar is open, it may still be possible to scroll the body (unlike the
behaviour of modals). When the backdrop in enabled, focus constraint will attempt to keep focus
within the sidebar. Note that in rare circumstances it might be possible for users to move focus to
elements outside of the sidebar.

## Visibility control

### `v-b-toggle` directive

Using the [`v-b-toggle` directive](/docs/directives/toggle) is the preferred method for _opening_
the sidebar, as it automatically handles applying the `aria-controls` and `aria-expanded`
accessibility attributes on the trigger element.

The majority of examples on this page use the `v-b-toggle` directive.

### `v-model`

The `v-model` reflects the current visibility state of the sidebar. While it can be used to control
the visibility state of the sidebar, it is recommended to use the
[`v-b-toggle` directive](#v-b-toggle-directive) to _show_ the sidebar for accessibility reasons. If
you do use the `v-model` to show the sidebar, you should place the `aria-controls="id"` attribute
(where `id` is the ID of the sidebar) on the trigger element, and also set the `aria-expanded`
attribute (also on the trigger element) to either the string `'true'` (if the sidebar is open) or
`'false`' (if the sidebar is closed).

The `v-model` is internally bound to the `visible` prop, and the `change` event updates the
`v-model`.

### Closing on $route change

By default, `<b-sidebar>` will close itself when the `$route` changes (full path including query and
hash). This can be particularly handy if the sidebar is placed outside of your `<router-view>` and
is used for navigation.

You can disable this behaviour by setting the `no-close-on-route-change` prop to `true`.

## Events

The sidebar will emit the `shown` event once the sidebar has opened, and the `hidden` event when the
sidebar has closed.

The `change` event is used to update the `v-model` and is emitted whenever the visibility state of
the sidebar changes.

## Accessibility

`<b-sidebar>` provides several accessibility features.

When the sidebar is opened, the entire sidebar will receive focus, which is desirable for screen
reader and keyboard-only users. When the sidebar is closed, the element that previously had focus
before the sidebar was opened will be re-focused.

In some circumstances, you may need to disable the enforce focus feature completely. You can do this
by setting the prop `no-enforce-focus`, although this is generally discouraged for accessibility
reasons.

When the sidebar is open, users can press <kbd>Esc</kbd> to close the sidebar. To disable this
feature, set the `no-close-on-esc` prop to `true`. with the backdrop enabled, you can use the prop
`no-close-on-backdrop` to disable the close on backdrop click feature.

When the `backdrop` prop is `true`, the sidebar will attempt to constrain focus within the sidebar,
and the sidebar will have the attribute `aria-modal="true"` set.

When you have hidden the header, or do not have a title for the sidebar, set either `aria-label` to
a string that describes the sidebar, or set `aria-labelledby` to an ID of an element that contains
the title. When using the `lazy` prop _and_ you do not have a header, use the `aria-label` prop to
provide an appropriate string to label the sidebar.

## Implementation notes

BootstrapVue's custom SCSS/CSS is required for proper styling, and positioning of the sidebar.

The Bootstrap v4 background (`'bg-*'`) and text (`'text-*'`) utility classes are used for
controlling the background and font color, respectively.

Some of the default styling for `<b-sidebar>` can be customized via the use of SASS variables. Refer
to the [theming documentation](/docs/reference/theming) for additional details.

## See also

- [`v-b-toggle` directive](/docs/directives/toggle)
- [`<b-collapse>` component](/docs/components/collapse)
- [`<b-button-close>` component](/docs/components/button#comp-ref-b-button-close)
