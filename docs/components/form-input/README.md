# Textual inputs

> Create various text style inputs such as: `text`, `password`, `number`, `url`,
`email`, `search`, and more.

**Example:**

```html
<template>
  <div>
    <h5>Text input with formatter</h5>
    <b-form-input v-model="text1"
                  type="text"
                  placeholder="Enter your name"
                  :formatter="format"></b-form-input>
    <b-form-text>We will convert your name to lowercase instantly</b-form-text>
    <p>Value: {{ text1 }}</p>

    <h5>Text input with lazy formatter (on change)</h5>
    <b-form-input v-model="text2"
                  type="text"
                  placeholder="Enter your name"
                  :formatter="format"
                  lazy-formatter></b-form-input>
    <b-form-text>This one is a little lazy!</b-form-text>
    <p>Value: {{ text2 }}</p>
  </div>
</template>

<script>
  export default {
    data: {
      text1: '',
      text2: ''
    },
    methods: {
      format(value, el) {
        return value.toLowerCase();
      }
    }
  }
</script>

<!-- form-input-1.vue -->
```

## Input type

`<b-form-input>` defaults to a `text` input, but you can set it to any other text-like
type, such as `password`, `number`, `url`, etc, by setting the `type` prop to the
appropriate value.

### Readonly plain text

If you want to have `<b-form-input readonly>` elements in your form styled as plain
text, set the `plaintext` prop (no need to set `readonly`) to remove the default form
field styling and preserve the correct margin and padding.

## Formatter

`<b-form-input>` optionally supports formatting by passing a function reference to
the `formatter` prop.

By default, formatting occurs when the control's native `input` event fires. You can
use the boolean prop `lazy-formatter` to restrict the formatter function to being
called on the control's native `change` event (which usually occurs on blur).

The `formatter` function receives two arguments (the raw value of the input, and
teh native event object) and should return the formatted value (as a string).

No formatting occurs if a `formatter` is not provided.

## Control sizing

Set heights using the `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

## Contextual States

Bootstrap includes validation styles for `valid` and `invalid` states
on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:

- `'invalid'` is great for when there’s a blocking or required field. A user must fill in this field properly to submit the form.
- `'valid'` is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state

To apply one of the contextual state icons on `<b-form-input>`, set the `state` prop
to `'invalid'`, `'valid'`, or `null`.

```html
<template>
  <div>
    <b-form-input v-model.trim="name"
                  type="text"
                  :state="nameState"
                  placeholder="Enter your name"></b-form-input>
    <b-form-feedback>
      Enter at least 3 letters
    </b-form-feedback>
    <b-form-text>
      Enter your name.
    </b-form-text>
  </div>
</template>

<script>
  export default {
    data: {
      name: ''
    },
    computed: {
      nameState() {
        return this.name.length > 2 ? null : 'invalid';
      }
    }
  }
</script>

<!-- form-input-validate-1.vue -->
```

### Conveying contextual validation state to assistive technologies and colorblind users:

Using these contextual states to denote the state of a form control only provides
a visual, color-based indication, which will not be conveyed to users of assistive
technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you
could include a hint about state in the form control's `<label>` text itself, or by
providing an additional help text block. Specifically for assistive technologies,
invalid form controls can also be assigned an `aria-invalid="true"` attribute
by setting the `aria-invalid` prop to `true`. `aria-invalid` will also be
automatically applied if `state` is set to `'invalid`.

### ARIA `aria-invalid` attribute

When `<form-input>` has an invalid contextual state (i.e. `invalid`) you may also
want to set the `<b-form-input>` prop `invalid` to `true` (done automatically for
`invalid` state), or to one of the supported string values.

Supported `aria-invalid` values are:

- `false` (default) No errors detected
- `true` The value has failed validation.
- `grammar` A grammatical error has been detected.
- `spelling` A spelling error has been detected.
