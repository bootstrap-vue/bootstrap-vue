# Form fieldset (aka Form group)

> The `<b-form-fieldset>` component is the easiest way to add some structure to forms. Its
purpose is to provide a label and control pairing, help text and feedback text, as well
as contextual state visual feedback.

**Example 1:** With contextual state on fieldset only
```html
<template>
  <b-form-fieldset
      id="fieldset1"
      description="Let us know your name."
      label="Enter your name"
      :feedback="feedback" 
      :state="state"
  >
    <b-form-input id="input1" :invalid="invalid" v-model="name"></b-form-input>
  </b-form-fieldset>
</template>

<script>
export default {
  computed: {
    feedback() {
      return this.name.length ? '' : 'Please enter something';
    },
    state() {
      return this.name.length ? 'success' : 'warning';
    },
    invalid() {
      return this.name.length ? null : 'true';
    }
  },
  data: {
    name: '',
  }
}
</script>

<!-- form-fieldset-1.vue -->
```


**Example 2:** Horizontal with contextual state on fieldset and textual input (feedback icon)
```html
<template>
  <b-form-fieldset
      id="fieldset2"
      horizontal
      label="Your full name"
      description="Let us know your full name."
      :feedback="feedback" 
      :state="state"
      :label-cols="3"
  >
    <b-form-input id="input2" v-model.trim="name" :invalid="invalid" :state="state"></b-form-input>
  </b-form-fieldset>
</template>

<script>
export default {
  computed: {
    feedback() {
      if (this.name.length === 0) {
        return 'Please enter your name';
      }
      return /\S+\s+\S+/.test(this.name) ? '' : 'Please enter both your first and last name';
    },
    state() {
      if (this.name.length === 0) {
        return 'danger';
      }
      return /\S+\s+\S+/.test(this.name) ? 'success' : 'warning';
    },
    invalid() {
      return /\S+\s+\S+/.test(this.name) ? null : 'true';
    }
  },
  data: {
    name: '',
  }
}
</script>

<!-- form-fieldset-2.vue -->
```

### Label
Use the prop `label` to set the content of the generated `<label>` element (html supported),
or by using the named slot `label`, You may optionally visually hide the label by setting
the prop `label-sr-only`.

By default, the label appears above the input element, but you may optionally set
the prop `horizontal` to place the label on the same line, and control the width
of the label by setting `label-cols` to the number of columns (default of `3`,
valid range of 1 through 11). `label-cols` has no effect if the layout is
not `horizontal`. For `xs` sized viewports the label will revert to being displayed
above the input control.

_**Note**: `label-size` has been deprecated in favour of `label-cols`._

The label text may also optionally be aligned `left`, `center` or `right` by setting
the respective value via the prop `label-text-align`. Alignment has no effect if
`label-sr-only` is set.

### Description
Optional descriptive text which is always shown with the `.text-muted` class
(html supported) by setting the `description` prop or using the named slot `description`.

### Feedback
Show optional text to provide textual state feedback (html supported) by setting the
prop `feedback` or using the named slot `feedback`.

### Contextual visual state
Optional contextual visual feedback states of `danger`, `warning` or `success`.
You should always provide content via the `feedback` prop to assist users
using assistive technologies when setting a contextual state.

To enable the text input contextual feeback icon, also apply the same state
value to the `state` property of the `<b-form-input>` control.

### Accessibility
To enable auto-generation of `aria-*` attributes, **you must** supply a unique `id`
prop to `<b-form-fieldset>`.

To automatically associate the label to the first input component, you **must** provide
a unique `id` prop on the input component. You may manually specify which containing
input component the label is for by setting the `<b-form-fieldset>` prop `label-for`
to the value of the `id` string associated with the input or contaner element.

It is highly recommended that you provide a unique `id` prop on your input element.

### Alias
`<b-form-fieldset>` can also be used via its shorter alias of `<b-form-group>`.
