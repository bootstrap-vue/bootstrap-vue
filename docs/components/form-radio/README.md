# Form Radio Input

> For cross browser consistency, `<b-form-radio>` uses Bootstrap's custom
radio input to replace the browser default radio input. It is built on top of
semantic and accessible markup, so it is a solid replacement for the default radio input.

```html
<template>
  <div>
    <h5>Inline radios (default)</h5>
    <b-form-radio id="radios1" v-model="selected" :options="options"></b-form-radio>

    <br>
    
    <h5>Stacked radios</h5>
    <b-form-radio id="radios2" v-model="selected" :options="options" stacked></b-form-radio>

    <br>
    
    <h5>Small Stacked radios</h5>
    <b-form-radio id="radios3" v-model="selected" :options="options" stacked size="sm"></b-form-radio>

    <hr>

    <div>
      Selected: <strong>{{ selected }}</strong>
    </div>
  </div> 
</template>

<script>
export default {
  data: {
    selected: 'first',
    options: [
      { text: 'Toggle this custom radio', value: 'first' },
      { text: 'Or toggle this other custom radio', value: 'second' },
      { text: 'This one is Disabled', value: 'third', disabled: true }
    ]
  }
}
</script>

<!-- form-radio-1.vue -->
```

### Options

Please see options in [`<b-form-select>`](./form-select) docs for details on passing
options (value array) to `<b-form-radio>`

### Size
Control the size of the radio text by setting the prop `size` to either `sm` for small or
`lg` for large.

### Inline or stacked
By default `<b-form-radio>` generates inline radio inputs. Set the prop `stacked` to make
the radios appear one over the other.


### Button style radios
Render radios with the look of buttons by setting the prop `buttons`. Set the button variant by
setting the `button-variant` prop to one of the standard Bootstrap button variants (see
[`<b-button>`](./button) for supported variants). The default `button-variant` is `secondary`.

The `buttons` prop has precedence over `plain`, and `button-variant` has no effect if
`buttons` is not set.

Button style radios will have the class `.active` automatically applied to their label
when they are in the checked state.

```html
<template>
  <div>
    <h5>Button style radios</h5>
    <b-form-radio id="btnradios1"
                  class="mb-4"
                  buttons
                  v-model="selected"
                  :options="options" />
    <br>
    
    <h5>Button style radios with <code>primary</code> variant and size <code>lg</code></h5>
    <b-form-radio id="btnradios2"
                  class="mb-4"
                  buttons
                  button-variant="primary"
                  size="lg"
                  v-model="selected"
                  :options="options" />
    <br>
    
    <h5>Stacked button style radios</h5>
    <b-form-radio id="btnradios3"
                  class="mb-4"
                  buttons
                  stacked
                  v-model="selected"
                  :options="options" />
    <br>

    <div>
      Selected: <strong>{{ selected }}</strong>
    </div>
  </div> 
</template>

<script>
export default {
  data: {
    selected: 'radio1',
    options: [
      { text: 'Radio 1', value: 'radio1' },
      { text: 'Radio 3', value: 'radio2' },
      { text: 'Radio 3 (disabled)', value: 'radio3', disabled: true },
      { text: 'Radio 4', value: 'radio4' }
    ]
  }
}
</script>

<!-- form-radio-2.vue -->
```

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

**Note:** contextual state is not supported for radios rendered in `buttons` mode.

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

**Note:** `plain` will have no effect if `buttons` is set.

