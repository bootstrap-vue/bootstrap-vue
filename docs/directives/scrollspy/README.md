# ScrollSpy

> Directive `v-b-scrollspy` applied to the `b-nav` or `b-navbar` element(s) that you want to have nav-links shown as `active`
based on the scrolling of another element (i.e. `body`).

```html
<template>
<div id='spy-container' style="max-height: 500px; overflow-y: scroll">
<b-navbar v-b-scrollspy:spy-container="{offset:0, method:'auto'}" sticky="top" class="bg-faded" id="navbar-example">
    <b-link class="navbar-brand" href="#">
      <span>BootstrapVue <small>(Scrolling on body)</small></span>
    </b-link>
    <b-nav pills>
      <b-nav-item href="#fat">@fat</b-nav-item>
      <b-nav-item href="#mdo">@mdo</b-nav-item>
      <b-nav-item-dropdown text="Dropdown 1,2,3" right-alignment>
        <b-dropdown-item href="#one">one</b-dropdown-item>
        <b-dropdown-item href="#two">two</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#three">three</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin scelerisque augue, sit amet finibus risus tempus quis. Suspendisse id est faucibus, dignissim arcu non, consequat tortor. Pellentesque mollis dolor vitae tellus consectetur
    auctor. Nam tincidunt ullamcorper tortor, a pretium tellus efficitur nec. Integer velit enim, mattis et sapien in, blandit pharetra nisi. Suspendisse euismod tortor ac tellus varius, a suscipit sapien viverra. Curabitur non nunc euismod, facilisis
    nulla a, auctor elit. Duis in est id augue scelerisque aliquam. Proin mollis dolor augue, nec pellentesque felis maximus nec.
  </p>
  <div id="scrollspy-example">

    <h4 id="fat">@fat</h4>
    <p v-for="i in 4">Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater
      lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
    <h4 id="mdo">@mdo</h4>
    <p v-for="i in 4">Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard. Freegan beard aliqua cupidatat mcsweeney's vero. Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck, mcsweeney's quis non freegan vinyl.
      Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation quis gentrify. Brooklyn adipisicing craft beer vice keytar deserunt.</p>
    <h4 id="one">one</h4>
    <p v-for="i in 5">Occaecat commodo aliqua delectus. Fap craft beer deserunt skateboard ea. Lomo bicycle rights adipisicing banh mi, velit ea sunt next level locavore single-origin coffee in magna veniam. High life id vinyl, echo park consequat quis aliquip banh mi
      pitchfork. Vero VHS est adipisicing. Consectetur nisi DIY minim messenger bag. Cred ex in, sustainable delectus consectetur fanny pack iphone.</p>
  </div>
</div>
</template>

<!-- scrollspy.vue ->
```

**Note:** The directive is applied backwards compared to native Bootstrap V4. In **Bootstrap-Vue** the `v-b-scrollspy` directive
is applied to the target element that has the nav-links, and the option(s) specify the element to monitor scrolling on.

## Usage
Assume body is the scroll element, and use default offset of 10 pixels
```html
<b-nav v-b-scrollspy>
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>

```

Assume body is the scroll element, and use offset of 20 pixels
```html
<b-nav v-b-scrollspy="20">
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Element with ID #foo is the scroll element, and use default offset of 10 pixels
```html
<b-nav v-b-scrollspy:foo>
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Element #foo is the scroll element, and use offset of 20 pixels
```html
<b-nav v-b-scrollspy:foo="20">
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Element  #foo is the scroll element, and use offset of 25 pixels
```html
<b-nav v-b-scrollspy:foo.25>
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Element #foo is the scroll element, and use default offset of 10 pixels (note single quotes around value)
```html
<b-nav v-b-scrollspy="'#foo'">
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

Pass object as config element can be a CSS ID (i.e `#foo`), a CSS selector (i.e. `body`), or a node reference
```html
<b-nav v-b-scrollspy="{element: '#id', offset: 50}">
  <b-nav-item href="#bar">Foo</b-nav-item>
  <b-nav-item href="#baz">Bar</b-nav-item>
</b-nav>
```

## Config notes
- If scroll element is not present, then we assume scrolling on `body`
- If scroll element is a CSS selector, the first found element is chosen
- If scroll element is not found, then ScrollSpy silently does nothing

## Directive syntax
```
v-b-scrollspy:arg.mod1.mod2="option"
```
Where:
- `arg` is the ID (minus the `#`) of the element to monitor scrolling on. Optional (defaults to `body`. Can be overridden by the option or option after the `=`
- `mod1` & `mod2` can be an `offset` number or string `method` (see below). Order of the modifiers is not important. Both are optional
- `option` can be a string identifying the `element` to monitor scrolling on, a numeric `offset`, or a configuration object (see below). Optional

## Config object properties
```
config = {
  element: <css-string|element-ref>,
  offset: <number>,
  method: <string: auto|position|offset>,
  throttle: <number>
}
```

### `element`
- Element to be monitored for scrolling. defaults to `body`. can be an ID (`#foo`), a css Selector (`#foo div`), or a reference to an element node. If a CSS string, then the first matching element is used. if an ID is used it must start with `#`

### `offset`
- offset from top of scrolling viewport before triggering active state.
- number of pixels
Default: `10`

### `method`
method for calculating target offsets.
 - `auto` will choose `offset` if  scroll element is `body`, else the method is `position`
 - `position` will calculate target offsets relative to the scroll container.
 - `offset` will calculate the target offsets relative to the top of the window/viewport
Default: `auto`

### `throttle`
- Timeout in ms for resize events to stop firing before recalculating offsets.
Default: 200

If args/modifiers and a value (object or number) is passed, the value takes precedence over the arg and modifiers

If any of the options are invalid types, then an error is written to the console.

## Events
Whenever a target is activated, the event `scrollspy::activate` is emitted on `$root` with the
targets HREF (ID) as the argument (i.e. `#bar`)

```js
new Vue({
  el: '#app',
  methods: {
  	onActivate(target) {
    	console.log('Receved Event: scrollspy::activate for target ', target);
    }
  },
  created() {
  	this.$root.$on('scrollspy::activate', this.onActivate);
  }
})
```
