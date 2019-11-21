# Form tags

> Lightweight customizable tagged input form control, with options for custom interface
> rendering

## Basic usage

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

### Styling Options

TBD

## Custom rending with default scoped slot

If you fancy a different look and feel for the tags control, you can provide your own custom
rendering via the default scoped slot.

### Scope properties

TBD

### Using native browser inputs

The scope contains attributes and event handlers that can be directly bound to native form
inputs or selects.

```html
<template>
  <div>
    <b-form-tags v-model="value" no-outer-focus class="mb-2">
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
</template>

<script>
  export default {
    data() {
      return {
        value: ['apple', 'orange', 'bananna', 'pear', 'peach']
      }
    }
  }
</script>

<!-- form-tags-custom-native.vue -->
```

### Using custom form components and advanced usage

The scope contains attributes and event handlers that can be directly bound to _most_ custom
inputs or select components (the event handlers accept either a string tag value or a native
event object).

```html
<template>
  <div>
    <b-form-tags v-model="value" no-outer-focus class="mb-2">
      <template v-slot:default="scope">
        <b-input-group class="mb-2">
          <b-form-input
            v-bind="scope.inputAttrs"
            v-on="scope.inputHandlers"
            placeholder="New tag - Press enter to add"
            class="form-control"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="scope.addTag()" variant="primary">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <div>
          <b-form-tag
            v-for="tag in scope.tags"
            :key="tag"
            :title="tag"
            :variant="scope.tagvariant"
          >
            {{ tag }}
          </b-form-tag>
        </div>
      </template>
    </b-form-tags>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ['apple', 'orange', 'bananna', 'pear', 'peach']
      }
    }
  }
</script>

<!-- form-tags-custom-components-1.vue -->
```

### Advanced custom rendering usage

In situations where the `inputHandlers` will not work with your custom input, or if you need
greater control over tag creation:

```html
<template>
  <div>
    <b-form-checkbox switch size="lg" v-model="disabled">Disable</b-form-checkbox>
    <b-form-tags
      v-model="value"
      @input="resetInputValue()"
      tag-variant="success"
      class="mb-2 mt-2"
      :disabled="disabled"
      no-outer-focus
      placeholder="Enter a new tag value and click Add"
    >
      <template v-slot:default="scope">
        <b-input-group>
          <!-- Always bind the id to the input so that it can be focused when needed -->
          <b-form-input
            v-model="newTag"
            :id="scope.inputAttrs.id"
            :placeholder="scope.placeholder"
            :disabled="scope.disabled"
            class="form-control"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="scope.addTag(newTag)" :disabled="disabled" variant="primary">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback :state="isNotDuplicate">
          Duplicate tag value cannot be added again!
        </b-form-invalid-feedback>
        <div v-if="scope.tags.length" style="font-size: 1.5rem;" class="mt-2">
          <b-form-tag
            v-for="tag in scope.tags"
            @remove="scope.removeTag(tag)"
            :key="tag"
            :title="'Tag: ' + tag"
            :variant="scope.tagVariant"
            :removeLabel="scope.tagRemoveLabel"
            :disabled="scope.disabled"
            class="mr-2"
          >{{ tag }}</b-form-tag>
        </div>
        <b-form-text v-else>
          There are no tags specified. Add a new tag above.
        </b-form-text>
      </template>
    </b-form-tags>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTag: '',
        disabled: false,
        value: ['apple', 'orange', 'bananna', 'pear', 'peach']
      }
    },
    computed: {
      isNotDuplicate() {
        return this.value.indexOf(this.newTag) < 0
      }
    },
    methods: {
      resetInputValue() {
        this.newTag = ''
      }
    }
  }
</script>

<!-- form-tags-custom-components-advanced.vue -->
```
