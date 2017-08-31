# Tooltips

> Easily add tooltips to elements or components via the `<b-tooltip>` component or
[`v-b-tooltip`](/docs/directives/tooltip) directive (preferred method).

## Overview

Things to know when using tooltip component:
 - Tooltips rely on the 3rd party library Popper.js for positioning. The library is bundled wit Bootstrap-Vue!
 - Tooltips with zero-length titles are never displayed.
 - Triggering tooltips on hidden elements will not work.
 - Tooltips for `disabled` elements must be triggered on a wrapper element.
 - When triggered from hyperlinks that span multiple lines, tooltips will be centered. Use white-space: nowrap; on your `<a>`s, `<b-link>`s and `<router-link>`s to avoid this behavior.
 - Tooltips must be hidden before their corresponding elements have been removed from the DOM.

The `<b-tooltip` component inserts a hidden (`display:none`) `<div>` container
element at the point in the DOM where the `<b-tooltip>` component is placed.  This may 
affect layout and/or styling of components such as `<b-button-group>`, `<b-button-toolbar>`,
and `<b-input-group>`. To avoid these posible layout issues, place the `<b-tooltip>`
component **outside** of these types of components.

The target element **must** exist in the document before `<b-tooltip>` is mounted. If the
target element is not found during mount, the tooltip will never open. Always place
your `<b-tooltip>` component lower in the DOM than your target element.

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
  <b-tooltip target-id="exButton1" title="Online!"></b-tooltip>

  <!-- HTML title specified via default slot -->
  <b-tooltip target-id="exButton2" placement="bottom">
    Hello <strong>World!</strong>
  </b-tooltip>
</b-container>

<!-- tooltip-1.vue -->
```

### Component Options

| Prop | Default | Description | Supported values
| ---- | ------- | ----------- | ----------------
| `target-id` | `null` | ID of element that you want to trigger the tooltip. **Required** | Any valid, in-document unique element ID
| `title` | `null` | Content of tooltip (text only, no HTML). if HTML is required, place it in the default slot | Plain text
| `placement` | `top` | Positioning of the tooltip, relative to the trigger element. | `top`, `bottom`, `left`, `right`, `auto`
| `triggers` | `hover focus` |  Space separated list of which event(s) will trigger open/close of tooltip | `hover`, `focus`, `click`. Note `blur` is a special use case to close tooltip on next click.
| `no-fade` | `false` | Disable fade animation when set to `true` | `true` or `false`
| `delay` | `0` | Number of milliseconds to delay showing and hidding of tooltip | `0` and up, integers only.
| `offset` | `0` | Number of pixels to shift the center of the tooltip | Any negative or positive integer


## `v-b-tooltip` Directive Usage

The `v-b-tooltip` directive makes adding tooltips even easier:

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

<!-- tooltip-2.vue -->
```

Refer to the [`v-b-tooltip` documentation](/docs/directives/tooltip) for more information
and features of the directive format.
