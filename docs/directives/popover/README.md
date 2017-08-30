# Popovers

> Documentation and examples for adding Bootstrap-Vue popovers to any element on your site,
using Bootstrap V4 CSS for styling and animations. Popovers can be triggered by hovering,
focusing, or clicking an element, and can contain both content and a title heading.
Popovers are tooltips on steroids.

Use the `v-b-popover` directive on any **element** or **component** where you would
like a popover to appear.

```html
<template>
<div>
  <h5>Triggers</h5>
  <div class="row text-center mb-3">
    <div class="col-sm-3">
      <b-btn v-b-popover="'Popover!'" variant="outline-success">Click (default)</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.hover="'Popover!'" variant="outline-success">Hover</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.hover.focus="'Popover!'" variant="outline-success">Hover + Focus</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.focus="'Popover!'" variant="outline-success">Focus</b-btn>
    </div>
  </div>
  <h5>Positioning</h5>
  <div class="row text-center mb-3">
    <div class="col-sm-3">
      <b-btn v-b-popover.top="'Popover!'" variant="primary">Top</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.right="'Popover!'" variant="primary">Right</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.left="'Popover!'" variant="primary">Left</b-btn>
    </div>
    <div class="col-sm-3">
      <b-btn v-b-popover.bottom="'ToolTip!'" variant="primary">Bottom</b-btn>
    </div>
  </div>
  <h5>Content and Title</h5>
  <div class="row text-center mb-3">
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
      <b-btn v-b-popover.html="popoverMethod" title="Popover with HTML"variant="success">Method</b-btn>
    </div>
  </div>
  <div class="row text-center">
    <div class="col-sm-12">
      <b-btn v-b-popover="popoverConfig" variant="success">Config</b-btn>
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
    },
    counter: 0
  },
  methods: {
    popoverMethod() {
      // Returns the content as a string
      // Will be called each time popover is opened
      return '<strong>' + new Date() + '</strong>';
    }
  },
  computed: {
    popoverConfig() {
      // Both title and content specified as a function in this example
      // and will be called each time popover is opened
      return {
        html: true,
        title: () => { return 'Hello <b>Popover:</b> ' + (++this.counter); },
        content: () => { return 'The date is:<br><em>' + new Date() + '</em>'; }
      };
    }
  }
}
</script>

<!-- popover-1.vue -->
```

## Directive syntax
```
v-b-popover:[container].[mod1].[mod2].[...].[modN]="<value>"
```
Where `<value>` can be (optional):
- A string containing the **content** of the popover
- A function reference to generate the **content** of the popover (receives one argument which is a refernc to the DOM element triggering the popover)
- An object containing more complex configuration of popover, See Bootstrap docs for possible values/structure)

Where [modX] can be (all optional):
 - Positioning: `top`, `bottom`, `left`, `right`, or `auto` (last one found wins, defaults to `right`)
 - Event trigger: `click`, `hover`, `focus` (if none specified, defaults to `click`)
 - A delay value in the format of `d###` (where `###` is in ms, defaults to 0);
 - An offset value in pixels in the format of `o###` (where `###` is the number of pixels, defaults to 0)
 - `nofade` to turn off animation
 - `html` to enable rendering raw HTML. by default HTML is escaped and converted to text

Where [container] can be (optional):
 - An element ID (minus the #) to place the popover markup in when visible
 - If not provided, popovers are appended to the body when visible

## Usage
**Simplest usage:**
```
v-b-popover="'This is a Poopover!'"
```
or use the element's `title` attribute for the popover header:
```
v-b-popover title="This is a popover header"
v-b-popover="'This is popover content'" title="This is popover header"
```
or provide an object for title and content:
```
v-b-popover="{title:'Popover header', content:'Popover content'}"
```
**Enable HTML content/title:**
```
v-b-popover.html="'<em>Emphasis</em> in content'" title="<strong>Bolded title</strong>"
```

**Placement examples:**
```
v-b-popover.top
```
**Trigger examples:**
```
v-b-popover        => Default of click
v-b-popover.hover  => Hover only
v-b-popover.click  => Click only
v-b-popover.hover.focus => Both hover and focus
```

**Combo:**
```
v-b-popover.hover.bottom  => Show on hover and place at bottom
v-b-popover.bottom.hover  => Same as above
v-b-popover.bottom.click.html  => Show on click and place at bottom with HTML content
```

