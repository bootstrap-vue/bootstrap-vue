# Form Input

> Create various type inputs such as: `text`, `password`, `number`, `url`, `email`, `search`,
> `range`, `date` and more.

```html
<template>
  <div>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
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

<!-- b-form-input.vue -->
```

## Input type

`<b-form-input>` defaults to a `text` input, but you can set the `type` prop to one of the supported
native browser HTML5 types: `text`, `password`, `email`, `number`, `url`, `tel`, `search`, `date`,
`datetime`, `datetime-local`, `month`, `week`, `time`, `range`, or `color`.

```html
<template>
  <b-container fluid>
    <b-row class="my-1" v-for="type in types" :key="type">
      <b-col sm="3">
        <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        types: [
          'text',
          'number',
          'email',
          'password',
          'search',
          'url',
          'tel',
          'date',
          'time',
          'range',
          'color'
        ]
      }
    }
  }
</script>

<!-- b-form-input-types.vue -->
```

If the `type` prop is set to an input type that is not supported (see above), a `text` input will be
rendered and a console warning will be issued.

**Caveats with input types:**

- Not all browsers support all input types, nor do some types render in the same format across
  browser types/versions. Refer to [Can I use](https://caniuse.com/?search=input).
- Browsers that do not support a particular type will fall back to a `text` input type (even though
  the rendered `type` attribute markup shows the requested type).
- No testing is performed to see if the requested input type is supported by the browser.
- Chrome lost support for `datetime` in version 26, Opera in version 15, and Safari in iOS 7.
  Instead of using `datetime`, since support should be deprecated, use `date` and `time` as two
  separate inputs.
- `date` and `time` inputs are native browser types, and are not a custom date/time picker.
- For date and time style inputs, where supported, the displayed value in the GUI may be different
  than what is returned by its value (i.e. ordering of year-month-date).
- Regardless of input type, the value is **always** returned as a string representation.
- `v-model.lazy` is not supported by `<b-form-input>` (nor any custom Vue component). Use the `lazy`
  prop instead.
- `v-model` modifiers `.number` and `.trim` can cause unexpected cursor jumps when the user is
  typing (this is a Vue issue with `v-model` on custom components). _Avoid using these modifiers_.
  Use the `number` or `trim` props instead.
- Older version of Firefox may not support `readonly` for `range` type inputs.
- Input types that do not support `min`, `max` and `step` (i.e. `text`, `password`, `tel`, `email`,
  `url`, etc.) will silently ignore these values (although they will still be rendered on the input
  markup) if values are provided.

**Caveats with predictive text entry and IME composition entry:**

- When using predictive text auto-suggested words, the `v-model` will not update until the
  auto-suggested word is selected (or a space is typed). If an auto suggested word is not selected,
  the v-model will update with the current _displayed text_ of the input when the input is blurred.
- When using IME composition (ie. Chinese, Japanese, etc.), the `v-model` will not update until the
  IME composition is completed.

### Range type input

Inputs with type `range` render using Bootstrap v4's `.custom-range` class. The track (the
background) and thumb (the value) are both styled to appear the same across browsers.

Range inputs have implicit values for `min` and `max` of `0` and `100` respectively. You may specify
new values for those using the `min` and `max` props.

```html
<template>
  <div>
    <label for="range-1">Example range with min and max</label>
    <b-form-input id="range-1" v-model="value" type="range" min="0" max="5"></b-form-input>
    <div class="mt-2">Value: {{ value }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '2'
      }
    }
  }
</script>

<!-- b-form-input-range.vue -->
```

By default, range inputs "snap" to integer values. To change this, you can specify a `step` value.
In the example below, we double the number of steps by using step="0.5".

```html
<template>
  <div>
    <label for="range-2">Example range with step value</label>
    <b-form-input id="range-2" v-model="value" type="range" min="0" max="5" step="0.5"></b-form-input>
    <div class="mt-2">Value: {{ value }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '2'
      }
    }
  }
</script>

<!-- b-form-input-range-step.vue -->
```

**Note:** Range inputs (as do all input types) return their value as a string. You may need to
convert the value to a native number by using `Number(value)`, `parseInt(value, 10)`,
`parseFloat(value)`, or use the `number` prop.

**Note:** Bootstrap v4 CSS does not include styling for range inputs inside input groups, nor
validation styling on range inputs. However, BootstrapVue includes custom styling to handle these
situations until styling is included in Bootstrap v4.

## Control sizing

Set heights using the `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

```html
<b-container fluid>
  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-small">Small:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-small" size="sm" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-default">Default:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-default" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-large">Large:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-large" size="lg" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
</b-container>

<!-- b-form-input-size.vue -->
```

**Note:** Input type `range` currently does not support control sizing unless it is placed inside a
`<b-input-group>` which has its `size` prop set.

**Note:** The native HTML `<input>` attribute `size` (which sets a horizontal width on the `<input>`
in characters) is not supported. Use styling, utility classes, or the layout rows (`<b-row>`) and
columns (`<b-col>`) to set the desired width.

## Contextual states

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

- `false` (denotes invalid state) is great for when there's a blocking or required field. A user
  must fill in this field properly to submit the form.
- `true` (denotes valid state) is ideal for situations when you have per-field validation throughout
  a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `<b-form-input>`, set the `state` prop to `false` (for
invalid), `true` (for valid), or `null` (no validation state).

```html
<b-container fluid>
  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-none">No State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-none" :state="null" placeholder="No validation"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-valid">Valid State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-valid" :state="true" placeholder="Valid input"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-invalid">Invalid State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-invalid" :state="false" placeholder="Invalid input"></b-form-input>
    </b-col>
  </b-row>
</b-container>

<!-- b-form-input-states.vue -->
```

**Live Example**

```html
<template>
  <div role="group">
    <label for="input-live">Name:</label>
    <b-form-input
      id="input-live"
      v-model="name"
      :state="nameState"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Enter your name"
      trim
    ></b-form-input>

    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      Enter at least 3 letters
    </b-form-invalid-feedback>

    <!-- This is a form text block (formerly known as help block) -->
    <b-form-text id="input-live-help">Your full name.</b-form-text>
  </div>
</template>

<script>
  export default {
    computed: {
      nameState() {
        return this.name.length > 2 ? true : false
      }
    },
    data() {
      return {
        name: ''
      }
    }
  }
</script>

<!-- b-form-input-states-feedback.vue -->
```

> **Tip:** Use the [`<b-form-group>`](/docs/components/form-group) component to automatically
> generate markup similar to above.

### Conveying contextual state to assistive technologies and colorblind users

Using these contextual states to denote the state of a form control only provides a visual,
color-based indication, which will not be conveyed to users of assistive technologies - such as
screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a
hint about state in the form control's `<label>` text itself, or by providing an additional help
text block.

### ARIA `aria-invalid` attribute

Specifically for assistive technologies, invalid form controls can also be assigned an
`aria-invalid="true"` attribute.

When `<b-form-input>` has an invalid contextual state (i.e. state is `false`) you may also want to
set the `<b-form-input>` prop `aria-invalid` to `true`, or to one of the supported values:

- `false`: Convey no errors detected (default)
- `true` (or `'true'`): Convey that the value has failed validation.
- `'grammar'` Convey that a grammatical error has been detected.
- `'spelling'` Convey that a spelling error has been detected.

If `aria-invalid` is not explicitly set and `state` is set to `false`, then the `aria-invalid`
attribute on the input will automatically be set to `'true'`;

## Formatter support

`<b-form-input>` optionally supports formatting by passing a function reference to the `formatter`
prop.

Formatting (when a formatter function is supplied) occurs when the control's native `input` and
`change` events fire. You can use the boolean prop `lazy-formatter` to restrict the formatter
function to being called on the control's native `blur` event.

The `formatter` function receives two arguments: the raw `value` of the input element, and the
native `event` object that triggered the format (if available).

The `formatter` function should return the formatted value as a _string_.

Formatting does not occur if a `formatter` is not provided.

```html
<template>
  <div>
    <b-form-group
      label="Text input with formatter (on input)"
      label-for="input-formatter"
      description="We will convert your name to lowercase instantly"
      class="mb-0"
    >
      <b-form-input
        id="input-formatter"
        v-model="text1"
        placeholder="Enter your name"
        :formatter="formatter"
      ></b-form-input>
    </b-form-group>
    <p><b>Value:</b> {{ text1 }}</p>

    <b-form-group
      label="Text input with lazy formatter (on blur)"
      label-for="input-lazy"
      description="This one is a little lazy!"
      class="mb-0"
    >
      <b-form-input
        id="input-lazy"
        v-model="text2"
        placeholder="Enter your name"
        lazy-formatter
        :formatter="formatter"
      ></b-form-input>
    </b-form-group>
    <p class="mb-0"><b>Value:</b> {{ text2 }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text1: '',
        text2: ''
      }
    },
    methods: {
      formatter(value) {
        return value.toLowerCase()
      }
    }
  }
</script>

<!-- b-form-input-formatter.vue -->
```

**Note:** When using a non-text-like input (i.e. `color`, `range`, `date`, `number`, `email` etc.),
ensure that your formatter function returns the value in the expected format (`date` ->
'2000-06-01', `color` -> '#ff0000', etc.) for the input type. The formatter **must** return the
value as a _string_.

**Note:** With non-lazy formatting, if the cursor is not at the end of the input value, the cursor
may jump to the end _after_ a character is typed. You can use the provided event object and the
`event.target` to access the native input's selection methods and properties to control where the
insertion point is. This is left as an exercise for the reader.

## Readonly plain text

If you want to have `<b-form-input readonly>` elements in your form styled as plain text, set the
`plaintext` prop (no need to set `readonly`) to remove the default form field styling and preserve
the correct margin and padding.

The `plaintext` option is not supported by input types `color` or `range`.

## Disabling mousewheel events on numeric-like inputs

On some browsers, scrolling the mousewheel while a numeric-like input is focused will increment or
decrement the input's value. To disable this browser feature, just set the `no-wheel` prop to
`true`.

## Datalist support

Datalists are a native HTML tag `<datalist>` that contains a list of `<option>` tags. By assigning
an ID to the datalist tag, the list can be references from a text input by adding a `list`
attribute.

This gives the input the behavior of a combo box or auto-complete, allowing existing values to be
chosen, or new values to be entered.

```html
<template>
  <div>
    <b-form-input list="my-list-id"></b-form-input>

    <datalist id="my-list-id">
      <option>Manual Option</option>
      <option v-for="size in sizes">{{ size }}</option>
    </datalist>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sizes: ['Small', 'Medium', 'Large', 'Extra Large']
      }
    }
  }
</script>

<!-- b-form-input-datalist.vue -->
```

BootstrapVue provides the form helper component
[`<b-form-datalist>`](/docs/components/form/#datalist-helper) for quickly creating a `<datalist>`
from an array of options.

**Notes:**

- Datalists work in conjunction with the browser's built in auto-complete, displaying datalist
  options first, followed by auto-complete options. To only display datalist options, set
  `autocomplete="off"` on `<b-form-input>`.
- Datalists **cannot** be applied to input fields with type `password`, `range` or `color`.
- Not all browsers fully support `<datalist>` and implementations can be buggy. It is recommended
  that datalists be treated as an enhancement and not be relied upon at this time. Check
  [Can I use](https://caniuse.com/datalist) for full support details on all browsers.

## `v-model` modifiers

Vue does not officially support `.lazy`, `.trim`, and `.number` modifiers on the `v-model` of custom
component based inputs, and may generate a bad user experience. Avoid using Vue's native modifiers.

To get around this, `<b-form-input>` has three boolean props `trim`, `number`, and `lazy` which
emulate the native Vue `v-model` modifiers `.trim` and `.number` and `.lazy` respectively. The
`lazy` prop will update the v-model on `change`/`blur`events.

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

## Debounce support

As an alternative to the `lazy` modifier prop, `<b-form-input>` optionally supports debouncing user
input, updating the `v-model` after a period of idle time from when the last character was entered
by the user (or a `change` event occurs). If the user enters a new character (or deletes characters)
before the idle timeout expires, the timeout is re-started.

To enable debouncing, set the prop `debounce` to any integer greater than zero. The value is
specified in milliseconds. Setting `debounce` to `0` will disable debouncing.

Note: debouncing will _not_ occur if the `lazy` prop is set.

```html
<template>
  <div>
    <b-form-input v-model="value" type="text" debounce="500"></b-form-input>
    <div class="mt-2">Value: "{{ value }}"</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>

<!-- b-form-input-debounce.vue -->
```

## Autofocus

When the `autofocus` prop is set, the input will be auto-focused when it is inserted (i.e.
**mounted**) into the document, or re-activated when inside a Vue `<keep-alive>` component. Note
that this prop **does not** set the `autofocus` attribute on the input, nor can it tell when the
input becomes visible.

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

## Using HTML5 `<input>` as an alternative

If you just need a simple input with basic Bootstrap styling, you can simply use the following:

```html
<template>
  <div>
    <input v-model="value" type="text" class="form-control">
    <br>
    <p>Value: "{{ value }}"</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>

<!-- native-input.vue -->
```

<!-- Component reference added automatically from component package.json -->
