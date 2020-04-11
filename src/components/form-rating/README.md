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
    <p clas="mt-2">{{ value }}</p>
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

<!-- b-form-rating-stars.vue -->
```

### Show value

TBD

```html
<template>
  <div>
    <b-form-rating v-model="value" show-value></b-form-rating>
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

<!-- b-form-rating-value.vue -->
```

### Variant

TBD

### Inline mode

TBD

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
