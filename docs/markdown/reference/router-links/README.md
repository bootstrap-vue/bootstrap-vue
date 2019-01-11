# Router link support

> Several BootstrapVue components support rendering `<router-link>` components compatible with
> _Vue-Router_ and _Nuxt_. For more information, see the
> [official Vue-Router docs](https://router.vuejs.org/) and
> [official Nuxt docs](https://nuxtjs.org/).

## Common router link props

In the following sections, we are using the `<b-link>` component to render router links. `<b-link>`
is the building block of most of BootstrapVue's _actionable_ components. You could use any other
component that supports link generation such as [`<b-link>`](/docs/components/link),
[`<b-button>`](/docs/components/button), [`<b-breadcrumb-item>`](/docs/components/breadcrumb),
[`<b-list-group-item>`](/docs/components/list-group), [`<b-nav-item>`](/docs/components/nav),
[`<b-dropdown-item>`](/docs/components/dropdown), and
[`<b-pagination-nav>`](/docs/components/pagination-nav). Note that not all props are available on
all components. Refer to the respective component documentation for details.

### `to`

- type: `string | Location`
- required to generate a `<router-link>`

Denotes the target route of the link. When clicked, the value of the `to` prop will be passed to
`router.push()` internally, so the value can be either a string or a location descriptor object.

```html
<!-- literal string -->
<b-link to="home">Home</b-link>
<!-- renders to -->
<a href="home">Home</a>

<!-- javascript expression using `v-bind` -->
<b-link v-bind:to="'home'">Home</b-link>

<!-- Omitting `v-bind` is fine, just as binding any other prop -->
<b-link :to="'home'">Home</b-link>

<!-- same as above -->
<b-link :to="{ path: 'home' }">Home</b-link>

<!-- named route -->
<b-link :to="{ name: 'user', params: { userId: 123 }}">User</b-link>

<!-- with query, resulting in `/register?plan=private` -->
<b-link :to="{path:'register', query:{ plan:'private'}}">Register</b-link>

<!-- render a non-router link iby omitting 'to'and specifying an href -->
<b-link href="/home">Home</b-link>
```

### `replace`

- type: `boolean`
- default: `false`

Setting `replace` prop will call `router.replace()` instead of `router.push()` when clicked, so the
navigation will not leave a history record.

```html
<b-link :to="{ path: '/abc'}" replace></b-link>
```

### `append`

- type: `boolean`
- default: `false`

Setting `append` prop always appends the relative path to the current path. For example, assuming we
are navigating from `/a` to a relative link `b`, without `append` we will end up at `/b`, but with
`append` we will end up at `/a/b`.

```html
<b-link :to="{ path: 'relative/path'}" append></b-link>
```

### `router-tag`

- type: `string`
- default: `'a'`

Sometimes we want `<router-link>` to render as another tag, e.g `<li>`. Then we can use `router-tag`
prop to specify which tag to render to, and it will still listen to click events for navigation.
`router-tag` translates to the `tag` prop on the final rendered `<router-link>`.

```html
<b-link to="/foo" router-tag="li">foo</b-link>
<!-- renders as -->
<li>foo</li>
```

**Note:** Changing the tag from anything other than `<a>` is discouraged, as it hinders
accessibility of keyboard and/or screen-reader users, and is also not very SEO friendly.

### `active-class`

- type: `string`
- default: `'router-link-active'` (`'nuxt-link-active'` when using Nuxt.js)

Configure the active CSS class applied when the link is active. Note the default value can also be
configured globally via the `linkActiveClass` router constructor option.

### `exact`

- type: `boolean`
- default: `false`

The default active class matching behavior is **inclusive match**. For example, `<b-link to="/a">`
will get this class applied as long as the current path starts with `/a/` or is `/a`.

One consequence of this is that `<b-link to="/">` will be active for every route! To force the link
into "exact match mode", use the `exact` prop:

```html
<!-- this link will only be active at `/` -->
<b-link to="/" exact></b-link>
```

Check out more examples explaining active link class [live](https://jsfiddle.net/8xrk1n9f/).

### `exact-active-class`

- type: `string`
- default: `'router-link-exact-active'` (`'nuxt-link-exact-active'` when using Nuxt.js)
- availablity: Vue-Router 2.5.0+

Configure the active CSS class applied when the link is active with exact match. Note the default
value can also be configured globally via the `linkExactActiveClass` router constructor option.

## Nuxt specific router link props

When BootstrapVue detects that your app is running under [Nuxt.js](https://nuxtjs.org), it will
render a [`<nuxt-link>`](https://nuxtjs.org/api/components-nuxt-link) sub component instead of a
`<router-link>`. `<nuxt-link>` supports all of the above router link props, plus the following
additional Nuxt specific props.

### `no-prefetch`

- type: `boolean`
- default: `false`
- availablity: Nuxt 2.4.0+

To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within
the viewport, Nuxt.js will automatically prefetch the code splitted page. Setting `no-prefetch` will
disabled this feature for the specific link.

**Note:** If you have prefetching disabled in your `nuxt.config.js` configuration
(`router: { prefetchLinks: false}`), or are using a version of Nuxt.JS `< 2.4.0`, then this prop
will have no effect.

Prefetching support requires
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
to be supported (see [CanIUse](https://caniuse.com/#feat=intersectionobserver)). For browsers that
do not support IntersectionObserver, you can use the following conditional polyfill in
`nuxt.config.js`:

```js
export default {
  head: {
    script: [
      { src: 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver', body: true }
    ]
  }
}
```
