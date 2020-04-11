# Form Rating

> BootstrapVue custom range component for entering or displaying a rating value

## Overview

TBD

**Interactive rating (input mode):**

```html
<template>
  <div>
    <b-form-rating v-model="value"></b-form-rating>
    <p clas="mt-2">{{ value }}</p>
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
    <b-form-rating v-model="value"></b-form-rating>
    <p class="mt-2">{{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 4.5
      }
    }
  }
</script>

<!-- b-form-rating-non-interactive.vue -->
```

## Styling

### Number of stars

By default, `<b-form-rating>` defaults to `5` stars. You canchange the number of stars via the `stars`
prop.  The minumum allowed stars is  `3`.

```html
<template>
  <div>
    <b-form-rating v-model="value" stars="10"></b-form-rating>
    <p class="mt-2">{{ value }}</p>
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

TBD

```html
<template>
  <div>
    <b-form-rating v-model="value" show-value></b-form-rating>
    <p class="mt-2">{{ value }}</p>
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

<!-- b-form-rating-value.vue -->
```

### Variant


Easily chnage the rating icon color to one of the Bootstrap theme variants via the `variant` prop:


```html
<template>
  <div>
    <b-form-rating v-model="value" variant="success"></b-form-rating>
    <p class="mt-2">{{ value }}</p>
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
    <b-form-rating v-model="value" color="#ff0055"></b-form-rating>
    <p class="mt-2">{{ value }}</p>
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

Disable the default form-control border by setting the `no-border` prop to `true`.

### Disabled

TBD

### Readonly

TBD

### Icons

TBD

### Custom icons using slots

TBD

## Impementation notes

TBD

## Accessibility

TBD
