# Form Select

> Bootstrap custom `<select>` using custom styles. Optionally specify options based on an
array, array of objects, or an object.

Generate your select options by pasing an aray or object to the `options` props:

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3">
    </b-form-select>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
export default {
  data: {
    selected: null,
    options: [
      { value: null, text: 'Please select an option' },
      { value: 'a', text: 'This is First option' },
      { value: 'b', text: 'Selected Option' },
      { value: {'C':'3PO'}, text: 'This is an option with object value' },
      { value: 'd', text: 'This one is disabled', disabled: true }
    ]
  }
}
</script>

<!-- form-select-1.vue -->
```

Or manualy provide your options and optgroups:

```html
<template>
  <div>
    <b-form-select v-model="selected" class="mb-3">
      <b-form-option :value="null">Please select an option</b-form-select>
      <b-form-option value="a">Option A</b-form-select>
      <b-form-option value="b" disabled>Option B (disabled)</b-form-select>
      <b-form-optgroup label="Grouped Options">
        <b-form-option :value="{'C':'3PO'}">Option with object value</b-form-select>
        <b-form-option :value="{'R':'2D2'}">Another option with object value</b-form-select>
      </b-form-optgroup>
    </b-form-select>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data: {
      selected: null
    }
  };
</script>

<!-- form-select-2.vue -->
```

Feel free to mix the `options` prop with `<b-form-option>` and `<b-form-optgroup>`.
Manully placed options and optgroups will appear _below_ the options generated via the
`options` prop. To place manual options and optgroups _above_ the options specified
by the `options` prop, use the named slot `first`.


## Options

`options` can be an array or a key-value object. Available fields:

- **`text`** Display text
- **`value`** The selected text which will be set on `v-model`
- **`disabled`** Disables item for selection

If you want to customize fields (for example using `name` field for display text)
you can easily change them using `text-field` and `value-field` props.

### Array

```js
['A', 'B', 'C', {text:'D', value:'d', disabled:true}, 'E', 'F']
```

### Array of objects

```js
[
  {text: 'Item 1', value: 'first'},
  {text: 'Item 2', value: 'second'},
  {text: 'Item 3', value: 'third', disabled: true}
  {text: 'Item 3', value: { foo:'bar', baz:true}}
]
```

### Object

Keys are mapped to value and values are mapped to option object.

```js
{
  a: 'Item A',
  b: 'Item B',
  c: {text: 'Item C', disabled: true},
  d: {text: 'Item D', value: 'overridden_value'},
  e: {text: 'Item E', value: { foo:'bar', baz:true}}
}
```

## Standard (single) select

By default, Bootstrap V4's custom select styling is applied.

### Value

In non `multiple` mode, `<b-form-select>` returns the a single `value` of the currently
selected option.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3">
    </b-form-select>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
export default {
  data: {
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
</script>

<!-- form-select-3.vue -->
```

### Select sizing (displayed rows)

You can use the `select-size` prop to switch the custom select into a select
list-box, rather than a dropdown. Set the `select-size` prop to a numerical
value greater than 1 to control how many rows of options are visible.

Note when `select-size` is set to a value greater than 1, the Bootstrap V4 custom
styling will **not** be applied.

Note: not all mobile browsers will show a the select as a list-box.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3" :select-size="4">
    </b-form-select>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
export default {
  data: {
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
</script>

<!-- form-select-4.vue -->
```

## Multiple select support

Enable multiple select mode by setting the prop `multiple`, and control how many
rows are displayed in the multiple select list-box by setting `select-size` to
the number of rows to display. The default is to let the browser use it's default
(typically 4).

Multiple select does not support Bootstrap's custom select styling, so it will
be rendered using a native browser multi-select, but with the `.form-control`
class applied.

### Value

In `multiple` mode, `<b-form-select>` always returns an array of option values.
You **must** provide an array reference as your `v-model` when in `multiple` mode.

```html
<template>
  <div>
    <b-form-select multiple :select-size="4" v-model="selected" :options="options" class="mb-3">
    </b-form-select>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
export default {
  data: {
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
</script>

<!-- form-select-5.vue -->
```

## Control sizing

Set the form-control text size using the `size` prop to `sm` or `lg` for small or
large respectively.

By default `<b-form-select>` will occupy the full width of the container that it
appears in. To control the select width, place the input inside standard Bootstrap
grid column.

## Contextual States
Bootstrap includes validation styles for `valid` and `invalid` states
on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:

- `'invalid'` is great for when there’s a blocking or required field. A user must fill in this field properly to submit the form.
- `'valid'` is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state

To apply one of the contextual states on `<b-form-select>`, set the `state` prop
to `'invalid'`, `'valid'`, or `null`.

To apply one of the contextual states on `<b-form-select>`, set the `state` prop
to `danger`, `warning`, or `success` on the `<b-form-fieldset>` that wraps
the `<b-form-select>`.

### Conveying contextual validation state to assistive technologies and colorblind users:

Using these contextual states to denote the state of a form control only provides
a visual, color-based indication, which will not be conveyed to users of assistive
technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you
could include a hint about state in the form control's `<label>` text itself, or by
providing an additional help text block (via `<b-form-group>` or `<b-form-feedback>`).
Specifically for assistive technologies, invalid form controls can also be assigned
an `aria-invalid="true"` attribute (see below).

### ARIA `aria-invalid` attribute:

When `<b-form-select>` has an invalid contextual state (i.e. `invalid`) you may also
want to set the `<b-form-select>` prop `aria-invalid` to `true`.

Supported `invalid` values are:

- `false` (default) No errors detected
- `true` The value has failed validation.

When `state` is set to `invalid`, aria-invalid will also be set to true.

## Non custom select

Set the prop `plain` to have a native browser `<select>` rendered (although the class
`.form-control` will always be placed on the select).

Multiple select will always render as a `plain` select, as will any `<b-form-select>`
that has the `select-size` prop set to a value greater than 1.

## Aliases
- `<b-form-option>` can use used by the shorter alias `<b-option>`.
- `<b-form-optgroup>` can be used by the shorter alias `<b-optgroup>`.
