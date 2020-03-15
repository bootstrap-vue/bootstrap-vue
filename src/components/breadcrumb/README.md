# Breadcrumb

> Indicate the current page's location within a navigational hierarchy. Separators are automatically
> added in CSS through <code>::before</code> and <code>content</code>.

```html
<template>
  <b-breadcrumb :items="items"></b-breadcrumb>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            text: 'Admin',
            href: '#'
          },
          {
            text: 'Manage',
            href: '#'
          },
          {
            text: 'Library',
            active: true
          }
        ]
      }
    }
  }
</script>

<!-- b-breadcrumb.vue -->
```

## Breadcrumb items

Items are rendered using `:items` prop. It can be an array of objects to provide link and active
state. Links can be `href`'s for anchor tags, or `to`'s for router-links. Active state of last
element is automatically set if it is `undefined`.

<!-- eslint-disable no-unused-vars -->

```js
const items = [
  {
    text: 'Home',
    href: 'https://google.com'
  },
  {
    text: 'Posts',
    to: { name: 'home' }
  },
  {
    text: 'Another Story',
    active: true
  }
]
```

Refer to the [Router support](/docs/reference/router-links) reference page for router-link specific
props.

## Manually placed items

You may also manually place individual `<b-breadcrumb-item>` child components in the default slot of
the `<b-breadcrumb>` component, as an alternative to using the `items` prop, for greater control
over the content of each item:

```html
<template>
  <b-breadcrumb>
    <b-breadcrumb-item href="#home">
      <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      Home
    </b-breadcrumb-item>
    <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
    <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
    <b-breadcrumb-item active>Baz</b-breadcrumb-item>
  </b-breadcrumb>
</template>

<!-- b-breadcrumb-item.vue -->
```

Remember to set the `active` prop on the last item.

`<b-breadcrumb-item>` also supports the various `<router-link>` props such as `to`, etc.

<!-- Component reference added automatically from component package.json -->
