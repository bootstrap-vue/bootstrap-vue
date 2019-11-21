# Form tags

TBD

**Default render:**

```html
<template>
  <div>
    <b-form-tags v-model="value" class="mb-2"></b-form-tags>
    <p>Value: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ['apple', 'orange']
      }
    }
  }
</script>

<!-- form-tags-example.vue -->
```
