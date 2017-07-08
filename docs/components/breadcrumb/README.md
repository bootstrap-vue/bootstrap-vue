# Breadcrumb

> Indicate the current page’s location within a navigational hierarchy.
  Separators are automatically added in CSS through <code>::before</code> and <code>content</code>.

```html
<template>
  <b-breadcrumb>
    <!--<b-breadcrumb-item
        v-for="(link,idx) in links"
        v-bind="link"
        @click="alert(link)"
    >
        {{link.text}}
    </b-breadcrumb-item>-->
  </b-breadcrumb>
</template>

<script>
export default {
    data: {
        links:[
            {href: "/", text:"Home"},
            {href: "/components", text:"Components"},
            {href: "/components/breadcrumb", text:"Breadcrumb", active: true},
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

Items are rendered using `:items` prop.
It can be an array of objects to provide link and active state.
Active state of last element is automatically set if it is undefined.

```
items = [
  {
    text: 'Home',
    href: 'http://google.com',
  }, {
    text: 'Posts',
    to: '/another/path',
  }, {
    text: 'Another Story',
    active: true
  }
]
```

Or you can simply pass a simple array and use `@click` event handler on breadcrumb to manually handle links.
```
 items: ['Home','Posts','Another story']
```

## Deprecation Notice
The `link` property of a breadcrumb `item` object is deprecated in favor of `href`.
