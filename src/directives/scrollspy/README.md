# ScrollSpy

> Automatically update Bootstrap navigation or list group components based on scroll position to
> indicate which link is currently active in the viewport.

## How it works

The `v-b-scrollspy` directive has a few requirements to function properly:

- It must be applied on the element/component containing the `<b-nav>` or `<b-list-group>`
  component(s) where you want to indicate which link is currently active.
- Scrollspy requires `position: relative;` on the element you're spying on, usually the `<body>`.
- When spying on elements other than the `<body>`, be sure to have a `height` set and
  `overflow-y: scroll;` applied.
- Anchors (`<a>`, `<b-nav-item>`, `<b-dropdown-item>`, `<b-list-group-item>`) are required and must
  have an `href` (either via the `href` or `to` props) that points to an element with that `id` in
  the container you are spying on. When using the `to` prop, either set the `path` ending with
  `#id-of-element`, or set the location property `hash` to `#id-of-element`.

When successfully implemented, your nav or list group will update accordingly, moving the `active`
state from one item to the next based on their associated targets.

### Example using navs

Using `v-b-scrollspy` on a `<b-nav>` component to monitor the scrolling on `<b-card-body>`. Scroll
the area below the navbar and watch the active class change. The dropdown items will be highlighted
as well.

```html
<template>
  <div>
    <b-card no-body>
      <b-nav pills card-header slot="header" v-b-scrollspy:nav-scroller>
        <b-nav-item href="#fat" @click="scrollIntoView">@fat</b-nav-item>
        <b-nav-item href="#mdo" @click="scrollIntoView">@mdo</b-nav-item>
        <b-nav-item-dropdown text="Dropdown 1,2,3" right-alignment>
          <b-dropdown-item href="#one" @click="scrollIntoView">one</b-dropdown-item>
          <b-dropdown-item href="#two" @click="scrollIntoView">two</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#three" @click="scrollIntoView">three</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="#pi0" @click="scrollIntoView">@pi0</b-nav-item>
      </b-nav>

      <b-card-body
        id="nav-scroller"
        ref="content"
        style="position:relative; height:300px; overflow-y:scroll;"
      >
        <p>{{ text }}</p>
        <h4 id="fat">@fat</h4>
        <p v-for="i in 3">{{ text }}</p>
        <h4 id="mdo">@mdo</h4>
        <p v-for="i in 3">{{ text }}</p>
        <h4 id="one">one</h4>
        <p v-for="i in 2">{{ text }}</p>
        <h4 id="two">two</h4>
        <p>{{ text }}</p>
        <h4 id="three">three</h4>
        <p v-for="i in 2">{{ text }}</p>
        <h4 id="pi0">@pi0</h4>
        <p v-for="i in 3">{{ text }}</p>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  export default {
    methods: {
      // Convenience method to scroll a heading into view.
      // Not required for scrollspy to work
      scrollIntoView(event) {
        event.preventDefault()
        const href = event.target.getAttribute('href')
        const el = href ? document.querySelector(href) : null
        if (el) {
          this.$refs.content.scrollTop = el.offsetTop
        }
      }
    },
    data() {
      return {
        text: `
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.
        `
      }
    }
  }
</script>

<!-- b-scrollspy-nav.vue -->
```

### Example using nested navs

Scrollspy also works with nested `<b-nav>`. If a nested `<b-nav-item>` is active, its parent()s will
also be active. Scroll the area next to the navbar and watch the active class change.

```html
<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4">
        <b-navbar v-b-scrollspy:scrollspy-nested class="flex-column">
          <b-navbar-brand href="#">Navbar</b-navbar-brand>
          <b-nav pills vertical>
            <b-nav-item href="#item-1">Item 1</b-nav-item>
            <b-nav pills vertical>
              <b-nav-item class="ml-3 my-1" href="#item-1-1">Item 1-1</b-nav-item>
              <b-nav-item class="ml-3 my-1" href="#item-1-2">Item 1-2</b-nav-item>
            </b-nav>
            <b-nav-item href="#item-2">Item 2</b-nav-item>
            <b-nav-item href="#item-3">Item 3</b-nav-item>
            <b-nav pills vertical>
              <b-nav-item class="ml-3 my-1" href="#item-3-1">Item 3-1</b-nav-item>
              <b-nav-item class="ml-3 my-1" href="#item-3-2">Item 3-2</b-nav-item>
            </b-nav>
          </b-nav>
        </b-navbar>
      </b-col>

      <b-col cols="8">
        <div id="scrollspy-nested" style="position:relative; height:350px; overflow-y:auto">
          <h4 id="item-1" style="">Item 1</h4>
          <p>{{ text }}</p>
          <h5 id="item-1-1" style="">Item 1-1</h5>
          <p>{{ text }}</p>
          <h5 id="item-1-2" style="">Item 2-2</h5>
          <p>{{ text }}</p>
          <h4 id="item-2" style="">Item 2</h4>
          <p>{{ text }}</p>
          <h4 id="item-3" style="">Item 3</h4>
          <p>{{ text }}</p>
          <h5 id="item-3-1" style="">Item 3-1</h5>
          <p>{{ text }}</p>
          <h5 id="item-3-2" style="">Item 3-2</h5>
          <p>{{ text }}</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        text: `
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.
        `
      }
    }
  }
</script>

<!-- b-scrollspy-nested.vue -->
```

### Example using list group

Scrollspy also works with `<b-list-group>` when it contains `<b-list-group-item>`s that have a
_local_ `href` or `to`. Scroll the area next to the list group and watch the active state change.

```html
<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4">
        <b-list-group v-b-scrollspy:listgroup-ex>
          <b-list-group-item href="#list-item-1">Item 1</b-list-group-item>
          <b-list-group-item href="#list-item-2">Item2</b-list-group-item>
          <b-list-group-item href="#list-item-3">Item 3</b-list-group-item>
          <b-list-group-item href="#list-item-4">Item 4</b-list-group-item>
          <b-list-group-item href="#list-item-5">Item 5</b-list-group-item>
        </b-list-group>
      </b-col>

      <b-col cols="8">
        <div id="listgroup-ex" style="position:relative; overflow-y:auto; height:300px">
          <h4 id="list-item-1">Item 1</h4>
          <p>{{ text }}</p>
          <h4 id="list-item-2">Item 2</h4>
          <p>{{ text }}</p>
          <h4 id="list-item-3">Item 3</h4>
          <p>{{ text }}</p>
          <h4 id="list-item-4">Item 4</h4>
          <p>{{ text }}</p>
          <h4 id="list-item-5">Item 5</h4>
          <p>{{ text }}</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        text: `
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.
        `
      }
    }
  }
</script>

<!-- b-scrollspy-listgroup.vue -->
```

## Using scrollspy on components with the `to` prop

When Vue Router (or Nuxt.js) is used, and you are generating your links with the `to` prop, use one
of the following methods to generate the appropriate `href` on the rendered link:

```html
<!-- using a string path -->
<b-nav-item to="#id-of-element">link text</b-nav-item>

<!-- using a router `to` location object -->
<b-nav-item :to="{ hash: '#id-of-element' }">link text</b-nav-item>
```

Scrollspy works with both `history` and `hash` routing modes, as long as the generated URL ends with
`#id-of-element`.

## Directive syntax and usage

```
v-b-scrollspy:arg.mod1.mod2="option"
```

Where:

- `arg` is the ID (minus the `#`) of the element to monitor scrolling on. Optional (defaults to
  `body`. Can be overridden by `option`)
- `mod1` & `mod2` can be an `offset` number or string `method` (see config object below). Order of
  the modifiers is not important. Both are optional
- `option` can be a string identifying the `element` to monitor scrolling on, a numeric `offset`, or
  a configuration object (see below). Optional

**Note:** The directive is applied backwards compared to native Bootstrap v4. In **BootstrapVue**
the `v-b-scrollspy` directive is applied to the target element that has the links to be activated,
and the arg or option specifies which element to monitor (spy) scrolling on.

The directive an be applied to any containing element or component that has `<nav-item>`,
`<b-dropdown-item>`, `<b-list-group-item>` (or `<a>` tags with the appropriate classes), a long as
they have rendered `href` attributes that point to elements with the respective `id`s in the
scrolling element.

### Config object properties

<!-- eslint-disable no-unused-vars -->

```js
const config = {
  element: 'body',
  offset: 10,
  method: 'auto',
  throttle: 100
}
```

| Property   | Type                | Default  | Description                                                                                                                                                                                                                                               |
| ---------- | ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element`  | String or Reference | `'body'` | Element to be monitored for scrolling. Can be an ID (`#foo`), a css Selector (`#foo div`), or a reference to an element/component node. If a CSS string, then the first matching element is used. If an ID is used it must start with `#`.                |
| `offset`   | Number              | `10`     | offset (in pixels) from top of scrolling viewport before triggering active state.                                                                                                                                                                         |
| `method`   | String              | `'auto'` | `position` will calculate target offsets relative to the scroll container. `offset` will calculate the target offsets relative to the top of the window/viewport. `auto` will choose `offset` if scroll element is `body`, else the method is `position`. |
| `throttle` | Number              | `100`    | Timeout in `ms` for resize events to stop firing before recalculating offsets.                                                                                                                                                                            |

If args/modifiers and a value (object or number) is passed, the value takes precedence over the arg
and modifiers.

If any of the options are invalid types, then an error is written to the console.

### Config notes

- If scroll element is not present, then we assume scrolling on `<body>`
- If scroll element is a CSS selector, the first found element is chosen
- If scroll element is not found, then ScrollSpy silently does nothing

**Important! Requires relative positioning** No matter the implementation method, scrollspy requires
the use of `position: relative;` on the element you're scrolling on. In most cases this is the
`<body>`. When scrollspying on elements other than the `<body>`, be sure to have a CSS `height` set
and `overflow-y: scroll;` applied.

### Directive use examples

Assume `<body>` is the scroll element, and use default offset of 10 pixels

```html
<div>
  <b-nav v-b-scrollspy>
    <b-nav-item href="#bar">Foo</b-nav-item>
    <b-nav-item href="#baz">Bar</b-nav-item>
  </b-nav>
</div>
```

Assume `<body>` is the scroll element, and use offset of 20 pixels

```html
<div>
  <b-nav v-b-scrollspy="20">
    <b-nav-item href="#bar">Foo</b-nav-item>
    <b-nav-item href="#baz">Bar</b-nav-item>
  </b-nav>
</div>
```

Element with ID `#foo` is the scroll element, and use default offset of 10 pixels

```html
<div>
  <b-nav v-b-scrollspy:foo>
    <b-nav-item href="#bar">Foo</b-nav-item>
    <b-nav-item href="#baz">Bar</b-nav-item>
  </b-nav>
</div>
```

Element `#foo` is the scroll element, and use offset of 20 pixels

```html
<div>
  <b-nav v-b-scrollspy:foo="20">
    <b-nav-item href="#bar">Foo</b-nav-item>
    <b-nav-item href="#baz">Bar</b-nav-item>
  </b-nav>
</div>
```

Element `#foo` is the scroll element, and use offset of 25 pixels

```html
<div>
  <b-nav v-b-scrollspy:foo.25>
    <b-nav-item href="#bar">Foo</b-nav-item>
    <b-nav-item href="#baz">Bar</b-nav-item>
  </b-nav>
</div>
```

Element `#foo` is the scroll element, and use default offset of 10 pixels (note single quotes around
value)

```html
<div>
  <b-nav v-b-scrollspy="'#foo'">
    <b-nav-item href="#bar">Foo</b-nav-item>
    <b-nav-item href="#baz">Bar</b-nav-item>
  </b-nav>
</div>
```

Pass object as config. `element` can be a CSS ID (i.e `#foo`), a CSS selector (i.e. `body`), or a
node reference

```html
<div>
  <b-nav v-b-scrollspy="{element: '#id', offset: 50}">
    <b-nav-item href="#bar">Foo</b-nav-item>
    <b-nav-item href="#baz">Bar</b-nav-item>
  </b-nav>
</div>
```

## Events

Whenever a target is activated, the event `bv:scrollspy::activate` is emitted on `$root` with the
target's ID as the argument (i.e. `#bar`)

<!-- eslint-disable no-unused-vars -->

```js
const app = new Vue({
  el: '#app',
  created() {
    this.$root.$on('bv::scrollspy::activate', this.onActivate)
  },
  methods: {
    onActivate(target) {
      console.log('Received event: "bv::scrollspy::activate" for target ', target)
    }
  }
})
```

<!-- Directive reference section auto generated from directive package.json -->
