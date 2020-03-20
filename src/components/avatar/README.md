# Avatar

> Avatars are a BootstrapVue custom component, and are typically used to display a user profile as a
> picture, an icon, or short text. `<b-avatar>` provides several props for customizing its appearance
> such as color variant and roundedness, and optionally supports acting as a button, link or
> [router link](/docs/reference/router-links).

## Overview

Avatars are lightweight fnctional components, which render, by default, so that they are vertically
centered beside any ajoining plain text. They also can be used as children of other components.

```html
<template>
  <div>
    <div class="mb-2">
      <b-avatar></b-avatar>
      <b-avatar variant="primary" text="BV"></b-avatar>
      <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
      <b-avatar variant="success" icon-name="people-fill"></b-avatar>
      <b-avatar variant="dark" text="BV"></b-avatar>
    </div>
    <b-list-group style="max-width: 300px;">
      <b-list-gropp-item>
        <b-avatar class="mr-3"></b-avatar> Joe Blow
      </b-list-group-item>
      <b-list-gropp-item>
        <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
        Super Kitten
      </b-list-group-item>
      <b-list-gropp-item>
        <b-avatar variant="success" icon-name="people-fill" class="mr-3"></b-avatar>
        ACME group
      </b-list-group-item>
      <b-list-gropp-item>
        <b-avatar variant="dark" text="BV" class="mr-3"></b-avatar>
        BootstrapVUe
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<!-- b-avatar.vue -->
```

## Avatar types

The avatar content can be either a short text string, an iamge, or an icon. Avatar content defaults to
the [`'person-fill'` icon](/docs/icons) when no other content is specified.

### Text content

You can specify a short string as the content of an avatar via the `text` prop. The string should be
short (1 to 3 characters), and will be tansformed via CSS to be all uppercase.

```html
<template>
  <div>
    <div class="mb-2">
      <b-avatar text="BV"></b-avatar>
      <b-avatar text="a"></b-avatar>
      <b-avatar text="Foo"></b-avatar>
      <b-avatar text="BV" size="3em"></b-avatar>
    </div>
</template>

<!-- b-avatar-text.vue -->
```

The font size will be scaled relative to the [`height` prop setting](#sizing).

### Image content

Use the `src` prop to specify a URL of an image to use as the avatar content. The image should have
an aspect ratio of `1:1` (meaning the width and height shoud be equal), otherwise image aspect distorion
will occur. The image will be scaled up or down to fit withing the avatar's bounding box, and will have
spacing to show the avatar's [variant background](#variants).

```html
<template>
  <div>
    <div class="mb-2">
      <b-avatar src="https://placekitten.com/300/300"></b-avatar>
      <b-avatar src="https://placekitten.com/300/300" size="3.5em"></b-avatar>
    </div>
</template>

<!-- b-avatar-src.vue -->
```

**Notes:**
- When using a module bundler and project relative image URLs, please refer to the
  [Component img src resolving](/docs/reference/images) reference section for additional details.
- The `src` prop takes precedence over the `text` prop.

### Icon content

Easily use one of [BootstrapVue's icons](/docs/icons) as the avatar content via the `icon-name` prop.
The prop should be set to a valid icon name. Icons will scale respective to the [`size` prop](#sizing).

```html
<template>
  <div>
    <div class="mb-2">
      <b-avatar icon="people-fill"></b-avatar>
      <b-avatar icon="star-fill"></b-avatar>
      <b-avatar icon="music-note"></b-avatar>
    </div>
</template>

<!-- b-avatar-icon.vue -->
```

**Notes:**
- When providing a BootstrapVue icon name, you _must_ ensure that you have regerested the
  corresponding icon component (either locally to your component/page, or globaly), if not using
  the full [`BootstrapVueIcons` plugin](/docs/icons)
- The `icon-name` prop takes precendence over the `text` and `src` props
- If the `text`, `src`, or `icon-name` props are not provided _and_ the
  [default slot](#custom-content) has no content, then the `person-fill` icon will be used

### Custom content

Use the `default` slot to render custom content in the avatar, for finer grained control of
its appearance, or if using custom icons or SVGs. e.g.:

```html
<b-avatar><custom-icon></custom-icon></b-avatar>
```

**Notes:**

- The default slot takes precedence over the `text`, `src` and `icon` props
- The defaut slot content will be wrapped in a `<span>` element to ensure proper centering
- You may need additional styling applied to the custom content to compensate for the
  [shape of avatar component](#rounding)

## Styling

### Variants

Use the `variant` prop to specify one of bootstrap them variant colors. The default variant is
`secondary`.

```html
<template>
  <div>
    <b-avatar variant="secondary"></b-avatar>
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

If you have defined additional custom variants via [SASS theming variables](/docs/reference/theming),
the custom variants will also be available to use.

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

**Notes:**

- The `square` prop takes precedence over the `rounded` prop.
- Alternatively to to the `square` prop, you can set the `rounded` prop to the string `'0'` to
  acheive a square avatar.

## Actionable avatars

Easily create avatars that respond to clicks, or avatars that change the URL/route when clicked.

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

Avatars are based upon `<b-badge>` and `<b-button>` components, and as such, rely upon Bootstaps's
`badge-*` and `btn-*` variant classes, as well as the `rounded-*` utiltiy classed.

`<b-avatar>` also requires BoootstrapVue's custom CSS for additional proper styling.
