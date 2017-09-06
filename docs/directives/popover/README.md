# Popovers

> Documentation and examples for adding Bootstrap-Vue popovers to any element on your site,
using Bootstrap V4 CSS for styling and animations. Popovers can be triggered by hovering,
focusing, or clicking an element, and can contain both content and a title heading.
Popovers are tooltips on steroids.

Use the `v-b-popover` directive on any **element** or **component** where you would
like a popover to appear.

## Overview
Things to know when using popovers:

 - Popovers rely on the 3rd party library Popper.js for positioning. It is bundled with Bootstrap-Vue!
 - Zero-length title and content values will never show a popover.
 - Specify container: 'body' (default) to avoid rendering problems in more complex components (like input groups, button groups, etc).
 - Triggering popovers on hidden elements will not work.
 - Popovers for `disabled` elements must be triggered on a wrapper element.
 - When triggered from hyperlinks that span multiple lines, popovers will be centered. Use white-space: nowrap; on your `<a>`s, `<b-link>`s or `<router-link>`s b to avoid this behavior.
 - Popovers must be hidden before their corresponding elements have been removed from the DOM.
 - When using a client side router, popovers will listen to changes in `$route` and automatically hide.
 - Elements that trigger popovers should be in the document tab sequence. Add `tabinded="0"` if rquired.


```html
<template>
  <b-container fluid>
    <h5>Triggers</h5>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-btn v-b-popover="'Popover!'" variant="outline-success">Click (default)</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover="'Popover!'" variant="outline-success">Hover</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover.focus="'Popover!'" variant="outline-success">Hover + Focus</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.focus="'Popover!'" variant="outline-success">Focus</b-btn>
      </b-col>
    </b-row>
    <h5 class="mt-4">Positioning</h5>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover.top="'Popover!'" variant="primary">Top</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover.right="'Popover!'" variant="primary">Right</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover.left="'Popover!'" variant="primary">Left</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover.bottom="'ToolTip!'" variant="primary">Bottom</b-btn>
      </b-col>
    </b-row>
    <h5 class="mt-4">Content and Title</h5>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover="'Content!'" title="Title from title attributee" variant="success">Title + Content</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover="{title:'Popover', content:'This is the content of popover'}" variant="success">Object</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover="popoverData" variant="success">Data</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.hover.html="popoverMethod" title="Popover with HTML"variant="success">Method</b-btn>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col cols="12" class="py-3">
        <b-btn v-b-popover.hover="popoverConfig" variant="success">Config</b-btn>
      </b-col>
    </b-row>
  </b-container>
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
- A function reference to generate the **content** of the popover (receives one argument which is a refernce to the DOM element triggering the popover)
- An object containing more complex configuration of popover, See Bootstrap docs for possible values/structure)

Where [modX] can be (all optional):
 - Positioning: `top`, `bottom`, `left`, `right`, or `auto` (last one found wins, defaults to `right`)
 - Event trigger: `click`, `hover`, `focus`, `blur` (if none specified, defaults to `click`. The `blur` trigger is a close handler only, and if specified by itself, will be converted to `focus`)
 - `nofade` to turn off animation
 - `html` to enable rendering raw HTML. by default HTML is escaped and converted to text
 - A delay value in the format of `d###` (where `###` is in ms, defaults to 0);
 - An offset value in pixels in the format of `o###` (where `###` is the number of pixels, defaults to 0. Negative values allowed)

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
### Dismiss on next click (self dimissing)
Use the `focus` trigger to dismiss popovers on the next click that the user makes.
`focus` also makes the popover activate on both `focus` and `click` (as a click makes
the element receive focus, assuming it is in the tab sequence of the page).

You can, however, specify your trigger as `click` and `blur`,  which will make only
click activate the popover, and either a click on the element - _or losing foucus
to another element or part of the document_ - will close the popover.

This `blur` trigger must be used in combination with the `click` trigger.

Th following example shows the `click blur` use case. Popovers will only open on click
of the button, and will close either on click of the button, or a click anywhere else (or
a focus change via pressing the <kbd>TAB</kbd> key). Some call this behavior _self dismising_.

```html
<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-btn>
      </b-col>
      <b-col md="3" class="py-3">
        <b-btn v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<!-- popover-2.vue -->
```

## Closing popovers
You can close all open popovers by emitting the `bv::hide::popover` event on $root:

```js
this.$root.$emit('bv::hide::popover');
```
