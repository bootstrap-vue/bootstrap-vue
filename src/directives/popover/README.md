# Popovers

> Documentation and examples for adding BootstrapVue popovers to any element on your site, using
> Bootstrap V4 CSS for styling and animations. Popovers can be triggered by hovering, focusing, or
> clicking an element, and can contain both content and a title heading. Popovers are tooltips on
> steroids.

Use the `v-b-popover` directive on any **element** or **component** where you would like a popover
to appear.

```html
<div class="text-center my-3">
  <b-button v-b-popover.hover="'I am popover content!'" title="Popover Title">Hover Me</b-button>
</div>

<!-- b-popover.vue -->
```

## Overview

Things to know when using popovers:

- Popovers rely on the 3rd party library Popper.js for positioning. It is bundled with BootstrapVue!
- Zero-length title and content values will never show a popover.
- Specify container: 'body' (default) to avoid rendering problems in more complex components (like
  input groups, button groups, etc).
- Triggering popovers on hidden elements will not work.
- Popovers for `disabled` elements must be triggered on a wrapper element.
- When triggered from hyperlinks that span multiple lines, popovers will be centered. Use
  white-space: nowrap; on your `<a>`s, `<b-link>`s or `<router-link>`s b to avoid this behavior.
- Popovers must be hidden before their corresponding elements have been removed from the DOM.
- When using a client side router, popovers will listen to changes in `$route` and automatically
  hide.
- Elements that trigger popovers should be in the document tab sequence. Add `tabindex="0"` if
  required.

## Positioning

Twelve options are available for positioning: `top`, `topleft`, `topright`, `right`, `righttop`,
`rightbottom`, `bottom`, `bottomleft`, `bottomright`, `left`, `lefttop`, and `leftbottom` aligned.
Positioning is relative to the trigger element.

<div class="bd-example bd-example-popover-static">
  <div class="popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="left: 6px"></div>
    <h3 class="popover-header">Popover top</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="right: 6px"></div>
    <h3 class="popover-header">Popover topleft</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="left: 6px"></div>
    <h3 class="popover-header">Popover topright</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="top: 4px"></div>
    <h3 class="popover-header">Popover right</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="bottom: 4px"></div>
    <h3 class="popover-header">Popover righttop</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="top: 4px"></div>
    <h3 class="popover-header">Popover rightbottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="left: 6px"></div>
    <h3 class="popover-header">Popover bottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="right: 6px"></div>
    <h3 class="popover-header">Popover bottomleft</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="left: 6px"></div>
    <h3 class="popover-header">Popover bottomright</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="top: 4px"></div>
    <h3 class="popover-header">Popover left</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="bottom: 4px"></div>
    <h3 class="popover-header">Popover lefttop</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="top: 4px"></div>
    <h3 class="popover-header">Popover leftbottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="clearfix"></div>
</div>

**Live example**

```html
<div>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.top="'Popover!'" variant="primary">Top</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.right="'Popover!'" variant="primary">Right</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.left="'Popover!'" variant="primary">Left</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.bottom="'ToolTip!'" variant="primary">Bottom</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-popover-positioning.vue -->
```

## Triggers

Popovers can be triggered (opened/closed) via any combination of `click`, `hover` and `focus`. The
default trigger is `click`.

If a popover has more than one trigger, then all triggers must be cleared before the popover will
close. I.e. if a popover has the trigger `focus click`, and it was opened by `focus`, and the user
then clicks the trigger element, they must click it again **and** move focus to close the popover.

```html
<div>
  <b-container fluid>
    <h5>Triggers</h5>
    <b-row class="text-center">
      <b-col md="6" class="py-3">
        <b-button v-b-popover="'Popover!'" variant="outline-success">Click (default)</b-button>
      </b-col>
      <b-col md="6" class="py-3">
        <b-button v-b-popover.hover="'Popover!'" variant="outline-success">Hover</b-button>
      </b-col>
      <b-col md="6" class="py-3">
        <b-button v-b-popover.focus="'Popover!'" variant="outline-success">Focus</b-button>
      </b-col>
      <b-col md="6" class="py-3">
        <b-button v-b-popover.hover.focus="'Popover!'" variant="outline-success">Hover + Focus</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-popover-triggers.vue -->
```

### Dismiss on next click (self dismissing)

Use the `focus` trigger by itself to dismiss popovers on the next click that the user makes. `focus`
also makes the popover activate on both `focus` and `click` (as a click makes the element receive
focus, assuming it is in the tab sequence of the page).

You can, however, specify your trigger as `click blur`, which will make only a click activate the
popover, and either a click on the element - _or losing focus to another element or part of the
document_ - will close the popover.

This `blur` trigger must be used in combination with the `click` trigger.

Th following example shows the `click blur` use case. Popovers will only open on click of the
button, and will close either on click of the button, or a click anywhere else (or a focus change
via pressing the <kbd>TAB</kbd> key). Some call this behavior _self dismissing_.

```html
<div>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-popover-dismiss-next-click.vue -->
```

## Heading and content

There are several options for provisioning the title and content of a popover.

By default, popover will use the `title` attribute of the element as the popover heading, and the
content is passed as a string to the `v-b-popover` directive. The title and content can also be
passed as an object to `v-b-popover` in the form of

<!-- eslint-disable no-unused-vars -->

```js
const options = {
  title: 'This is the title',
  content: 'This is the content'
}
```

If your content has basic HTML markup, then you will also need to set the `html` property to true,
or use the directive modifier `html`

<!-- eslint-disable no-unused-vars -->

```js
// Object format with HTML:
const options = {
  title: 'This is the <strong>title</strong>',
  content: 'This is the <em>content<em>',
  html: true
}
```

Content can also be a function reference, which is called each time the popover is opened.

```html
<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover="'Content!'" title="Title from title attribute" variant="success">
          Title + Content
        </b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button
          v-b-popover.hover="{title:'Popover', content:'This is the content of popover'}"
          variant="success"
        >
          Config Object
        </b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover="popoverData" variant="success">Config from data</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.html="popoverMethod" title="Popover with HTML" variant="success">
          Method
        </b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col cols="12" class="py-3">
        <b-button v-b-popover.hover="popoverConfig" variant="success">Config Object</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        popoverData: {
          title: 'Popover Title',
          content: 'Popover Content'
        },
        counter: 0
      }
    },
    methods: {
      popoverMethod() {
        // Returns the content as a string
        // Will be called each time popover is opened
        return '<strong>' + new Date() + '</strong>'
      }
    },
    computed: {
      popoverConfig() {
        // Both title and content specified as a function in this example
        // and will be called each time popover is opened
        return {
          html: true,
          title: () => {
            return 'Hello <b>Popover:</b> ' + ++this.counter
          },
          content: () => {
            return 'The date is:<br><em>' + new Date() + '</em>'
          }
        }
      }
    }
  }
</script>

<!-- b-popover-content.vue -->
```

## Directive syntax and usage

```
v-b-popover:[container].[mod].[mod].[...].[mod]="<value>"
```

Where `<value>` can be (optional):

- A string containing the **content** of the popover
- A function reference to generate the **content** of the popover (receives one argument which is a
  reference to the DOM element triggering the popover)
- An object containing more complex configuration of popover, See Bootstrap docs for possible
  values/structure)

Where `[mod]` can be (all optional):

- Positioning: `top`, `bottom`, `left`, `right`, `auto`; or the offset alignment positions
  `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, or
  `rightbottom` (last one found wins, defaults to `right`).
- Event trigger: `click`, `hover`, `focus`, `blur` (if none specified, defaults to `click`. The
  `blur` trigger is a close handler only, and if specified by itself, will be converted to `focus`).
- `nofade` to turn off animation.
- `html` to enable rendering raw HTML. by default HTML is escaped and converted to text.
- A delay value in the format of `d###` (where `###` is in ms, defaults to 0).
- An offset value in pixels in the format of `o###` (where `###` is the number of pixels, defaults
  to 0. Negative values are allowed). Note if an offset is supplied, then the alignment positions
  will fallback to one of `top`, `bottom`, `left`, or `right`.
- A boundary setting of `window` or `viewport`. The element to constrain the visual placement of the
  popover. If not specified, the boundary defaults to the trigger element's scroll parent (in most
  cases this will suffice).

Where `[container]` can be (optional):

- An element ID (minus the #) to place the popover markup in when visible
- If not provided, popovers are appended to the body when visible

### Usage

**Simplest usage:**

```
v-b-popover="'This is a Popover!'"
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

```html
v-b-popover.html="'<em>Emphasis</em> in content'" title="<strong>Bolded title</strong>"
```

**Placement examples:**

```
v-b-popover.top
```

**Trigger examples:**

```
v-b-popover => Default of click
v-b-popover.hover => Hover only
v-b-popover.click => Click only
v-b-popover.hover.focus => Both hover and focus
```

**Combo:**

```
v-b-popover.hover.bottom => Show on hover and place at bottom
v-b-popover.bottom.hover => Same as above
v-b-popover.bottom.click.html => Show on click and place at bottom with HTML content
```

## Hiding and showing popovers via \$root events

You can close (hide) **all open popovers** by emitting the `bv::hide::popover` event on \$root:

```js
this.$root.$emit('bv::hide::popover')
```

To close a **specific popover**, pass the trigger element's `id` as the first argument:

```js
this.$root.$emit('bv::hide::popover', 'my-trigger-button-id')
```

To open (show) a **specific popover**, pass the trigger element's `id` as the first argument when
emitting the `bv::show::popover` event:

```js
this.$root.$emit('bv::show::popover', 'my-trigger-button-id')
```

To open all popovers simultaneously, omit the `id` argument when emitting the `bv::show::popover`
event.

These events work for both the component **and** directive versions of popover.

Note the **trigger element** must exist in the DOM and be in a visible state in order for the
popover to instantiate and show.

## Disabling and enabling popovers via \$root events

You can disable **all** popovers by emitting the `bv::disable::popover` event on \$root:

```js
this.$root.$emit('bv::disable::popover')
```

To disable a **specific popover**, pass the trigger element's `id` as the first argument:

```js
this.$root.$emit('bv::disable::popover', 'my-trigger-button-id')
```

To enable a **specific popover**, pass the trigger element's `id` as the first argument when
emitting the `bv::enable::popover` event:

```js
this.$root.$emit('bv::enable::popover', 'my-trigger-button-id')
```

To enable all popovers simultaneously, omit the `id` argument when emitting the
`bv::enable::popover` event.

These events work for both the component and directive versions of popover.

Note the **trigger element** must exist in the DOM in order for the popover to be enabled or
disabled.

## See also

- [`v-b-tooltip` directive](/docs/directives/tooltip)
- [`<b-popover>` component](/docs/components/popover)
- [`<b-tooltip>` component](/docs/components/tooltip)

<!-- Directive reference section auto generated from directive package.json -->
