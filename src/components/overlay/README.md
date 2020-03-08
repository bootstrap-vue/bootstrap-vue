# Overlay

> BootstrapVue's custom `b-overlay` component is used to visually obscure a particular element or
> component and its content. It signals to the user of a state change within the element or
> component and can be used for creating loaders, warings/alerts and more.

## Overview

`<b-overlay>` can be used to overlay (wrap) an element or component (the default behaviour),
or can be placed as a descendant of a `position: relative` element
([non-wrapping mode](#non-wrapping-mode)).

The overlay visibility is controlled vis the `show` prop. By default the overlay is not shown.

Note that this component only _visually obscures_ it's content (or the page). Refer to the
[Accessibilty section](#accessibility) below for additional accessibility details and concerns.

**Default wrapping mode example:**

```html
<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <b-card title="Card with overlay">
        <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
    </b-overlay>
    <b-button class="mt-3" @click="show = !show">Toggle ovelay</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>

<!-- b-overlay.vue -->
```

## Options

### Overlay backdrop color

You can control the backdrop background color via the `variant` prop. The variant is translated into
one of Boottrap's
[background variant utility classes](/docs/reference/color-variants#background-and-border-variants).
Control the opacity of the backdrop via the `opacity` prop (opacity values can range from `0` to `1`).
And background bluring can be controled via the `blur` prop.

```html
<template>
  <div>
    <b-form-group label="Variant" label-for="bg-variant">
      <b-form-select id="bg-variant" v-model="variant" :options="variants"></b-form-select>
    </b-form-group>
    <b-form-group label="Opacity" label-for="bg-opacity" :description="opacityString">
      <b-form-input id="bg-opacity" v-model="opacity" type="range" min="0" max="1" step="0.05"></b-form-input>
    </b-form-group>
    <b-form-group label="Blur" label-for="bg-blur">
      <b-form-select id="bg-blur" v-model="blur" :options="blurs"></b-form-select>
    </b-form-group>
    <b-overlay
      show
      :variant="variant"
      :opacity="opacity"
      :blur="blur"
      rounded="sm"
      style="max-width: 320px;"
    >
      <b-card title="Card with overlay">
        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </b-card-text>
        <b-button disabled variant="primary>Button</b-button>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        variant: 'light',
        opacity: 0.75,
        blur: '2px',
        variants: [
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info'
        ],
        blurs: [
          { text: 'None', value: '' },
          '1px',
          '2px',
          '5px',
          '1rem'
        ]
      }
    },
    computed: {
      opacityString() {
        return `Opacity value: ${this.opacity}`
      }
    }
  }
</script>

<!-- b-overlay-background.vue -->
```

As an alternative to the `variant` prop, you can specify a CSS color string value via the `bg-color`
prop.  When a value is provided for `bg-color`, the `variant` prop value is ignored.

### Default spinner styling

The default overlay content is a [`<b-spinner>`](/docs/components/spinner) of type `'border'`. You can
control the appearance of the spinner via the following props:

- `spinner-type`: Currenly supported values are `'border'` (the default) or `'grow'`.
- `spinner-variant`: Variant theme color for the spinner. Default is `null` which inherits the current
  font color.
- `spinner-small`: Set to `true` to render a small size spinner.

```html
<template>
  <div>
    <b-overlay
      show
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
      style="max-width: 320px;"
    >
      <b-card title="Card with spinner style">
        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </b-card-text>
        <b-button disabled variant="primary>Button</b-button>
      </b-card>
    </b-overlay>
  </div>
</template>

<!-- b-overlay-spiner-style.vue -->
```

### Overlay corner rounding

TBD

### Custom overlay content

TBD

```html
<template>
  <div>
    <b-overlay :show="show" rounded="sm" spinner-variant="primary" spinner-small>
      <b-card title="Card with overlay">
        <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button :disabled="show" variant="primary"@click="show = true">
          Show overlay
        </b-button>
      </b-card>
      <template v-slot:overlay="scope">
        <div class="text-center">
          <p>
            <b-spinner type="grow" :small="scope.spinnerSmall" :varaint="scope.spinnerVariant"></b-spinner>
            Please wait...
            <b-spinner type="grow" :small="scope.spinnerSmall" :varaint="scope.spinnerVariant"></b-spinner>
          </p>
          <b-button variant="outline-danger" size="sm" @click="show = false">Cencel</b-button>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>

<!-- b-overlay-overlay-slot.vue -->
```

### Overlay content centering

By default the overlay content will be horizontally and vertically centered within the overlay
regions. To disabled centering, set the `no-center` prop to `true`.

### Non-wrapping mode

TBD

Refer to the [Accessibilty section](#accessibility) below for additional details and concerns.

#### Absolute vs fixed positioning for `no-wrap`

TBD

## Accessibility

When using the wraping mode (prop `no-wrap` is not set), the wrapper will have the attribute
`aria-bus="true"` set, to allow screen reader users to know the element is in a busy or loading
state. When prop `no-wrap` is set, then the attribute will not be applied.

Note that the overlay is visual only. You **must** disable any interactive elements (buttons, links,
etc.) when the overlay is showing, otherwise the obscured elements will still be reachable via
keyboard navigation (i.e. still in the document tab sequence).

When using the `no-wrap` prop, and potentially the `fixed` prop, to obscure the entire application or
page, you must ensure that internative page elements (other than the content of the overlay) have been
disabled and are not in the document tab sequence.
