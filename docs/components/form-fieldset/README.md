# Form fieldset (Form group)

> The `b-form-fieldset` component is the easiest way to add some structure to forms. Its
purpose is to provide a label and control pairing, help text and feedback text, as well
as contextual state visual feedback

### Label
Use the prop `label` to set the content of the generted `<label>` element (html supported),
or by using the named slot `label`, You may optionally visually hide the label by setting
the prop `label-sr-only`.

By default, the label apepars above the input element, but you may optionallu set
the prop `horizontal` to place the label on the same line and control the width
of the label by setting `label-cols` to the number of columns (default of `3`,
valid range of 1 through 11). `label-cols` has no effect if the layout is
not `horizontal`.

_**Note**: `label-size` has been deprecated in favour of `label-cols`._

The label may also optionally be alligned `left`, `center` or `right` by setting
the respective value via the prop `label-text-align`. Alignment has no effect if
`label-sr-only` is set.

### Description
Optional descriptive text which is always shown with the `.text-muted` class
(html supported) by setting the `description` prop or using the named slot `description`.

### Feedback
Show optional text to provide textual state feedback (html supported) by setting the
prop `feedback` or using the named slot `feedback`.

### Contextual visual state
Optional contextual visual feedback state of `danger`, `warning` or `success`.
You should always provide content via the `feedback` prop to assit users
using assistive technologies when setting a contextual state.

### Accessibility
To enable auto-generateion of `aria-*` attributes, you must supply a unique `id`
prop to `b-form-fieldset`.

To automatically associate the label to the first input element, you must provide
a unique `id` prop on the input component. You may optionally specify which containing
input component the label is for by setting the `b-form-fieldset` prop `for` to the
id string of the input.

It is highly recommended that you provide a unique `id` prop on your input element.
