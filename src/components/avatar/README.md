# Avatar

> Avatars are a BootstrapVue custom component, and are typically used to display a user profile as a
> picture, an icon, or short text. `<b-avatar>` provides several props for customizing its
> appearance such as color variant and roundness, and optionally supports acting as a button, link
> or [router link](/docs/reference/router-links).

## Overview

Avatars are lightweight components, which render inline by default, so that they are vertically
centered beside any adjoining plain text. They also can be used as children of other components.

```html
<template>
  <div>
    <p>Using stand-alone:<p/>
    <div class="mb-4">
      <b-avatar></b-avatar>
      <b-avatar variant="primary" text="BV"></b-avatar>
      <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
      <b-avatar variant="success" icon="people-fill"></b-avatar>
    </div>
    <p>Using in components (list group) example:<p/>
    <b-list-group style="max-width: 300px;">
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar class="mr-3"></b-avatar>
        <span class="mr-auto">J. Circlehead</span>
        <b-badge>5</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
        <span class="mr-auto">BootstrapVue</span>
        <b-badge>12</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
        <span class="mr-auto">Super Kitty</span>
        <b-badge>9</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="success" icon="people-fill" class="mr-3"></b-avatar>
        <span class="mr-auto">ACME group</span>
        <b-badge>7</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<!-- b-avatar.vue -->
```

## Avatar types

The avatar content can be either a an image, an icon, or short text string. Avatar content defaults
to the [`'person-fill'` icon](/docs/icons) when no other content is specified.

You can also supply custom content via the default slot, although you may need to apply additional
styling on the content.

### Image content

Use the `src` prop to specify a URL of an image to use as the avatar content. The image should have
an aspect ratio of `1:1` (meaning the width and height should be equal), otherwise image aspect
distortion will occur. The image will be scaled up or down to fit within the avatar's bounding box.

```html
<template>
  <div class="mb-2">
    <b-avatar src="https://placekitten.com/300/300"></b-avatar>
    <b-avatar src="https://placekitten.com/300/300" size="6rem"></b-avatar>
  </div>
</template>

<!-- b-avatar-src.vue -->
```

**Notes:**

- When using a module bundler and project relative image URLs, please refer to the
  [Component img src resolving](/docs/reference/images) reference section for additional details.
- The `src` prop takes precedence over the `icon` and `text` props.
- <span class="badge badge-secondary">2.11.0+</span> If the image fails to load, the avatar will
  fallback to the value of the `icon` or `text` props. If neither the `icon` or `text` props are
  provided, then the default avatar icon will be shown. Also, when the image fails to load, the
  `img-error` event will be emitted.
- [Variant colors](#variants) when using images not normally visible, unless the image fails load.
  The variant will affect the focus styling when the image avatar is also an
  [actionalble avatar](#actionalble-avatars).

### Icon content

Easily use one of [BootstrapVue's icons](/docs/icons) as the avatar content via the `icon` prop. The
prop should be set to a valid icon name. Icons will scale respective to the [`size` prop](#sizing).

```html
<template>
  <div class="mb-2">
    <b-avatar icon="people-fill"></b-avatar>
    <b-avatar icon="star-fill"></b-avatar>
    <b-avatar icon="music-note"></b-avatar>
    <b-avatar icon="star-fill" size="4em"></b-avatar>
  </div>
</template>

<!-- b-avatar-icon.vue -->
```

**Notes:**

- When providing a BootstrapVue icon name, you _must_ ensure that you have registered the
  corresponding icon component (either locally to your component/page, or globally), if not using
  the full [`BootstrapVueIcons` plugin](/docs/icons).
- The `icon` prop takes precedence over the `text` prop.
- If the `text`, `src`, or `icon` props are not provided _and_ the [default slot](#custom-content)
  has no content, then the `person-fill` icon will be used.

### Text content

You can specify a short string as the content of an avatar via the `text` prop. The string should be
short (1 to 3 characters), and will be transformed via CSS to be all uppercase. The font size will
be scaled relative to the [`size` prop setting](#sizing).

```html
<template>
  <div class="mb-2">
    <b-avatar text="BV"></b-avatar>
    <b-avatar text="a"></b-avatar>
    <b-avatar text="Foo"></b-avatar>
    <b-avatar text="BV" size="4rem"></b-avatar>
  </div>
</template>

<!-- b-avatar-text.vue -->
```

### Custom content

Use the `default` slot to render custom content in the avatar, for finer grained control of its
appearance, or if using custom icons or SVGs e.g.:

```html
<b-avatar><custom-icon></custom-icon></b-avatar>
```

**Multi-line text example:**

```html
<template>
  <div class="mb-2">
    <b-avatar size="4em">Hello<br>World</b-avatar>
    <b-avatar size="4em">你好<br>世界</b-avatar>
  </div>
</template>

<!-- b-avatar-default-slot-multi-line.vue -->
```

**Notes:**

- The default slot takes precedence over the `text`, `src` and `icon` props.
- The default slot content will be wrapped in a `<span>` element to ensure proper centering.
- You may need additional styling applied to the custom content to compensate for the
  [shape of avatar component](#rounding).

## Styling

### Variants

Use the `variant` prop to specify one of Bootstrap theme variant colors. The default variant is
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

If you have defined additional custom variants via
[SASS theming variables](/docs/reference/theming), the custom variants will also be available to
use.

### Sizing

By default, avatars are sized to `2.5em` (which is relative to the current font size). You can
change the size of the avatar by changing the current font size, or use the prop `size` to specify
an explicit size. The sizes `sm`, `md` and `lg` default to `1.5em`, `2.5em` and `3.5em`. Numbers get
converted to pixel values. Any other value _must_ include the units (such as `px`, `em`, or `rem`).

```html
<template>
  <div>
    <b-avatar></b-avatar>
    <b-avatar size="sm"></b-avatar>
    <b-avatar size="lg"></b-avatar>
    <b-avatar :size="24"></b-avatar>
    <b-avatar size="3em"></b-avatar>
    <b-avatar size="72px"></b-avatar>
  </div>
</template>

<!-- b-avatar-size.vue -->
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

`<b-avatar>` renders with a circular border radius. You can change the rounding by setting the prop
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
  achieve a square avatar.

### Alignment

By default `<b-avatar>` will be vertically centered with its adjoining content. In some cases you
may want to alter the alignment, such as ensuring that a text-only avatar aligns its text with the
adjoining text. Simply set a [vertical alignment utility](/docs/reference/utility-classes) class on
the component, such as `<b-avatar class="align-baseline" ...>` or
`<b-avatar class="align-top" ...>`, etc.

## Actionable avatars

Easily create avatars that respond to clicks, or avatars that change the URL/route when clicked.
Actionable avatars will appear in the document tab sequence, and are accessible for both screen
reader and keyboard-only users.

Image avatars, when actionalble, employ a basic scale transform on the image when hovered.

### Button

Want to trigger the opening of a modal or trigger an action? Set the `button` prop to instruct
`<b-avatar>` to render as a `<button>` element. When rendered as a button, the component will emit
the `click` event whenever clicked.

```html
<template>
  <b-list-group>
    <b-list-group-item>
      <b-avatar button @click="onClick" variant="primary" text="FF" class="align-baseline"></b-avatar>
      Button Text Avatar
    </b-list-group-item>
    <b-list-group-item>
      <b-avatar button @click="onClick" src="https://placekitten.com/300/300"></b-avatar>
      Button Image Avatar
    </b-list-group-item>
    <b-list-group-item>
      <b-avatar button @click="onClick" icon="star-fill" class="align-center"></b-avatar>
      Button Icon Avatar
    </b-list-group-item>
  </b-list-group>
</template>

<script>
  export default {
    methods: {
      onClick() {
        this.$bvModal.msgBoxOk('User name: Fred Flintstone', {
          title: 'User Info',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0'
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

Fancy an avatar as a link or router link? Simply set either the `href` or `to` props (respectively).
The `to` prop can either be a string path, or a `Location` object. The `to` prop requires that
`Vue router` (or equivalent) be installed.

```html
<template>
  <b-list-group>
    <b-list-group-item>
      <b-avatar href="#foo" variant="primary" text="FF" class="align-baseline"></b-avatar>
      Link Text Avatar
    </b-list-group-item>
    <b-list-group-item>
      <b-avatar href="#bar" src="https://placekitten.com/300/300"></b-avatar>
      Link Image Avatar
    </b-list-group-item>
    <b-list-group-item>
      <b-avatar href="#baz" icon="star-fill" class="align-center"></b-avatar>
      Link Icon Avatar
    </b-list-group-item>
  </b-list-group>
</template>

<!-- b-avatar-href.vue -->
```

**Note:**

- The `button` prop takes precedence over the `href` and `to` props.
- For additional details on the `<router-link>` compatible props, please refer to the
  [Router support reference section](/docs/reference/router-links).

## Badge avatars

<span class="badge badge-info small">2.12.0+</span>

Easily add a badge to your avatar via the `badge` prop or `'badge'` slot, and the badge variant can
be set via the `badge-variant` prop. The badge will scale with the size of the avatar.

```html
<template>
  <div>
    <b-avatar badge></b-avatar>
    <b-avatar badge badge-variant="danger" src="https://placekitten.com/300/300"></b-avatar>
    <b-avatar badge badge-variant="warning" icon="people-fill"></b-avatar>
    <b-avatar badge badge-variant="success" src="https://placekitten.com/300/300"></b-avatar>
    <b-avatar badge badge-variant="dark" text="BV"></b-avatar>
    <b-avatar square badge badge-variant="dark" text="BV"></b-avatar>
  </div>
</template>

<!-- b-avatar-badge.vue -->
```

### Badge content

Add textual content to the badge by supplying a string to the `badge` prop, or use the named slot
`'badge'`.

```html
<template>
  <div style="font-size: 2rem">
    <b-avatar badge="BV"></b-avatar>
    <b-avatar badge="7" variant="primary" badge-variant="dark"></b-avatar>
    <b-avatar badge-variant="info" src="https://placekitten.com/300/300">
      <template #badge><b-icon icon="star-fill"></b-icon></template>
    </b-avatar>
  </div>
</template>

<!-- b-avatar-badge-content.vue -->
```

### Badge positioning

By default the badge appears on the bottom right of the avatar. You can use the `badge-top` and
`badge-right` boolean props to switch the sides. Combine both props to move the badge to the top
right of the avatar.

```html
<template>
  <div>
    <b-avatar badge></b-avatar>
    <b-avatar badge badge-left></b-avatar>
    <b-avatar badge badge-top></b-avatar>
    <b-avatar badge badge-left badge-top></b-avatar>
  </div>
</template>

<!-- b-avatar-badge-position.vue -->
```

Use the `badge-offset` prop to control the offset of the badge. The `badge-offset` must be a valid
CSS length string (i.e. `'2px'`, `'-2px'`, `'0.5em'`, etc.). Positive values will move the badge
inward, while negative values will move the badge outward.

```html
<template>
  <div>
    <b-avatar badge></b-avatar>
    <b-avatar badge badge-offset="-0.5em"></b-avatar>
    <b-avatar badge badge-offset="-2px"></b-avatar>
    <b-avatar badge badge-offset="2px"></b-avatar>
    <b-avatar badge badge-top></b-avatar>
    <b-avatar badge badge-top badge-offset="-0.5em"></b-avatar>
    <b-avatar badge badge-top badge-offset="-2px"></b-avatar>
    <b-avatar badge badge-top badge-offset="2px"></b-avatar>
  </div>
</template>

<!-- b-avatar-badge-offset.vue -->
```

## Avatar groups

<span class="badge badge-info small">v2.14.0+</span>

Group multiple avatars together by wrapping them in a `<b-avatar-group>` component:

```html
<template>
  <div>
    <b-avatar-group size="60px">
      <b-avatar></b-avatar>
      <b-avatar text="BV" variant="primary"></b-avatar>
      <b-avatar src="https://placekitten.com/300/300" variant="info"></b-avatar>
      <b-avatar text="OK" variant="danger"></b-avatar>
      <b-avatar variant="warning"></b-avatar>
      <b-avatar src="https://placekitten.com/320/320" variant="dark"></b-avatar>
      <b-avatar icon="music-note" variant="success"></b-avatar>
    </b-avatar-group>
  </div>
</template>

<!-- b-avatar-group.vue -->
```

**Notes:**

- The `variant`, `square` and `rounded` props on `<b-avatar-group>` will take precedence over the
  respective props on individual avatars.

### Group size

To size the avatars, use the prop `size` on `<b-avatar-group>`. The `size` prop accepts the same
type of values as the `size` prop on `<b-avatar>`. Note that the `size` prop will be ignored on
individual avatars when they are placed inside a `<b-avatar-group>`.

```html
<template>
  <div>
    <b-avatar-group size="5rem">
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
    </b-avatar-group>
  </div>
</template>

<!-- b-avatar-group-size.vue -->
```

### Group variant

Use the `variant` prop to color all child avatars in the `<b-avatar-group>`. Note that the `variant`
prop, when set, will override the the `variant` specified on individual avatars.

```html
<template>
  <div>
    <b-avatar-group variant="success">
      <b-avatar></b-avatar>
      <b-avatar variant="info"></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
    </b-avatar-group>
  </div>
</template>

<!-- b-avatar-group-variant.vue -->
```

### Group rounding

Similar to the `variant` prop, the `<b-avatar-group>` props `square` and `rounded` take precedence
over the respective props on individual child avatars.

```html
<template>
  <div>
    <b-avatar-group rounded="lg">
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
    </b-avatar-group>
  </div>
</template>

<!-- b-avatar-group-rounded.vue -->
```

### Group overlap

By default child avatars inside a `<b-avatar-group>` will overlap by a factor of `0.3` (relative to
the size of the avatar). You can control the overlap amount by setting the `overlap` prop to a value
between `0` and `1`, where `0` means no overlap and `1` means 100% overlap.

```html
<template>
  <div>
    <b-avatar-group overlap="0.65">
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
    </b-avatar-group>
  </div>
</template>

<!-- b-avatar-group-overlap.vue -->
```

## Accessibility

Use the `aria-label` prop to provide an accessible, screen reader friendly, label for your avatar.
If you have a badge, it is recommended to add inforation to your aria-label regarding the badge
purpose or content (i.g. `'3 messages'`, `'online'`, etc.).

While the `click` event is emitted regardless if the `button`, `href`, or `to` props are set, it is
highly recommended to use the `button` prop when the click event should trigger an action (or use
the `to` or `href` props when changing routes or changing URLs) for accessibility reasons.

## Implementation notes

Avatars are based upon `<b-badge>` and `<b-button>` components, and as such, rely upon Bootstrap's
`badge-*` and `btn-*` variant classes, as well as the `rounded-*`
[utility classes](/docs/reference/utility-classes).

`<b-avatar>` also requires BootstrapVue's custom CSS for proper styling.
