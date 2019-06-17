# Spinners

> The `<b-spinner>` component can be used to show the loading state in your projects. They're
> rendered only with basic HTML and CSS as a lightweight Vue functional component. Their appearance,
> alignment, and sizing can be easily customized with a few built-in props and/or Bootstrap v4
> utility classes.

Spinners can be placed just about anywhere, including inside buttons, alerts, and even `<b-table>`'s
busy slot.

```html
<div class="text-center">
  <b-spinner label="Spinning"></b-spinner>
  <b-spinner type="grow" label="Spinning"></b-spinner>
  <b-spinner variant="primary" label="Spinning"></b-spinner>
  <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
  <b-spinner variant="success" label="Spinning"></b-spinner>
  <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
</div>

<!-- b-spinners.vue -->
```

## Spinner types

Bootstrap includes two types of spinners. The default spinner type is called `border` (spinning
circle border), and the optional type `grow` (a throbber style indicator).

### Border spinner

Use the default `border` type spinners for a lightweight loading indicator.

```html
<div>
  <b-spinner label="Loading..."></b-spinner>
</div>

<!-- b-spinner-border.vue -->
```

### Grow spinner

If you don't fancy a `border` spinner, switch to the `grow` spinner by setting the prop `type` to
`'grow'`. While it doesn't technically spin, it does repeatedly grow!

```html
<div>
  <b-spinner type="grow" label="Loading..."></b-spinner>
</div>

<!-- b-spinner-grow.vue -->
```

## Spinner color variants

Spinners use `currentColor` for their color, meaning it inherits the current font color. You can
customize the color using the standard text color variants using the `variant` prop, or place
classes or styles on the component to change it's color.

The `variant` prop translates the variant name to the Bootstrap v4 class `.text-{variant}`, so if
you have custom defined text color variants, feel free to use them via the `variant` prop.

```html
<template>
  <div>
    <div class="text-center mb-3 d-flex justify-content-between">
      <b-spinner
        v-for="variant in variants"
        :variant="variant"
        :key="variant"
      ></b-spinner>
    </div>

    <div class="text-center d-flex justify-content-between">
      <b-spinner
        v-for="variant in variants"
        :variant="variant"
        :key="variant"
        type="grow"
      ></b-spinner>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        variants: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark']
      }
    }
  }
</script>

<!-- b-spinner-variants.vue -->
```

**Why not use `border-color` utilities?** Each `border` spinner specifies a `transparent` border for
at least one side, so `.border-{color}` utilities would override that.

## Size

Set the prop `small` to `true` to make a smaller spinner that can quickly be used within other
components.

```html
<div>
  <b-spinner small label="Small Spinner"></b-spinner>
  <b-spinner small label="Small Spinner" type="grow"></b-spinner>
</div>

<!-- b-spinner-sizes.vue -->
```

Or, use custom CSS or inline styles to change the dimensions as needed.

```html
<div>
  <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
  <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
</div>

<!-- b-spinner-sizes-custom.vue -->
```

## Alignment

Spinners in Bootstrap are built with `rem`s, `currentColor`, and `display: inline-flex`. This means
they can easily be resized, recolored, and quickly aligned.

### Margin

Use margin utilities like `.m-5` for easy spacing.

```html
<div>
  <b-spinner class="m-5" label="Busy"></b-spinner>
</div>

<!-- b-spinner-margin.vue -->
```

## Placement

Use flexbox utilities, float utilities, or text alignment utility classes to place spinners exactly
where you need them in any situation.

### Flex

Using flex utility classes:

```html
<div>
  <div class="d-flex justify-content-center mb-3">
    <b-spinner label="Loading..."></b-spinner>
  </div>

  <div class="d-flex align-items-center">
    <strong>Loading...</strong>
    <b-spinner class="ml-auto"></b-spinner>
  </div>
</div>

<!-- b-spinner-flex.vue -->
```

### Floats

Using float utility classes:

```html
<div class="clearfix">
  <b-spinner class="float-right" label="Floated Right"></b-spinner>
</div>

<!-- b-spinner-floats.vue -->
```

### Text align

Using text alignment utility classes:

```html
<div class="text-center">
  <b-spinner variant="primary" label="Text Centered"></b-spinner>
</div>

<!-- b-spinner-text-align.vue -->
```

## Spinners in buttons

Use spinners within buttons to indicate an action is currently processing or taking place. You may
also swap the label text out of the spinner element and utilize button text as needed.

```html
<div>
  <b-button variant="primary" disabled>
    <b-spinner small></b-spinner>
    <span class="sr-only">Loading...</span>
  </b-button>

  <b-button variant="primary" disabled>
    <b-spinner small type="grow"></b-spinner>
    Loading...
  </b-button>
</div>

<!-- b-spinner-buttons.vue -->
```

## Spinner accessibility

Place a hidden label text inside the spinner for screen reader users, via the `label` prop or
`label` slot. The content will be placed _inside_ the spinner wrapped in a `<span>` element that has
the class `sr-only`, which will make the label available to screen reader users.

For accessibility purposes, each spinner will automatically have a `role="status"` attribute when a
label is provided. You can easily customize the role if required via prop `role`. The specified
`role` will not be applied when no label is provided.

As well, when no label is provided, the spinner will automatically have the attribute
`aria-hidden="true"` to hide the spinner from screen reader users.

<!-- Component reference added automatically from component package.json -->
