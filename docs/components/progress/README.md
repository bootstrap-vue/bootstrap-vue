# Progress

> Use our custom progress component for displaying simple or complex progress bars.
We don’t use the HTML5 `<progress>` element, ensuring you can animate them, and place text labels over them.

```html
<template>
<div>
    <b-progress v-model="counter" :precision="1" show-progress animated></b-progress>
    <b-btn class="mt-4" @click="clicked">Click me</b-btn>
</div>    
</template>

<script>
export default {
  data: {
    counter: 45,
  },
  methods: {
    clicked() {
      this.counter = Math.random() * 100;
      console.log("Change progress to " +
        Math.round(this.counter * 100) / 100);
    }
  }
}
</script>

<!-- progress.vue -->
```