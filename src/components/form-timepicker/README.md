> Form Timepicker

TBD

```html
<template>
  <div>
    <b-form-timepicker v-model="value" show-seconds locale="en"></b-form-timepicker>
    <div class="mt-2">Value: '{{ value }}'</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>

<!-- b-form-timepicker.vue -->
```
