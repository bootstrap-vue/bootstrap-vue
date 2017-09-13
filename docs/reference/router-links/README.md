# Router link support
> Several Bootstrap-Vue componets support rendering `<router-link>` components. Form
more information on Vue-Router, see the official [Vue-Router Docs](https://router.vuejs.org/)

## Common router link props

In the following sections, we are using hte `<b-link>` component to render router links.
You could use any other component that support link generation such as `<b-button>`,
`<b-breadcrumb>`, `<b-list-item>`, `<b-nav-item>`, `<b-dropdown-item>`, etc.  Note that
not all props are available on all components. Refer to ther respective component
documentation for details.

### Props

- **to**

  - type: `string | Location`

  - required

  Denotes the target route of the link. When clicked, the value of the `to` prop will be passed to `router.push()` internally, so the value can be either a string or a location descriptor object.

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
  <b-link :to="{ path: 'register', query: { plan: 'private' }}">Register</b-link>
  ```


- **replace**

  - type: `boolean`

  - default: `false`

  Setting `replace` prop will call `router.replace()` instead of `router.push()` when clicked,
  so the navigation will not leave a history record.

  ``` html
  <b-link :to="{ path: '/abc'}" replace></b-link>
  ```


- **append**

  - type: `boolean`

  - default: `false`

  Setting `append` prop always appends the relative path to the current path. For example,
  assuming we are navigating from `/a` to a relative link `b`, without `append` we will end 
  up at `/b`, but with `append` we will end up at `/a/b`.

  ``` html
  <b-link :to="{ path: 'relative/path'}" append></b-link>
  ```


- **router-tag**

  - type: `string`

  - default: `"a"`

  Sometimes we want `<router-link>` to render as another tag, e.g `<li>`. Then we can use `router-tag`
  prop to specify which tag to render to, and it will still listen to click events for navigation.

  ``` html
  <b-link to="/foo" tag="li">foo</b-link>
  <!-- renders as -->
  <li>foo</li>
  ```
  
  **Note:** Changing the tag from anything other than `<a>` is discouraged, as it hinders accessibility
  of keyboard and/or screen-reader users, and is also not very SEO friendly.


- **active-class**

  - type: `string`

  - default: `"router-link-active"`

  Configure the active CSS class applied when the link is active. Note the default value can also
  be configured globally via the `linkActiveClass` router constructor option.

- **exact**

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

- **exact-active-class**

  _Vue-Router 2.5.0+_

  - type: `string`

  - default: `"router-link-exact-active"`

  Configure the active CSS class applied when the link is active with exact match. Note the
  default value can also be configured globally via the `linkExactActiveClass` router constructor option.

### Applying Active Class to Outer Element

Sometimes we may want the active class to be applied to an outer element rather than the `<a>` tag
itself, in that case, you can render that outer element using `<router-link>` and wrap the raw `<a>` tag inside:

``` html
<router-link tag="li" to="/foo">
  <a>/foo</a>
</router-link>
```

In this case the `<a>` will be the actual link (and will get the correct `href`), but the active class will
be applied to the outer `<li>`.

