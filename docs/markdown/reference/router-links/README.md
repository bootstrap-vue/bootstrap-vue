# Router link support

> Several BootstrapVue components support rendering `<router-link>` components compatible with _Vue
> Router_ and _Nuxt.js_. For more information, see the
> [official Vue Router docs](https://router.vuejs.org/) and
> [official Nuxt.js docs](https://nuxtjs.org/).

## Common router link props

In the following sections, we are using the `<b-link>` component to render router links. `<b-link>`
is the building block of most of BootstrapVue's _actionable_ components. You could use any other
component that supports link generation such as [`<b-link>`](/docs/components/link),
[`<b-button>`](/docs/components/button), [`<b-avatar>`](/docs/components/avatar),
[`<b-breadcrumb-item>`](/docs/components/breadcrumb),
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
<div>
  <!-- Literal string -->
  <b-link to="home">Home</b-link>
  <!-- Renders to -->
  <a href="home">Home</a>

  <!-- JavaScript expression using `v-bind` -->
  <b-link v-bind:to="'home'">Home</b-link>

  <!-- Omitting `v-bind` is fine, just as binding any other prop -->
  <b-link :to="'home'">Home</b-link>

  <!-- Same as above -->
  <b-link :to="{ path: 'home' }">Home</b-link>

  <!-- Named route -->
  <b-link :to="{ name: 'user', params: { userId: 123 } }">User</b-link>

  <!-- With query, resulting in `/register?plan=private` -->
  <b-link :to="{ path: 'register', query: { plan: 'private' } }">Register</b-link>

  <!-- Render a non-router link by omitting `to` and specifying an `href` -->
  <b-link href="/home">Home</b-link>
</div>
```

### `replace`

- type: `boolean`
- default: `false`

Setting `replace` prop will call `router.replace()` instead of `router.push()` when clicked, so the
navigation will not leave a history record.

```html
<div>
  <b-link :to="{ path: '/abc'}" replace></b-link>
</div>
```

### `append`

- type: `boolean`
- default: `false`

Setting `append` prop always appends the relative path to the current path. For example, assuming we
are navigating from `/a` to a relative link `b`, without `append` we will end up at `/b`, but with
`append` we will end up at `/a/b`.

```html
<div>
  <b-link :to="{ path: 'relative/path'}" append></b-link>
</div>
```

### `router-tag`

- type: `string`
- default: `'a'`

Sometimes we want `<router-link>` to render as another tag, e.g `<li>`. Then we can use `router-tag`
prop to specify which tag to render to, and it will still listen to click events for navigation.
`router-tag` translates to the `tag` prop on the final rendered `<router-link>`.

```html
<div>
  <b-link to="/foo" router-tag="li">foo</b-link>

  <!-- Renders as -->
  <li>foo</li>
</div>
```

**Note:** Changing the tag from anything other than `<a>` is discouraged, as it hinders
accessibility of keyboard and/or screen-reader users, and is also not very SEO friendly.

### `active-class`

- type: `string`
- default: `'router-link-active'` (`'nuxt-link-active'` when using Nuxt.js)

Configure the active CSS class applied when the link is active. Note the default value can also be
configured globally via the `linkActiveClass`
[router constructor option](https://router.vuejs.org/api/#linkactiveclass).

With components that support router links (have a `to` prop), you will want to set this to the class
`'active'` (or a space separated string that includes `'active'`) to apply Bootstrap's active
styling on the component when the current route matches the `to` prop.

### `exact`

- type: `boolean`
- default: `false`

The default active class matching behavior is **inclusive match**. For example, `<b-link to="/a">`
will get this class applied as long as the current path starts with `/a/` or is `/a`.

One consequence of this is that `<b-link to="/">` will be active for every route! To force the link
into "exact match mode", use the `exact` prop:

```html
<div>
  <!-- This link will only be active at `/` -->
  <b-link to="/" exact></b-link>
</div>
```

Check out more examples explaining active link class [live](https://jsfiddle.net/8xrk1n9f/).

### `exact-active-class`

- type: `string`
- default: `'router-link-exact-active'` (`'nuxt-link-exact-active'` when using Nuxt.js)
- availability: Vue Router 2.5.0+

Configure the active CSS class applied when the link is active with exact match. Note the default
value can also be configured globally via the `linkExactActiveClass`
[router constructor option](https://router.vuejs.org/api/#linkexactactiveclass).

With components that support router links (have a `to` prop), you will want to set this to the class
`'active'` (or a space separated string that includes `'active'`) to apply Bootstrap's active
styling on the component when the current route matches the `to` prop.

### `exact-path`

- type: `boolean`
- default: `false`
- availability: Vue Router 3.5.0+

Allows matching only using the `path` section of the url, effectively ignoring the `query` and the
`hash` sections.

```html
<!-- this link will also be active at `/search?page=2` or `/search#filters` -->
<router-link to="/search" exact-path> </router-link>
```

### `exact-path-active-class`

- type: `string`
- default: `'router-link-exact-path-active'`
- availability: Vue Router 3.5.0+

Configure the active CSS class applied when the link is active with exact path match. Note the
default value can also be configured globally via the `linkExactPathActiveClass` router constructor
option.

With components that support router links (have a `to` prop), you will want to set this to the class
`'active'` (or a space separated string that includes `'active'`) to apply Bootstrap's active
styling on the component when the current route matches the `to` prop.

## Nuxt.js specific router link props

When BootstrapVue detects that your app is running under [Nuxt.js](https://nuxtjs.org), it will
render a [`<nuxt-link>`](https://nuxtjs.org/api/components-nuxt-link) sub component instead of a
`<router-link>`. `<nuxt-link>` supports all of the above router link props, plus the following
additional Nuxt.js specific props.

### `prefetch`

- type: `boolean`
- default: `null`
- availability: Nuxt.js 2.10.0+ and BootstrapVue 2.15.0+

To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within
the viewport, Nuxt.js will automatically prefetch the code splitted page. Setting `prefetch` to
`true` or `false` will overwrite the default value of `router.prefetchLinks` configured in the
`nuxt.config.js` configuration file.

**Notes:**

- If you have are using a version of Nuxt.js `< 2.10.0`, then this prop will have no effect.
- Remember to `v-bind` the prop value (e.g. `:prefetch="true"` or `:prefetch="false"`).

Prefetching support requires
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
to be supported (see [Can I use](https://caniuse.com/intersectionobserver)). For browsers that do
not support IntersectionObserver, you can use the following conditional polyfill in
`nuxt.config.js`:

```js
export default {
  head: {
    script: [
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver',
        body: true
      }
    ]
  }
}
```

### `no-prefetch`

- type: `boolean`
- default: `false`
- availability: Nuxt.js 2.4.0+

To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within
the viewport, Nuxt.js will automatically prefetch the code splitted page. Setting `no-prefetch` will
disabled this feature for the specific link.

**Note:** If you have prefetching disabled in your `nuxt.config.js` configuration
(`router: { prefetchLinks: false }`), or are using a version of Nuxt.js `< 2.4.0`, then this prop
will have no effect.

## Third-party router link support

<span class="badge badge-info small">v2.15.0+</span>

BootstrapVue auto detects using `<router-link>` and `<nuxt-link>` link components. Some 3rd party
frameworks also provide customized versions of `<router-link>`, such as
[Gridsome's `<g-link>` component](https://gridsome.org/docs/linking/). BootstrapVue can support
these third party `<router-link>` compatible components via the use of the `router-component-name`
prop. All `vue-router` props (excluding `<nuxt-link>` specific props) will be passed to the
specified router link component.

**Notes:**

- The 3rd party component will only be used when the `to` prop is set.
- Not all 3rd party components support all props supported by `<router-link>`, nor do not support
  fully qualified domain name URLs, nor hash only URLs. Refer to the 3rd party component
  documentation for details.

### `router-component-name`

- type: `string`
- default: `undefined`
- availability: BootstrapVue 2.15.0+

Set this prop to the name of the `<router-link>` compatible component, e.g. `'g-link'` for
[Gridsome](https://gridsome.org/).

If left at the default, BootstrapVue will automatically select `<router-link>` or `<nuxt-link>`.
