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
    href: 'http://google.com'
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

<!-- Component reference added automatically from component package.json -->
