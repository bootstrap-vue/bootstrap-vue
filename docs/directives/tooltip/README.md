# Tooltips

> Documentation and examples for adding custom Bootstrap-Vue tooltips, using Bootstrap V4 CSS for
styling and animations. Tooltips can be triggered by hovering, focusing, or clicking an element

Use the `v-b-tooltip` directive on any element or component where you would like a tooltip
to appear.

## Overview

Things to know when using tooltips:
 - Tooltips rely on the 3rd party library Popper.js for positioning. The library is bundled wit Bootstrap-Vue!
 - Tooltips with zero-length titles are never displayed.
 - Specify container: 'body' (default) to avoid rendering problems in more complex components (like input groups, button groups, etc).
 - Triggering tooltips on hidden elements will not work.
 - Tooltips for `disabled` elements must be triggered on a wrapper element.
 - When triggered from hyperlinks that span multiple lines, tooltips will be centered. Use white-space: nowrap; on your `<a>`s, `<b-link>`s and `<router-link>`s to avoid this behavior.
 - Tooltips must be hidden before their corresponding elements have been removed from the DOM.


```html
<template>
  <b-container>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip="'ToolTip!'" variant="outline-success">Hover + Focus</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.hover="'ToolTip!'" variant="outline-success">Hover</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.click="'ToolTip!'" variant="outline-success">Click</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.focus="'ToolTip!'" variant="outline-success">Focus</b-btn>
      </b-col>
    </b-row>
    <h5 class="mt-4">Positioning</h5>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.top="'ToolTip!'" variant="primary">Top</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.right="'ToolTip!'" variant="primary">Right</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.left="'ToolTip!'" variant="primary">Left</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.bottom="'ToolTip!'" variant="primary">Bottom</b-btn>
      </b-col>
    </b-row>
    <h5 class="mt-4">Content</h5>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip title="Tip from title attributee" variant="success">Title</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip="'String Tip'" variant="success">String</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.html="tipData" variant="success">Data</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-tooltip.html="tipMethod" variant="success">Method</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: {
    tipData: 'Tooltip <em>Message</em>'
  },
  methods: {
    tipMethod() {
      return '<strong>' + new Date() + '</string>';
    }
  }
}
</script>

<!-- tooltip-1.vue -->
```

## Directive syntax

```
v-b-tooltip:[container].[mod1].[mod2].[...].[modN]="<value>"
```

Where `<value>` can be (optional):
 - A string containing the title of the tooltip
 - A function reference to generate the title of the tooltip (receives one arg which is a reference to the DOM element triggering the tooltip)
 - An object containing more complex configuration of tooltip, See Bootstrap docs for possible values/structure)

Where [modX] can be (all optional):
 - Positioning: `top`, `bottom`, `left`, `right`, or `auto` (last one found wins, defaults to `top`)
 - Event trigger: `click`, `hover`, `focus`, `blur` (if none specified, defaults to `focus` and `hover`. `blur` is a close handler only, and if specified by itself, will be converted to `focus`)
 - `nofade` to turn off animation
 - `html` to enable rendering raw HTML. by default HTML is escaped and converted to text
 - A delay value in the format of `d###` (where `###` is in ms, defaults to 0);
 - An offset value in pixels in the format of `o###` (where `###` is the number of pixels, defaults to 0. Negative values allowed)

Where [container] can be (optional)
 - An element ID (minus the #) to place the tooltip markup in
 - If not provided, tooltips are appended to the body

## Usage

**Simplest usage:**
```
v-b-tooltip="'This is a Tooltip!'"
```
or use the element's `title` attribute for the tooltip content:
```
v-b-tooltip title="This is a title Tooltip"
```
**Placement examples:**
```
v-b-tooltip.bottom
v-b-tooltip.right
```
**Trigger examples:**
```
v-b-tooltip.hover  => Hover only
v-b-tooltip.click  => Click only
v-b-tooltip.hover.focus => Both hover and focus
```

**Combo:**
```
v-b-tooltip.hover.bottom  => Show on hover and place at bottom
v-b-tooltip.bottom.hover  => Same as above
```

### Dismiss on next click
Use both `click` and `blur` if you would like a tooltip that opens only on click of
the element, but will close when anything else in the document is clicked or
receives focus.

Note that your elment **must** be in the document tab sequence for this to work. If
your element is not tabable, add the `tabindex="0"` attribute to the element.

