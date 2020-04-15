# Form Rating

> BootstrapVue's custom range component, `<b-form-rating>`, is for entering or displaying a rating
> value. The component is fully WAI-ARIA accessible and supports keyboard control.

## Overview

Rating values range from `1` to the number of stars allowed (default stars is `5`, minimum stars is
`3`). Since `<b-form-rating>` uses the Bootstrap class `form-control`, it can easily be placed
inside [input groups](/docs/components/input-group).

There are two main modes for `<b-form-rating>`: interactive and readonly.

Interactive mode allows the user to chose a rating from `1` to the number of stars (default `5`) in
whole number increments.

**Interactive rating (input mode):**

```html
<template>
  <div>
    <b-form-rating v-model="value"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>

<!-- b-form-rating.vue -->
```

Readonly mode is used for displaying an aggregated rating, and supports `half` stars.

**Readonly (non-interactive) rating:**

```html
<template>
  <div>
    <b-form-rating v-model="value" readonly></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 2.567
      }
    }
  }
</script>

<!-- b-form-rating-non-interactive.vue -->
```

## Styling

### Variant and color

Easily apply one of the Bootstrap theme color variants to the rating icon via the `variant` prop.
The default is to use the default form control text color.

```html
<template>
  <div>
    <b-form-rating v-model="value" variant="warning" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" variant="success" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" variant="danger" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" variant="primary" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" variant="info" class="mb-2"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 3
      }
    }
  }
</script>

<!-- b-form-rating-variant.vue -->
```

To apply a _custom color_, use the `color` prop which accepts a standard CSS color name, HEX color
value (`#...`) or RGB/RGBA (`rgb(...)`/`rgba(...)`) color value:

```html
<template>
  <div>
    <b-form-rating v-model="value" color="indigo" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" color="#ff00ff" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" color="rgb(64, 192, 128)" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" color="rgba(64, 192, 128, 0.75)" class="mb-2"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>

<!-- b-form-rating-color.vue -->
```

**Notes:**

- The prop `color` takes precedence over the `variant` prop
- Variants translate to the `text-{variant}` utility class on the icon

### Number of stars

By default, `<b-form-rating>` defaults to `5` stars. You can change the number of stars via the
`stars` prop. The minimum allowed stars is `3`.

```html
<template>
  <div>
    <label for="rating-10">Rating with 10 stars:</label>
    <b-form-rating id="rating-10" v-model="value10" stars="10"></b-form-rating>
    <p class="mt-2">Value: {{ value10 }}</p>

    <label for="rating-7">Rating with 7 stars:</label>
    <b-form-rating id="rating-7" v-model="value7" stars="7"></b-form-rating>
    <p class="mt-2">Value: {{ value7 }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value10: null,
        value7: null,
      }
    }
  }
</script>

<!-- b-form-rating-stars.vue -->
```

### Show value

By default `<b-form-rating>` does not display the current numerical value. To show the current value
simply set the `show-value` prop to `true`. To control the precision (number of digits after the
decimal) simply set the `precision` prop to the number of digits after the decimal to show. The
`precision` setting is useful when showing an aggregated or average rating value in `readonly` mode.

```html
<template>
  <div>
    <b-form-rating v-model="value" show-value></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 4
      }
    }
  }
</script>

<!-- b-form-rating-value.vue -->
```

**With precision set:**

```html
<template>
  <div>
    <b-form-rating v-model="value" readonly show-value precision="2"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 3.555
      }
    }
  }
</script>

<!-- b-form-rating-value-precision.vue -->
```

### Control sizing

Fancy a small or large rating control? Simply set the prop `size` to either `'sm'` or `'lg'`
respectively.

```html
<template>
  <div>
    <label for="rating-sm">Small rating</label>
    <b-form-rating id="rating-sm" v-model="value" size="sm"></b-form-rating>

    <label for="rating-md" class="mt-3">Default rating (medium)</label>
    <b-form-rating id="rating-md" v-model="value"></b-form-rating>

    <label for="rating-lg" class="mt-3">Large rating</label>
    <b-form-rating id="rating-lg" v-model="value" size="lg"></b-form-rating>

    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>

<!-- b-form-rating-size.vue -->
```

### Inline mode

By default, `<b-form-rating>` occupies 100% width of the parent container. In some situations you
may prefer the custom input to occupy on the space required for it's contents. Simply set the
`inline` prop to `true` to render the component in inline mode:

```html
<template>
  <div>
    <label for="rating-inline">Inline rating:</label>
    <b-form-rating id="rating-inline" inline value="4"></b-form-rating>
  </div>
</template>

<!-- b-form-rating-inline.vue -->
```

### Borderless

By default, `<b-from-rating>` has standard Bootstrap form-control styling. To disable the default
form-control border, simply set the `no-border` prop to `true`.

```html
<template>
  <div>
    <label for="rating-sm-no-border">Small rating with no border</label>
    <b-form-rating id="rating-sm-no-border" v-model="value" no-border size="sm"></b-form-rating>

    <label for="rating-md-no-border" class="mt-3">Default rating (medium) with no border</label>
    <b-form-rating id="rating-md-no-border" v-model="value" no-border></b-form-rating>

    <label for="rating-lg-no-border" class="mt-3">Large rating with no border</label>
    <b-form-rating id="rating-lg-no-border" v-model="value" no-border size="lg"></b-form-rating>

    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>

<!-- b-form-rating-no-border.vue -->
```

**Notes:**

- For accessibility reasons a focus ring will show when the rating component has focus, regardless
  of the `no-border` setting.

### Disabled

If you require additional information before a user can chose a ratings value, simply set the
`disabled` prop to `true` to disable any user interactivity on the component:

```html
<template>
  <div>
    <label for="rating-disabled">Disabled rating</label>
    <b-form-rating id="rating-disabled" value="2.75" disabled></b-form-rating>
  </div>
</template>

<!-- b-form-rating-disabled.vue -->
```

### Readonly

Readonly ratings remain focusable, but are not interactive. This state is useful for displaying an
aggregated or average ratings value. Fractional values are allowed and will result in the displaying
of _half icons_ when the `value` is not a whole number (the half icon threshold is `0.5`).

```html
<template>
  <div>
    <label for="rating-readonly">Readonly rating</label>
    <b-form-rating
      id="rating-readonly"
      value="3.6536"
      readonly
      show-value
      precision="3"
    ></b-form-rating>
  </div>
</template>

<!-- b-form-rating-readonly.vue -->
```

### Clear button

Optionally show a clear icon via the `show-clear` prop. The value will be set to `null` when the
clear icon is clicked.

```html
<template>
  <div>
    <b-form-rating v-model="value" show-clear show-value></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 2.5
      }
    }
  }
</script>

<!-- b-form-rating-clear.vue -->
```

**Notes:**

- The clear icon will _not_ be shown when the props `readonly` or `disabled` are set.

### Icons

By default `<b-form-rating>` uses the [Bootstrap Icons](/docs/icons) icons `'star'`, `'star-half'`,
`'star-fill'`, and the icon `'x'` (for the optional clear button). You can specify alternate
Bootstrap Icons to use via the `icon-empty`, `icon-half`, `icon-full`, and `icon-clear` props. These
props accept a Bootstrap Icon <samp>kebab-case</samp> name, and requires that the corresponding icon
component be registered/installed either locally or globally.

```html
<template>
  <div>
    <b-form-rating
      icon-empty="heart"
      icon-half="heart-half"
      icon-full="heart-fill"
      icon-clear="slash-circle"
      show-clear
      variant="danger"
    ><b-form-rating>
  </div>
</template>

<!-- b-form-rating-icons.vue -->
```

Alternatively, you an supply your own content via the `'icon-empty'`, `'icon-half'`, `'icon-full'`,
and `'icon-clear'` scoped slots.

## Form submission

If you intend to submit the rating value via standard form submission, set the `name` prop to the
desired form field name. A hidden input will be generated with the current value (or an empty string
if there is no value).

## Using in input groups

The following is an example of placing `<b-form-rating>` in an input group:

```html
<template>
  <div>
    <b-input-group>
      <b-input-group-prepend>
        <b-button @click="value = null">Clear</b-button>
      </b-input-group-prepend>
      <b-form-rating v-model="value" color="#ff8800"></b-form-rating>
      <b-input-group-append>
        <b-input-group-text class="justify-content-center" style="min-width: 3em;">
          {{ value }}
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>

<!-- b-form-rating-input-group.vue -->
```

## Internationalization

When a `locale` is specified, the displayed value (when the `show-value` prop is `true`) will be in
the browser's default locale. To change the locale, simple set the `locale` prop to the preferred
locale, or an array of prefered locales (most preferred locale first). This will affect the optional
displayed value and the left-to-right or right-to-left orientation of the component.

```html
<template>
  <div>
    <b-form-select v-model="locale" :options="locales" class="mb-2"></b-form-select>
    <b-form-rating v-model="value" :locale="locale" show-value precision="1"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 3.5,
        locale: 'en-US',
        locales: [
          { text: 'English US (en-US)', value: 'en-US' },
          { text: 'French (fr)', value: 'fr' },
          { text: 'Persian (fa)', value: 'fa'},
          { text: 'Arabic Egyptian (ar-EG)', value: 'ar-EG' }
        ]
      }
    }
  }
</script>

<!-- b-form-rating-i18n.vue -->
```

## Implementation notes

The ratings control uses the Bootstrap v4 `form-control*`, `d-*` (display), `border-*` and
`text-{variant}` classes, as well as BootstrapVue's custom CSS for proper styling.

The root element of the control is an `<output>` element, which allows a `<label>` element to be
associated with it.

## Accessibility

To screen reader users `<b-form-rating>` appears as a _slider_ type input input.

Keyboard navigation is employed to select the rating value, and mimics the keyboard controls of
`range` inputs:

- <kbd>Left</kbd> or <kbd>Down</kbd> will decrement the rating value by `1`
- <kbd>Right</kbd> or <kbd>Up</kbd> will increment the rating value by `1`
- When the [`locale`](#internationalization) resolves to a right-to-left language, the
  <kbd>Left</kbd> and <kbd>Right</kbd> behaviour is reversed.
