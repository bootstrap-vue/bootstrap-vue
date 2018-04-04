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
  data () {
    return {
      text: ''
    }
  }
}
</script>

<!-- form-textarea-1.vue -->
```

## Displayed rows

`<b-form-textarea>` automaticlly adjusts its height (text rows) to fit the content,
even as the user enters text. For a textarea with no content, the number of rows
starts at `1`.

To set the initial minimum height (in rows), set the `rows` prop to the desired
number of lines. If no value is provided to `rows`, then it will default to `1`.

To limit the maximum rows that the text area will grow to (before showing a scrollbar),
set the `max-rows` prop to the maximum number of lines of text.

To keep the text-area at a set height, set both `rows` and `max-rows` to the same value.

**Note:** auto rows will only work when the user explicitly enters newlines in the textarea.

### Disable resize

Note that some web browsers will allow the user to re-size the hight of the textarea.
To disable this, set the `no-resize` prop to `true`.


## Contextual states

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:
- `'invalid'` (or `false`) is great for when there’s a blocking or required field. A user must fill in this field properly to submit the form.
- `'valid'` (or `true`) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state

To apply one of the contextual state icons on `<b-form-textarea>`, set the `state` prop to:
- `'invalid'` or `false` to apply invalid styling)
- `'valid'` or `true` to apply valid highlighting,
- `null` for no validation contextual state

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
  data () {
    return {
      text: ''
    }
  }
}
</script>

<!-- form-textarea-state.vue -->
```

### Conveying contextual state to assistive technologies and colorblind users

Using these contextual states to denote the state of a form control only provides a
visual, color-based indication, which will not be conveyed to users of assistive
technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could
include a hint about state in the form control's `<label>` text itself, or by providing
an additional help text block.

### ARIA `aria-invalid` attribute

When `<b-form-textarea>` has an invalid contextual state (i.e. `'invalid'` or `false`)
you may also want to set the prop `aria-invalid` to `true`, or one of hte supported values:

- `false`: No errors detected (default)
- `true` or `'true'`: The value has failed validation.
- `'grammar'`: A grammatical error has been detected.
- `'spelling'` A spelling error has been detected.

If the `state` prop is set to `false` (or `'invalid'`), and the `aria-invalid` prop is
not explicity set, `<b-form-textarea>` will automatically set the `aria-invalid`
attribute to `'true'`.


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
  data () {
    return {
      text: 'This is some text.\nIt is read only and doesn\'t look like an input.'
    }
  }
}
</script>

<!-- form-textarea-plaintext.vue -->
```

## Component alias
You can use `<b-form-textarea>` by it's shorter alias `<b-textarea>`.

## Component reference
