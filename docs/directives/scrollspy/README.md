# ScrollSpy

> Automatically update Bootstrap navigation or list group components based on scroll
position to indicate which link is currently active in the viewport.

## How it works

The `v-b-scrollspy` directive has a few requirements to function properly:

- It must be applied on the element/component containing the `<b-nav>` or `<b-list-group>`
component(s) where you want to indicate which link is currently active.
- Scrollspy requires `position: relative;` on the element you're spying on, usually the `<body>`.
- When spying on elements other than the `<body>`, be sure to have a `height` set and
`overflow-y: scroll;` applied.
- Anchors (`<a>`, `<b-nav-item>`, `<b-dropdown-item>`, `<b-list-group-item>`) are required and
must have an `href` that points to an element with that id in teh container you are spying on.

When successfully implemented, your nav or list group will update accordingly, moving
the `active` state from one item to the next based on their associated targets.

**Note:** The directive is applied backwards compared to native Bootstrap V4.
In **Bootstrap-Vue** the `v-b-scrollspy` directive is applied to the target
element that has the links to be activated, and the options specify which element to
monitor scrolling on.

The directive an be applied to any containing element or component that has `<nav-item>`,
`<b-dropdown-item>`, `<b-list-group-item>` (or `<a>` tags with the apropriate classes),
a long as tehy haev `href` attributes that point to elements with the respective `id`s
in the scrolling element.

## Example using `<b-nav>`
Using `v-b-scrollspy` on a `<b-nav>` component to monitor the scrolling on `<b-card-body>`.

```html
<template> 
  <b-card no-body>
    <b-nav pills slot="header" v-b-scrollspy:nav-scroller>
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
    <b-card-body id="nav-scroller"
         ref="content"
         style="position:relative; height:300px; overflow-y:scroll;">
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
</template>

<script>
export default {
  methods: {
    // Convenience method to scroll a heading into view.
    // Not required for scrollspy to work
    scrollIntoView(evt) {
      evt.preventDefault();
      const href = evt.target.getAttribute('href');
      const el = href ? document.querySelector(href) : null;
      if (el) {
        this.$refs.content.scrollTop = el.offsetTop;
      }
    }
  },
  data: {
    text: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
      sollicitudin scelerisque augue, sit amet finibus risus tempus quis.
      Suspendisse id est faucibus, dignissim arcu non, consequat tortor.
      Pellentesque mollis dolor vitae tellus consectetur auctor. Nam tincidunt
      ullamcorper tortor, a pretium tellus efficitur nec. Integer velit enim,
      mattis et sapien in, blandit pharetra nisi. Suspendisse euismod tortor
      ac tellus varius, a suscipit sapien viverra. Curabitur non nunc euismod,
      facilisis nulla a, auctor elit. Duis in est id augue scelerisque
      aliquam. Proin mollis dolor augue, nec pellentesque felis maximus nec.
    `
  }
}
</script>

<!-- scrollspy-nav-1.vue -->
```

## Example with `<b-list-group>`

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
        <div id="listgroup-ex" style="position:relative;overflow-y:auto;height:300px">
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
  data: {
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
</script>
<!-- scrollspy-listgroup-1.vue -->
```

## Directive syntax

```
v-b-scrollspy:arg.mod1.mod2="option"
```
Where:
- `arg` is the ID (minus the `#`) of the element to monitor scrolling on. Optional
(defaults to `body`. Can be overridden by `option`
- `mod1` & `mod2` can be an `offset` number or string `method` (see below). Order of
the modifiers is not important. Both are optional
- `option` can be a string identifying the `element` to monitor scrolling on,
a numeric `offset`, or a configuration object (see below). Optional

### Config object properties
```
config = {
  element: <css-string|element-ref|component-ref>,
  offset: <number>,
  method: <string: auto|position|offset>,
  throttle: <number>
}
```

| Property | Type | Default | Description
| -------- | ---- | ------- | -----------
| `element` | String or Reference | `'body'` | Element to be monitored for scrolling. Can be an ID (`#foo`), a css Selector (`#foo div`), or a reference to an element/component node. If a CSS string, then the first matching element is used. If an ID is used it must start with `#`.
| `offset` | Number | `10` | offset (in pixels) from top of scrolling viewport before triggering active state.
| `method` | String | `auto` | `position` will calculate target offsets relative to the scroll container. `offset` will calculate the target offsets relative to the top of the window/viewport. `auto` will choose `offset` if  scroll element is `body`, else the method is `position`.
| `throttle` | Number | `100` | Timeout in `ms` for resize events to stop firing before recalculating offsets.

If args/modifiers and a value (object or number) is passed, the value takes precedence over the arg and modifiers.

If any of the options are invalid types, then an error is written to the console.

### Config notes
- If scroll element is not present, then we assume scrolling on `<body>`
- If scroll element is a CSS selector, the first found element is chosen
- If scroll element is not found, then ScrollSpy silently does nothing

**Important! Requires relative positioning**
No matter the implementation method, scrollspy requires the use of
`position: relative;` on the element you’re scrolling on. In most cases this
is the `<body>`. When scrollspying on elements other than the <body>, be 
sure to have a CSS `height` set and `overflow-y: scroll;` applied.


### Directive use examples
Assume `<body>` is the scroll element, and use default offset of 10 pixels
```html
<b-nav v-b-scrollspy>
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Assume `<body>` is the scroll element, and use offset of 20 pixels
```html
<b-nav v-b-scrollspy="20">
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Element with ID `#foo` is the scroll element, and use default offset of 10 pixels
```html
<b-nav v-b-scrollspy:foo>
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Element `#foo` is the scroll element, and use offset of 20 pixels
```html
<b-nav v-b-scrollspy:foo="20">
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Element  `#foo` is the scroll element, and use offset of 25 pixels
```html
<b-nav v-b-scrollspy:foo.25>
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Element `#foo` is the scroll element, and use default offset of 10 pixels
(note single quotes around value)
```html
<b-nav v-b-scrollspy="'#foo'">
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Pass object as config. `element` can be a CSS ID (i.e `#foo`), a CSS
selector (i.e. `body`), or a node reference
```html
<b-nav v-b-scrollspy="{element: '#id', offset: 50}">
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

### Events
Whenever a target is activated, the event `bv:scrollspy::activate` is emitted on
`$root` with the targets HREF (ID) as the argument (i.e. `#bar`)

```js
new Vue({
  el: '#app',
  methods: {
  	onActivate(target) {
    	console.log('Receved Event: scrollspy::activate for target ', target);
    }
  },
  created() {
  	this.$root.$on('bv::scrollspy::activate', this.onActivate);
  }
})
```
