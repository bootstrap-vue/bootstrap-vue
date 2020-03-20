# Avatar

> Avatars are a BootstrapVue custom component, and are typically used to display a user profile as a
> picture, an icon, or short text. `<b-avatar>` provides several props for customizing its appearance
> such as color variant and roundedness, and optionally supports acting as a button, link or
> [router link](/docs/reference/router-links).

## Overview

TBD

```html
<template>
  <div>
    <b-avatar></b-avatar>
    <b-avatar variant="primary" text="BV"></b-avatar>
    <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
    <b-avatar variant="success" icon-name="people-fill"></b-avatar>
  </div>
</template>

<!-- b-avatar.vue -->
```

## Avatar types

The avatar content can be either a short text string, an iamge, or an icon. Avatar content defaults to
the [`'person-fill'` icon](/docs/icons) when no other content is specified.

### Text content

TBD

### Image content

TBD

**Notes:**
- When using a module bundler and project relative image URLs, please refer to the
  [Component img src resolving](/docs/reference/images) reference section for additional details.
- The `src` prop takes precedence over the `text` prop.

### Icon content

TBD

**Notes:**
- When providing a BootstrapVue icon name, you _must_ ensure that you have regerested the
  corresponding icon component (either locally to your component/page, or globally), if not using
  the full [`BootstrapVueIcons` plugin](/docs/icons)
- The `icon-name` prop takes precendence over the `text` and `src` props

### Custom content

Use the `default` slot to render custom content in the avatar, for finer grained control of
its appearance.

TBD

**Notes:**

- The default slot takes precedence over the `text`, `src` and `icon` props
- The defaut slot content will be wrapped in a `<span>` element to ensure proper centering

## Styling

### Variants

Use the `variant` prop to specify one of bootstrap them variant colors. The default variant is
`secondary`.

```html
<template>
  <div>
    <b-avatar variant="success"></b-avatar>
    <b-avatar variant="primary"></b-avatar>
    <b-avatar variant="dark"></b-avatar>
    <b-avatar variant="light"></b-avatar>
    <b-avatar variant="success"></b-avatar>
    <b-avatar variant="danger"></b-avatar>
    <b-avatar variant="warning"></b-avatar>
    <b-avatar variant="info"></b-avatar>
  </div>
</template>

<!-- b-avatar-variant.vue -->
```

### Sizing

By default, avatars are sized to `2.5em` (which is relative to the current font size). You can change
the size of the avatar by changin the current font height, or use the prop `height` to specify an
explicit height. The height value _must_ include the units (such as `px`, `em`, or `rem`).

```html
<template>
  <div>
    <b-avatar></b-avatar>
    <b-avatar height="3em"></b-avatar>
    <b-avatar height="72px"></b-avatar>
  </div>
</template>

<!-- b-avatar-height.vue -->
```

**Note:** Avatars are _always_ rendered with an aspect ratio of `1:1`.

### Square

Prefer a square avatar? simply set the `square` prop to `true`.

```html
<template>
  <div>
    <b-avatar square></b-avatar>
  </div>
</template>

<!-- b-avatar-square.vue -->
```

### Rounding

`<b-avatar>` renders with a circular border radius. You can change the rouding by setting the prop
`rounded` to one of the values `true`, `'sm'`, `'lg'`, `'top'`, `'left'`, `'right'`, or `'bottom'`.
When set to `true` (or the empty string `''`), it uses the Bootstrap default of medium rounding.

```html
<template>
  <div style="font-size: 2rem;">
    <b-avatar rounded="sm"></b-avatar>
    <b-avatar rounded></b-avatar>
    <b-avatar rounded="lg"></b-avatar>
    <b-avatar rounded="top"></b-avatar>
    <b-avatar rounded="left"></b-avatar>
    <b-avatar rounded="right"></b-avatar>
    <b-avatar rounded="bottom"></b-avatar>
  </div>
</template>

<!-- b-avatar-rounding.vue -->
```

**Note:** The `square` prop takes precedence over the `rounded` prop.

## Actionable avatars

Easily create avatars that respond to clicks, or avatars that change the URL/route.

### Button

Want to trigger the opening of a modal or trigger an action? Set the `button` prop to instruct
`<b-avatar>` to render as a `<button>` element. When rendered as a button, the component will
emit the `click` event whenever clicked.

```html
<template>
  <div>
    <b-avatar button @click="onClick" variant="primary" text="FF"></b-avatar>
    Button Avatar
  </div>
</template>

<script>
  export default {
    methods: {
      onClick() {
        this.$bvModal.msgBoxOk('User name: Fred Flinstone', {
          title: 'User Info',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      }
    }
  }
</script>

<!-- b-avatar-button.vue -->
```

The prop `button-type` can be used to control the type of button to render. Supported values are
`'button'` (the default), `'submit'`, or `'reset'`.

### Link

Fancy an avatar as a link or router link, then set either the `href` or `to` props (respectively).
The `to` prop can either be a string path, or a `Location` object.

```html
<template>
  <div>
    <b-avatar href="#foobar"variant="info" src="https://placekitten.com/300/300"></b-avatar>
    Link Avatar
  </div>
</template>

<!-- b-avatar-href.vue -->
```

**Note:** the `button` prop takes precedence over the `href` and `to` props.

## Accessibility

Use the `aria-label` prop to provide an accessible, screen reader friendly, label for your avatar.

## Implementation notes

TBD

`<b-avatar>` requires BoootstrapVue's custom CSS for proper styling.
