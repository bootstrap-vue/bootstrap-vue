# Spinners

> The `<b-spinner>` component can be used to show the loading state in your projects. They're rendered only with
basical HTML and CSS as a Vue functional component. Their appearance, alignment, and sizing can be easily customized
with a few props and Bootstrap V4 utility classes.

Spinners can be placed just about anywhere, including inside buttons, alerts, and even `<b-table>`'s busy slot.

For accessibility purposes, each spinner has a `role="status"` and a nested `<span class="sr-only">Loading...</span>`.
You can easily customize these if required via props `role` and `label`. YOu can also use the named slot `label for the
loading text.

## Spinner types

Bootstrap V4.2 includes two types of spinners.  The default spinner is called `border` (spinning circle border), and
`grow` (a throbber style indicator).

### Border spinner
Use the default `border` type spinners for a lightweight loading indicator.

```html
<div>
  <b-spinner></b-spinner>
</div>

<!-- spinner-border.vue -->
```

### Grow spinner
If you don't fancy a `border` spinner, switch to the `grow` spinner by setting the prop `type` to `'grow'`.
While it doesn't technically spin, it does repeatedly grow!

```html
<div>
  <b-spinner type="grow"></b-spinner>
</div>

<!-- spinner-grow.vue -->
```

## Spinner color variants
Spinners use `currentColor` for thier color, meaning it inherits the current font color.
You can customize the color using the standard text color variants using hte `variant` prop,
or place classes or styles on the component to change it's color.

The `variant` prop translates the variant name to the bootstrap V4 class `.text-{variant}`, so if
you have custom defined text variants, feel free to use them via the `variant` prop.


```html
<template>
  <div>
    <b-row class="mb-2" v-for="variant in variants">
      <b-col><b-spinner :variant="variant"></b-spinner></b-col>
      <b-col><b-spinner :variant="variant" type="grow"></b-spinner></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      variants: [
        'primary', 'secondary', 'danger', 'success', 'info', 'dark'
      ]
    }
  }
}
</script>

<!-- spinner-variants.vue -->
```

**Why not use `border-color` utilities?** Each `border` spinner specifies a `transparent`
border for at least one side, so `.border-{color}` utilities would override that.

## Spinner accessibility
Place a hidden label text inside teh spinner for screen reader users, via the `label` prop or `label` slot.

## Spinner size
Set the prop `small` to `true` to make a smaller spinner that can quickly be used within other components.

```html
<div>
  <b-spinner small></b-spinner>
  <b-spinner small type="grow"></b-spinner>
</div>

<!-- spinner-sizes.vue -->
```

Or, use custom CSS or inline styles to change the dimensions as needed.

```html
<div>
  <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
  <b-spinner style="width: 3rem; height: 3rem;" type="grow"></b-spinner>
</div>

<!-- spinner-sizes-custom.vue -->
```

## Spinner alignment

Spinners in Bootstrap are built with `rem`s, `currentColor`, and `display: inline-flex`. This means they
can easily be resized, recolored, and quickly aligned.

### Margin

Use margin utilities like `.m-5` for easy spacing.

```html
<div>
  <b-spinner class="m-5"></b-spinner>
</div>

<!-- spinner-margin.vue -->
```

## Spinner placement

Use flexbox utilities, float utilities, or text alignment utility classes to place spinners exactly
where you need them in any situation.

### Flex
Using flex utility classes:

```html
<div>
  <div class="d-flex justify-content-center mb-3">
    <b-spinner></b-spinner>
  </div>
  <div class="d-flex align-items-center">
    <strong>Loading...</strong>
    <b-spinner class="ml-auto" label="" aria-hidden="true"></b-spinner>
  </div>
</div>

<!-- spinner-flex.vue -->
```

### Floats
Using float utility classes:

```html
<div>
  <div class="clearfix">
    <b-spinner class="float-right"></b-spinner>
  </div>
</div>

<!-- spinner-floats.vue -->
```

### Text align
Using text alignment utility classes:

```html
<div>
  <div class="text">
    <b-spinner variant="primary"></b-spinner>
  </div>
</div>

<!-- spinner-text-align.vue -->
```

## Spinner buttons
Use spinners within buttons to indicate an action is currently processing or taking place. You
may also swap the label text out of the spinner element and utilize button text as needed.

```html
<div>
  <b-button variant="primary" disabled>
    <b-spinner small aria-hidden="true"></span>
  </b-button>
  <b-button variant="primary" disabled>
    <b-spinner small type="grow" aria-hidden="true" label=""></span>
    Loading...
  </b-button>
</div>

<!-- spinner-buttons.vue -->
```

## Spinner accessibility
Place a hidden label text inside teh spinner for screen reader users, via the `label` prop or `label` slot.

The content will be placed inside the spinner  wrapped in a `<span>` element that has the class `sr-only`.
