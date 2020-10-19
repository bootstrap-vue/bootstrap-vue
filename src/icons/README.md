# Bootstrap Icons

> Bootstrap Icons are designed to work with Bootstrap components, from form controls to navigation.
> Bootstrap Icons are SVGs, so they scale quickly and easily and can be styled with CSS. While they
> are built for Bootstrap, they will work in any project.

BootstrapVue icon components are built from
[`bootstrap-icons` v{{ bootstrapIconsVersion }}](https://icons.getbootstrap.com/) source SVGs. Icons
are opt-in, meaning that they explicitly need to be imported in order to be used. They are not
installed by default. You do not need `bootstrap-icons` as a dependency.

- Icon components were added in BootstrapVue release `v2.2.0`.
- Bootstrap Icons `v1.0.0-alpha3` icons were added in BootstrapVue release `v2.8.0`.
- Bootstrap Icons `v1.0.0-alpha4` icons were added in BootstrapVue release `v2.15.0`.
- Bootstrap Icons `v1.0.0-alpha5` icons were added in BootstrapVue release `v2.16.0`.
- Bootstrap Icons `v1.0.0` icons were added in BootstrapVue release `v2.17.0`.

<div class="alert alert-info small">
  <p class="mb-2">
    <strong>Note:</strong>
    <a href="https://icons.getbootstrap.com/" target="_blank" rel="noopener">Bootstrap's Icon</a> SVGs
    are currently in the <b>alpha release stage</b>, and may be subject to _sweeping_ changes.
  </p>
  <ul class="mb-0">
    <li>
      <strong><code>v1.0.0-alpha3</code> changes:</strong> In addition to over 200 new icons,
      some icons have changed names &mdash; <code>document-*</code> icons renamed <code>file-*</code>;
      <code>alert-*</code> icons renamed <code>exclamation-*</code>; <code>columns-gutters</code>
      renamed <code>columns-gap</code> and <code>diamond</code> renamed <code>gem</code> (because of
      new <code>diamond-*</code> shape icons).
    </li>
    <li>
      <strong><code>v1.0.0-alpha4</code> changes:</strong> In addition to over 140 new icons,
      some icons have changed names &mdash; <code>arrow-up-down</code> renamed
      <code>arrow-down-up</code> and <code>people-circle</code> renamed <code>person-circle</code>.
    </li>
    <li>
      <strong><code>v1.0.0-alpha5</code> changes:</strong> In addition to over 300 new icons,
      some icons have changed names &mdash; <code>camera</code> renamed <code>camera2</code>.
    </li>
    <li>
      <strong><code>v1.0.0</code> changes:</strong> Over 90 new icons were added and over 400 redrawn.
    </li>
  </ul>
</div>

## Usage

BootstrapVue icons are not automatically installed when using BootstrapVue in your project, you must
explicitly include them.

Icons inherit the current font color and font size from their parent container element. To change
the color of the icon, refer to the [Variants](#variants) section, and to change the size of the
icon refer to the [Sizing](#sizing) section.

All icons are exported with the name in <samp>PascalCase</samp>, prefixed with <samp>BIcon</samp>.
i.e icon `'alert-circle-fill'` is exported as `BIconAlertCircleFill`, icon `'x'` is exported as
`BIconX`, and icon `'x-square-fill'` is exported as `BIconXSquareFill`.

### Module bundlers

**Importing all icons:**

```js
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
```

Or

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

If you are using _only_ `BootstrapVueIcons` or `IconsPlugin` in your project, you can also just
import the required icons CSS, rather than the full Bootstrap and BootstrapVue SCSS/CSS.

```js
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVueIcons)
```

Or if using the icons SCSS source:

```js
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/src/icons.scss'

Vue.use(BootstrapVueIcons)
```

BootstrapVue icons SCSS/CSS does not depend on any Bootstrap SASS variables, mixins, functions or
CSS classes (other than the Bootstrap `text-{variant}` text color utility classes, if using the
`variant` prop). Please note that the icons CSS is _also_ included in the main BootstrapVue SCSS/CSS
files. Animations effects require BootstrapVue custom SCSS/CSS.

### Browser

Icons are **not** installed by default in the UMD browser build, so you must explicitly include the
icons library:

```html
<head>
  <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
  <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />
  <!-- Load Vue followed by BootstrapVue, and BootstrapVueIcons -->
  <script src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
  <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>
  <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js"></script>
</head>
```

If using just the icons:

```html
<head>
  <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
  <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.css" />
  <!-- Load Vue followed by BootstrapVueIcons -->
  <script src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
  <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js"></script>
</head>
```

### Icon components

You can either uses individual icon components, or use the icon helper component `<b-icon>`, to
place icons in your project templates.

All individual icon components are prefixed with the name `<b-icon-{name}>`, where `{name}` is one
of the icon names listed in the [Icons](#icons) section above.

**Using individual icon components:**

```html
<template>
  <div class="h2 mb-0">
    <b-icon-arrow-up></b-icon-arrow-up>
    <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
  </div>
</template>

<!-- icons-individual-usage.vue -->
```

**Using the `<b-icon>` helper component:**

```html
<template>
  <div class="h2 mb-0">
    <b-icon icon="arrow-up"></b-icon>
    <b-icon icon="exclamation-triangle"></b-icon>
  </div>
</template>

<!-- icons-helper-usage.vue -->
```

**Note:** when using `<b-icon>`, you **must** also import the required individual icon components,
unless you are using the `IconsPlugin` or `BootstrapVueIcons` plugin.

## Variants

By default, icons inherit the current text color of their parent element. All icon components
provide a `variant` prop to apply one of the Bootstrap contextual text variant colors:

```html
<template>
  <div class="h2 mb-0">
    <b-icon icon="exclamation-circle-fill" variant="success"></b-icon>
    <b-icon icon="exclamation-circle-fill" variant="warning"></b-icon>
    <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
    <b-icon icon="exclamation-circle-fill" variant="info"></b-icon>
    <b-icon icon="exclamation-circle-fill" variant="primary"></b-icon>
    <b-icon icon="exclamation-circle-fill" variant="secondary"></b-icon>
    <b-icon icon="exclamation-circle-fill" variant="dark"></b-icon>
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

The `variant` prop places the [color utility class](/docs/reference/color-variants) `text-{variant}`
on the icon's root element.

## Sizing

Icons have a default width and height of `1em`, which means they will scale with the size of the
current font size:

```html
<template>
  <div>
    <p class="h1 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
    <p class="h2 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
    <p class="h3 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
    <p class="h4 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
    <p class="h5 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
  </div>
</template>

<!-- icons-size-inherit.vue -->
```

You can also use custom CSS to set the icon size, either via direct `style` attribute, or via custom
classes:

```html
<template>
  <div>
    <b-icon icon="exclamation-circle" style="width: 120px; height: 120px;"></b-icon>
  </div>
</template>

<!-- icons-size-css.vue -->
```

You can also use the prop `font-scale` to scale the icon's current font size by the specified
factor:

```html
<template>
  <div>
    <b-icon icon="camera" font-scale="0.5"></b-icon>
    <b-icon icon="camera" font-scale="1"></b-icon>
    <b-icon icon="camera" font-scale="2"></b-icon>
    <b-icon icon="camera" font-scale="3"></b-icon>
    <b-icon icon="camera" font-scale="4"></b-icon>
    <b-icon icon="camera" font-scale="5"></b-icon>
    <b-icon icon="camera" font-scale="7.5"></b-icon>
  </div>
</template>

<!-- icons-size-font-size-prop.vue -->
```

Also see the [scaling transforms](#scale) section below for additional sizing options.

## Styling

With the use of Bootstrap's border, background and padding
[utility classes](/docs/reference/utility-classes), you can create various styling effects:

```html
<template>
  <div style="font-size: 4rem;">
    <b-icon icon="bell-fill" class="border rounded p-2"></b-icon>
    <b-icon icon="bell-fill" class="border border-info rounded p-2" variant="info"></b-icon>
    <b-icon icon="bell-fill" class="rounded-circle bg-danger p-2" variant="light"></b-icon>
    <b-icon icon="unlock-fill" class="rounded bg-primary p-1" variant="light"></b-icon>
  </div>
</template>

<!-- icons-styling.vue -->
```

## SVG transforms

BootstrapVue icons provide several props for applying basic SVG transforms to the `<svg>`. All
transforms can be combined for added effect. Note that the transforms are applied to the `<svg>`
_content_ and not the `<svg>` bounding box.

### Flipping

Flip the icon horizontally and/or vertically via the `flip-h` and `flip-v` props.

```html
<template>
  <div style="font-size: 4rem;">
    <b-icon icon="bar-chart-fill"></b-icon>
    <b-icon icon="bar-chart-fill" flip-h></b-icon>
    <b-icon icon="bar-chart-fill" flip-v></b-icon>
    <b-icon icon="bar-chart-fill" flip-h flip-v></b-icon>
  </div>
</template>

<!-- icons-transform-flip.vue -->
```

### Rotate

Rotate the icon by a specified number of degrees via the `rotate` prop. Positive values will rotate
the icon clockwise, while negative values will rotate the icon counterclockwise.

```html
<template>
  <div style="font-size: 4rem;">
    <b-icon icon="camera"></b-icon>
    <b-icon icon="camera" rotate="45"></b-icon>
    <b-icon icon="camera" rotate="90"></b-icon>
    <b-icon icon="camera" rotate="180"></b-icon>
    <b-icon icon="camera" rotate="270"></b-icon>
    <b-icon icon="camera" rotate="-45"></b-icon>
  </div>
</template>

<!-- icons-transform-rotate.vue -->
```

Note that any [flipping](#flipping) is performed before the rotation is applied.

### Scale

Scale the icon by any positive factor via the `scale` prop. Note this changes the icon's visual size
but not its physical font size. To illustrate this we have added a background color to the icons.

```html
<template>
  <b-row cols="2" cols-sm="4" class="text-center" style="font-size: 4rem;">
    <b-col class="mb-2">
      <b-icon icon="exclamation-circle" scale="0.5" class="bg-info"></b-icon>
    </b-col>
    <b-col class="mb-2">
      <b-icon icon="exclamation-circle" class="bg-info"></b-icon>
    </b-col>
    <b-col class="mb-2">
      <b-icon icon="exclamation-circle" scale="1.5" class="bg-info"></b-icon>
    </b-col>
    <b-col class="mb-2">
      <b-icon icon="exclamation-circle" scale="2" class="bg-info"></b-icon>
    </b-col>
  </b-row>
</template>

<!-- icons-transform-scale.vue -->
```

If you need to have the background and/or border scale with the icon, use the `font-scale` prop
instead.

### Shifting

Shifting affects icon location without changing or moving the svg container. To move icons on the
horizontal and/or vertical axis, use the `shift-h` and `shift-v` props with any arbitrary numeric
value, including decimals.

For `shift-v`, positive values will move the icon upwards, while negative values will move the icon
downwards. For `shift-h`, positive values will move the icon to the right, while negative values
will move it left. Both props accept values that are in units of 1/16em (relative to the icon's
current _font size_).

For clarity in the example, we’ve added a background color on the icon so you can see the effect.

```html
<template>
  <b-row cols="2" cols-sm="4" class="text-center" style="font-size: 4rem;">
    <b-col class="py-4 mb-2">
      <b-icon icon="exclamation-circle" class="bg-info"></b-icon>
    </b-col>
    <b-col class="py-4 mb-2">
      <b-icon icon="exclamation-circle" shift-v="8" class="bg-info"></b-icon>
    </b-col>
    <b-col class="py-4 mb-2">
      <b-icon icon="exclamation-circle" shift-v="-8" class="bg-info"></b-icon>
    </b-col>
    <b-col class="py-4 mb-2">
      <b-icon icon="exclamation-circle" shift-h="8" class="bg-info"></b-icon>
    </b-col>
    <b-col class="py-4 mb-2">
      <b-icon icon="exclamation-circle" shift-h="-8" class="bg-info"></b-icon>
    </b-col>
    <b-col class="py-4 mb-2">
      <b-icon icon="exclamation-circle" shift-v="16" class="bg-info"></b-icon>
    </b-col>
    <b-col class="py-4 mb-2">
      <b-icon icon="exclamation-circle" shift-h="-8" shift-v="-8" class="bg-info"></b-icon>
    </b-col>
    <b-col class="py-4 mb-2">
      <b-icon
        icon="exclamation-circle"
        scale="0.5"
        rotate="45"
        shift-h="-4"
        shift-v="4"
        class="bg-info"
      ></b-icon>
    </b-col>
  </b-row>
</template>

<!-- icons-transform-shift.vue -->
```

Shifting is applied after any rotation transforms. As with scaling, backgrounds and borders are not
affected. If you need to shift the border/background with the icon, use Bootstrap's margin
[spacing utility classes](/docs/reference/utility-classes).

## Animated icons

<span class="badge badge-info small">v2.7.0+</span>

BootstrapVue includes the following built-in animations for icons:

- `'cylon'` slides the icon left-right
- `'cylon-vertical'` slides the icon up-down
- `'fade'` fades the icon in and out <span class="badge badge-info small">2.12.0+</span>
- `'spin'` smoothly spins the icon clockwise
- `'spin-reverse'` smoothly spins the icon counter-clockwise
- `'spin-pulse'` spins the icon clockwise, but in a pulsed step style
- `'spin-reverse-pulse'` spins the icon counter-clockwise, but in a pulsed step style
- `'throb'` scales the icon in and out <span class="badge badge-info small">2.12.0+</span>

To use the animation, set the `animation` prop to one of the animation names above.

```html
<template>
  <b-row class="text-md-center">
    <b-col md="6" class="mb-3">
      <p>Cylon animation:</p>
      <b-icon icon="three-dots" animation="cylon" font-scale="4"></b-icon>
    </b-col>
    <b-col md="6" class="mb-3">
      <p>Vertical cylon animation:</p>
      <b-icon icon="three-dots-vertical" animation="cylon-vertical" font-scale="4"></b-icon>
    </b-col>
    <b-col md="6" class="mb-3">
      <p>Fade animation:</p>
      <b-icon icon="star-fill" animation="fade" font-scale="4"></b-icon>
    </b-col>
    <b-col md="6" class="mb-3">
      <p>Spinning animation:</p>
      <b-icon icon="arrow-clockwise" animation="spin" font-scale="4"></b-icon>
    </b-col>
    <b-col md="6" class="mb-3">
      <p>Reverse spinning animation:</p>
      <b-icon icon="arrow-counterclockwise" animation="spin-reverse" font-scale="4"></b-icon>
    </b-col>
    <b-col md="6" class="mb-3">
      <p>Pulsing spin animation:</p>
      <b-icon icon="arrow-clockwise" animation="spin-pulse" font-scale="4"></b-icon>
    </b-col>
    <b-col md="6" class="mb-3">
      <p>Reversed pulsing spin animation:</p>
      <b-icon icon="arrow-counterclockwise" animation="spin-reverse-pulse" font-scale="4"></b-icon>
    </b-col>
    <b-col md="6" class="mb-3">
      <p>Throb animation:</p>
      <b-icon icon="circle-fill" animation="throb" font-scale="4"></b-icon>
    </b-col>
  </b-row>
</template>

<!-- b-icon-aminations.vue -->
```

As the animations are CSS based, they are applied _after_ any SVG transforms have taken place:

```html
<template>
  <div class="p-4">
    <b-icon icon="clock" animation="spin" font-scale="4" shift-v="8"></b-icon>
  </div>
</template>

<!-- b-icon-aminations-transforms.vue -->
```

The BootstrapVue defined icon animation effects require BootstrapVue's custom CSS. The `animation`
prop translates to the class name `b-icon-animation-{animationName}`.

Need a different style animation? Just create a custom class defining the animation, and apply that
class to the icon component, or create a new animation class in the form of
`b-icon-animation-{animationName}` and pass the custom animation name to the `animation` prop.

**Animation notes:**

- With the `cylon` animations, the left-right movement (or up-down movement) extends _past_ the
  icon's bounding box by `+/- 25%`, so you may need to adjust padding or margins to compensate for
  your use case.
- Animation durations can be [configured via SASS SCSS variables](/docs/reference/theming)
- The BootstrapVue defined animation effects of this component is dependent on the
  `prefers-reduced-motion` media query. See the
  [reduced motion section of our accessibility documentation](/docs/reference/accessibility#reduced-motion)
  for additional details.
- The `cylon` animation gets its name from the "eye" of the Cylons from the _original_
  [1978 Battlestar Galactica TV series](https://www.youtube.com/watch?v=5a5bEIf0UaU).

## Stacking icons

<span class="badge badge-info small">v2.3.0+</span>

Combine icons together via the use of the component `<b-iconstack>` and the `stacked` prop on
individual icons (`<b-icon>` or `<b-icon-{icon-name}>`) to create complex icons:

```html
<template>
  <div>
    <b-iconstack font-scale="5">
      <b-icon stacked icon="camera" variant="info" scale="0.75"></b-icon>
      <b-icon stacked icon="slash-circle" variant="danger"></b-icon>
    </b-iconstack>

    <b-iconstack font-scale="5" rotate="90">
      <b-icon stacked icon="chevron-right" shift-h="-4" variant="danger"></b-icon>
      <b-icon stacked icon="chevron-right" shift-h="0" variant="success"></b-icon>
      <b-icon stacked icon="chevron-right" shift-h="4" variant="primary"></b-icon>
    </b-iconstack>

    <b-iconstack font-scale="5">
      <b-icon stacked icon="circle-fill" variant="info"></b-icon>
      <b-icon stacked icon="bell-fill" scale="0.5" variant="white"></b-icon>
      <b-icon stacked icon="circle" variant="danger"></b-icon>
    </b-iconstack>

    <b-iconstack font-scale="5" variant="white">
      <b-icon stacked icon="square-fill" variant="dark"></b-icon>
      <b-icon stacked icon="arrow-up-short" scale="0.5" shift-v="3" shift-h="-3"></b-icon>
      <b-icon stacked icon="arrow-up-short" scale="0.5" shift-v="3" shift-h="3" rotate="90"></b-icon>
      <b-icon stacked icon="arrow-up-short" scale="0.5" shift-v="-3" shift-h="3" rotate="180"></b-icon>
      <b-icon stacked icon="arrow-up-short" scale="0.5" shift-v="-3" shift-h="-3" rotate="270"></b-icon>
    </b-iconstack>

    <b-iconstack font-scale="5">
      <b-icon stacked icon="square"></b-icon>
      <b-icon stacked icon="check"></b-icon>
    </b-iconstack>

    <b-iconstack font-scale="5">
      <b-icon stacked icon="square"></b-icon>
      <b-icon stacked icon="dot" shift-h="-3" shift-v="4"></b-icon>
      <b-icon stacked icon="dot" shift-h="-3"></b-icon>
      <b-icon stacked icon="dot" shift-h="-3" shift-v="-4"></b-icon>
      <b-icon stacked icon="dot" shift-h="3" shift-v="4"></b-icon>
      <b-icon stacked icon="dot" shift-h="3"></b-icon>
      <b-icon stacked icon="dot" shift-h="3" shift-v="-4"></b-icon>
    </b-iconstack>
  </div>
</template>

<!-- b-iconsstack.vue -->
```

`<b-iconstack>` supports the same `variant`, `font-size`, `animation` and transformation props
available on individual icons.

Stacked icon notes:

- Remember to set the `stacked` prop on the inner icon components!
- The `font-scale` prop cannot be used on the inner icon components
- The `width` and `height` attributes cannot be applied to the inner icon components
- Stacked icons **cannot** be stacked inside another `<b-iconstack>`

### Stacked icon animation

The `<b-iconstack>` component supports the same animations as individual icons:

```html
<template>
  <div>
    <b-iconstack font-scale="5" animation="spin">
      <b-icon stacked icon="camera" variant="info" scale="0.75" shift-v="-0.25"></b-icon>
      <b-icon stacked icon="slash-circle" variant="danger"></b-icon>
    </b-iconstack>
  </div>
</template>

<!-- b-iconstack-animation.vue -->
```

Individual icons within the icon stack can also be animated (except on IE 11):

```html
<template>
  <div>
    <b-iconstack font-scale="5" animation="cylon">
      <b-icon
        stacked
        icon="camera"
        animation="throb"
        variant="info"
        scale="0.75"
      ></b-icon>
      <b-icon
        stacked
        icon="slash-circle"
        animation="spin-reverse"
        variant="danger"
      ></b-icon>
    </b-iconstack>
  </div>
</template>

<!-- b-iconstack-animation-child-icons.vue -->
```

**Notes:**

- IE 11 does not support animation of child elements within an SVG, hence only the `<b-iconstack>`
  component can be animated. The child icon(s) animation will not be visible to IE 11 users.
- The BootstrapVue defined animation effects of this component is dependent on the
  `prefers-reduced-motion` media query. See the
  [reduced motion section of our accessibility documentation](/docs/reference/accessibility) for
  additional details.

## Using in components

Easily place icons as content in other components.

Note that icons placed in BootstrapVue components use BootstrapVue's custom CSS for additional
styling compensation due to current issues with Bootstrap Icons `<svg>` alignment implementation,
and for additional aesthetic scaling (icons placed in the components listed below will have their
font scaled by 125%).

### Buttons

```html
<template>
  <div>
    <b-button size="sm" class="mb-2">
      <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings
    </b-button>
    <br>
    <b-button variant="primary" class="mb-2">
      Pay now <b-icon icon="credit-card" aria-hidden="true"></b-icon>
    </b-button>
    <br>
    <b-button variant="outline-info" class="mb-2">
      <b-icon icon="power" aria-hidden="true"></b-icon> Logout
    </b-button>
    <br>
    <b-button size="lg" variant="primary" class="mb-2">
      <b-icon icon="question-circle-fill" aria-label="Help"></b-icon>
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
        <b-icon icon="tools"></b-icon> Settings
      </b-button>
      <b-button variant="outline-primary">
        <b-icon icon="person-fill"></b-icon> Account
      </b-button>
      <b-button variant="outline-primary">
        <b-icon icon="inbox-fill"></b-icon> Messages
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
          <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="Load file">
          <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="New document">
          <b-icon icon="file-earmark" aria-hidden="true"></b-icon>
        </b-button>
      </b-button-group>
      <b-button-group class="mr-1">
        <b-button title="Align left">
          <b-icon icon="text-left" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="Align center">
          <b-icon icon="text-center" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="Align right">
          <b-icon icon="text-right" aria-hidden="true"></b-icon>
        </b-button>
      </b-button-group>
      <b-button-group>
        <b-button title="Bold">
          <b-icon icon="type-bold" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="Italic">
          <b-icon icon="type-italic" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="Underline">
          <b-icon icon="type-underline" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="Strikethrough">
          <b-icon icon="type-strikethrough" aria-hidden="true"></b-icon>
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

### List groups

```html
<template>
  <b-list-group>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
      <b-icon icon="x-circle" scale="2" variant="danger"></b-icon>
      Cras justo odio
    </b-list-group-item>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
      <b-icon icon="exclamation-triangle-fill" scale="2" variant="warning"></b-icon>
      Dapibus ac facilisis in
    </b-list-group-item>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
      <b-icon icon="info-circle-fill" scale="2" variant="info"></b-icon>
      Morbi leo risus
    </b-list-group-item>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
      <b-icon icon="check-box" scale="2" variant="success"></b-icon>
      Incididunt veniam velit
    </b-list-group-item>
  </b-list-group>
</template>

<!-- icons-list-groups.vue -->
```

### Dropdowns

```html
<template>
  <div>
    <b-dropdown variant="primary">
      <template #button-content>
        <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings
      </template>
      <b-dropdown-item-button>
         <b-icon icon="lock-fill" aria-hidden="true"></b-icon>
         Locked <span class="sr-only">(Click to unlock)</span>
      </b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-group header="Choose options" class="small">
        <b-dropdown-item-button>
           <b-icon icon="blank" aria-hidden="true"></b-icon>
           Option A <span class="sr-only">(Not selected)</span>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
           <b-icon icon="check" aria-hidden="true"></b-icon>
           Option B <span class="sr-only">(Selected)</span>
        </b-dropdown-item-button>
         <b-dropdown-item-button>
           <b-icon icon="blank" aria-hidden="true"></b-icon>
           Option C <span class="sr-only">(Not selected)</span>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button>Some action</b-dropdown-item-button>
      <b-dropdown-item-button>Some other action</b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button variant="danger">
        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
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

## Icons

The library includes over {{ bootstrapIconsCount }} icons. Use the explorer below to search and
browse the available icons.

<!-- Component rendered by `docs/pages/docs/icons.index.js` -->
<!-- We use a `<div is="...">` to prevent marked loader from mangling the unknown tag -->
<div is="IconsTable"></div>
