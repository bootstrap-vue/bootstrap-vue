# Form Rating

> BootstrapVue custom range component for entering or displaying a rating value. `<b-form-rating>`
> appears as a `slider` style inpunt for WAI-ARIA accessiility, and can also be used to display the
> current rating value of an entity (readonly mode). Rating values range from `1` to the number of
> stars allowed (default stars is `5`, minimum stars is `3`). Because `<b-form-rating>` has the class
> `form-control` it can easily be placed inside [input groups](/docs/components/input-group).

## Overview

TBD

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

**Readonly (non-interacitve) rating:**

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
        value: 2.5
      }
    }
  }
</script>

<!-- b-form-rating-non-interactive.vue -->
```

## Styling

### Number of stars

By default, `<b-form-rating>` defaults to `5` stars. You can change the number of stars via the `stars`
prop. The minumum allowed stars is  `3`.

```html
<template>
  <div>
    <b-form-rating v-model="value" stars="10"></b-form-rating>
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

<!-- b-form-rating-stars.vue -->
```

### Show value

Bu default `<b-form-rating>` does not display the current numerical value. To show the current value
simply set the `show-value` prop to `true`. To control the precison (number of digits after the
decimal) simply set the `precision` prop to the number of digits after teh deciman to show.

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
        value: 3
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
    <b-form-rating v-model="value" show-value precision="2"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 3.5
      }
    }
  }
</script>

<!-- b-form-rating-value-precision.vue -->
```

### Variant


Easily chnage the rating icon color to one of the Bootstrap theme variants via the `variant` prop:


```html
<template>
  <div>
    <b-form-rating v-model="value" variant="success"></b-form-rating>
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

<!-- b-form-rating-variant.vue -->
```

To apply a custom color, use the `color` prop which accepts a standard CSS color name, hex (`#...`) color
value or `rgb(...)`/`rgba(...)` color value:

```html
<template>
  <div>
    <b-form-rating v-model="value" color="#ff00ff"></b-form-rating>
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
- Variants translate to the `text-{variant}` utility class

### Control sizing

fancier a small or large rating control? Simply set the prop `size` to either `'sm'` or `'lg'`
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

TBD

### No Border

By default, `<b-from-rating>` has standard Bootstrap form-control stying. To disable the default
form-control border, simply set the `no-border` prop to `true`.

```html
<template>
  <div>
    <label for="rating-sm-no-border">Small rating with no border</label>
    <b-form-rating id="rating-sm-no-border" v-model="value" no-border size="sm"></b-form-rating>
    <label for="rating-md-no-border" class="mt-3">Default rating (merum) with no border</label>
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

- A focus ring will show when the rating compoentn has focus, regarless of the `no-border` setting
  for accesibiity reasons.

### Disabled

If you reaquire additional information before a user can supply a ratings value, simply set the
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

Read-only ratings remain focusable, a buton are not intearactive. This state is hnady for diplaying
the current rating of an item. Fractional value are allowed and will result in the displaying of _half
icons_ when the `value` is not a whole number. This state is useful for disapaying an aggtegated
ratings value.

```html
<template>
  <div>
    <label for="rating-readonly">Disabled rating</label>
    <b-form-rating id="rating-readonly" value="2.65" readonly show-value precision="3"></b-form-rating>
  </div>
</template>

<!-- b-form-rating-readonly.vue -->
```

### Reset button

Optionally show a reset icon via the `show-reset` prop. The value will be set to `null` when the
reset icon is clicked.

```html
<template>
  <div>
    <b-form-rating v-model="value" show-reset show-value></b-form-rating>
  </div>
</template>

<script>
  export default {
    data() {
      value: 2.5
    }
  }
</script>

<!-- b-form-rating-reset.vue -->
```

**Notes:**

- The reset icon will _not_ be shown when the props `readonly` or `disabled` are set.

### Icons

By default `<b-form-rating>` uses the [Bootstrap Icons](/docs/icos) icons `star`, `star-half` and
`star-fill`.  You canspecify alternate ootstrap Icons] icons to use via the `icon-empty`, `icon-half`
and `icon-full` props. These props accept a Bootstrap Icon kebab-case name, and requires that the
corresponsiding icon componenet be registered either locally or globally.

```html
<template>
  <div>
    <b-form-rating icon-empty="heart" icon-half="heart-half" icon-full="heart-fill"><b-form-rating>
  </div>
</template>

<!-- b-form-rating-icons.vue
```

Alteraitvely, you an supply your own content via the `'icon-empty'`, `'icon-half'` and `'icon-full'`
scoped slots.

## Internationalization

When a `locale` is specified, the displayed vaue (when the `show-value` prop is `true`0 ) will be
in the browser's defqault locale. To change the locale, simple set the `locale` prop to the prefered
locale, or an array of prefered loales (most preferred locale first). This wil affcet the displayed
value only:

```html
<template>
  <div>
    <b-form-select v-model="locale" :options="locales" class="mb-2"></b-form-select>
    <b-form-rating v-model="value" :locale="locale" show-value precision="2"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 3.75,
        locale: 'en-US',
        locales: [
          { text: 'English US (en-US)', value: 'en-US' },
          { text: 'French (fr)', value: 'fr' },
          { text: 'Persian (fa)', value: 'fa'},
          { text: 'Arabic Eegription (ar-EG)', value: 'ar-EG' }
        ]
      }
    }
  }
</script>

<!-- b-form-rating-i18n.vue -->
```

## Impementation notes

TBD

## Accessibility

TBD
