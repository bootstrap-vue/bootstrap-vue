# Form Checkbox Input

> For cross browser consistency, `b-form-checkbox` uses Bottstrap's custom
checkbox input to replace the browser default checkbox input. It is built on top of
semantic and accessible markup, so it is a solid replacement for the default checkbox input.

### Value
By default, the checkbox value will be `true` when checked and `false` when unchecked.
You can customize the checked and unchecked values by specifying the `value` and `unchecked-value`
properties.

`v-model` binds to the `checked` property.  When you have multiple checkboxes that bind to a
single data state variable, provide an array reference `[]` to your `v-model`.

### Control sizing
Set heights using thw `size` prop to `sm` or `lg` for small or large respectively.

### Non custom check inputs
You can have `b-form-checkbox` render a browser native chechbox input by setting the `plain` prop.
