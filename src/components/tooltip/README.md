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
and `<b-input-group>`. To avoid these possible layout issues, place the `<b-tooltip>`
component **outside** of these types of components.

The target element **must** exist in the document before `<b-tooltip>` is mounted. If the
target element is not found during mount, the tooltip will never open. Always place
your `<b-tooltip>` component lower in the DOM than your target element.

**Note:** _When using the default slot for the title, `<b-tooltip>` transfers the
rendered DOM from that slot into the tooltip's markup when shown, and returns
the content back to the `<b-tooltip>` component when hidden. This may cause some issues
in rare circumstances, so please test your implementation accordingly! The `title`
prop does not have this behavior. For simple tooltips, we recommend using the
`v-b-tooltip` directive and enable the `html` modifier if needed._

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


## Triggers
Tooltips can be triggered (opened/closed) via any combination of `click`, `hover`
and `focus`. The default trigger is `hover focus`.

If a tooltip has more than one trigger, then all triggers must be cleared before the
tooltip will close. I.e. if a tooltip has the trigger `focus click`, and it was opened
by `focus`, and the user then clicks the trigger element, they must click it again
**and** move focus to close the tooltip.


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
| `target` | `null` | Element String ID, or a reference to an element or component, that you want to trigger the tooltip. **Required** | Any valid, in-document unique element ID, element reference or component reference
| `title` | `null` |  Tooltip content (text only, no HTML). if HTML is required, place it in the default slot | Plain text
| `placement` | `top` | Tooltip position, relative to the trigger element. | `top`, `bottom`, `left`, `right`, `auto`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, `rightbottom`
| `triggers` | `hover focus` |  Space separated list of event(s), which will trigger open/close of tooltip | `hover`, `focus`, `click`. Note `blur` is a special use case to close tooltip on next click, usually used in conjunction with `click`.
| `no-fade` | `false` | Disable fade animation when set to `true` | `true` or `false`
| `delay` | `0` | Delay showing and hiding of tooltip by specified number of milliseconds. Can also be specified as an object in the form of `{ show: 100, hide: 400 }` allowing different show and hide delays | `0` and up, integers only.
| `offset` | `0` | Shift the center of the tooltip by specified number of pixels | Any negative or positive integer
| `container` | `null` | Element string ID to append rendered tooltip into. If `null` or element not found, tooltip is appended to `<body>` (default) | Any valid in-document unique element ID.
| `boundary` | `'scrollParent'` | The container that the tooltip will be constrained visually. The default should suffice in most cases, but you may need to chagne this if your target element is in a small container with overflow scroll | `'scrollParent'` (default), `'viewport'`, `'window'`, or a reference to an HTML element.


### Programmatically show and hide tooltip

You can manually control the visibility of a tooltip via the syncable Boolean `show` prop.
Setting it to `true` will show the tooltip, while setting it to `false` will hide the tooltip.

```html
<template>
  <div class="text-center">
    <b-btn id="tooltipButton-1" variant="primary">I have a tooltip</b-btn>
    <br><br>
    <b-btn @click="show = !show">Toggle Tooltip</b-btn>

    <b-tooltip :show.sync="show" target="tooltipButton-1" placement="top">
      Hello <strong>World!</strong>
    </b-tooltip>
  </div>
</template>
<script>
  export default {
    data: {
      show: true
    }
  }
</script>

<!-- tooltip-show-sync.vue -->
```

To make the tooltip shown on initial render, simply add the `show` prop
on `<b-tooltip>`:

```html
<div class="text-center">
  <b-btn id="tooltipButton-2" variant="primary">Button</b-btn>
  <b-tooltip show target="tooltipButton-2">
    I start open
  </b-tooltip>
</div>

<!-- tooltip-show-open.vue -->
```

Programmatic control can also be affected by submitting `'open'` and `'close'`
events to the tooltip by reference.
 
 ```html
 <template>
   <div class="d-flex flex-column text-md-center">
     <div class="p-2">
       <b-btn id="tooltipButton-showEvent" variant="primary">I have a popover</b-btn>
     </div>
     <div class="p-2">
       <b-btn class="px-1" @click="onOpen">Open</b-btn>
       <b-btn class="px-1" @click="onClose">Close</b-btn>
     </div>
 
     <b-tooltip ref="tooltip" target="tooltipButton-showEvent">
       Hello <strong>World!</strong>
     </b-tooltip>
   </div>
 </template>
 
 <script>
   export default {
     methods: {
       onOpen() {
         this.$refs.tooltip.$emit('open')
       },
       onClose() {
         this.$refs.tooltip.$emit('close')
       }
     }
   }
 </script>
 
 <!-- tooltip-show-ref-event.vue -->
```

You can also use `$root` events to trigger the showing and hiding of tooltip(s).
See the **Hiding and showing tooltips via $root events** section below for details.

### Programmatically disabling tooltip

You can disable tooltip via the syncable Boolean prop `disabled` (default is `false`)
Setting it to `true` will disable the tooltip. If the tooltip is currently visible
when disabled is set to `false`, the tooltip will remain visible until it is enabled
or programmatically closed. If the tooltip is disabled/enabled via $root events (see
below), your `disabled` value will be updated as long as you have provided the `.sync`
prop modifier.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-btn id="tooltipButton-disable" variant="primary">I have a tooltip</b-btn>
    </div>
    <div class="p-2">
      <b-btn @click="disabled = !disabled">
        {{ disabled ? 'Enable' : 'Disable' }} Tooltip by prop
      </b-btn>
            
      <b-btn @click="disableByRef">
        {{ disabled ? 'Enable' : 'Disable' }} Tooltip by $ref event
      </b-btn>

      <b-tooltip :disabled.sync="disabled" ref="tooltip" target="tooltipButton-disable">
        Hello <strong>World!</strong>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        disabled: false
      }
    },
    methods: {
      disableByRef () {
        if (this.disabled) {
          this.$refs.tooltip.$emit('enable')
        } else {
          this.$refs.tooltip.$emit('disable')
        }
      } 
    }
  }
</script>

<!-- tooltip-disable.vue -->
```
>**Note:** _In the above example, since we are using the default tooltip triggers of
`focus hover`, the tooltip will close before it is disabled due to loosing focus (and hover)
to the toggle button._

When disabled, the tooltip can be opened programmatically (either via the `show` prop,
methods or events).

You can also emit `$root` events to trigger disabling and enabling of popover(s). See
the **Disabling and enabling tooltips via $root events** section below for details.


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


## Hiding and showing tooltips via $root events
You can close (hide) **all open tooltips** by emitting the `bv::hide::tooltip` event on $root:

```js
this.$root.$emit('bv::hide::tooltip');
```

To close a **specific tooltip**, pass the trigger element's `id` as the argument:

```js
this.$root.$emit('bv::show::tooltip', 'my-trigger-button-id');
```

To open a **specific tooltip**, pass the trigger element's `id` as the argument when
emitting the `bv::show::tooltip` $root event:

```js
this.$root.$emit('bv::show::tooltip', 'my-trigger-button-id');
```

To open all popovers simultaneously, omit the `id` argument when emitting the
`bv::show::tooltip` event.

These events work for both the component **and** directive versions of tooltip.

>**Note:** _the **trigger element** must exist in the DOM and be in a visible state in order for the tooltip to show._


## Disabling and enabling tooltips via $root events
You can disable **all open tooltips** by emitting the `bv::disable::tooltip` event on $root:

```js
this.$root.$emit('bv::disable::tooltip');
```

To disable a **specific tooltip**, pass the trigger element's `id` as the argument:

```js
this.$root.$emit('bv::disable::tooltip', 'my-trigger-button-id');
```

To enable a **specific tooltip**, pass the trigger element's `id` as the argument when
emitting the `bv::enable::tooltip` $root event:

```js
this.$root.$emit('bv::enable::tooltip', 'my-trigger-button-id');
```

To enable all popovers simultaneously, omit the `id` argument when emitting the
`bv::enable::tooltip` event.

These events work for both the component **and** directive versions of tooltip.

>**Note:** _The **trigger element** must exist in the DOM in order for the
tooltip to be enabled or disabled._


## Component Reference
