# Form group

> The `<b-form-group>` component is the easiest way to add some structure to forms. Its
purpose is to pair form controls with a legend or label, and to provide help text and
invalid/valid feedback text, as well as visual (color) contextual state feedback.

```html
<template>
  <b-form-group
      id="fieldset1"
      description="Let us know your name."
      label="Enter your name"
      label-for="input1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
  >
    <b-form-input id="input1" :state="state" v-model.trim="name"></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  computed: {
    state () {
      return this.name.length >= 4 ? true : false
    },
    invalidFeedback () {
      if (this.name.length > 4) {
        return ''
      } else if (this.name.length > 0) {
        return 'Enter at least 4 characters'
      } else {
        return 'Please enter something'
      }
    },
    validFeedback () {
      return this.state === true ? 'Thank you' : ''
    }
  },
  data () {
    return {
      name: ''
    }
  }
}
</script>

<!-- form-group-1.vue -->
```


## Label
Use the prop `label` to set the content of the generated `<legend>` or `<label>` element (html
supported), or by using the named slot `label`, You may optionally visually hide the label text
while still making it available to screen readers by setting the prop `label-sr-only`.

`<b-form-group>` will render a `<fieldset>` with `<legend>` if the `label-for` prop is not
set. If an input ID is provided to the `label-for` prop, then a `<div>` with `<label>` will
be rendered.

If you provide an input `id` value to the `label-for` prop (the `id` must exist on the
input contained within the `<b-form-group>`), a `<label>` element will be rendered instead
of a `<legend>` element, and will have the `for` attribute set to the `id` specified.
When specifying the id, **do not** prepend it with `#`. The `label-for` prop should only
be used when you have a single form input inside the `<b-form-group>` component. Do not
set the `label-for` prop when using `<b-form-radio-group>`, `<b-form-checkbox-group>`,
`<b-form-radio>`, `<b-form-checkbox>` or `<b-form-file>` components, as these inputs
include integrated label element(s) and the `<legend>` element is more suitable.

The label text may also optionally be aligned `left`, `center` or `right` by setting
the respective value via the prop `label-text-align`. Alignment has no effect if
`label-sr-only` is set.

You can also apply additional classes to the label via the `label-class` prop, such as
responsive padding and text alignment utility classes. The `label-class` prop accepts either
a string or array of strings.

### Horizontal layout
By default, the label appears above the input element(s), but you may optionally set
the prop `horizontal` to place the label on the same line, and control the width
of the label by setting `label-cols` to the number of columns (default of `3`,
valid range of 1 through 11). `label-cols` has no effect if the layout is
not `horizontal`. For viewports below size `sm`, the label will revert to
being displayed above the input control. You can control the breakpoint for this
by setting the `breakpoint` prop (`'sm'`, `'md'`, `'lg'`, or `'xl'`. The default is `'sm'`).

```html
<div>
  <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Let us know your name."
                label="Enter your name"
                label-for="inputHorizontal">
    <b-form-input id="inputHorizontal"></b-form-input>
  </b-form-group>
</div>

<!-- form-group-horizontal.vue -->
```

### Label size
You can control the label text size match the size of your form input(s) via the
optional `label-size` prop. Values can be `'sm'` or `'lg'` for small or large
label, respectively. Sizes work for both `horizontal` and non-horizontal form groups.

```html
<div>
  <b-form-group horizontal
                :label-cols="2"
                label-size="sm"
                label="Small"
                label-for="input_sm">
    <b-form-input id="input_sm" size="sm"></b-form-input>
  </b-form-group>
  <b-form-group horizontal
                :label-cols="2"
                label="Default"
                label-for="input_default">
    <b-form-input id="input_default"></b-form-input>
  </b-form-group>
  <b-form-group horizontal
                :label-cols="2"
                label-size="lg"
                label="Large"
                label-for="input_lg">
    <b-form-input id="input_lg" size="lg"></b-form-input>
  </b-form-group>
</div>

<!-- form-group-label-size.vue -->
```


## Description
Optional descriptive text which is always shown with the `.text-muted` class
(html supported) by setting the `description` prop or using the named slot `description`.
The description text is rendered using the [`<b-form-text>`](/docs/components/form#helper-components)
form sub-component.


## Nested form groups
Feel free to nest `<b-form-group>` components to produce advanced form layouts and
semantic grouping of related form controls:

```html
<b-card bg-variant="light">
  <b-form-group horizontal
                breakpoint="lg"
                label="Shipping Address"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0">
    <b-form-group horizontal
                  label="Street:"
                  label-class="text-sm-right"
                  label-for="nestedStreet">
      <b-form-input id="nestedStreet"></b-form-input>
    </b-form-group>
    <b-form-group horizontal
                  label="City:"
                  label-class="text-sm-right"
                  label-for="nestedCity">
      <b-form-input id="nestedCity"></b-form-input>
    </b-form-group>
    <b-form-group horizontal
                  label="State:"
                  label-class="text-sm-right"
                  label-for="nestedState">
      <b-form-input id="nestedState"></b-form-input>
    </b-form-group>
    <b-form-group horizontal
                  label="Country:"
                  label-class="text-sm-right"
                  label-for="nestedCountry">
      <b-form-input id="nestedCountry"></b-form-input>
    </b-form-group>
    <b-form-group horizontal
                  label="Ship via:"
                  label-class="text-sm-right"
                  class="mb-0">
      <b-form-radio-group class="pt-2" :options="['Air', 'Courier', 'Mail']" />
    </b-form-group>
  </b-form-group>
</b-card>

<!-- form-group-nested.vue -->
```


## Validation state feedback
Bootstrap includes validation styles for `valid` and `invalid` states
on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:
- `'invalid'` is great for when there’s a blocking or required field. A user must fill in
this field properly to submit the form.
- `'valid'` is ideal for situations when you have per-field validation throughout a form
and want to encourage a user through the rest of the fields.
- `null` Displays no validation state

To apply one of the contextual states on `<b-form-group>`, set the `state` prop
to `'invalid'` (or `false`), `'valid'` (or `true`), or `null`. This will programmatically show
the apropriate feedback text.

Boostrap V4 uses sibling CSS slectors of `:invalid` or `:valid` inputs to show the feedback text. Some
form controls (such as checkboxes, radios, and file inputs, or inputs inside input-groups) are
wrapped in additional markup that will no longer make the feedback text a sibling of the input, and
hence the feedback will not show.  In these situations you will need to set the validity `state` on
the `<b-form-group>` _as well as_ the input.

Feedback will be shown if the parent `<b-form>` component does _not_ have the
`novalidate` prop set (or set to `false`) along with the `vadidated` prop set (and the input
fails or passes native browser validation constraints such as `required`). Refer to Bootstrap V4's
[Form component](http://getbootstrap.com/docs/4.0/components/forms/#validation) documentation
for details on validation methods.

You should always provide content via the `invalid-feedback` prop (or slot) to aid users
using assistive technologies when setting a contextual `invalid` state.

### Invalid feedback
Show optional invalid state feedback text to provide textual state feedback (html supported)
by setting the prop `invalid-feedback` or using the named slot `invalid-feedback`.

Invalid feedback is rendered using the [`<b-form-invalid-feedback>`](/docs/components/form#helper-components)
form sub-componment.

**Note:** The prop `feedback` has been deprecated in favor of the `invalid-feedback` prop.

### Valid feedback
Show optional valid state feedback text to provide textual state feedback (html supported)
by setting the prop `valid-feedback` or using the named slot `valid-feedback`.

Valid feedback is rendered using the [`<b-form-valid-feedback>`](/docs/components/form#helper-components)
form sub-componment.

### Feedback limitations
**Note:** When using `<b-input-group>`, `<b-form-file>`, `<b-form-radio-group>`,
`<b-form-radio>`, `<b-form-checkbox-group>` or `<b-form-checkbox>` inside a
`<b-form-group>`, setting an invalid (or valid) `state` on the `input` alone will **not** trigger
the invalid (or valid) feedback to show (due to limitations with the new Bootsrap V4 validation CSS).
To get around this, **you must also** set the invalid/valid `state` on `<b-form-group>`.  Native
browser validation will **not** trigger the invalid feedback to show when using one of
the above mentiond form controls.


## Accessibility
To enable auto-generation of `aria-*` attributes, you should supply a unique `id` prop
to `<b-form-group>`. This will associate the help text and feedback text to
the `<b-form-group>` and, indirectly to its input control(s).

By default, when no `label-for` value is provided, `<b-form-group>` renders the input control(s)
inside a an HTML `<fieldset>` element with the label content placed inside the fieldset's
`<legend>` element. By nature of this markup, the legend content is automatically associated to
the containing input control(s).

It is **highly recommended** that you provide a unique `id` prop on your input element and set
the `label-for` prop to this id, when you have only a single input in the `<b-form-group>`.

When multiple form controls are placed inside `<b-form-group>` (i.e. a series or radio or
checkbox inputs, or a series of related inputs), **do not set** the `label-for` prop, as a
label can only be associated with a single input. It is best to use the default rendered
markup that produces a `<fieldset>` + `<legend>` which will describe the group of inputs.

When placing multiple form controls inside a `<b-form-group>` (and you are not nesting
`<b-form-group>`components), it is recommended to give each control its own associated
`<label>` (which may be visually hidden using the `.sr-only` class) and set the labels
`for` attribute to the `id` of the associated input control. Alternatively, you can set the
`aria-label` attribute on each input control instead of using a `<label>`. For `<b-form-radio>`
and `<b-form-checkbox>` (or the group versions), you do not need to set individual labels, as
the rendered markup for these types of inputs already includes a `<label>` element.


## Component alias
`<b-form-group>` can also be used via the alias of `<b-form-fieldset>`.

## Component Reference
