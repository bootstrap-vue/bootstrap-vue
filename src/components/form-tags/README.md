# Form tags

> Lightweight custom tagged input form control, with options for customized interface rendering.

Tags are arrays of short strings, used in various ways such as assinging categories. Use the default
user interface, or create your own custom interface via hte use of the default scoped slot.

The tagged input was aded in BootstrapVue release v2.x.0

## Basic usage

Tags will have any leading and tailing whitespace removed, and duplicate tags are not permitted.
Tags that contain spaces are permitted by default.

Tags are added by clicking the **Add** button, pressing the <kbd>ENTER</kbd> key or when the
`change` event fires on the new tag input (i.e. when focus moves from the input). The **Add**
button will only appear when the user has entered a new tag value.

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

You can disable addig a new tag when pressing <kbd>ENTER</kbd> via the `no-add-on-enter` prop, and
disable adding a tag on the input's `change` event via the `no-add-on-change` prop.

### Styling Options

Several props are available to alter the basic styling of the default tagged interface:

| Prop          | Description                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| `tag-pills`   | Renders the tags with the appearance of pills                                                         |
| `tag-variant` | Applies one of the Bootstrap contextual variant theme colors to the tags                              |
| `size`        | Set the size of the component's appearance. 'sm', 'md' (default), or 'lg'                             |
| `placeholder` | The placeholder text for the new tag input element                                                    |
| `state`       | Sets the contextual state of the control. Set to `true` (for valid), `false` (for invalid), or `null` |

For additional props, see the component reference section at the bottom of this page.

The focus and validation state styling of the component relies upon BootstrapVue's custom CSS.

## Using with native browser `<form>` submission

The value of the tagged input will not be submitted via standard form `action` unless you provide a
name via the `name` prop. When a name is provided, `<b-form-tags>` will create a hidden `<input>`
for each tag. The hidden input will have the `name` attribute set to the value of the `name` prop.

## Custom rending with default scoped slot

If you fancy a different look and feel for the tags control, you can provide your own custom
rendering via the default scoped slot. You can either create your own tags, or use our helper
`<b-form-tag>` component.

### Scope properties

The default scoped slot provides numerous properties and methods for use in rendering your custom
interface. Not all properties or methods are required to generate your interface.

The default slot scope properties are as follows:

| Property         | Type                     | Description                                                                                                                                            |
| ---------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tags`           | Array                    | Array of current tag strings                                                                                                                           |
| `inputAttrs`     | Object                   | Object of attributes to apply to the new tag input element via `v-bind="inputAttrs"`. See below for details                                            |
| `inputHandlers`  | Object                   | Object of event handlers to apply to the new tag input element via `v-on="inputHandlers"`. See below for details                                       |
| `removeTag`      | Function                 | Method to remove a tag. Accepts one argument which is the tag value to remove                                                                          |
| `addTag`         | Function                 | Method to add a new tag. Assumes the tag is the value of the input, but optionally accepts one argument which is the tag value to be added             |
| `inputId`        | String                   | ID to add to the new tag input element. Defaults to prop `input-id`. If not provided a unique ID is auto-generated. Also available via 'inputAttrs.id' |
| `disabled`       | Boolean                  | `true` tf the component is in the disabled state. Value of the `disabled` prop                                                                         |
| `state`          | Boolean                  | The contextual state of the component. Value of the `state` prop. Possible values are `true`, `false` or `null`                                        |
| `placeholder`    | String                   | The value of the `placeholder` prop                                                                                                                    |
| `tagRemoveLabel` | String                   | Value of the `tag-remove-label` prop. Used as the `aria-label` attribute on the remove button of tags                                                  |
| `tagVariant`     | String                   | The value of the `tag-variant` prop                                                                                                                    |
| `tagClass`       | String, Array, or Object | The value of the `tag-variant` prop. Class (or classes) to apply to the tag elements                                                                   |

#### `inputAttrs` object properties

This object contains attributes to bind (`v-bind`) to the new tag input element.

| Property    | Type    | Description                                                                        |
| ----------- | ------- | ---------------------------------------------------------------------------------- |
| `id`        | String  | the `id` attribute for the new tag input                                           |
| `value`     | String  | The `value` attribute for the new tag input                                        |
| `disabled`  | Boolean | The `disabled` attribute for the new tag input. Value of the `disabled` prop       |
| `minlength` | String  | The `minlength` attribute for the new tag input. Value of the `tag-minlength` prop |
| `maxlength` | String  | The `maxlength` attribute for the new tag input. Value of the `tag-maxlength` prop |

#### `inputHandlers` object properties

This object contains event handlers to bind (`v-on`) to the new tag input element.

| Property  | Type     | Description                                                                                                                                                                    |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `input`   | Function | Event handler for the input element `input` event. Accepts a single argument of either an event object or a string. Updates the internal v-model for the new tag input element |
| `change`  | Function | Event handler for the input element `change` event. Accepts a single argument of either an event object or a string. Change will trigger adding the tag                        |
| `keydown` | Function | Event handler or the input element `keydown` <kbd>ENTER</kbd> event. Triggers adding the new tag                                                                               |

### Using native browser inputs

The scope contains attributes and event handlers that can be directly bound to native form inputs or
selects.

```html
<template>
  <div>
    <b-form-tags v-model="value" no-outer-focus class="mb-2">
      <template v-slot="{ tags, inputAttrs, inputHandlers, addTag, removeTag }">
        <b-input-group class="mb-2">
          <input
            v-bind="inputAttrs"
            v-on="inputHandlers"
            placeholder="New tag - Press enter to add"
            class="form-control">
          <b-input-group-append>
            <b-button @click="addTag()" variant="primary">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-list-group>
          <b-list-group-item
            v-for="tag in tags.slice().reverse()"
            :key="tag"
            class="py-1"
          >
            <strong>{{ tag }}</strong>
            <b-button @click="removeTag(tag)" variant="link" size="sm">remove</b-button>
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
        value: ['apple', 'orange', 'banana', 'pear', 'peach']
      }
    }
  }
</script>

<!-- form-tags-custom-native.vue -->
```

### Using custom form components

The scope contains attributes and event handlers that can be directly bound to _most_ custom inputs
or select components (the event handlers accept both a string tag value _or_ a native event object).

```html
<template>
  <div>
    <b-form-tags v-model="value" no-outer-focus class="mb-2">
      <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
        <b-input-group class="mb-2">
          <b-form-input
            v-bind="inputAttrs"
            v-on="inputHandlers"
            placeholder="New tag - Press enter to add"
            class="form-control"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="addTag()" variant="primary">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <div>
          <b-form-tag
            v-for="tag in tags"
            @remove="removeTag(tag)"
            :key="tag"
            :title="tag"
            :variant="tagVariant"
            class="mr-1"
          >{{ tag }}</b-form-tag>
        </div>
      </template>
    </b-form-tags>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ['apple', 'orange', 'banana', 'pear', 'peach']
      }
    }
  }
</script>

<!-- form-tags-custom-components-1.vue -->
```

### Advanced custom rendering usage

In situations where the `inputHandlers` will not work with your custom input, or if you need greater
control over tag creation:

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
      :state="state"
    >
      <template v-slot="{
        tags, inputAttrs, placeholder, disabled, tagVariant, tagRemoveLabel, addTag, removeTag
      }">
        <b-input-group>
          <!-- Always bind the id to the input so that it can be focused when needed -->
          <b-form-input
            v-model="newTag"
            :id="inputAttrs.id"
            :placeholder="placeholder"
            :disabled="disabled"
            class="form-control"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="addTag(newTag)" :disabled="disabled" variant="primary">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback :state="state">
          Duplicate tag value cannot be added again!
        </b-form-invalid-feedback>
        <div v-if="tags.length" style="font-size: 1.5rem;" class="mt-2">
          <b-form-tag
            v-for="tag in tags"
            @remove="removeTag(tag)"
            :key="tag"
            :title="`Tag: ${tag}`"
            :variant="tagVariant"
            :removeLabel="tagRemoveLabel"
            :disabled="disabled"
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
        value: ['apple', 'orange', 'banana', 'pear', 'peach']
      }
    },
    computed: {
      state() {
        // Return false (invalid) if new tag is a duplicate
        return this.value.indexOf(this.newTag.trim()) > -1 ? false : null
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
