# Form textarea

> Create multine text inputs with support for auto height sizing, minimum
and maximum number of rows, and contextual states.

```html
<template>
  <form-textarea id="textarea1" :value="text" placeholder="Enter something" :rows="3" :max-rows="5">
  </form-textarea>
</template>

<script>
  export default {
    data: {
      text: ''
    }
  };
</script>

<!-- form-textarea-1.vue -->
```

## Contextual validation states

```html
<template>
  <form-textarea id="textarea2" :state="invalid" :value="text" placeholder="Enter something" :rows="3">
  </form-textarea>
</template>

<script>
  export default {
    data: {
      text: ''
    }
  };
</script>

<!-- form-textarea-2.vue -->
```

