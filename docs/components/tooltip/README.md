# Tooltips

> Easily add tooltips to elements or components via the `<b-tooltip>` component or
`<v-b-tooltip>` directive (preferred method).


## `<b-tooltip>` Component Usage

```html
<div class="text-center pt-5">

  <b-btn id="exButton1" variant="outline-success">Live chat</b-btn>

  <b-btn id="exButton2" variant="outline-success">Html chat</b-btn>

  <b-tooltip target-id="exButton1" content="Online!"></b-tooltip>

  <b-tooltip target-id="exButton2">
    Hello <strong>World!</strong>
  </b-tooltip>

</div>

<!-- tooltip-1.vue -->
```

**Note:** _The `<b-tooltip` component inserts a hidden (`display:none`) `<div>` container
element at the point in the DOM where the `<b-tooltip>` component is placed.  This may 
affect layout and/or styling of components such as `<b-button-group>`, `<b-button-toolbar>`,
and `<b-input-group>`. To avoid these posible layout issues, place the `<b-tooltip>`
component **outside** of these types of components._


## `v-b-tooltip` Directive Usage

```html
<div class="text-center pt-5">

  <b-btn v-b-tooltip title="Online!" variant="outline-success">Live chat</b-btn>

  <b-btn v-b-tooltip.html="'Hello <strong>World!</strong>'" variant="outline-success">Html chat</b-btn>

</div>

<!-- tooltip-2.vue -->
```

Refer to the [`v-b-tooltip` documentation](/docs/directives/tooltip) for more information on
using the directive format
