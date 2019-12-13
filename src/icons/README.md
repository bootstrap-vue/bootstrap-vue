# Bootstrap Icons

> Bootstrap Icons are designed to work with Bootstrap components, from form controls to navigation.
> Bootstrap Icons are SVGs, so they scale quickly and easily and can be styled with CSS. While they
> are built for Bootstrap, they will work in any project.

BootstrapVue icon components are based on [`bootstrap-icons`](https://icons.getbootstrap.com/).
Icons are opt-in, meaning that they explicity need to be imported in order to be used. They are not
installed by default (except in the [browser build](/docs#build-variants)).

<div class="alert alert-info small text-center mb-3">
  <p class="mb-0">
    <strong>Note:</strong> Bootstrap's Icon SVGs are currently in the alpha release stage, and may
    be subject to change.
  </p>
</div>

## Icons

<div class="bd-example notranslate">
  <!-- Component rendered by docs/pages/docs/icons.index.js -->
  <!-- We use a `<div is="...">` to prevent marked loader from mangling the unknown tag-->
  <div is="IconsTable"></div>
</div>

## Usage

BootstrapVue icons are not automatically installed when using BootstrapVue in your project, you
must explicity include them.

Icons inherit the current font color and font size from their parent container element. To change
the color of the icon, refer to the [Variants](#variants) section, and to change the size of the
icon refer to the [Sizing](#sizing) section.

All icons are exported with the name in <samp>PascalCase</samp>, prefixed with <samp>BIcon</samp>.

### Importing into your project

**Importing all icons:**

```js
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
```

**Importing specific icons:**

Making them globally available:

```js
import Vue from 'vue'
import { BootstrapVue, BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconArrowUp', BIconArrowUp)
Vue.component('BIconArrowDown', BIconArrowDown)
```

Or if using in specific pages or components:

```js
import { BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

export default {
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown
  },
  props: {
    // ...
  }
  // ...
}
```

### Icon components

You can either uses individual icon components, or use a the icon helper component `<b-icon>`, to
place icons in your project templates.

All individual icon components are prefixed with the name `<b-icon-{name}>`, where `{name}` is one
of the icon names listed in the [Icons](#icons) section above.

**Using individual icon components:**

```html
<template>
  <div class="h2 mb-0">
    <b-icon-arrow-up></b-icon-arrow-up>
    <b-icon-arrow-down></b-icon-arrow-down>
  </div>
</template>

<!-- icons-individual-usage.vue -->
```

**Using the `<b-icon>` helper component:**

```html
<template>
  <div class="h2 mb-0">
    <b-icon icon="arrow-up"></b-icon>
    <b-icon icon="arrow-down"></b-icon>
  </div>
</template>

<!-- icons-helper-usage.vue -->
```

**Note:** when using `<b-icon>`, you **must** also import the required individual icon components
unless you are using the `IconsPlugin`.

## Variants

By defaut, icons inherit the current font color of their parent element.  All icon components
provide a `variant` prop to apply one of the bootstrap contextual text variant colors:

```html
<template>
  <div class="h2 mb-0">
    <b-icon icon="alert-circle-fill" variant="success"></b-icon>
    <b-icon icon="alert-circle-fill" variant="warning"></b-icon>
    <b-icon icon="alert-circle-fill" variant="danger"></b-icon>
    <b-icon icon="alert-circle-fill" variant="info"></b-icon>
    <b-icon icon="alert-circle-fill" variant="primary"></b-icon>
    <b-icon icon="alert-circle-fill" variant="secondary"></b-icon>
    <b-icon icon="alert-circle-fill" variant="dark"></b-icon>
  </div>
</template>

<!-- icons-color-variants.vue -->
```

You can also use custom CSS to set the icon color, either via direct `style` attribute, or
via custom classes:

```html
<template>
  <div class="h2 mb-0">
    <b-icon icon="battery-full" style="color: #7952b3;"></b-icon>
  </div>
</template>

<!-- icons-color-css.vue -->
```

## Sizing

Icons have a default width and height of `1em`, which means they will scale with the size of
the current font size:

```html
<template>
  <div>
    <p class="h1 mb-2">Icon <b-icon icon="alert-circle-fill"></b-icon></p>
    <p class="h2 mb-2">Icon <b-icon icon="alert-circle-fill"></b-icon></p>
    <p class="h3 mb-2">Icon <b-icon icon="alert-circle-fill"></b-icon></p>
    <p class="h4 mb-2">Icon <b-icon icon="alert-circle-fill"></b-icon></p>
    <p class="h5 mb-2">Icon <b-icon icon="alert-circle-fill"></b-icon></p>
  </div>
</template>

<!-- icons-size-inherit.vue -->
```

You can also use custom CSS to set the icon size, either via direct `style` attribute, or
via custom classes:

```html
<template>
  <div>
    <b-icon icon="alert-circle" style="width: 120px; height: 120px;"></b-icon>
  </div>
</template>

<!-- icons-size-css.vue -->
```

Alternatively, you can override the `<svg>` `width` and `height` attributes to set an explicit
size:

```html
<template>
  <div>
    <b-icon icon="bell-fill" width="120px" height="120px"></b-icon>
  </div>
</template>

<!-- icons-size-attrs.vue -->
```

## Working with SVGs

SVGs are awesome to work with, but they do have some known quirks to work around.

- **Focus handling is broken in Internet Explorer and Edge.** We have added the attribute
  `focusable="false"` to the `<svg>` element. You can override this attribute.
- **Browsers inconsistently announce SVGs as `<img>` tags with voice assistance.** Hence, we
  have added added the attributes `role="img"` and `alt="icon"`. You can override these
  attributes if needed.
- **Safari skips `aria-label` when used on non-focusable SVGs.** As such, use `aria-hidden="true"`
  when using the icon and use CSS to visually hide an equivalent label.
