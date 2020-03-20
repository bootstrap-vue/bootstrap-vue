# Avatar

> Avatars are a custom BootstrapVue component, and are typically used to display a user profile as a
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

### Icon content

TBD

### Custom content

Use the `default` slot to render custom content in the avatar, for finer grained control of
its appearance.

TBD

**Note:** the default slot takes precedence over the `text`, `src` and `icon` props.

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

<!-- b-avatar-height.vue -->
```

### Sizing

By default, avatars are sized to `2.5em` (which is relative to the current font size). You can change
the size of the avatar by changin the current font height, or use the prop `height` to specify an
explicit height. The height value _must_ include the units (such as `px`, `em`, or `rem`).

```html
<template>
  <div>
    <b-avatar></b-avatar>
    <b-avatar height="4em"></b-avatar>
    <b-avatar height="48px"></b-avatar>
  </div>
</template>

<!-- b-avatar-height.vue -->
```

**Note:** Avatars are _always_ rendered with an aspect ratio of `1:1`.

### Square

TBD

```html
<template>
  <div>
    <b-avatar square></b-avatar>
  </div>
</template>

<!-- b-avatar-square.vue -->
```

### Rounding

TBD

```html
<template>
  <div style="font-size: 3rem;">
    <b-avatar rounded="sm"></b-avatar>
    <b-avatar rounded></b-avatar>
    <b-avatar rounded="lg"></b-avatar>
  </div>
</template>

<!-- b-avatar-rounding.vue -->
```

## Actionable avatars

Easily create avatars that respond to clicks, or change the URL/route.

### Button

TBD

### Link

TBD

## Accessibility

Use the `aria-label` prop to provide an accessible, screen reader friendly, label for your avatar.

## Implementation notes

TBD
