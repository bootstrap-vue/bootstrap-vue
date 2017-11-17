# Tooltips

> Easily add tooltips to elements or components via the `<b-tooltip>` component or
[`v-b-tooltip`](/docs/directives/tooltip) directive (preferred method).

```html
<div class="text-center my-3">
  <b-btn v-b-tooltip.hover title="I'm a tooltip!">Hover Me</b-btn>
</div>

<!-- tooltip-example-1.vue -->
```

## Overview

Things to know when using tooltip component:
 - Tooltips rely on the 3rd party library Popper.js for positioning. The library is bundled with Bootstrap-Vue in the dist files!
 - Tooltips with zero-length titles are never displayed.
 - Triggering tooltips on hidden elements will not work.
 - Specify `container` as `null` (default, appends to `<body>`) to avoid rendering problems in more complex components (like input groups, button groups, etc). You can use container to optionally specify a different element to append the rendered tooltip to.
 - Tooltips for `disabled` elements must be triggered on a wrapper element.
 - When triggered from hyperlinks that span multiple lines, tooltips will be centered. Use white-space: nowrap; on your `<a>`s, `<b-link>`s and `<router-link>`s to avoid this behavior.
 - Tooltips must be hidden before their corresponding elements have been removed from the DOM.

The `<b-tooltip` component inserts a hidden (`display:none`) `<div>` intermediate container
element at the point in the DOM where the `<b-tooltip>` component is placed. This may
affect layout and/or styling of components such as `<b-button-group>`, `<b-button-toolbar>`,
and `<b-input-group>`. To avoid these posible layout issues, place the `<b-tooltip>`
component **outside** of these types of components.

The target element **must** exist in the document before `<b-tooltip>` is mounted. If the
target element is not found during mount, the tooltip will never open. Always place
your `<b-tooltip>` component lower in the DOM than your target element.

**Note:** _When using the default slot for the title, `<b-tooltip>` transfers the
rendered DOM from that slot into the tooltip's markup when shown, and returns
the content back to the `<b-tooltip>` component when hidden. This may cause some issues
in rare circumstances, so please test your implmentation accordingly! The `title`
prop does not have this behavior. For simple tooltips, we recommend using the
`v-b-tooltip` directive and enable the `html` modifer if needed._

## Positioning
Twelve options are available for positioning: `top`, `topleft`, `topright`, `right`, `righttop`,
`rightbottom`, `bottom`, `bottomleft`, `bottomright`, `left`, `lefttop`, and `leftbottom` aligned.
The default position is `top`. Positioning is relative to the trigger element.

<div class="bd-example bd-example-tooltip-static">
  <div class="tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow"></div>
    <div class="tooltip-inner">
      Tooltip on the top
    </div>
  </div>
  <div class="tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow" style="left:93%"></div>
    <div class="tooltip-inner">
      Tooltip on the topleft
    </div>
  </div>
  <div class="tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow" style="left:5%"></div>
    <div class="tooltip-inner">
      Tooltip on the topright
    </div>
  </div>
  <div class="tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow"></div>
    <div class="tooltip-inner">
      Tooltip on the right
    </div>
  </div>
  <div class="tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow" style="top:60%"></div>
    <div class="tooltip-inner">
      Tooltip on the righttop
    </div>
  </div>
  <div class="tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow" style="top:26%"></div>
    <div class="tooltip-inner">
      Tooltip on the rightbottom
    </div>
  </div>
  <div class="tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow"></div>
    <div class="tooltip-inner">
      Tooltip on the bottom
    </div>
  </div>
  <div class="tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow" style="left:93%"></div>
    <div class="tooltip-inner">
      Tooltip on the bottomleft
    </div>
  </div>
  <div class="tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow" style="left:5%"></div>
    <div class="tooltip-inner">
      Tooltip on the bottomright
    </div>
  </div>
  <div class="tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow"></div>
    <div class="tooltip-inner">
      Tooltip on the left
    </div>
  </div>
  <div class="tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow" style="top:60%"></div>
    <div class="tooltip-inner">
      Tooltip on the lefttop
    </div>
  </div>
  <div class="tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow" style="top:26%"></div>
    <div class="tooltip-inner">
      Tooltip on the leftbottom
    </div>
  </div>
</div>


## `<b-tooltip>` Component Usage

```html
<b-container fluid>
  <b-row>
    <b-col md="6" class="py-4">
      <b-btn id="exButton1" variant="outline-success">Live chat</b-btn>
    </b-col>
    <b-col md="6" class="py-4">
      <b-btn id="exButton2" variant="outline-success">Html chat</b-btn>
    </b-col>
  </b-row>

  <!-- Tooltip title specified via prop title -->
  <b-tooltip target="exButton1" title="Online!"></b-tooltip>

  <!-- HTML title specified via default slot -->
  <b-tooltip target="exButton2" placement="bottom">
    Hello <strong>World!</strong>
  </b-tooltip>
</b-container>

<!-- tooltip-component-1.vue -->
```

### Component Options

| Prop | Default | Description | Supported values
| ---- | ------- | ----------- | ----------------
| `target` | `null` | String ID of element, or a reference to an element or component, that you want to trigger the tooltip. **Required** | Any valid, in-document unique element ID, element reference or component reference
| `title` | `null` | Content of tooltip (text only, no HTML). if HTML is required, place it in the default slot | Plain text
| `placement` | `top` | Positioning of the tooltip, relative to the trigger element. | `top`, `bottom`, `left`, `right`, `auto`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, `rightbottom`
| `triggers` | `hover focus` |  Space separated list of which event(s) will trigger open/close of tooltip | `hover`, `focus`, `click`. Note `blur` is a special use case to close tooltip on next click, usually used in conjunction with `click`.
| `no-fade` | `false` | Disable fade animation when set to `true` | `true` or `false`
| `delay` | `0` | Number of milliseconds to delay showing and hidding of popover. Can also be specified as an object in the form of `{ show: 100, hide: 400 }` allowing different show and hide delays | `0` and up, integers only.
| `offset` | `0` | Number of pixels to shift the center of the tooltip | Any negative or positive integer
| `container` | `null` | String ID of element to append rendered tooltip into. If `null` or element not found, tooltip is appended to `<body>` (default) | Any valid in-document unique  element ID.



## `v-b-tooltip` Directive Usage

The `v-b-tooltip` directive makes adding tooltips even easier, without additional placeholder markup:

```html
<b-container fluid>
  <b-row>
    <b-col md="6" class="py-4">
      <b-btn v-b-tooltip
             title="Online!"
             variant="outline-success">
        Live chat
      </b-btn>
    </b-col>
    <b-col md="6" class="py-4">
      <b-btn v-b-tooltip.html.bottom
             title="Hello <strong>World!</strong>"
             variant="outline-success">
        Html chat
      </b-btn>
    </b-col>
  </b-row>
</b-container>

<!-- tooltip-directive-1.vue -->
```

Refer to the [`v-b-tooltip` documentation](/docs/directives/tooltip) for more information
and features of the directive format.

## Closing tooltips
You can close all open tooltips by emitting the `bv::hide::tooltip` event on $root:

```js
this.$root.$emit('bv::hide::tooltip');
```

## Component Reference
