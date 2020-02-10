# Form Spinbutton

> Spin buttons are a BottstrapVue custom numerical range form control. Spin buttons allow for incrementing
> or decrementing a numerical value within a range of a minimum and maximum number, with optional step
> value.

`<b-form-spinbutton>` is WAI_ARIA compliant, allowing for keyboard control, and support both horizontal
(default) and vertical layout.

Similar to [range type inputs](/docs/components/form-input#range-type-input), spin buttons _do not_ allow
the user to type in a value.

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

<!-- b-form-spinbotton-demo.vue -->
```

## Overview

TBD

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
`max` props.  The default step increment is `1`, and can be changed via the `step` prop (decimal
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

<!-- b-form-spinbotton-step.vue -->
```

## Number wrapping

By default, when the value is increased to the `max` value, it pressing the increment button will
have no effect. Similarily when the value is as the `min` value, pressing the decrement button
will ahve no effect.

To allow the spin button to wrap from max to min when incrementing (or min to max when decremening),
set the `wrap` prop to `true`.

```html
<template>
  <div>
    <label for="sb-wrap">Wrapping value spin button</label>
    <b-form-spinbutton id="sb-wrap" wrap min="1" max="25" placeholder="--"></b-form-spinbutton>
  </div>
</template>

<!-- b-form-spinbotton-wrap.vue -->
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

<!-- b-form-spinbotton-size.vue -->
```

### Inline

TBD

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
      return: {
        value: 50
      }
    }
  }
</script>

<!-- b-form-spinbotton-vertical.vue -->
```

Vertical spin buttons can also be sized using hte `size` prop.  When in vertical mode, the
spinbutton is rendered as an inline element.

The spin button will automatically adjust it's width to fit the displayed value. See the
[Width section](#width) before for details on controling or setting the width.

### Width

TBD

### Number formatting and locale

By default `<b-form-spinbutton>` will format the displayed number in the users browser default
locale.  You can change the localized formatting by specifying a locale (or array of locales) via
the `locale` prop. Number format localization is performed via
[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).
The locales available will be dependant on the browser implementation. Localization only controls the
presentation of the value to the user, and does not affect the `v-model`.

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

<!-- b-form-spinbotton-locale.vue -->
```

Alternatively, you can provide your own number formatter function to format the value displayed. This
is usefull for displaying text instead of a number, or if you want to implement different features of
`Intl.NumberFormat`.

To provide a formatter function, set the prop `formatter-fn` to a method reference. The formatter is
passed a single argument which is the current value. Note the formatter only affects the value displayed
to the user and does not affect the `v-model`.

```html
<template>
  <div>
    <label for="sb-days" class="mt-2">Spin button with formatter</label>
    <b-form-spinbutton
      id="sb-days"
      v-model="value"
      min="0"
      max="6"
      :formatter-fn="dayFormatter"
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

<!-- b-form-spinbotton-formatter.vue -->
```

## Disabled and readonly states

TBD

## Validation states

TBD

## Events

TBD

## Accessibility

TBD

## See also

- [Range type input](/docs/components/form-input#range-type-input)
