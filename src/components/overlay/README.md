# Overlay

> BootstrapVue's custom `b-overlay` component is used to visually obscure a particular element or
> component and its content. It signals to the user of a state change within the element or
> component and can be used for creating loaders, warings/alerts and more.

`<b-overlay>` can be used to overlay (wrap) an element or component (the default behaviour),
or can be placed as a descendant of a `position: relative` element (non-wrapping mode).

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
        <b-button :disabled="show" variant="primary"@click="show = true">
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

## Overview

TBD

## Options

### Default spinner styling

TBD

#### Spinner Type

TBD

#### Spinner variant

TBD

#### Spinner size

TBD

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

### overlay centering

TBD

### Non-wrapping mode

TBD

#### Absolute vs fixed positioning for `no-wrap`

TBD

Refer to the [Accessibilty section](#accessibility) below for additional details and concerns.

## Use case examples

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
