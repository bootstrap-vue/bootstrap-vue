# Router link support

> Several Bootstrap-Vue components support rendering `<router-link>` components compatible with
_Vue-Router_ and _Nuxt_. For more information, see the [official Vue-Router docs](https://router.vuejs.org/)
and [official Nuxt docs](https://nuxtjs.org/).


## Common router link props

In the following sections, we are using the `<b-link>` component to render router links.
`<b-link>` is the building block of most of Bootstrap-Vue's  _actionable_ components.
You could use any other component that supports link generation such as [`<b-link>`](/docs/components/link),
[`<b-button>`](/docs/components/button), [`<b-breadcrumb-item>`](/docs/components/breadcrumb),
[`<b-list-group-item>`](/docs/components/list-group), [`<b-nav-item>`](/docs/components/nav),
[`<b-dropdown-item>`](/docs/components/dropdown), and [`<b-pagination-nav>`](/docs/components/pagination-nav).
Note that not all props are available on all components. Refer to the respective component
documentation for details.


### `to`

- type: `string | Location`
- required to generate a `<router-link>`

Denotes the target route of the link. When clicked, the value of the `to` prop will be passed to
`router.push()` internally, so the value can be either a string or a location descriptor object.

``` html
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

Setting `replace` prop will call `router.replace()` instead of `router.push()` when clicked,
so the navigation will not leave a history record.

``` html
<b-link :to="{ path: '/abc'}" replace></b-link>
```


### `append`

- type: `boolean`
- default: `false`

Setting `append` prop always appends the relative path to the current path. For example,
assuming we are navigating from `/a` to a relative link `b`, without `append` we will end 
up at `/b`, but with `append` we will end up at `/a/b`.

``` html
<b-link :to="{ path: 'relative/path'}" append></b-link>
```


### `router-tag`

- type: `string`
- default: `'a'`

Sometimes we want `<router-link>` to render as another tag, e.g `<li>`. Then we can use `router-tag`
prop to specify which tag to render to, and it will still listen to click events for navigation.
`routr-tag` translates to the `tag` prop on the final rendered `<router-link>`.

``` html
<b-link to="/foo" router-tag="li">foo</b-link>
<!-- renders as -->
<li>foo</li>
```

**Note:** Changing the tag from anything other than `<a>` is discouraged, as it hinders accessibility
of keyboard and/or screen-reader users, and is also not very SEO friendly.


### `active-class`

- type: `string`
- default: `'router-link-active'`

Configure the active CSS class applied when the link is active. Note the default value can also
be configured globally via the `linkActiveClass` router constructor option.

### `exact`

- type: `boolean`
- default: `false`

The default active class matching behavior is **inclusive match**. For example, `<b-link to="/a">`
will get this class applied as long as the current path starts with `/a/` or is `/a`.

One consequence of this is that `<b-link to="/">` will be active for every route! To force the
link into "exact match mode", use the `exact` prop:

``` html
<!-- this link will only be active at `/` -->
<b-link to="/" exact>
```

Check out more examples explaining active link class [live](https://jsfiddle.net/8xrk1n9f/).


### `exact-active-class`

- type: `string`
- default: `'router-link-exact-active'`
- availablity: Vue-Router 2.5.0+

Configure the active CSS class applied when the link is active with exact match. Note the
default value can also be configured globally via the `linkExactActiveClass` router constructor option.

