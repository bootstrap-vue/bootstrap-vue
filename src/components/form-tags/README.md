# Form tags

> Lightweight customizable tagged input form control

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

## Custom rending with default scoped slot

If you fancy a different look and feel for the tags control, you can provide your own custom
rendering via the default scoped slot.

### Scope properties

TBD

### Using native browser inputs

The scope contains attributes and event handlers that can be directly bound to native form
inputs or selects.

```html
<div>
  <b-form-tags v-model="value" class="mb-2">
    <template v-slot:default="scope">
      <b-input-group class="mb-2">
        <input
          v-bind="scope.inputAttrs"
          v-on="scope.inputHandlers"
          placeholder="New tag - Press enter to add"
          class="form-control">
        <b-input-group-append>
          <b-button @click="scope.addTag()" variant="primary">Add</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-list-group>
        <b-list-group-item
          v-for="tag in scope.tags.slice().reverse()"
          :key="tag"
          class="py-1"
        >
          <strong>{{ tag }}</strong>
          <b-button @click="scope.removeTag(tag)" variant="link" size="sm">remove</b-button>
        </b-list-group-item>
      </b-list-group>
    </template>
  </b-form-tags>
</div>

<!-- form-tags-custom-native.vue -->
```

### Using custom form components

TBD
