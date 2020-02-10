# Form Spinbutton

> Spinbuttons are a BottstrapVue custom numerical range form control. Spin buttons allow for incrementing
> or decrementing a numerical value within a range of a minimum and maximum number, with optional step
> value.

`<b-form-spinbutton>` is WAI_ARIA compliant, allowing for keyboard control, and support both horizontal
(default) and vertical layout.

```html
<template>
  <div>
    <label for="demo-sb">Spin Button</label>
    <b-form-spinbutton id="demo-sb" v-model="value" min="1" max="100"></b-form-spinbutton>
    <p>Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 50
      }
    }
  }
</script>

<!-- b-spin-botton-demo.vue -->
```

## Overview

Spinbuttons have a default range from `1` to `100`, which can be changed by setting the `min` and
`max` props.  The default step increment is `1`, which can be changed via the `step` prop (decimal
values allowed).

When `step` is set, the value will always be a multiple of the step size plus the minimum value.

The <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd> keys can be used to increment or decrement the
value.

## Styling

### Size

As with other form controls, `<b-form-spinbutton>` supports small and large sizing via setting the
`size` prop to either `'sm'` or `'lg'`, respectively.

```html
<template>
  <div>
    <label for="sb-small">Spin button - Small size</label>
    <b-form-spinbutton id="sb-small" size="sm" class="mb-2"></b-form-spinbutton>

    <label for="db-default">Spin button - Default size</label>
    <b-form-spinbutton id="sb-default" class="mb-2"></b-form-spinbutton>

    <label for="db-large">Spin button - Large size</label>
    <b-form-spinbutton id="sb-large" size="lg" class="mb-2"></b-form-spinbutton>
  </div>
</template>

<!-- b-spin-botton-size.vue -->
```

### Inline

TBD

### Vertical

Spinbuttons can be oriented in vertical mode

```html
<template>
  <div>
    <label for="sb-vertical">Vertical spin button</label><br>
    <b-form-spinbutton id="sb-vertical" vertical></b-form-spinbutton>
  </div>
</template>

<!-- b-spin-botton-vertical.vue -->
```

Vertical spinbuttons can also be sized.

### Width

TBD

### Using in input groups

TBD

## Validation states

TBD

## Events

TBD

## Accessibility

TBD
