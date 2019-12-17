# Bootstrap Icons

> Bootstrap Icons are designed to work with Bootstrap components, from form controls to navigation.
> Bootstrap Icons are SVGs, so they scale quickly and easily and can be styled with CSS. While they
> are built for Bootstrap, they will work in any project.

BootstrapVue icon components are based on [`bootstrap-icons`](https://icons.getbootstrap.com/).
Icons are opt-in, meaning that they explicitly need to be imported in order to be used. They are not
installed by default (except in the [browser build](/docs#build-variants)).

Icon components were added in release v2.3.0

<div class="alert alert-info small">
  <p class="mb-0">
    <strong>Note:</strong>
    <a href="https://icons.getbootstrap.com/" target="_blank" rel="noopener">Bootstrap's Icon</a> SVGs
    are currently in the alpha release stage, and may be subject to change. Icons use BootstrapVue's
    custom CSS for additional styling compensation due to Bootstrap Icons' <code>&lt;svg&gt;</code>
    current vertical alignment issues. This may change in future releases of BootstrapVue.
  </p>
</div>

## Icons

The library includes over 300 icons. Use the explorer below to search and browse the available icons.

<div>
  <!-- Component rendered by docs/pages/docs/icons.index.js -->
  <!-- We use a `<div is="...">` to prevent marked loader from mangling the unknown tag-->
  <div is="IconsTable"></div>
</div>

## Usage

BootstrapVue icons are not automatically installed when using BootstrapVue in your project, you must
explicitly include them.

Icons inherit the current font color and font size from their parent container element. To change
the color of the icon, refer to the [Variants](#variants) section, and to change the size of the
icon refer to the [Sizing](#sizing) section.

All icons are exported with the name in <samp>PascalCase</samp>, prefixed with <samp>BIcon</samp>.
i.e `alert-circle-fill` is exported as `BIconAlertCircleFill`, `x` is exported as `BIconX`, and
`x-square-fill` is exported as `BIconXSquareFill`.

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
    <b-icon-alert-triangle-fill></b-icon-alert-triangle-fill>
  </div>
</template>

<!-- icons-individual-usage.vue -->
```

**Using the `<b-icon>` helper component:**

```html
<template>
  <div class="h2 mb-0">
    <b-icon icon="arrow-up"></b-icon>
    <b-icon icon="alert-triangle"></b-icon>
  </div>
</template>

<!-- icons-helper-usage.vue -->
```

**Note:** when using `<b-icon>`, you **must** also import the required individual icon components,
unless you are using the `IconsPlugin`.

## Variants

By default, icons inherit the current font color of their parent element. All icon components
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

You can also use custom CSS to set the icon color, either via direct `style` attribute, or via
custom classes:

```html
<template>
  <div class="h2 mb-0">
    <b-icon icon="battery-full" style="color: #7952b3;"></b-icon>
  </div>
</template>

<!-- icons-color-css.vue -->
```

## Sizing

Icons have a default width and height of `1em`, which means they will scale with the size of the
current font size:

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

You can also use custom CSS to set the icon size, either via direct `style` attribute, or via custom
classes:

```html
<template>
  <div>
    <b-icon icon="alert-circle" style="width: 120px; height: 120px;"></b-icon>
  </div>
</template>

<!-- icons-size-css.vue -->
```

Alternatively, you can override the `<svg>` `width` and `height` attributes to set an explicit size:

```html
<template>
  <div>
    <b-icon icon="bell-fill" width="120px" height="120px"></b-icon>
  </div>
</template>

<!-- icons-size-attrs.vue -->
```

## Styling

With the use of Bootstrap's border and background
[utility classes](/docs/reference/utility-classes), you can create various styling effects:

```html
<template>
  <div style="font-size: 4rem;">
    <b-icon icon="bell-fill" class="border rounded"></b-icon>
    <b-icon icon="bell-fill" class="border border-info rounded" variant="info"></b-icon>
    <b-icon icon="bell-fill" class="rounded-circle bg-danger p-1" variant="light"></b-icon>
    <b-icon icon="unlock-fill" class="rounded bg-primary p-1" variant="light"></b-icon>
  </div>
</template>

<!-- icons-styling.vue -->
```

## Using in components

Easily place icons as content in other components.

Note that icons placed in BootstrapVue components use BootstrapVue's custom CSS for additional
styling compensation due to current issues with Bootstrap Icons `<svg>` alignment implementation,
and for additional aesthetic scaling (icons placed in the components listed below will be scaled by
150%).

### Buttons

```html
<template>
  <div>
    <b-button size="sm" class="mb-2">
      <b-icon icon="gear-fill" class="mr-1"></b-icon> Settings
    </b-button>
    <br>
    <b-button variant="primary" class="mb-2">
      Pay now <b-icon icon="credit-card" class="ml-1"></b-icon>
    </b-button>
    <br>
    <b-button variant="outline-info" class="mb-2">
      <b-icon icon="power" class="mr-1"></b-icon> Logout
    </b-button>
    <br>
    <b-button size="lg" variant="primary" class="mb-2">
      <b-icon icon="question-fill" aria-hidden="true"></b-icon>
      <span class="sr-only">Help</span>
    </b-button>
  </div>
</template>

<!-- icons-buttons.vue -->
```

### Button groups and toolbars

#### Button Group

```html
<template>
  <div>
    <b-button-group>
      <b-button variant="outline-primary">
        <b-icon icon="tools" class="mr-1"></b-icon> Settings
      </b-button>
      <b-button variant="outline-primary">
        <b-icon icon="person-fill" class="ml-1"></b-icon> Account
      </b-button>
      <b-button variant="outline-primary">
        <b-icon icon="inbox-fill" class="ml-1"></b-icon> Messages
      </b-button>
    </b-button-group>
  </div>
</template>

<!-- icons-button-group.vue -->
```

#### Button Toolbar

```html
<template>
  <div>
    <b-button-toolbar>
      <b-button-group class="mr-1">
        <b-button title="Save file">
          <b-icon icon="cloud-upload" aria-hidden="true">
        </b-button>
        <b-button title="Load file">
          <b-icon icon="cloud-download" aria-hidden="true">
        </b-button>
        <b-button title="New document">
          <b-icon icon="document" aria-hidden="true">
        </b-button>
      </b-button-group>
      <b-button-group class="mr-1">
        <b-button title="Align left">
          <b-icon icon="text-left" aria-hidden="true">
        </b-button>
        <b-button title="Align center">
          <b-icon icon="text-center" aria-hidden="true">
        </b-button>
        <b-button title="Align right">
          <b-icon icon="text-right" aria-hidden="true">
        </b-button>
      </b-button-group>
      <b-button-group>
        <b-button title="Bold">
          <b-icon icon="type-bold" aria-hidden="true">
        </b-button>
        <b-button title="Italic">
          <b-icon icon="type-italic" aria-hidden="true">
        </b-button>
        <b-button title="Underline">
          <b-icon icon="type-underline" aria-hidden="true">
        </b-button>
        <b-button title="Strikethrough">
          <b-icon icon="type-strikethrough" aria-hidden="true">
        </b-button>
      </b-button-group>
    </b-button-toolbar>
  </div>
</template>

<!-- icons-button-toolbar.vue -->
```

### Input groups

```html
<template>
  <div>
    <b-input-group size="sm" class="mb-2">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input type="search" placeholder="Search terms"></b-form-input>
    </b-input-group>
    <b-input-group class="mb-2">
      <b-input-group-prepend is-text>
        <b-icon icon="tag-fill"></b-icon>
      </b-input-group-prepend>
      <b-form-tags
        separator=" ,;"
        tag-variant="primary"
        placeholder="Enter new tags separated by space, comma or semicolon"
        no-add-on-enter
      ></b-form-tags>
    </b-input-group>
    <b-input-group class="mb-2">
      <b-input-group-prepend is-text>
        <b-icon icon="person-fill"></b-icon>
      </b-input-group-prepend>
      <b-form-input type="text" placeholder="User ID"></b-form-input>
    </b-input-group>
    <b-input-group size="lg">
      <b-input-group-prepend is-text>
        <b-icon icon="envelope"></b-icon>
      </b-input-group-prepend>
      <b-form-input type="email" placeholder="me@example.com"></b-form-input>
    </b-input-group>
  </div>
</template>

<!-- icons-input-groups.vue -->
```

### Dropdowns

```html
<template>
  <div>
    <b-dropdown variant="primary">
      <template v-slot:button-content>
        <b-icon icon="gear-fill" class="mr-1" aria-hidden="true"></b-icon> Settings
      </template>
      <b-dropdown-item-button>
         <b-icon icon="lock-fill" class="mr-1" aria-hidden="true"></b-icon>
         Locked <span class="sr-only">(Click to unlock)</span>
      </b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-group header="Choose options" class="small">
        <b-dropdown-item-button>
           <b-icon icon="blank" class="mr-1"aria-hidden="true"></b-icon>
           Option A <span class="sr-only">(Not selected)</span>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
           <b-icon icon="check" class="mr-1" aria-hidden="true"></b-icon>
           Option B <span class="sr-only">(Selected)</span>
        </b-dropdown-item-button>
         <b-dropdown-item-button>
           <b-icon icon="blank" class="mr-1" aria-hidden="true"></b-icon>
           Option C <span class="sr-only">(Not selected)</span>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button>Some action</b-dropdown-item-button>
      <b-dropdown-item-button>Some other action</b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button variant="danger">
        <b-icon icon="trash-fill" class="mr-1" aria-hidden="true"></b-icon>
        Delete
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<!-- icons-dropdowns.vue -->
```

## Working with SVGs

SVGs are awesome to work with, but they do have some known quirks to work around.

- **Focus handling is broken in Internet Explorer and Edge.** We have added the attribute
  `focusable="false"` to the `<svg>` element. You can override this by setting the attribute
  `focusable="false"` on the icon component.
- **Browsers inconsistently announce SVGs as `<img>` tags with voice assistance.** Hence, we have
  added added the attributes `role="img"` and `alt="icon"`. You can override these attributes if
  needed.
- **Safari skips `aria-label` when used on non-focusable SVGs.** As such, use the attribute
  `aria-hidden="true"` when using the icon and use CSS to visually hide the equivalent label.
