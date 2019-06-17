# Form Select

> Bootstrap custom `<select>` using custom styles. Optionally specify options based on an array,
> array of objects, or an object.

Generate your select options by passing an array or object to the `options` props:

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
      }
    }
  }
</script>

<!-- b-form-select-options.vue -->
```

Or manually provide your options and optgroups:

```html
<template>
  <div>
    <b-form-select v-model="selected" class="mb-3">
      <option :value="null">Please select an option</option>
      <option value="a">Option A</option>
      <option value="b" disabled>Option B (disabled)</option>
      <optgroup label="Grouped Options">
        <option :value="{ C: '3PO' }">Option with object value</option>
        <option :value="{ R: '2D2' }">Another option with object value</option>
      </optgroup>
    </b-form-select>

    <div class="mt-2">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null
      }
    }
  }
</script>

<!-- b-form-select-manual.vue -->
```

Feel free to mix the `options` prop with `<option>` and `<optgroup>`. Manually placed options and
optgroups will appear _below_ the options generated via the `options` prop. To place manual options
and optgroups _above_ the options specified by the `options` prop, use the named slot `first`.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template slot="first">
        <option :value="null" disabled>-- Please select an option --</option>
      </template>

      <!-- These options will appear after the ones from 'options' prop -->
      <option value="C">Option C</option> <option value="D">Option D</option>
    </b-form-select>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: 'A', text: 'Option A (from options prop)' },
          { value: 'B', text: 'Option B (from options prop)' }
        ]
      }
    }
  }
</script>

<!-- b-form-select-both.vue -->
```

## Options property

`options` can be an array of strings or objects, or a key-value object. Available fields:

- **`value`** The selected value which will be set on `v-model`
- **`disabled`** Disables item for selection
- **`text`** Display text, or **`html`** Display basic inline html

`value` can be a string, number, or simple object. Avoid using complex types in values.

If both `html` and `text` are provided, `html` will take precedence. Only basic/native HTML is
supported in the `html` field (components will not work). Note that not all browsers will render
inline html (i.e. `<i>`, `<strong>`, etc) inside `<option>` elements of a `<select>`.

<p class="alert alert-danger">
  <strong>Be cautious</strong> of placing user supplied content in the <code>html</code> field,
  as it may make you vulnerable to
  <a class="alert-link" href="https://en.wikipedia.org/wiki/Cross-site_scripting">
  <abbr title="Cross Site Scripting Attacks">XSS attacks</abbr></a>, if you do not first
  <a class="alert-link" href="https://en.wikipedia.org/wiki/HTML_sanitization">sanitize</a> the
  user supplied string.
</p>

If you want to customize fields (for example using `name` field for display text) you can easily
change them using `text-field`, `html-field`, `value-field`, and `disabled-field` props.

### Array

<!-- eslint-disable no-unused-vars -->

```js
const options = ['A', 'B', 'C', { text: 'D', value: { d: 1 }, disabled: true }, 'E', 'F']
```

If an array entry is a string, it will be used for both the generated `value` and `text` fields.

You can mix using strings and [objects](#objects) in the array.

Internally, BootstrapVue will convert the above array to the following array (the
[Array of Objects](#array-of-objects) format:

<!-- eslint-disable no-unused-vars -->

```js
const options = [
  { text: 'A', value: 'A', disabled: false },
  { text: 'B', value: 'B', disabled: false },
  { text: 'C', value: 'C', disabled: false },
  { text: 'D', value: { d: 1 }, disabled: true },
  { text: 'E', value: 'E', disabled: false },
  { text: 'F', value: 'F', disabled: false }
]
```

### Array of objects

<!-- eslint-disable no-unused-vars -->

```js
const options = [
  { text: 'Item 1', value: 'first' },
  { text: 'Item 2', value: 'second' },
  { html: '<b>Item</b> 3', value: 'third', disabled: true },
  { text: 'Item 4' },
  { text: 'Item 5', value: { foo: 'bar', baz: true } }
]
```

If `value` is missing, then `text` will be used as both the `value` and `text` fields. If you use
the `html` property, you **must** supply a `value` property.

Internally, BootstrapVue will convert the above array to the following array (the
[Array of Objects](#array-of-objects) format:

<!-- eslint-disable no-unused-vars -->

```js
const options = [
  { text: 'Item 1', value: 'first', disabled: false },
  { text: 'Item 2', value: 'second', disabled: false },
  { html: '<b>Item</b> 3', value: 'third', disabled: true },
  { text: 'Item 4', value: 'Item 4', disabled: false },
  { text: 'Item 5', value: 'E', disabled: false },
  { text: 'F', value: { foo: 'bar', baz: true }, disabled: false }
]
```

### Object

Keys are mapped to `value` and values are mapped to option `text`.

<!-- eslint-disable no-unused-vars -->

```js
const options = {
  a: 'Item A',
  b: 'Item B',
  c: { html: 'Item C', disabled: true },
  d: { text: 'Item D', value: 'overridden_value' },
  e: { text: 'Item E', value: { foo: 'bar', baz: true } }
}
```

Internally, BootstrapVue will convert the above object to the following array (the
[Array of Objects](#array-of-objects) format:

<!-- eslint-disable no-unused-vars -->

```js
const options = [
  { text: 'Item A', value: 'a', disabled: false },
  { text: 'Item B', value: 'b', disabled: false },
  { html: 'Item C', value: 'c', disabled: false },
  { text: 'Item D', value: 'overridden_value', disabled: true },
  { text: 'E', value: { foo: 'bar', baz: true }, disabled: false }
]
```

**Note:** When using the [Object](#object) format, the order of the final array is **not**
guaranteed. For this reason, it is recommended to use the above array formats.

## Standard (single) select

By default, Bootstrap v4's custom select styling is applied.

### Value in single mode

In non `multiple` mode, `<b-form-select>` returns the a single `value` of the currently selected
option.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select some item' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Default Selected Option' },
          { value: 'c', text: 'This is another option' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
      }
    }
  }
</script>

<!-- b-form-select-single.vue -->
```

### Select sizing (displayed rows)

You can use the `select-size` prop to switch the custom select into a select list-box, rather than a
dropdown. Set the `select-size` prop to a numerical value greater than 1 to control how many rows of
options are visible.

Note when `select-size` is set to a value greater than 1, the Bootstrap v4 custom styling will
**not** be applied, unless the `multiple` prop is also set.

Note: not all mobile browsers will show a the select as a list-box.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" :select-size="4"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select some item' },
          { value: 'a', text: 'This is option a' },
          { value: 'b', text: 'Default Selected Option b' },
          { value: 'c', text: 'This is option c' },
          { value: 'd', text: 'This one is disabled', disabled: true },
          { value: 'e', text: 'This is option e' },
          { value: 'e', text: 'This is option f' }
        ]
      }
    }
  }
</script>

<!-- b-form-select-size.vue -->
```

## Multiple select support

Enable multiple select mode by setting the prop `multiple`, and control how many rows are displayed
in the multiple select list-box by setting `select-size` to the number of rows to display. The
default is to let the browser use it's default (typically 4).

### Value in multiple mode

In `multiple` mode, `<b-form-select>` always returns an array of option values. You **must** provide
an array reference as your `v-model` when in `multiple` mode.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" multiple :select-size="4"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: ['b'], // Array reference
        options: [
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Default Selected Option' },
          { value: 'c', text: 'This is another option' },
          { value: 'd', text: 'This one is disabled', disabled: true },
          { value: 'e', text: 'This is option e' },
          { value: 'f', text: 'This is option f' },
          { value: 'g', text: 'This is option g' }
        ]
      }
    }
  }
</script>

<!-- b-form-select-multiple-mode.vue -->
```

## Control sizing

Set the form-control text size using the `size` prop to `sm` or `lg` for small or large
respectively.

By default `<b-form-select>` will occupy the full width of the container that it appears in. To
control the select width, place the input inside standard Bootstrap grid column.

## Autofocus

<span class="badge badge-info small">NEW in 2.0.0-rc.21</span>

When the `autofocus` prop is set on `<b-form-select>`, the select will be auto-focused when it is
inserted into the document or re-activated when inside a Vue `<keep-alive>` component. Note that
this prop **does not** set the `autofocus` attribute on the select.

## Contextual states

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

- `'invalid'` is great for when there's a blocking or required field. A user must fill in this field
  properly to submit the form.
- `'valid'` is ideal for situations when you have per-field validation throughout a form and want to
  encourage a user through the rest of the fields.
- `null` Displays no validation state

To apply one of the contextual states on `<b-form-select>`, set the `state` prop to `'invalid'` (or
`false`), `'valid'` (or `true`), or `null`.

### Conveying contextual validation state to assistive technologies and colorblind users

Using these contextual states to denote the state of a form control only provides a visual,
color-based indication, which will not be conveyed to users of assistive technologies - such as
screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a
hint about state in the form control's `<label>` text itself, or by providing an additional help
text block (via `<b-form-group>` or `<b-form-feedback>`). Specifically for assistive technologies,
invalid form controls can also be assigned an `aria-invalid="true"` attribute (see below).

### ARIA `aria-invalid` attribute:

When `<b-form-select>` has an invalid contextual state (i.e. `invalid`) you may also want to set the
`<b-form-select>` prop `aria-invalid` to `true`.

Supported `invalid` values are:

- `false` (default) No errors detected
- `true` The value has failed validation.

When `state` is set to `invalid`, aria-invalid will also be set to true.

## Non custom select

Set the prop `plain` to have a native browser `<select>` rendered (although the class
`.form-control` will always be placed on the select).

A `plain` select will always be rendered for non `multiple` selects which have the `select-size`
prop set to a value greater than 1.

<!-- Component reference added automatically from component package.json -->
