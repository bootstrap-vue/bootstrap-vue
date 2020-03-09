# Overlay

> BootstrapVue's custom `b-overlay` component is used to visually obscure a particular element or
> component and its content. It signals to the user of a state change within the element or
> component and can be used for creating loaders, warnings/alerts and more.

The component `<b-overlay>` was introduced in BootstrapVue version `v2.7.0`.

## Overview

`<b-overlay>` can be used to overlay (wrap) an element or component (the default behaviour), or can
be placed as a descendant of a `position: relative` element
([non-wrapping mode](#non-wrapping-mode)).

The overlay visibility is controlled vis the `show` prop. By default the overlay is not shown.

<div class="alert alert-info">
  <p class="mb-0">
    Note that this component only <em>visually obscures</em> its content (or the page). Refer to the
    <a href="#accessibility" class="alert-link">Accessibility section</a> below for additional
    accessibility details and concerns.
  </p>
</div>

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
    <b-button class="mt-3" @click="show = !show">Toggle overlay</b-button>
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
one of Bootstrap's
[background variant utility classes](/docs/reference/color-variants#background-and-border-variants).
Control the opacity of the backdrop via the `opacity` prop (opacity values can range from `0` to
`1`). And background blurring can be controlled via the `blur` prop.

```html
<template>
  <div>
    <b-row>
      <b-col lg="6">
        <b-form-group label="Variant" label-for="bg-variant">
          <b-form-select id="bg-variant" v-model="variant" :options="variants"></b-form-select>
        </b-form-group>
        <b-form-group label="Opacity" label-for="bg-opacity" :description="opacityString">
          <b-form-input
            id="bg-opacity"
            v-model="opacity"
            type="range"
            min="0"
            max="1"
            step="0.01"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Blur" label-for="bg-blur">
          <b-form-select id="bg-blur" v-model="blur" :options="blurs"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col lg="6">
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
            <b-button disabled variant="primary">Button</b-button>
          </b-card>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        variant: 'light',
        opacity: 0.85,
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
prop. When a value is provided for `bg-color`, the `variant` prop value is ignored.

**Notes:**

- Background blurring is not available on some browsers (e.g. IE 11).
- Blurring requires that the opacity level be relatively high for the effect to be visible.

### Fade transition

By default, the overlay uses Bootstrap's fade transition when showing or hiding. You can disable the
fade transition via adding the `no-fade` prop to `<b-overlay>`.

### Default spinner styling

The default overlay content is a [`<b-spinner>`](/docs/components/spinner) of type `'border'`. You
can control the appearance of the spinner via the following props:

- `spinner-type`: Currently supported values are `'border'` (the default) or `'grow'`.
- `spinner-variant`: Variant theme color for the spinner. Default is `null` which inherits the
  current font color.
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
        <b-button disabled variant="primary">Button</b-button>
      </b-card>
    </b-overlay>
  </div>
</template>

<!-- b-overlay-spinner-style.vue -->
```

### Overlay corner rounding

By default, the overlay backdrop has square corners. If the content you are wrapping has rounded
corners, you can use the `rounded` prop to apply rounding to the overlay's corners to match the
obscured content's rounded corners.

Possible values are:

- `true` (or the empty string `''`) to apply default (medium) rounding
- `false` (the default) applies no rounding to the backdrop overlay
- `'sm'` for small rounded corners
- `'lg'` for large rounded corners
- `'pill'` for pill style rounded corners
- `'circle'` for circular (or oval) rounding
- `'top'` for rounding only the top two corners
- `'bottom'` for rounding only the bottom two corners
- `'left'` for rounding only the two left corners
- `'right'` for rounding only the two right corners

```html
<template>
  <div>
    <b-button @click="show = !show">Toggle overlay</b-button>
    <b-row class="text-center mt-3">
      <b-col md="6">
        <p>With rounding</p>
        <b-overlay :show="show" class="d-inline-block" rounded="circle">
          <b-img thumbnail rounded="circle" fluid src="https://picsum.photos/200/200/?image=54" alt="Image 1"></b-img>
        </b-overlay>
      </b-col>
      <b-col md="6">
        <p>Without rounding</p>
        <b-overlay :show="show" class="d-inline-block">
          <b-img thumbnail rounded="circle" fluid src="https://picsum.photos/200/200/?image=54" alt="Image 1"></b-img>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true
      }
    }
  }
</script>

<!-- b-overlay-rounded.vue -->
```

### Custom overlay content

Place custom content in the overlay (replacing the default spinner) via the optionally scoped slot
`overlay`.

```html
<template>
  <div>
    <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
      <b-card title="Card with custom overlay content">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button ref="show" :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3"></b-icon>
          <p id="cancel-label">Please wait...</p>
          <b-button
            ref="cancel"
            variant="outline-danger"
            size="sm"
            aria-describedby="cancel-label"
            @click="show = false"
          >
            Cancel
          </b-button>
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
    },
    methods: {
      onShown() {
        // Focus the cancel button when the overlay is showing
        this.$refs.cancel.focus()
      },
      onHidden() {
        // Focus the show button when the overlay is removed
        this.$refs.show.focus()
      }
    }
  }
</script>

<!-- b-overlay-overlay-slot.vue -->
```

The following scope properties are available to the `overlay` slot:

| Property         | Description                         |
| ---------------- | ----------------------------------- |
| `spinnerVariant` | Value of the `spinner-variant` prop |
| `spinnerType`    | Value of the `spinner-type` prop    |
| `spinnerSmall`   | Value of the `spinner-small` prop   |

When placing interactive content in the overlay, you should focus the container of the custom
content or one of the focusable controls in the overlay content for accessibility reasons. You can
listen for the `<b-overlay>` `'shown'` event to know when the overlay content is available in the
document.

### Overlay content centering

By default the overlay content will be horizontally and vertically centered within the overlay
region. To disabled centering, set the `no-center` prop to `true`.

### Non-wrapping mode

By default, `<b-overlay>` wraps the content of the default slot. In some cases you may want to
obscure a parent container. Use the `no-wrap` prop to disable rendering of the wrapping (and ignore
the default slot). Note that this requires that the ancestor element that is to be obscured to have
relative positioning (either via the utility class `'position-relative'`, or CSS style
`'position: relative;'`).

```html
<template>
  <div>
    <div class="position-relative p-4 bg-info">
      <p class="text-light font-weight-bold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <p>
      <b-card title="Card with parent overlay">
        <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
      <p class="text-light font-weight-bold mb-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <b-overlay :show="show" no-wrap>
      </b-overlay>
    </div>
    <b-button class="mt-3" @click="show = !show">Toggle overlay</b-button>
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

Note that some of Bootstrap v4's component styles have relative positioning defined (e.g. cards,
cols, etc.). You may need to adjust the placement of `<b-overlay>` is your markup.

When in `no-wrap` mode, `<b-overlay>` will not set the `aria-busy` attribute on the obscured
element. You may also want to use an `aria-live` region in your app that announces to screen reader
users that the page is busy.

Refer to the [Accessibility section](#accessibility) below for additional details and concerns.

#### Absolute vs fixed positioning for `no-wrap`

In cases where you want to obscure the entire app or page, when using the `no-wrap` prop, you can
switch to viewport fixed positioning via setting the prop `fixed` on `<b-overlay>`. Note that this
does not disable scrolling of the page, and note that any interactive elements on the page will
still be in the document tab sequence.

You may also need to adjust the z-index of the overlay to ensure that the backdrop appears above all
other page elements. Use the `z-index` property to override the default z-index value.

Refer to the [Accessibility section](#accessibility) below for additional details and concerns.

## Accessibility

When using the wrapping mode (prop `no-wrap` is not set), the wrapper will have the attribute
`aria-bus="true"` set, to allow screen reader users to know the element is in a busy or loading
state. When prop `no-wrap` is set, then the attribute will not be applied.

Note that the overlay is visual only. You **must** disable any interactive elements (buttons, links,
etc.) when the overlay is showing, otherwise the obscured elements will still be reachable via
keyboard navigation (i.e. still in the document tab sequence).

If you are placing interactive content in the `overlay` slot, you should focus the content once the
`'shown'` event has been emitted.

When using the `no-wrap` prop, and potentially the `fixed` prop, to obscure the entire application
or page, you must ensure that internative page elements (other than the content of the overlay) have
been disabled and are not in the document tab sequence.
