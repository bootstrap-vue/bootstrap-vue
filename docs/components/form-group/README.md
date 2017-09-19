# Form group

> The `<b-form-group>` component is the easiest way to add some structure to forms. Its
purpose is to provide a label and control pairing, help text and feedback text, as well
as contextual state visual feedback.

<div class="alert alert-warning">
 <p class="my-0">
  <strong>Please Note:</strong>
  There are currently issues with Bootstrap V4.beta.1 CSS with regards to <code>valid</code>
  and <code>invalid</code> states and the <code>feedback</code> invalid text.
  Feedback text should only be shown when in the invalid state, but it still shows
  when the field in in the valid state. Bootstrap V4.beta.2 should address this issue.
 </p>
</div>

```html
<template>
  <b-form-group
      id="fieldset1"
      description="Let us know your name."
      label="Enter your name"
      :feedback="feedback" 
      :state="state"
  >
    <b-form-input id="input1" :state="state" v-model.trim="name"></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  computed: {
    feedback() {
      return this.name.length > 0 ? '' : 'Please enter something';
    },
    state() {
      return this.name.length > 0 ? 'valid' : 'invalid';
    }
  },
  data: {
    name: '',
  }
}
</script>

<!-- form-group-1.vue -->
```

## Label
Use the prop `label` to set the content of the generated `<label>` element (html supported),
or by using the named slot `label`, You may optionally visually hide the label by setting
the prop `label-sr-only`.

By default, the label appears above the input element, but you may optionally set
the prop `horizontal` to place the label on the same line, and control the width
of the label by setting `label-cols` to the number of columns (default of `3`,
valid range of 1 through 11). `label-cols` has no effect if the layout is
not `horizontal`. For viewports below size `sm`, the label will revert to
being displayed above the input control. You can control the breakpoint for this
by setting the `breakpoint` prop (default is `sm`).

The label text may also optionally be aligned `left`, `center` or `right` by setting
the respective value via the prop `label-text-align`. Alignment has no effect if
`label-sr-only` is set.

## Description
Optional descriptive text which is always shown with the `.text-muted` class
(html supported) by setting the `description` prop or using the named slot `description`.
The description text is rendered using the <`b-form-text>` component.

## Feedback
Show optional feedback text to provide textual state feedback (html supported)
by setting the prop `feedback` or using the named slot `feedback`.

Note that the feedback **will not be shown** unless the `invalid` state is set on the
`<b-form-group>` and it's child(ren) input(s) or just on the input (`b-form-input>`, `b-form-textarea>`, `<b-form-select>`,
`<b-form-checkbox>`, `<b-form-radio>`, or `<b-form-file>`).

Also feedback will be shown if the parent `<b-form>` component does not have the
`novalidate` prop set (or set to `false`) along with `vadidated`
prop set (and the input fails browser native validation constraintes such as `required`).

Refer to Bootstrap V4's `Form` component documentation for details on validation methods.

Feedback is rendered using the `<b-form-feedback>` componment.

## Contextual visual state
Bootstrap includes validation styles for `valid` and `invalid` states
on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:
- `'invalid'` is great for when there’s a blocking or required field. A user must fill in
this field properly to submit the form.
- `'valid'` is ideal for situations when you have per-field validation throughout a form
and want to encourage a user through the rest of the fields.
- `null` Displayes no validation state

To apply one of the contextual state icons on `<b-form-group>`, set the `state` prop
to `'invalid'`, `'valid'`, or `null`.

You should always provide content via the `feedback` prop (or slot) to aid users
using assistive technologies when setting a contextual `invalid` state.

## Accessibility
To enable auto-generation of `aria-*` attributes, **you must** supply a unique `id`
prop to `<b-form-fieldset>`.

To automatically associate the label to the first input component, you **must** provide
a unique `id` prop on the input component. You may manually specify which containing
input component the label is for by setting the `<b-form-group>` prop `label-for`
to the value of the `id` string associated with the input or contaner element.

It is **highly recommended** that you provide a unique `id` prop on your input element.

## Alias
`<b-form-group>` can also be used via the legacy alias of `<b-form-fieldset>`.

## Component Reference
