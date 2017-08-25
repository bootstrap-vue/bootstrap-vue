# Popovers

> Documentation and examples for adding Bootstra-Vue popovers to any element on your site,
using Bootstrap V4 CSS for styling and animations. Popovers can be triggered by hovering,
focusing, or clicking an element, and can contain both content and a title heding.
Popovers are tooltips on steroids.

Use the `v-b-popover` directive on any element or component where you would like a popover
to apear.

```html
<template>
<div class="text-center">
  <h5>Triggers</h5>
  <div class="row">
    <div class="col-sm-3">
      <b-btn v-b-popover="'Popover!'" variant="outline-success">Click (default)</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.hover="'Popover!'" variant="outline-success">Hover</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.hover.focus="'Popover!'" variant="outline-success">HOver + Focus</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.focus="'Popover!'" variant="outline-success">Focus</b-btn>
    </div>
  </div>
  <h5>Positioning</h5>
  <div class="row">
    <div class="col-sm-3">
      <b-btn v-b-popover.top="'Popover!'" variant="primary">top</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.right="'Popover!'" variant="primary">Right</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.left="'Popover!'" variant="primary">left</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.bottom="'ToolTip!'" variant="primary">Bottom</b-btn>
    </div>
  </div>
  <h5>Content and Title</h5>
  <div class="row">
    <div class="col-sm-3">
      <b-btn v-b-popover="'Content!'" title="Title from title attributee" variant="success">Title + Content</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover="{title:'Popover', content:'This is the content of popover'}" variant="success">Object</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover="popoverData" variant="success">Data</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.html="popoverMethod" variant="success">Method</b-btn>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: {
    popoverData: {
      title: 'Popover Title',
      content: 'Popover Content'
    }
  },
  methods: {
    popoverMethod() {
      return {
        title: 'Popover with HTML',
        content: '<strong>' + Date.now() + '</strong>'
      }
    }
  }
}
</script>

<!-- popovrr-1.vue -->
```
