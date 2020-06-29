# Buttons

> Use Bootstrap's custom `b-button` component for actions in forms, dialogs, and more. Includes
> support for a handful of contextual variations, sizes, states, and more.

## Overview

BootstrapVue's `<b-button>` component generates either a `<button>` element, `<a>` element, or
`<router-link>` component with the styling of a button.

```html
<div>
  <b-button>Button</b-button>
  <b-button variant="danger">Button</b-button>
  <b-button variant="success">Button</b-button>
  <b-button variant="outline-primary">Button</b-button>
</div>

<!-- b-button.vue -->
```

## Element type

The `<b-button>` component generally renders a `<button>` element. However, you can also render an
`<a>` element by providing an `href` prop value. You may also generate `vue-router` `<router-link>`
when providing a value for the `to` prop (`vue-router` is required).

```html
<div>
  <b-button>I am a Button</b-button>
  <b-button href="#">I am a Link</b-button>
</div>

<!-- b-button-types.vue -->
```

## Type

You can specify the button's type by setting the prop `type` to `'button'`, `'submit'` or `'reset'`.
The default type is `'button'`.

Note the `type` prop has no effect when either `href` or `to` props are set.

## Sizing

Fancy larger or smaller buttons? Specify `lg` or `sm` via the `size` prop.

```html
<b-row>
  <b-col lg="4" class="pb-2"><b-button size="sm">Small Button</b-button></b-col>
  <b-col lg="4" class="pb-2"><b-button>Default Button</b-button></b-col>
  <b-col lg="4" class="pb-2"><b-button size="lg">Large Button</b-button></b-col>
</b-row>

<!-- b-button-sizes.vue -->
```

## Contextual variants

Use the `variant` prop to generate the various Bootstrap contextual button variants.

By default `<b-button>` will render with the `secondary` variant.

The `variant` prop adds the Bootstrap v4.3 class `.btn-<variant>` on the rendered button.

### Solid color variants

`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light` and `dark`.

```html
<div>
  <b-button variant="primary">Primary</b-button>
  <b-button variant="secondary">Secondary</b-button>
  <b-button variant="success">Success</b-button>
  <b-button variant="danger">Danger</b-button>
  <b-button variant="warning">Warning</b-button>
  <b-button variant="info">Info</b-button>
  <b-button variant="light">Light</b-button>
  <b-button variant="dark">Dark</b-button>
</div>

<!-- b-button-solid.vue -->
```

### Outline color variants

In need of a button, but not the hefty background colors they bring? Use the `outline-*` variants to
remove all background images and colors on any `<b-button>`:

`outline-primary`, `outline-secondary`, `outline-success`, `outline-danger`, `outline-warning`,
`outline-info`, `outline-light` and `outline-dark`.

```html
<div>
  <b-button variant="outline-primary">Primary</b-button>
  <b-button variant="outline-secondary">Secondary</b-button>
  <b-button variant="outline-success">Success</b-button>
  <b-button variant="outline-danger">Danger</b-button>
  <b-button variant="outline-warning">Warning</b-button>
  <b-button variant="outline-info">Info</b-button>
  <b-button variant="outline-light">Light</b-button>
  <b-button variant="outline-dark">Dark</b-button>
</div>

<!-- b-button-outline.vue -->
```

### Link variant

Variant `link` will render a button with the appearance of a link while maintaining the default
padding and size of a button.

```html
<div>
  <b-button variant="link">Link</b-button>
</div>

<!-- b-button-link.vue -->
```

**Tip:** remove the hover underline from a link variant button by adding the Bootstrap v4.3 utility
class `text-decoration-none` to `<b-button>`.

## Block level buttons

Create block level buttons — those that span the full width of a parent — by setting the `block`
prop.

```html
<div>
  <b-button block variant="primary">Block Level Button</b-button>
</div>

<!-- b-button-block.vue -->
```

## Pill style

Prefer buttons with a more rounded-pill style? Just set the prop `pill` to true.

```html
<div>
  <b-button pill>Button</b-button>
  <b-button pill variant="primary">Button</b-button>
  <b-button pill variant="outline-secondary">Button</b-button>
  <b-button pill variant="success">Button</b-button>
  <b-button pill variant="outline-danger">Button</b-button>
  <b-button pill variant="info">Button</b-button>
</div>

<!-- b-button-pill.vue -->
```

This prop adds the Bootstrap v4.3 utility class `.rounded-pill` on the rendered button.

## Squared style

Prefer buttons with a more square corner style? Just set the prop `squared` to true.

```html
<div>
  <b-button squared>Button</b-button>
  <b-button squared variant="primary">Button</b-button>
  <b-button squared variant="outline-secondary">Button</b-button>
  <b-button squared variant="success">Button</b-button>
  <b-button squared variant="outline-danger">Button</b-button>
  <b-button squared variant="info">Button</b-button>
</div>

<!-- b-button-square.vue -->
```

The `squared` prop adds the Bootstrap v4.3 utility class `.rounded-0` on the rendered button. The
`pill` prop takes precedence over the `squared` prop.

## Disabled state

Set the `disabled` prop to disable button default functionality. `disabled` also works with buttons
rendered as `<a>` elements and `<router-link>` (i.e. with the `href` or `to` prop set).

```html
<div>
  <b-button disabled size="lg" variant="primary">Disabled</b-button>
  <b-button disabled size="lg">Also Disabled</b-button>
</div>

<!-- b-button-disabled.vue -->
```

## Pressed state and toggling

Buttons will appear pressed (with a darker background, darker border, and inset shadow) when the
prop `pressed` is set to `true`.

The `pressed` prop can be set to one of three values:

- `true`: Sets the `.active` class and adds the attribute `aria-pressed="true"`.
- `false`: Clears the `.active` class and adds the attribute `aria-pressed="false"`.
- `null`: (default) Neither the class `.active` nor the attribute `aria-pressed` will be set.

To create a button that can be toggled between active and non-active states, use the `.sync` prop
modifier (available in Vue 2.3+) on the `pressed` property

```html
<template>
  <div>
    <h5>Pressed and un-pressed state</h5>
    <b-button :pressed="true" variant="success">Always Pressed</b-button>
    <b-button :pressed="false" variant="success">Not Pressed</b-button>

    <h5 class="mt-3">Toggleable Button</h5>
    <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>
    <p>Pressed State: <strong>{{ myToggle }}</strong></p>

    <h5>In a button group</h5>
    <b-button-group size="sm">
      <b-button
        v-for="(btn, idx) in buttons"
        :key="idx"
        :pressed.sync="btn.state"
        variant="primary"
      >
        {{ btn.caption }}
      </b-button>
    </b-button-group>
    <p>Pressed States: <strong>{{ btnStates }}</strong></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myToggle: false,
        buttons: [
          { caption: 'Toggle 1', state: true },
          { caption: 'Toggle 2', state: false },
          { caption: 'Toggle 3', state: true },
          { caption: 'Toggle 4', state: false }
        ]
      }
    },
    computed: {
      btnStates() {
        return this.buttons.map(btn => btn.state)
      }
    }
  }
</script>

<!-- b-button-toggles.vue -->
```

If using toggle button style for a radio or checkbox style interface, it is best to use the built-in
`button` style support of [`<b-form-radio-group>`](/docs/components/form-radio) and
[`<b-form-checkbox-group>`](/docs/components/form-checkbox).

## Router link support

Refer to the [`Router support`](/docs/reference/router-links) reference docs for the various
supported `<router-link>` related props.

## Accessibility

When the `href` prop is set to `'#'`, `<b-button>` will render a link (`<a>`) element with attribute
`role="button"` set and appropriate keydown listeners (<kbd>Enter</kbd> and <kbd>Space</kbd>) so
that the link acts like a native HTML `<button>` for screen reader and keyboard-only users. When
disabled, the `aria-disabled="true"` attribute will be set on the `<a>` element.

When the `href` is set to any other value (or the `to` prop is used), `role="button"` will not be
added, nor will the keyboard event listeners be enabled.

## See also

- [`<b-button-group>`](/docs/components/button-group)
- [`<b-button-toolbar>`](/docs/components/button-toolbar)
- [`<b-link>`](/docs/components/link)
- [Router Link Support](/docs/reference/router-links)
- [Color Variants](/docs/reference/color-variants)

<!-- Component reference added automatically from component package.json -->
