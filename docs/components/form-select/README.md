# Form Select

> Bootstrap custom `<select>` using custom styles. Provide options based on an array, array of objects. or an object.

```html
<template>
<div>
   <b-form-select v-model="selected" 
                   :options="options"
                   calss="mb-3"
    ></b-form-select>

  <div>Selected: <strong>{{selected}}</strong></div>
</div>  
</template>

<script>
export default {
  data: {
    selected: null,
    options: [
    {
      text: 'Please select some item',
      value: null
    },
    {
      text: 'This is First option',
      value: 'a'
    }, {
      text: 'Default Selected Option',
      value: 'b'
    }, {
      text: 'This is another option',
      value: 'c'
    }, {
      text: 'This one is disabled',
      value: 'd',
      disabled: true
    }]
  }
}
</script>

<!-- form-select.vue -->
```

### Options
`options` can be an array or a key-value object. Available fields:
 
- **`text`** Display text
- **`value`** The selected text which will be set on `v-model`
- **`disabled`** Disables item for selection

If you want to customize fields (for example using `name` field for display text) you can easily change them using `text-field` and `value-field` props.

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
  d: {text: 'D', disabled: true},
  e: {text: 'D', value:'overridden_value'}
}
```

### Value
By Default `b-form-select` returns the value of the currently selected option. By
setting the `return-object` prop to `true`, you can return the entire option object.

### Control sizing
Set heights using thw `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

### Contextual States
Bootstrap includes validation styles for danger, warning, and success states on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:
- `danger` is great for when there’s a blocking or required field. A user must fill in
this field properly to submit the form.
- `warning` works well for input values that are in progress, like password strength, or
soft validation before a user attempts to submit a form.
- `success` is ideal for situations when you have per-field validation throughout a form
and want to encourage a user through the rest of the fields.

To apply one of the contextual steates on `b-form-select`, set the `state` prop
to `danger`, `warning`, or `success`.

#### Conveying contextual validation state to assistive technologies and colorblind users:
Using these contextual states to denote the state of a form control only provides
a visual, color-based indication, which will not be conveyed to users of assistive
technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you
could include a hint about state in the form control's `<label>` text itself, or by
providing an additional help text block. Specifically for assistive technologies, 
invalid form controls can also be assigned an `aria-invalid="true"` attribute.

### Non custom select
Set the prop `plain` to have a native browser `<select>` rendered.
