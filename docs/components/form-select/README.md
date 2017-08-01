# Form Select

> Bootstrap custom `<select>` using custom styles. Provide options based on an
array, array of objects, or an object.

### Options
`options` can be an array or a key-value object. Available fields:
 
- **`text`** Display text
- **`value`** The selected text which will be set on `v-model`
- **`disabled`** Disables item for selection

If you want to customize fields (for example using `name` field for display text)
you can easily change them using `text-field` and `value-field` props.

#### Array:

```js
['A', 'B', 'C', {text:'D', disabled: true}, 'E', 'F']
```

#### Array of objects:

```js
[
 {text: 'Item 1', value: 'first'}, 
 {text: 'Item 2', value: 'second'}, 
 {text: 'Item 3', value: 'third', disabled: true}
]
```

#### Object:

Keys are mapped to value and values are mapped to option object. 

```js
{
  a: 'Item A',
  b: 'Item B',
  c: 'Item C',
  d: {text: 'Item D', disabled: true},
  e: {text: 'Item E', value: 'overridden_value'}
}
```

### Standard (single) select
By default, Bootstrap V4's custom select styling is applied.

#### Value:
In non `multiple` mode, `<b-form-select>` returns the `value` of the currently
selected option as a **String**.

**Example 1: Custom Select (default)**
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

<!-- form-select-1.vue -->
```

#### Select sizing (displayed rows):
You can use the `select-size` prop to switch the custom select into a select
list-box, rather than a dropdown. Set the `select-size` prop to a numerical
value greater than 1 to control how many rows of options are visible.

Note when `select-size` is set to a value greater than 1, the Bootstrap V4 custom
styling will **not** be applied.

**Example 2: Select in list-box mode**
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

<!-- form-select-2.vue -->
```


### Multiple select support
Enable multiple select mode by setting the prop `multiple`, and control how many
rows are displayed in the multiple select list-box by setting `select-size` to
the number of rows to display. The default is to let the browser use it's default
(typically 4).

Multiple select does not support Bootstrap's custom select styling, so it will
be rendered using a native browser multi-select, but with the `.form-control`
class applied.

#### Value:
In `multiple` mode, `<b-form-select>` always returns an array of option values.
You must provide an array reference as your `v-model` when in `multiple` mode.

**Example 3: Multiple Select**
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

<!-- form-select-3.vue -->
```

### Control sizing
Set the form-control text size using the `size` prop to `sm` or `lg` for small or
large respectively.

By default `<b-form-select>` will occupy the full width of the container that it
appears in. To control the select width, place the input inside standard Bootstrap
grid column.


### Contextual States
Bootstrap includes validation styles for danger, warning, and success states on most form controls.
The `<b-select>` will need to be wrapped inside a `<b-form-fieldset>` component.

Generally speaking, you’ll want to use a particular state for specific types of feedback:
- `danger` is great for when there’s a blocking or required field. A user must fill in
this field properly to submit the form.
- `warning` works well for input values that are in progress, like password strength, or
soft validation before a user attempts to submit a form.
- `success` is ideal for situations when you have per-field validation throughout a form
and want to encourage a user through the rest of the fields.

To apply one of the contextual states on `<b-form-select>`, set the `state` prop
to `danger`, `warning`, or `success` on the `<b-form-fieldset>` that wraps
the `<b-form-select>`.

#### Conveying contextual validation state to assistive technologies and colorblind users:
Using these contextual states to denote the state of a form control only provides
a visual, color-based indication, which will not be conveyed to users of assistive
technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you
could include a hint about state in the form control's `<label>` text itself, or by
providing an additional help text block (via `<b-form-fieldet>`). Specifically for
assistive technologies, invalid form controls can also be assigned
an `aria-invalid="true"` attribute (see below).

#### ARIA `aria-invalid` attribute:
When `<b-form-select>` has an invalid contextual state (i.e. `danger`) you may also
want to set the `<b-form-select>` prop `invalid` to `true`.

Supported `invaid` values are:
- `false` (default) No errors detected
- `true` The value has failed validation.

### Non custom select
Set the prop `plain` to have a native browser `<select>` rendered (although the class
`.form-control` will always be placed on the select).

Multiple select will always render as a `plain` select, as will any `<b-form-select>`
that has the `select-size` prop set to a value greater than 1.

