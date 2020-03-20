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

Use the `variant` prop to specify on of bootstrap them variant colors:

TBD

### Sizing

TBD

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

## Actionalble avatars

Easily create avatars that respond to clicks, or change the URL/route.

### Button

TBD

### Link

TBD

## Accessibility

Use the `aria-label` prop to provide an accessible, screen reader friendly, label for your avatar.
The default `aria-label` is `'avatar'`.

## Implementation notes

TBD
