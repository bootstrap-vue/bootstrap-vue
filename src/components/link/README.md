# Links

> Use Bootstrap-Vue’s custom `b-link` component for generating a standard `<a>` link or
`<router-link>`. `<b-link>` supports the `disabled` state and `click` event propagation.

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

## Links with href="#"

Typically `<a href="#">` will cause the document to scroll to the top of page when clicked.
`<b-link>` addresses this by preventing the default action (scroll to top) when `href` is set to `#`.

## Link disabled state

Disable link functionality by setting the `disabled` prop to true.

```html
<div>
   <b-link href="#foo" disabled>Disabled Link</b-link>
</div>

<!-- link-disabled.vue -->
```

Disabling a link will set the Bootstrap V4 `.disabled` class on the link
as well as handles stoping event propegation, preventing the default action
from occuring, and removing the link from the document tab sequence.

**Note:** Boostrap V4 CSS currently does not style disabled links differently than
non-disabled links. You can use the following custom CSS to style disabled links
(by preventing hover style changes):

```css
a.disabled {
  pointer-events: none;
}
```


## Component Reference
