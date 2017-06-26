# Form fieldset (Form group)

> The `b-form=fieldset` component is the easiest way to add some structure to forms. Its
purpose is to provide a label and control pairing, help text and feedback text, as well
as contextual state visual feedback

### Options

#### Label:
The content of the generted `<label>` element (html supported).
You may optionally visually hide the label by setting the prop `label-sr-only`.

By default, the label apepars above the input element, but you may optionallu set
the prop `horizontal` to place the label on the same line and control the width
of the label by setting `label-size` to the number of columns (default of `3`).
`label-size` has no effect if the layout is not `horizontal`

The label may also optionally be alligned `left`, `center` or `right` by setting
the respective value via the prop `label-text-align`. Alignment has no effect if
`label-sr-only` is set.

#### Description:
Optional descriptive text which is always shown with the `.text-muted` class (html supported).

#### Feedback:
Optional text to provide textual state feedback (html supported).

#### Contextual visual state:
Optional contextual visual feedback state of `danger`, `warning` or `success`.
You should always provide `feedback` content to assit users using assistive technologies.

### Accessibility
To enable auto-generateion of `aria-*` attributes, you must supply a unique `id`
prop to `b-form-fieldset`.

To automatically associate the label to the first input element, you must provide
a unique `id` prop on the input component. You may optionally specify which containing
input component the label is for by setting the `b-form-fieldset` prop `for` to the
id string of the input.

It is highly recommended that you provide a unique `id` prop on your input element.
