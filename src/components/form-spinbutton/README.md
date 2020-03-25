# Form Spinbutton

> Spin buttons are a BootstrapVue custom numerical range form control. Spin buttons allow for
> incrementing or decrementing a numerical value within a range of a minimum and maximum number,
> with optional step value.

## Overview

`<b-form-spinbutton>` was introduced in BootstrapVue `v2.5.0`.

The component `<b-form-spinbutton>` is
[WAI-ARIA compliant](https://www.w3.org/TR/wai-aria-practices-1.2/#spinbutton), allowing for
[keyboard control](#accessibility), and supports both horizontal (default) and vertical layout.

Similar to [range type inputs](/docs/components/form-input#range-type-input), BootstrapVue's
`<b-form-spinbutton>` _does not_ allow the user to type in a value.

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

<!-- b-form-spinbutton-demo.vue -->
```

The <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd> keys can be used to increment or decrement the
value.

To be submitted via native browser form submits, the spinbutton must have a name set via the `name`
prop. This will create a hidden input containing the current value of the spinbutton. If the
spinbutton does not have a value, the hidden input's value will be an empty string.

## `v-model` value

The `v-model` always returns the value as a number. The `v-model` can be `null` if no initial value
is set.

If the initial value is `null` no value will be displayed in the spinbutton. Use the `placeholder`
prop to show a string when the spinbutton has no value (i.e. `placeholder="--"`).

## Min, max, and step

Spinbuttons have a default range from `1` to `100`, which can be changed by setting the `min` and
`max` props. The default step increment is `1`, and can be changed via the `step` prop (decimal
values allowed).

When `step` is set, the value will always be a multiple of the step size plus the minimum value.

```html
<template>
  <div>
    <label for="sb-step">Spin button with step of 0.25</label>
    <b-form-spinbutton
      id="sb-step"
      v-model="value"
      min="0"
      max="10"
      step="0.25"
    ></b-form-spinbutton>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 0
      }
    }
  }
</script>

<!-- b-form-spinbutton-step.vue -->
```

## Number wrapping

By default, when the value is increased to the `max` value, it pressing the increment button will
have no effect. Similarly when the value is as the `min` value, pressing the decrement button will
have no effect.

To allow the spin button to wrap from max to min when incrementing (or min to max when
decrementing), set the `wrap` prop to `true`.

```html
<template>
  <div>
    <label for="sb-wrap">Wrapping value spin button</label>
    <b-form-spinbutton id="sb-wrap" wrap min="1" max="25" placeholder="--"></b-form-spinbutton>
  </div>
</template>

<!-- b-form-spinbutton-wrap.vue -->
```

## Styling

### Size

As with other form controls, `<b-form-spinbutton>` supports small and large sizing via setting the
`size` prop to either `'sm'` or `'lg'`, respectively.

```html
<template>
  <div>
    <label for="sb-small">Spin button - Small size</label>
    <b-form-spinbutton id="sb-small" size="sm" placeholder="--" class="mb-2"></b-form-spinbutton>

    <label for="sb-default">Spin button - Default size</label>
    <b-form-spinbutton id="sb-default" placeholder="--" class="mb-2"></b-form-spinbutton>

    <label for="sb-large">Spin button - Large size</label>
    <b-form-spinbutton id="sb-large" size="lg" placeholder="--" class="mb-2"></b-form-spinbutton>
  </div>
</template>

<!-- b-form-spinbutton-size.vue -->
```

### Inline

```html
<template>
  <div>
    <label for="sb-inline">Inline spin button</label>
    <b-form-spinbutton id="sb-inline" v-model="value" inline></b-form-spinbutton>
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

<!-- b-form-spinbutton-inline.vue -->
```

The spin button will automatically adjust it's width to fit the displayed value. See the
[Width section](#width) below for details on controlling or setting the width.

### Vertical

Spinbuttons can be oriented in vertical mode:

```html
<template>
  <div>
    <label for="sb-vertical">Vertical spin button</label><br>
    <b-form-spinbutton id="sb-vertical" v-model="value" vertical></b-form-spinbutton>
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

<!-- b-form-spinbutton-vertical.vue -->
```

Vertical spin buttons can also be sized using the [`size` prop](#size). When in vertical mode, the
spin button is rendered as an inline element.

The spin button will automatically adjust it's width to fit the displayed value. See the
[Width section](#width) below for details on controlling or setting the width.

### Width

The control (when not `vertical` or `inline`) will expand to the maximum width of the parent
container You can control width via utility classes such as `w-25`, `w-50`, `w-75`, or use styles to
set the width.

When either `vertical` or `inline` is set, the control will adjust its width based on the displayed
value. You can use css style to control the overall width of the control (i.e.
`style="width: 10rem;`).

### Number formatting and locale

By default `<b-form-spinbutton>` will format the displayed number in the users browser default
locale. You can change the localized formatting by specifying a locale (or array of locales) via the
`locale` prop. Number format localization is performed via
[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).
The locales available will be dependant on the browser implementation. Localization only controls
the presentation of the value to the user, and does not affect the `v-model`.

```html
<template>
  <div>
    <label for="sb-locales">Locale</label>
    <b-form-select id="sb-locales" v-model="locale" :options="locales"></b-form-select>
    <label for="sb-local" class="mt-2">Spin button with locale</label>
    <b-form-spinbutton
      id="sb-locale"
      v-model="value"
      :locale="locale"
      min="0"
      max="10"
      step="0.125"
    ></b-form-spinbutton>
    <p>Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 0,
        locale: 'fr-CA',
        locales: [
          { value: 'en', text: 'English' },
          { value: 'de', text: 'German' },
          { value: 'fr-CA', text: 'French (Canadian)' },
          { value: 'fa', text: 'Persian' },
          { value: 'ar-EG', text: 'Arabic (Egyptian)' }
        ]
      }
    }
  }
</script>

<!-- b-form-spinbutton-locale.vue -->
```

Alternatively, you can provide your own number formatter function to format the value displayed.
This is useful for displaying text instead of a number, or if you want to implement different
features of `Intl.NumberFormat`.

To provide a formatter function, set the prop `formatter-fn` to a method reference. The formatter is
passed a single argument which is the current value. Note the formatter only affects the value
displayed to the user and does not affect the `v-model`.

```html
<template>
  <div>
    <label for="sb-days" class="mt-2">Spin button with formatter</label>
    <b-form-spinbutton
      id="sb-days"
      v-model="value"
      :formatter-fn="dayFormatter"
      min="0"
      max="6"
      wrap
    ></b-form-spinbutton>
    <p>Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 0,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      }
    },
    methods: {
      dayFormatter(value) {
        return this.days[value]
      }
    }
  }
</script>

<!-- b-form-spinbutton-formatter.vue -->
```

## Disabled and readonly states

Setting the prop `disabled` places the component in a disabled, non-interactive state. The
`readonly` prop places the component in a readonly state (focusable, but the value cannot be changed
by the user).

```html
<template>
  <b-row>
    <b-col md="6" class="mb-2">
      <label for="sb-disabled">Disabled spin button</label>
      <b-form-spinbutton id="sb-disabled" v-model="value" disabled></b-form-spinbutton>
    </b-col>
    <b-col md="6" class="mb-2">
      <label for="sb-readonly" class="">Readonly spin button</label>
      <b-form-spinbutton id="sb-readonly" v-model="value" readonly></b-form-spinbutton>
    </b-col>
  </b-row>
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

<!-- b-form-spinbutton-disabled-readonly.vue -->
```

Disabled spinbuttons will not be submitted during native browser form submission, while a readonly
spinbutton will be submitted (as long as a name has been set via the `name` prop).

## Validation states

When you default to a `null` value, and the user has not selected a value, you can use the `state`
prop to apply one of the contextual validation styles to the component.

- `true` applies the valid styling to the component
- `false` applies the invalid styling to the component
- `null` applies no contextual styling (the default)

### Required prop

Note that the required prop only generates the `aria-required="true"` attribute on the component,
and does not perform any validation on form submit. You must validate the `v-model` in your
application logic.

Note that if the prop `required` is set, and the `v-model` is `null`, the attribute
`aria-invalid="true"` will be rendered on the component.

## Events

The `input` event is used to update the `v-model` and is emitted any time the value changes.

The `change` event is emitted once the user releases the mouse button (when pressing the increment
or decrement buttons) or when the user releases the <kbd>ArrowDown</kbd> or <kbd>ArrowUp</kbd> key.
This can be handy when you need to debounce the input.

The following example illustrates the difference between the `input` and `change` events. Click and
hold the increment or decrement button (or use the up/down arrow keys).

```html
<template>
  <div>
    <label for="sb-input">Spin button - input and change events</label>
    <b-form-spinbutton
      id="sb-input"
      v-model="value1"
      @change="value2 = $event"
      wrap
    ></b-form-spinbutton>
    <p>Input event: {{ value1 }}</p>
    <p>Change event: {{ value2 }}</p>
  </b-row>
</template>

<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: null
      }
    }
  }
</script>

<!-- b-form-spinbutton-events.vue -->
```

## Accessibility

The following keyboard controls are available when the spin button is focused:

- <kbd>Home</kbd> Sets the value to the `min` value
- <kbd>End</kbd> Sets the value to the `max` value
- <kbd>ArrowUp</kbd> Increases the value by the step amount
- <kbd>ArrowDown</kbd> Decreases the value by the step amount
- <kbd>PageUp</kbd> Increases the value by the step amount times the `repeat-step-multiplier` amount
- <kbd>PageDown</kbd> Decreases the value by the step amount times the `repeat-step-multiplier`
  amount

Pressing an holding the <kbd>ArrowUp</kbd>, <kbd>ArrowDown</kbd>, <kbd>PageUp</kbd>, or
<kbd>PageDown</kbd> keys will auto-repeat the increment or decrement (after an initial delay).
Holding down the <kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> keys for an extended period will
multiply the increment or decrement amount by the `repeat-step-multiplier` amount.

Note the the `repeat-delay`, `repeat-threshold` and `repeat-interval` only applies to the
<kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> keys.

## Implementation notes

`<b-form-spinbutton>` uses a mixture of Bootstrap v4 utility classes (margin, padding, and flex),
form-control and button classes, along with additional custom BootstrapVue SCSS/CSS.

## See also

- [Range type input](/docs/components/form-input#range-type-input)
