# Form Radio Input

> For cross browser consistency, `<b-form-radio>` uses Bootstrap's custom
radio input to replace the browser default radio input. It is built on top of
semantic and accessible markup, so it is a solid replacement for the default radio input.

```html
<template>
<div>
  <b-form-radio v-model="value2" :options="options" stacked>
  </b-form-radio>
  
  <br>
  <span>Selected: </span>
  <span>{{value2}}</span>
</div>  
</template>

<script>
export default {
  data: {
    value1: 'third',
    value2: 'third',
    options: [{
      text: 'Toggle this custom radio',
      value: 'first'
    }, {
      text: 'Or toggle this other custom radio',
      value: 'second'
    }, {
      text: 'This one is Disabled',
      value: 'third',
      disabled: true
    }]
  }
}
</script>

<!-- form-radio.vue -->
```

### Options

Please see options in [`<b-form-select>`](./form-select) docs for details on passing options
to `<b-form-radio>`

### Control sizing
Set heights using thw `size` prop to `sm` or `lg` for small or large respectively. 

### Contextual States
Bootstrap includes validation styles for danger, warning, and success states on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:
- `danger` is great for when there’s a blocking or required field. A user must fill in
this field properly to submit the form.
- `warning` works well for input values that are in progress, like password strength, or
soft validation before a user attempts to submit a form.
- `success` is ideal for situations when you have per-field validation throughout a form
and want to encourage a user through the rest of the fields.

To apply one of the contextual states on `b-form-radio`, set the `state` prop
to `danger`, `warning`, or `success`.  You may also wrap `<b-form-radio>` in a
`<b-form-fieldset>` and set the contextual `state` prop on `<b-form-fieldset>` instead.

#### Conveying contextual validation state to assistive technologies and colorblind users:
Using these contextual states to denote the state of a form control only provides
a visual, color-based indication, which will not be conveyed to users of assistive
technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you
could include a hint about state in the form control's `<label>` text itself, or by
providing an additional help text block. Specifically for assistive technologies, 
invalid form controls can also be assigned an `aria-invalid="true"` attribute (see below).

### ARIA `aria-invalid` attribute
When `<b-form-radio>` has an invalid contextual state (i.e. `danger`) you may also
want to set the `<b-form-radio>` prop `invalid` to `true`.

Supported `invalid` values are:
- `false` (default) No errors detected
- `true` The value has failed validation.

### Non custom radio inputs
You can have `b-form-radio` render a browser native radio input by setting the `plain` prop.

