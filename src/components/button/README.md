# Buttons

> Use Bootstrap’s custom `b-button` component for actions in forms, dialogs, and more.
Includes support for a handful of contextual variations, sizes, states, and more.

```html
<div class="row">
    <template v-for="variant in ['primary','secondary','success','outline-success','warning','danger','link']">
        <div class="col-md-4 pb-2" v-for="size in ['sm','','lg']" :key="`${variant}_${size}`">
            <b-button :size="size" :variant="variant">
                {{variant}} {{size}}
            </b-button>
        </div>
    </template>
</div>

<!-- button-1.vue -->
```

## Button element type

The `<b-button>` component generally renders a `<button>` element. However, you can also
render an `<a>` element by providing an `href` prop value. You man also generate
`vue-router` `<router-link>` when providing a value for the `to` prop (`vue-router`
is required).

```html
<div>
  <b-button>I am a Button</b-button>
  <b-button href="#">I am a Link</b-button>
</div>

<!-- button-2.vue -->
```

## Button type

When neither `href` nor `to` props are provided, `<b-button>` renders an html `<button>`
element. You can specify the button's type by setting the prop `type` to `button`,
`submit` or `reset`. The default type is `button`.


## Button sizing

Fancy larger or smaller buttons? Specify `lg` or `sm` via the `size` prop.

Create block level buttons — those that span the full width of a parent — by
setting the `block` prop.

## Button contextual variants

Use the `variant` prop to generate the various bootstrap contextual button variants.

By default `<b-button>` will render with the `secondary` variant.

### Solid color variants

`primary`, `secondary`, `success`, `warning`, and `danger`.

### Outline color variants

In need of a button, but not the hefty background colors they bring? Use the
`outline-*` variants to remove all background images and colors on any `<b-button>`:

`outline-primary`, `outline-secondary`, `outline-success`, `outline-warning`,
and `outline-danger`.

### Link variant

Variant `link` will render a button with the appearance of a link while maintaining the
default padding and size of a button.

## Disabled state

Set the `disabled` prop to disable button default functionality. `disabled` also
works with buttons, rendered as `<a>` elements and `<router-link>`.

```html
<div>
  <b-button disabled variant="success">Disabled</b-button>
  <b-button variant="success">Not Disabled</b-button>
</div>

<!-- button-3.vue -->
```

## Pressed state and toggling

Buttons will appear pressed (with a darker background, darker border, and inset shadow)
when the prop `pressed` is set to `true`.

The `pressed` prop can be set to one of three values:

- `true`: Sets the `.active` class and adds the attribute `aria-pressed="true"`.
- `false`: Clears the `.active` class and adds the attribute `aria-pressed="false"`.
- `null`: (default) Neither the class `.active` nor the attribute `aria-pressed` will be set.

To create a button that can be toggled between active and non-active states, use
the `.sync` prop modifier (available in Vue 2.3+) on the `pressed` property

```html
<template>
  <div>
    <h5>Pressed and un-pressed state</h5>
    <b-button :pressed="true" variant="success">Always Pressed</b-button>
    <b-button :pressed="false" variant="success">Not Pressed</b-button>

    <h5>Toggleable Button</h5>
    <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>
    <p>Pressed State: <strong>{{ myToggle }}</strong></p>

    <h5>In a button group</h5>
    <b-button-group size="sm">
      <b-button v-for="btn in buttons" :pressed.sync="btn.state" :variant="btn.variant" :key="btn.variant">
        {{ btn.caption }}
      </b-button>
    </b-button-group>
    <p>Pressed States: <strong>{{ btnStates }}</strong></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myToggle: false,
      buttons: [
        { variant: 'primary', caption: 'Toggle 1', state: true },
        { variant: 'danger', caption: 'Toggle 2', state: false },
        { variant: 'warning', caption: 'Toggle 3', state: true },
        { variant: 'success', caption: 'No Toggle', state: null },
        { variant: 'outline-success', caption: 'Toggle 5', state: false },
        { variant: 'outline-primary', caption: 'Toggle 6', state: false }
      ]
    }
  },
  computed: {
    btnStates () {
      return this.buttons.map(btn => btn.state)
    }
  }
}
</script>

<!-- button-4.vue -->
```

If using toggle button style for a radio or checkbox style interface, it is best to use the
built-in `button` style support of [`<b-form-radio-group>`](/docs/components/form-radios) and
[`<b-checkbox-group>`](/docs/components/form-checkboxes).


## Router link support

Refer to the [`Router support`](/docs/reference/router-links) reference docs for the
various supported `<router-link>` related props.

Note the `<router-link>` prop `tag` is referred to as `router-tag` in `bootstrap-vue`.


## Button component alias

`<b-button>` can also be used by its shorter alias `<b-btn>`.


## See also

- [`<b-button-group>`](/docs/components/button-group)
- [`<b-button-toolbar>`](/docs/components/button-toolbar)
- [`<b-link>`](/docs/components/link)
- [`Router Link Support`](/docs/reference/router-links)


## Component Reference
