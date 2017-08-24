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
      <b-btn v-b-tooltip="tipData" variant="success">Data</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-tooltip="tipMethod" variant="success">Method</b-btn>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: {
    tipData: 'Tooltip Message'
  },
  methods: {
    tipMethod() {
      return Date.now();
    }
  }
}
</script>
<!-- tooltip-1.vue -->
```
