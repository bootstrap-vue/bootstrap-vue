# Form textarea

> Create multi-line text inputs with support for auto height sizing, minimum and maximum number of
> rows, and contextual states.

```html
<template>
  <div>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-3 mb-0">{{ text }}</pre>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    }
  }
</script>

<!-- b-form-textarea.vue -->
```

## Control sizing

Set text height using the `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

```html
<b-container fluid>
  <b-row>
    <b-col sm="2">
      <label for="textarea-small">Small:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-small"
        size="sm"
        placeholder="Small textarea"
      ></b-form-textarea>
    </b-col>
  </b-row>

  <b-row class="mt-2">
    <b-col sm="2">
      <label for="textarea-default">Default:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-default"
        placeholder="Default textarea"
      ></b-form-textarea>
    </b-col>
  </b-row>

  <b-row class="mt-2">
    <b-col sm="2">
      <label for="textarea-large">Large:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-large"
        size="lg"
        placeholder="Large textarea"
      ></b-form-textarea>
    </b-col>
  </b-row>
</b-container>

<!-- b-form-textarea-sizes.vue -->
```

## Displayed rows

To set the height of `<b-form-textarea>`, set the `rows` prop to the desired number of rows. If no
value is provided to `rows`, then it will default to `2` (the browser default and minimum acceptable
value). Setting it to null or a value below 2 will result in the default of `2` being used.

```html
<div>
  <b-form-textarea
    id="textarea-rows"
    placeholder="Tall textarea"
    rows="8"
  ></b-form-textarea>
</div>

<!-- b-form-textarea-rows.vue -->
```

### Disable resize handle

Some web browsers will allow the user to re-size the height of the textarea. To disable this
feature, set the `no-resize` prop to `true`.

```html
<div>
  <b-form-textarea
    id="textarea-no-resize"
    placeholder="Fixed height textarea"
    rows="3"
    no-resize
  ></b-form-textarea>
</div>

<!-- b-form-textarea-no-resize.vue -->
```

### Auto height

`<b-form-textarea>` can also automatically adjust its height (text rows) to fit the content, even as
the user enters or deletes text. The height of the textarea will either grow or shrink to fit the
content (grow to a maximum of `max-rows` or shrink to a minimum of `rows`).

To set the initial minimum height (in rows), set the `rows` prop to the desired number of lines (or
leave it at the default of `2`), And then set maximum rows that the text area will grow to (before
showing a scrollbar) by setting the `max-rows` prop to the maximum number of lines of text.

To make the height `sticky` (i.e. never shrink), set the `no-auto-shrink` prop to `true`. The
`no-auto-shrink` props has no effect if `max-rows` is not set or is equal to or less than `rows`.

Note that the resize handle of the textarea (if supported by the browser) will automatically be
disabled in auto-height mode.

```html
<b-container fluid>
  <b-row>
    <b-col sm="2">
      <label for="textarea-auto-height">Auto height:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-auto-height"
        placeholder="Auto height textarea"
        rows="3"
        max-rows="8"
      ></b-form-textarea>
    </b-col>
  </b-row>

  <b-row class="mt-2">
    <b-col sm="2">
      <label for="textarea-no-auto-shrink">No auto-shrink:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-no-auto-shrink"
        placeholder="Auto height (no-shrink) textarea"
        rows="3"
        max-rows="8"
        no-auto-shrink
      ></b-form-textarea>
    </b-col>
  </b-row>
</b-container>

<!-- b-form-textarea-auto-height.vue -->
```

#### Auto height implementation note

Auto-height works by computing the resulting height via CSS queries, hence the input has to be in
document (DOM) and visible (not hidden via `display: none`). Initial height is computed on mount. If
the browser client supports [`IntersectionObserver`](https://caniuse.com/#feat=intersectionobserver)
(either natively or via [a polyfill](/docs#js)), `<b-form-textarea>` will take advantage of this to
determine when the textarea becomes visible and will then compute the height. Refer to the
[Browser support](/docs#browser) section on the getting started page.

## Contextual states

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

- `false` (denotes invalid state) is great for when there's a blocking or required field. A user
  must fill in this field properly to submit the form.
- `true` (denotes valid state) is ideal for situations when you have per-field validation throughout
  a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `<b-form-textarea>`, set the `state` prop to `false`
(for invalid), `true` (for valid), or `null` (no validation state).

```html
<template>
  <div>
    <b-form-textarea
      id="textarea-state"
      v-model="text"
      :state="text.length >= 10"
      placeholder="Enter at least 10 characters"
      rows="3"
    ></b-form-textarea>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    }
  }
</script>

<!-- b-form-textarea-state.vue -->
```

### Conveying contextual state to assistive technologies and colorblind users

Using these contextual states to denote the state of a form control only provides a visual,
color-based indication, which will not be conveyed to users of assistive technologies - such as
screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a
hint about state in the form control's `<label>` text itself, or by providing an additional help
text block.

### `aria-invalid` attribute

When `<b-form-textarea>` has an invalid contextual state (i.e. state is `false`) you may also want
to set the prop `aria-invalid` to `true`, or one of the supported values:

- `false`: No errors (default)
- `true` or `'true'`: The value has failed validation.
- `'grammar'`: A grammatical error has been detected.
- `'spelling'` A spelling error has been detected.

If the `state` prop is set to `false`, and the `aria-invalid` prop is not explicitly set,
`<b-form-textarea>` will automatically set the `aria-invalid` attribute to `'true'`.

## Formatter support

Refer to the [`<b-form-input>`](/docs/components/form-input) documentation regarding usage of the
optional formatter feature.

## Readonly plain text

If you want to have `<b-form-textarea readonly>` elements in your form styled as plain text, set the
`plaintext` prop (no need to set `readonly` as it will be set automatically) to remove the default
form field styling and preserve the correct text size, margin, padding and height.

```html
<template>
  <div>
    <b-form-textarea id="textarea-plaintext" plaintext :value="text"></b-form-textarea>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: "This is some text.\nIt is read only and doesn't look like an input."
      }
    }
  }
</script>

<!-- b-form-textarea-plaintext.vue -->
```

## `v-model` modifiers

Vue does not officially support `.lazy`, `.trim`, and `.number` modifiers on the `v-model` of custom
component based inputs, and may generate a bad user experience. Avoid using Vue's native modifiers.

To get around this, `<b-for-textarea>` and `<b-form-input>` have two boolean props `trim` and
`number` which emulate the native Vue `v-model` modifiers `.trim` and `.number` respectively.
Emulation of the `.lazy` modifier is _not_ supported (listen for `change` or `blur` events instead).

**Notes:**

- The `number` prop takes precedence over the `trim` prop (i.e. `trim` will have no effect when
  `number` is set).
- When using the `number` prop, and if the value can be parsed as a number (via `parseFloat`) it
  will return a value of type `Number` to the `v-model`, otherwise the original input value is
  returned as type `String`. This is the same behaviour as the native `.number` modifier.
- The `trim` and `number` modifier props do not affect the value returned by the `input` or `change`
  events. These events will always return the string value of the content of `<textarea>` after
  optional formatting (which may not match the value returned via the `v-model` `update` event,
  which handles the modifiers).

## Autofocus

When the `autofocus` prop is set, the textarea will be auto-focused when it is inserted into the
document, or re-activated when inside a Vue `<keep-alive>` component. Note that this prop **does
not** set the `autofocus` attribute on the textarea.

## Native and custom events

All native events (other than the custom `input` and `change` events) are supported, without the
need for the `.native` modifier.

The custom `input` and `change` events receive a single argument of the current `value` (after any
formatting has been applied), and are triggered by user interaction.

The custom `update` event is passed the input value, and is emitted whenever the `v-model` needs
updating (it is emitted before `input`, `change`. and `blur` as needed).

You can always access the native `input` and `change` events by using the `.native` modifier.

## Exposed input properties and methods

`<b-form-input>` exposes several of the native input element's properties and methods on the
component reference (i.e. assign a `ref` to your `<b-form-input ref="foo" ...>` and use
`this.$refs['foo'].propertyName` or `this.$refs['foo'].methodName(...)`).

### Input properties

| Property              | Notes      |
| --------------------- | ---------- |
| `.selectionStart`     | Read/Write |
| `.selectionEnd`       | Read/Write |
| `.selectionDirection` | Read/Write |
| `.validity`           | Read only  |
| `.validationMessage`  | Read only  |
| `.willValidate`       | Read only  |

### Input methods

| Method                 | Notes                             |
| ---------------------- | --------------------------------- |
| `.focus()`             | Focus the input                   |
| `.blur()`              | Remove focus from the input       |
| `.select()`            | Selects all text within the input |
| `.setSelectionRange()` |                                   |
| `.setRangeText()`      |                                   |
| `.setCustomValidity()` |                                   |
| `.checkValidity()`     |                                   |
| `.reportValidity()`    |                                   |

Refer to https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement for more information on
these methods and properties. Support will vary based on input type.

## Component alias

You can use `<b-form-textarea>` by it's shorter alias `<b-textarea>`.

<!-- Component reference added automatically from component package.json -->
