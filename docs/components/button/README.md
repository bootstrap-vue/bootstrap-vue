# Buttons

>  Use Bootstrap’s custom `b-button` component for actions in forms, dialogs, and more.
   Includes support for a handful of contextual variations, sizes, states, and more.
   
The `b-button` component generally renders a `<button>` element. However, you can also
render a an `<a>` element by proding an `href` prop vale. You man also generate
`vue-router` `<router-link>` when providing a value for the `to` prop (`vue-router`
is  required).

### Button Sizes
Fancy larger or smaller buttons? Specify `lg` or `sm` via the `size` prop.

Create block level buttons — those that span the full width of a parent — by
setting the `block` prop.

### Button contextual variants
Use the `variant` prop to generate the various bootstrap contextual button variants.

By default `b-button` will render with the `secondary` variant.

#### Solid color variants:
`primary`, `secondary`, `success`, `warning`, and `danger`.

#### Outline color variants:
In need of a button, but not the hefty background colors they bring? Use the 
`outline-*` variants to remove all background images and colors on any `b-button`

`outline-primary`, `outline-secondary`, `outline-success`, `outline-warning`,
and `outline-danger`.

#### Link variant:
Variant `link` will reder a button with the appearance of a link while maintaning the
default passing and size of a button.

### Disabled state
Set the `disabled` prop to disable button default funtionality. `disabled` also 
works with buttons rednered as `<a>` elements and `<router-link>`

### Button type
When neither `href` nor `to` props are provided, `b-button` renders an html `<button>`
element.  You cn specify the button's type by setting the prop `type` to `button`,
`submit` or `reset`.  The default type is `button`.

### Router links
Refer to [`vue-router`](https://router.vuejs.org/) docs for the various router-link related props.

Note the `tag`attribute for `router-link` is refered to as `router-tag` in `bootstrap-vue`

### Alias
`<b-button>` can also be used by its shorter alias `<b-btn>`
