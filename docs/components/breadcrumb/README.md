# Breadcrumb

> Indicate the current page’s location within a navigational hierarchy.
  Separators are automatically added in CSS through <code>::before</code> and <code>content</code>.

```html
<template>

    <b-breadcrumb>
        <b-breadcrumb-item
            :items="linksDynamic"
            @click="alert(linksDynamic)"
        />
    </b-breadcrumb>

    <b-breadcrumb>
        <b-breadcrumb-item
            v-for="(link,idx) in links"
            v-bind="link"
            :key="idx"
            @click="alert(link)"
        >
            {{link.text}}
        </b-breadcrumb-item>
    </b-breadcrumb>

</template>

<script>
export default {
    data: {
        linksDynamic: [
            {href: "/", text:"Home"},
            {href: "/docs", text:"Documentation"},
            {href: "/docs/components", text:"Components"},
            {href: "/docs/components/breadcrumb", text:"Breadcrumb", active: true},
        ],
        links: [
            {href: "/", text:"News Feed"},
            {href: "/profile", text:"Profile"},
            {href: "/profile/1234", text:"User 1234"},
            {href: "/profile/1234/about", text:"About", active: true},
        ]
    },
    methods: {
        alert(thing) {
            alert(JSON.stringify(thing,null,2))
        }
    }
}
</script>

<!-- breadcrumb.vue -->
```

Items are rendered using either the `items` prop, or your own custom logic.
Items are an array of objects to provide link (`href` or `to`), text, and active state.
Active state of last element is automatically set if it is undefined. Various link and router-link props are also supported in the `b-breadcrumb-item` prop `link-props/linkProps`.

```
items = [
  {
    text: 'Home',
    href: 'http://google.com',
  }, {
    text: 'Posts',
    to: '/another/path', // `to` will render a router-link
  }, {
    text: 'Another Story',
    href: '#',
    active: true
  }
]
```

## Breaking Changes
- No longer emits a `click` event with the item. Instead, all native events are now accessible.
- No longer accepts an array of strings. Pass an array of objects, or use your own `v-for` logic to build a custom list.
- The `items` array no longer accepts the `link` prop. Use `href` and/or pass an object of `linkProps`.
