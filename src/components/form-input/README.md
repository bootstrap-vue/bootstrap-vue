# Textual and Value inputs

> Create various text style inputs such as: `text`, `password`, `number`, `url`,
`email`, `search`, and more.

```html
<template>
  <div>
    <b-form-input v-model="text1"
                  type="text"
                  placeholder="Enter your name"></b-form-input>
    <p>Value: {{ text1 }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text1: ''
    }
  }
}
</script>

<!-- form-input-1.vue -->
```


## Input type
`<b-form-input>` defaults to a `text` input, but you can set the `type` prop to one
of the supported types: `text`, `password`, `email`, `number`, `url`, `tel`, `search`,
`date`, `datetime`, `datetime-local`, `month`, `week`, `time`,`range`, or `color`.

```html
<template>
  <b-container fluid>
    <b-row class="my-1" v-for="type in types" :key="type">
      <b-col sm="3"><label :for="`type-${type}`">Type {{ type }}:</label></b-col>
      <b-col sm="9"><b-form-input :id="`type-${type}`" :type="type"></b-form-input></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      types: [
        'text', 'password', 'email', 'number', 'url',
        'tel', 'date', `time`, 'range', 'color'
      ]
    }
  }
}
</script>

<!-- form-input-types.vue -->
```

If prop `type` is set to an unsupported value, a `text` input will be rendered.

**Caveats with input types:**
- Not all browsers support all input types, nor do some types render in the same format across
browser types/version.
- Browsers that do not support a particular type will fall back to
a `text` input type. As an example, Firefox desktop doesn't support `date`, `datetime`,
or `time`, while Firefox mobile does.
- Chrome lost support for `datetime` in version 26, Opera in version 15, and Safari in iOS 7.
Instead of using `datetime`, since support should be deprecated, use `date` and `time`
as two separate input types.
- For date and time style input, where supported, the displayed value in the GUI may be different
than what is returned by it's value.
- Regardless of input type, the value is **always** returned as a string representation.


## Control sizing
Set heights using the `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

```html
<b-container fluid>
  <b-row class="my-1">
    <b-col sm="2"><label for="input-small">Small:</label></b-col>
    <b-col sm="10">
      <b-form-input id="input-small" size="sm" type="text" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="my-1">
    <b-col sm="2"><label for="input-default">Default:</label></b-col>
    <b-col sm="10">
      <b-form-input id="input-default" type="text" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="my-1">
    <b-col sm="2"><label for="input-large">Large:</label></b-col>
    <b-col sm="10">
      <b-form-input id="input-large" size="lg" type="text" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
</b-container>

<!-- form-input-size-1.vue -->
```

## Contextual States
Bootstrap includes validation styles for `valid` and `invalid` states
on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:

- `'invalid'` (or `false`) is great for when there’s a blocking or required field. A user must fill in this field properly to submit the form.
- `'valid'` (or `true`) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state

To apply one of the contextual state icons on `<b-form-input>`, set the `state` prop
to:
- `'invalid'` or `false` for invalid contextual state
- `'valid'` or `true` for the valid contextual state
- `null` for no validation contextual state (default)

```html
<b-container fluid>
  <b-row class="my-1">
    <b-col sm="3"><label for="input-none">No State:</label></b-col>
    <b-col sm="9">
      <b-form-input id="input-none" :state="null" type="text" placeholder="No validation"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="my-1">
    <b-col sm="3"><label for="input-valid">Valid State:</label></b-col>
    <b-col sm="9">
      <b-form-input id="input-valid" :state="true" type="text" placeholder="Valid input"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="my-1">
    <b-col sm="3"><label for="input-invalid">Invalid State:</label></b-col>
    <b-col sm="9">
      <b-form-input id="input-invalid" :state="false" type="text" placeholder="Invalid input"></b-form-input>
    </b-col>
  </b-row>
</b-container>

<!-- form-input-states-1.vue -->
```

**Live Example**
```html
<template>
  <div role="group">
    <label for="inputLive">Name:</label>
    <b-form-input id="inputLive"
                  v-model.trim="name"
                  type="text"
                  :state="nameState"
                  aria-describedby="inputLiveHelp inputLiveFeeback"
                  placeholder="Enter your name"></b-form-input>
    <b-form-invalid-feedback id="inputLiveFeedback">
      <!-- This will only be shown if the preceeding input has an invalid state -->
      Enter at least 3 letters
    </b-form-invalid-feedback>
    <b-form-text id="inputLiveHelp">
      <!-- this is a form text block (formerly known as help block) -->
      Your full name.
    </b-form-text>
  </div>
</template>

<script>
export default {
  computed: {
    nameState () {
      return this.name.length > 2 ? true : false
    }
  },
  data () {
    return {
      name: ''
    }
  }
}
</script>

<!-- form-input-states-2.vue -->
```

> **Tip:** Use the [`<b-form-group>`](/docs/components/form-group) component to
automatically generate markup similar to above.

### Conveying contextual state to assistive technologies and colorblind users
Using these contextual states to denote the state of a form control only provides
a visual, color-based indication, which will not be conveyed to users of assistive
technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you
could include a hint about state in the form control's `<label>` text itself, or by
providing an additional help text block.

### ARIA `aria-invalid` attribute
Specifically for assistive technologies, invalid form controls can also be assigned
an `aria-invalid="true"` attribute.

When `<b-form-input>` has an invalid contextual state (i.e. `'invalid'` or `false`) you may also
want to set the `<b-form-input>` prop `aria-invalid` to `true`, or to one of the supported
values:

- `false`: No errors detected (default)
- `true` or `'true'`: The value has failed validation.
- `'grammar'` A grammatical error has been detected.
- `'spelling'` A spelling error has been detected.

If `aria-invalid` is not explicitly set and `state` is set to `false` (or `'invalid'`),
then the `aria-invalid` attribute on the input will automatically be set to `'true'`;


## Formatter support
`<b-form-input>` optionally supports formatting by passing a function reference to
the `formatter` prop.

By default, formatting occurs when the control's native `input` event fires. You can
use the boolean prop `lazy-formatter` to restrict the formatter function to being
called on the control's native `change` event (which usually occurs on blur).

The `formatter` function receives two arguments: the raw `value` of the input element,
and the native `event` object.

The `formatter` function should return the formatted value (as a string).

No formatting occurs if a `formatter` is not provided.

```html
<template>
  <div>
    <label for="inputFormatter">Text input with formatter (on input)</label>
    <b-form-input id="inputFormatter"
                  v-model="text1"
                  type="text"
                  placeholder="Enter your name"
                  aria-describedby="inputFormatterHelp"
                  :formatter="format"></b-form-input>
    <b-form-text id="inputFormatterHelp">
     We will convert your name to lowercase instantly
    </b-form-text>
    <p>Value: {{ text1 }}</p>

    <label for="inputLazy">Text input with lazy formatter (on change)</label>
    <b-form-input id="inputLazy"
                  v-model="text2"
                  type="text"
                  placeholder="Enter your name"
                  aria-describedby="inputLazyHelp"
                  :formatter="format"
                  lazy-formatter></b-form-input>
    <b-form-text id="inputLazyHelp">
      This one is a little lazy!
    </b-form-text>
    <p>Value: {{ text2 }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text1: '',
      text2: ''
    }
  },
  methods: {
    format (value, event) {
      return value.toLowerCase()
    }
  }
}
</script>

<!-- form-input-formatter.vue -->
```

**Note:** When using a non-text-like input (i.e. `color`, `range`, `date`,
`number` etc), ensure that your formatter function returns the value in the
expected format for the input type. The formatter **must** return the value
as a string.


## Readonly plain text
If you want to have `<b-form-input readonly>` elements in your form styled as plain
text, set the `plaintext` prop (no need to set `readonly`) to remove the default form
field styling and preserve the correct margin and padding.


## Component alias
You can also use `<b-form-input>` by it's shorter alias of `<b-input>`.


## Component Reference
