# Form group

> The `<b-form-group>` component is the easiest way to add some structure to forms. Its
purpose is to provide a pairing between controls and a label, help text and feedback text,
as well as contextual state visual feedback.

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
      return this.name.length > 0 ? 'Enter at least 4 characters' : 'Please enter something';
    },
    state() {
      return this.name.length > 4 ? 'valid' : 'invalid';
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
Use the prop `label` to set the content of the `<fieldset>` generated `<legend>`
element (html supported), or by using the named slot `label`, You may optionally
visually hide the label text by setting the prop `label-sr-only`.

By default, the label appears above the input element(s), but you may optionally set
the prop `horizontal` to place the label on the same line, and control the width
of the label by setting `label-cols` to the number of columns (default of `3`,
valid range of 1 through 11). `label-cols` has no effect if the layout is
not `horizontal`. For viewports below size `sm`, the label will revert to
being displayed above the input control. You can control the breakpoint for this
by setting the `breakpoint` prop (default is `sm`).

The label text may also optionally be aligned `left`, `center` or `right` by setting
the respective value via the prop `label-text-align`. Alignment has no effect if
`label-sr-only` is set.

**Example: Horizontal laout**
```html
<div>
  <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Let us know your name."
                label="Enter your name">
    <b-form-input id="inputHorizontal"></b-form-input>
  </b-form-group>
</div>

<!-- form-group-horizontal.vue -->
```

## Description
Optional descriptive text which is always shown with the `.text-muted` class
(html supported) by setting the `description` prop or using the named slot `description`.
The description text is rendered using the <`b-form-text>` component.

## Invalid feedback
Show optional feedback text to provide textual state feedback (html supported)
by setting the prop `feedback` or using the named slot `feedback`.

Note that the feedback **will not be shown** unless the invalid `state` is set on the
`<b-form-group>` and it's child(ren) input(s) or just on the input (`b-form-input>`,
`b-form-textarea>`, `<b-form-select>`, `<b-form-checkbox>`, `<b-form-radio>`, or `<b-form-file>`).

Also feedback will be shown if the parent `<b-form>` component does not have the
`novalidate` prop set (or set to `false`) along with `vadidated`
prop set (and the input fails browser native validation constraintes such as `required`).

Refer to Bootstrap V4's `Form` component documentation for details on validation methods.

Invalid feedback is rendered using the `<b-form-feedback>` componment.

**Note:** When using `<b-input-group>`, `<b-form-file>`, `<b-form-radio-group>`,
`<b-form-radio>`, `<b-form-checkbox-group>` or `<b-form-checkbox>` inside a
`<b-form-group>`, setting an invalid `state` on the `input` alone will **not** trigger
the invalid feeback to show (due to limitations with the new Bootsrap V4 validation CSS).
To get around this, **you must also** set the invalid `state` on `<b-form-group>`.  Native
browser validation will **not** trigger the invalid feedback to show when using one of
the above mentiond form controls.

## Contextual visual state
Bootstrap includes validation styles for `valid` and `invalid` states
on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:
- `'invalid'` is great for when there’s a blocking or required field. A user must fill in
this field properly to submit the form.
- `'valid'` is ideal for situations when you have per-field validation throughout a form
and want to encourage a user through the rest of the fields.
- `null` Displays no validation state

To apply one of the contextual state icons on `<b-form-group>`, set the `state` prop
to `'invalid'` (or `false`), `'valid'` (or `true`), or `null`.

You should always provide content via the `feedback` prop (or slot) to aid users
using assistive technologies when setting a contextual `invalid` state.

## Accessibility
To enable auto-generation of `aria-*` attributes, you should supply a unique `id` prop
to `<b-form-group>`. This will associate the help text and feeback text to
the `<b-form-group>` and its input control(s).

`<b-form-group>` renders the input control(s) inside a an HTML `<fieldset>` element with
the label content placed inside the fieldset's `<legend>` element. By nature of this markup,
the legend content is automatically associated the the input control(s).

When placing multiple form controls inside a fieldset, it is recommended to give each
control an associated `<label>` (which may be visually hidden using the `.sr-only` class)
and set the label's `for` attribute to the `id` of the associated input control. Alternatively,
you can set the `aria-label` attribute on each input control instead of using a `<label>`.

It is **highly recommended** that you provide a unique `id` prop on your input element(s).

## Component alias
`<b-form-group>` can also be used via the legacy alias of `<b-form-fieldset>`.

## Component Reference
