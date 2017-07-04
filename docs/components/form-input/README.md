# Textual inputs

> Create various text style inputs such as: `text`, `password`, `number`, `url`,
`search`, and more. Also supports creating `textarea` controls.

```html
<template>
  <div>
    <b-form-input v-model="text"
                  type="text"
                  placeholder="Enter your name"
                  :state="text.length?'success':'warning'"
                  :formatter="format"
    ></b-form-input>
    <small class="text-muted">We will convert your name to lowercase instantly</small>

    <br>
    <br>

    <b-form-input v-model="text"
                  type="text"
                  placeholder="Enter your name"
                  :state="text.length?'success':'warning'"
                  :formatter="format"
                  lazy-formatter
    ></b-form-input>
    <small class="text-muted">This one is a little lazy!</small>

    <br>
    <br>

    <b-form-input textarea v-model="text" placeholder="Text area mode"></b-form-input>

    <br>
    <p>Value: {{text}}</p>
  </div>  
</template>

<script>
export default {
  data: {
    text: '',
  },
  methods: {
    format(value) {
      return value.toLowerCase();
    }
  }
}
</script>

<!-- form-input.vue -->
```

### Formatter
`<b-form-input>` supports optional formatting by passing a function reference to  the `formatter` prop.

By default, formatting occurs when the control's input event fires.  You can use  the boolean
prop `lazy-formatter` to restrict the formatter function to being called on the
control's `change` event only.

The `formatter` function receives a single argument which is the control's current value, and 
should return the formatted value.

### Textarea
Render a `<textarea>` element by setting the `textarea` prop to `true`. The
`type` prop is ignored when prop `textarea` is set.

By default the `<textarea>` will automatically size its height based on on the number
lines (separated by newlines) of text it contains. You can override this behaviour by supplying
a numeric value to the `rows` prop. The `rows` prop has no effect on other input types.

### Static Control
Easily convert a `<b-form-input>` control to a Bootstrap static form
control by setting the prop `static` to true.

You can also use the `<b-form-input-static>` component to create static form controls.

### Control sizing
Set heights using the `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

### Contextual States
Bootstrap includes validation styles for danger, warning, and success states
on most form controls. Note that these states will not appear unless the
`<b-form-input>` is wrapped in a `<b-form fieldset>` which also has the same
`state` value.

On `<b-form-input>`, these states will add the corresponding validtion state
icon at the right of the input. Validation icons are url()s configured via
Bootstrap V4's Sass variables that are applied to background-image declarations
for each state.

Generally speaking, you’ll want to use a particular state for specific types of feedback:
- `danger` is great for when there’s a blocking or required field. A user must fill in
this field properly to submit the form.
- `warning` works well for input values that are in progress, like password strength, or
soft validation before a user attempts to submit a form.
- `success` is ideal for situations when you have per-field validation throughout a form
and want to encourage a user through the rest of the fields.

To apply one of the contextual states on `<b-form-input>`, set the `state` prop
to `danger`, `warning`, or `success`. Remember that you will not see the validation 
state icon unless the input is wrapped in a `<b-form-fieldset>` which also
has the same `state` applied!

#### Conveying contextual validation state to assistive technologies and colorblind users:
Using these contextual states to denote the state of a form control only provides
a visual, color-based indication, which will not be conveyed to users of assistive
technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you
could include a hint about state in the form control's `<label>` text itself, or by
providing an additional help text block. Specifically for assistive technologies, 
invalid form controls can also be assigned an `aria-invalid="true"` attribute.

### ARIA `aria-invalid` attribute
When `<form-input>` has an invalid contextual state (i.e. `danger`) you may also
want to set the `<b-form-input>` prop `invalid` to `true`, or a string value.

Supported `invalid` values are:
- `false` (default) No errors detected
- `true` The value has failed validation.
- `grammar` A grammatical error has been detected.
- `spelling` A spelling error has been detected.
