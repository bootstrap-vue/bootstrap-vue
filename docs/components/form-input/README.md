# Textual inputs

> Create various text style inputs such as: `text`, `password`, `number`, `url`,
`search`, and more. Also supports creating `textarea` controls.

### Formatter
`form-input` supports optional formmting by passing a function reference to  the `formatter` prop.

By default, formatting occurs when the control's input event fires.  You can use  the boolean
prop `laxy-formatter` to restrict the fotmatter function to being called on the
control's `change` event only.

The `formatter` function receives a single argument which is the control's current value, and 
should return the formatted value.

### Textarea
Render a `textarea` control by setting the `textarea` prop to `true`.

By default `textarea` will automatically size its height based on on the number
lines (separated by newlines) of text it contains. You can override this behaviour by suppling
a numeric value to the `rows` prop. The `rows` prop has no effect on other input types.

### Static Control
Easily convert the input control to a Bootstrap static form control by setting the prop `static` to true.
