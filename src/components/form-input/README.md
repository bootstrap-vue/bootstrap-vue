# Textual and Value inputs

> Create various type inputs such as: `text`, `password`, `number`, `url`,
`email`, `search`, `range`, `date` and more.

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
of the supported native browser HTML5 types: `text`, `password`, `email`, `number`, `url`,
`tel`, `search`, `date`, `datetime`, `datetime-local`, `month`, `week`, `time`,
`range`, or `color`.

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

If the `type` prop is set to an input type that is not supported (see above), a `text` input
will be rendered and a console warning will be issued.

**Caveats with input types:**
- Not all browsers support all input types, nor do some types render in the same format across
browser types/versions.
- Browsers that do not support a particular type will fall back to a `text` input type (event thoough the rendered `type` attribute markup shows the requested type).
- No testing is performed to see if the requested input type is supported by the browser.
- Chrome lost support for `datetime` in version 26, Opera in version 15, and Safari in iOS 7.
Instead of using `datetime`, since support should be deprecated, use `date` and `time`
as two separate inputs.
- `date` and `time` inputs are native borwser types, and are not a custom date/time picker.
- For date and time style inputs, where supported, the displayed value in the GUI may be different
than what is returned by it's value (i.e. ordering of year-month-date).
- Regardless of input type, the value is **always** returned as a string representation.
- `v-model.lazy` is not supported by `<b-form-input>` (nor any custom vue component).
- `v-model` modifiers `.number` and `.trim` can cause unexpected cursor jumps when the user is typing (this is a Vue issue with `v-model` on custom components). Avoid using these modifiers.
- Older version of firefox may not support `readonly` for `range` type inputs.
- Input types that do not support `min`, `max` and `step` (i.e. `text`, `password`, `tel`, `email`, `url`, etc) will silently ignore these values (although they will still be rendered on the input markup).

### Range type input
Inputs with type `range` render using Bootstrap V4's `.custom-range` class. The track
(the background) and thumb (the value) are both styled to appear the same across browsers.

Range inputs have implicit values for `min` and `max` of `0` and `100` respectively. You
may specify new values for those using the `min` and `max` props.

```html
<template>
  <div>
    <label for="range-1">Example range with min and max</label>
    <b-form-input type="range" id="range-1" v-model="value" min="0" max="5" />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 2
    }
  }
}
</script>

<!-- form-input-range-1.vue -->
```

By default, range inputs “snap” to integer values. To change this, you can specify a `step`
value. In the example below, we double the number of steps by using step="0.5".

```html
<template>
  <div>
    <label for="range-2">Example range with step value</label>
    <b-form-input type="range" id="range-2" v-model="value" min="0" max="5" step="0.5" />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 2
    }
  }
}
</script>

<!-- form-input-range-2.vue -->
```

**Note:** Range inputs (as do all input types) return their value as a string. You may
need to convert the value to a native number by using `Number(value)`, `parseInt(value, 10)`,
`parseFloat(value)`, or use the `.number` modifier on the `v-model`.

**Note:** Bootsttrap V4.1 CSS does not include styling for range inputs inside input groups,
nor validation styling on range inputs. However, Bootstrap-Vue includes custom styling to handle
these situations until styling is included in Bootstrap V4.


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

**Note:** Input type `range` currently does not support control sizing unless it is placed inside a
`<b-input-group>` which has its `size` prop set.

**Note:** The native HTML `<input>` attribute `size` (which sets a horizontal width on the
`<input>` in characters) is not supported. Use styling, utility classes, or the layout rows (`<b-row>`)
and columns (`<b-col>`) to set the desired width.


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
                  aria-describedby="inputLiveHelp inputLiveFeedback"
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

- `false`: Convey no errors detected (default)
- `true` (or `'true'`): Convey that the value has failed validation.
- `'grammar'` Convey that a grammatical error has been detected.
- `'spelling'` Convey that a spelling error has been detected.

If `aria-invalid` is not explicitly set and `state` is set to `false` (or `'invalid'`),
then the `aria-invalid` attribute on the input will automatically be set to `'true'`;


## Formatter support
`<b-form-input>` optionally supports formatting by passing a function reference to
the `formatter` prop.

Formatting (when a formatter funtion is supplied) occurs when the control's native `input`
event fires. You can use the boolean prop `lazy-formatter` to restrict the formatter
function to being called on the control's native `change` event (which usually occurs on blur).

The `formatter` function receives two arguments: the raw `value` of the input element,
and the native `event` object (if available). If the formatter is triggered during a
`v-model` update (or by running the component `.format()` method), then the event argument
will be `null`.

The `formatter` function should return the formatted value (as a string).

Formatting does not occur if a `formatter` is not provided.

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
`number`, `email` etc), ensure that your formatter function returns the value in the
expected format for the input type. The formatter **must** return the value
as a _string_.

**Note:** With non-lazy formatting, if the cursor is not at the end of the input value,
the cursor may jump to the end _after_ a character is typed. You can use the provided
event object and the `event.target` to access the native input's selection methods and
properties to control where the insertion point is.  This is left as an exercise for the reader.


## Readonly plain text
If you want to have `<b-form-input readonly>` elements in your form styled as plain
text, set the `plaintext` prop (no need to set `readonly`) to remove the default form
field styling and preserve the correct margin and padding.

The `plaintext` option is not supported by input types `color` or `range`.

## Disabling mousewheel events on numeric-like inputs
On some browsers, scrolling the mousewheel while a numeric-like input is focused will
increment or decrement the input's value. To disable this browser feture, just set
the `no-wheel` prop to `true`.

## Native input events
All native events (other than the cuustom `input` and `change` events) are supported, without
the need for the `.native` modifier. Available events will vary based on input type.

The custom `input` and `change` events receive to paramters: the input value (after
custom formatter has been applied), and the native event object.

You can always access the native `input` and `change` events by using the `.native` modifier.

## Exposed input properties and methods
`<b-form-input>` exposes several of the native input element's properties and methods on the 
component reference (i.e. assign a `ref` to your `<b-form-input ref="foo" ...>` and
use `this.$refs['foo'].propertyName` or `this.$refs['foo'].methodName(...)`).

### Input Properties

| Property | Notes |
| -------- | ----- |
| `.selectionStart` | Read/Write |
| `.selectionEnd` | Read/Write |
| `.selectionDirection` | Read/Write |
| `.validity` | Read only |
| `.validationMessage` | Read only |
| `.willValidate` | Read only |

### Input Methods

| Method | Notes |
| ------ | ----- |
| `.focus()` | Focus the input |
| `.blur()` | Remove focus from the input |
| `.select()` | Selects all text within the input |
| `.setSelectionRange()` | |
| `.setRangeText()` | |
| `.setCustomValidity()` | |
| `.checkValidity()` | |
| `.reportValidity()` | |

Refer to https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement for
more information on these methods and properties.  Support will vary based on
input type.

### Custom input methods
`b-form-input` also exposes the following custom method(s):

| Method | Notes
| ------ | -----
| `.format()` | Forces the input to run the formatter. The event arument passed to the formatter will be `null`


<!-- Component reference added automatically from component package.json -->
