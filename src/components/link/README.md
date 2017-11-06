# Links

> Use Bootstrap-Vue’s custom `b-link` component for generating a standard link or `<router-link>`.
`<b-link>` supports the `disabled` state and `click` event propagation.

`<b-link>` is the building block for most Bootstrap-Vue components that offer link functionality.

```html
<div>
   <b-link href="#foo">Link</b-link>
</div>

<!-- link-example.vue -->
```


## Link type

By specifying a value in the `href` prop, a standard link (`<a>`) element will be rendered.
To generate a `<router-link>` instead, specify the route location via the `to` prop.

Router links support various additional props.  Refer to the [Router support](/docs/reference/router-links)
reference section for details.

## Link disabled state

Disable link functionality by setting the `disabled` prop to true.

```html
<div>
   <b-link href="#foo" disabled>Disabled Link</b-link>
</div>

<!-- link-disabled.vue -->
```

Disabling a link will set the Bootstrap V4 `.disabled` class on the link
(for proper styling) as well as handles stoping event propegation and preventing
the default action from occuring.


## Component Reference
