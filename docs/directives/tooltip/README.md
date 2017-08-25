# Tooltips

> Documentation and examples for adding custom Bootstrap-Vue tooltips, using Bootstrap V4 CSS for
styling and animations. Tooltips can be triggered by hovering, focusing, or clicking an element

Use the `v-b-tooltip` directive on any element or component where you would like a tooltip
to apear.

```html
<template>
<div class="text-center">
  <h5>Triggers</h5>
  <div class="row">
    <div class="col-sm-3">
      <b-btn v-b-tooltip="'ToolTip!'" variant="outline-success">Hover and Focus</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip.hover="'ToolTip!'" variant="outline-success">Hover</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip.click="'ToolTip!'" variant="outline-success">Click</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip.focus="'ToolTip!'" variant="outline-success">Fucus</b-btn>
    </div>
  </div>
  <h5>Positioning</h5>
  <div class="row">
    <div class="col-sm-3">
      <b-btn v-b-tooltip.top="'ToolTip!'" variant="primary">top</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip.right="'ToolTip!'" variant="primary">Right</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip.left="'ToolTip!'" variant="primary">left</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip.bottom="'ToolTip!'" variant="primary">Bottom</b-btn>
    </div>
  </div>
  <h5>Content</h5>
  <div class="row">
    <div class="col-sm-3">
      <b-btn v-b-tooltip title="Tip from title attributee" variant="success">Title</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip="'String Tip'" variant="success">String</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip.html="tipData" variant="success">Data</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip.html="tipMethod" variant="success">Method</b-btn>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: {
    tipData: 'Tooltip <em>Message</em>'
  },
  methods: {
    tipMethod() {
      return '<strong>' + Date.now() + '</string>';
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
 - A string (content of the tooltip, basic HTML supported)
 - A function reference (to generate the content of the tooltip, received one arg of the element reference)
 - An object containing more complex configuration of tooltip, See Bootstrap docs for possible values/structure)

Where [modX] can be (all optional):
 - Positioning: `top`, `bottom`, `left`, `right`, or `auto` (last one found wins, defaults to `top`)
 - Event trigger: `click`, `hover`, `focus` (if none specified, defaults to `focus` and `hover`)
 - A delay value in the format of `d###` (where `###` is in ms, defaults to 0);
 - An offset value in pixels in the format of `o###` (where `###` is the number of pixels, defaults to 0)
 - `nofade` to turn off animation
 - `html` to enable rendering raw HTML. by default HTML is escaped and converted to text

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

Note: If a title is not provided, then the tooltip will not display.
