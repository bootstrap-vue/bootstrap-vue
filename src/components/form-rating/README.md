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
  export  default {
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
  export  default {
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

TBD

## Impementation notes

TBD

## Accessibility

TBD
