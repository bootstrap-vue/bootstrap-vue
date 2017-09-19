# Form textarea

> Create multi-line text inputs with support for auto height sizing, minimum
and maximum number of rows, and contextual states.

```html
<template>
  <div>
    <b-form-textarea id="textarea1"
                     v-model="text"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
    <pre class="mt-3">{{ text }}</pre>
  </div>
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
  <b-form-textarea id="textarea2"
                   state="invalid"
                   v-model.trim="text"
                   placeholder="Enter something"
                   :rows="3"></b-form-textarea>
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

## Readonly plain text

If you want to have `<b-form-textarea readonly>` elements in your form styled as plain
text, set the `plaintext` prop (no need to set `readonly`) to remove the default form
field styling and preserve the correct margin and padding and height.

```html
<template>
  <b-form-textarea id="textarea3" plaintext :value="text"></b-form-textarea>
</template>

<script>
  export default {
    data: {
      text: 'This is some text.\nIt is read only and doesn\'t look like an input.'
    }
  };
</script>

<!-- b-form-textarea-3.vue -->
```

## Component Reference

