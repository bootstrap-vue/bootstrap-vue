# Tooltips

> Documentation and examples for adding custom BootstrapVue tooltips, using Bootstrap v4 CSS for
> styling and animations. Tooltips can be triggered by hovering, focusing, or clicking an element

Use the `v-b-tooltip` directive on any element or component where you would like a tooltip to
appear.

```html
<div class="text-center my-3">
  <b-button v-b-tooltip.hover title="Tooltip content">Hover Me</b-button>
</div>

<!-- b-tooltip.vue -->
```

## Overview

Things to know when using the tooltip directive:

- Tooltips rely on the 3rd party library [Popper.js](https://popper.js.org/) for positioning.
- Tooltips require BootstrapVue's custom SCSS/CSS in order to function correctly, and for variants.
- If a title is not provided (or is an empty string), the tooltip will not show.
- Specify container: 'body' (the default) to avoid rendering problems in more complex components
  (like input groups, button groups, etc).
- Triggering tooltips on hidden elements will not work.
- Tooltips for `disabled` elements must be triggered on a wrapper element.
- When triggered from hyperlinks that span multiple lines, tooltips will be centered. Use
  white-space: nowrap; on your `<a>`s, `<b-link>`s and `<router-link>`s to avoid this behavior.
- Tooltips must be hidden before their corresponding elements have been removed from the DOM.

## Positioning

Twelve options are available for positioning: `top`, `topleft`, `topright`, `right`, `righttop`,
`rightbottom`, `bottom`, `bottomleft`, `bottomright`, `left`, `lefttop`, and `leftbottom` aligned.
The default position is `top`. Positioning is relative to the trigger element.

<div class="bd-example bd-example-tooltip-static">
  <div class="tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow" style="left: 6px"></div>
    <div class="tooltip-inner">Tooltip on the top</div>
  </div>
  <div class="tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow" style="right: 6px"></div>
    <div class="tooltip-inner">Tooltip on the topleft</div>
  </div>
  <div class="tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow" style="left: 6px"></div>
    <div class="tooltip-inner">Tooltip on the topright</div>
  </div>
  <div class="tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow" style="top: 4px"></div>
    <div class="tooltip-inner">Tooltip on the right</div>
  </div>
  <div class="tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow" style="bottom: 4px"></div>
    <div class="tooltip-inner">Tooltip on the righttop</div>
  </div>
  <div class="tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow" style="top: 4px"></div>
    <div class="tooltip-inner">Tooltip on the rightbottom</div>
  </div>
  <div class="tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow" style="left: 6px"></div>
    <div class="tooltip-inner">Tooltip on the bottom</div>
  </div>
  <div class="tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow" style="right: 6px"></div>
    <div class="tooltip-inner">Tooltip on the bottomleft</div>
  </div>
  <div class="tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow" style="left: 6px"></div>
    <div class="tooltip-inner">Tooltip on the bottomright</div>
  </div>
  <div class="tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow" style="top: 4px"></div>
    <div class="tooltip-inner">Tooltip on the left</div>
  </div>
  <div class="tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow" style="bottom: 4px"></div>
    <div class="tooltip-inner">Tooltip on the lefttop</div>
  </div>
  <div class="tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow" style="top: 4px"></div>
    <div class="tooltip-inner">Tooltip on the leftbottom</div>
  </div>
</div>

**Live example**

```html
<div>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.top="'Tooltip!'" variant="primary">Top</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.right="'Tooltip!'" variant="primary">Right</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.left="'Tooltip!'" variant="primary">Left</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.bottom="'Tooltip!'" variant="primary">Bottom</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-tooltip-positioning.vue -->
```

## Triggers

Tooltips can be triggered (opened/closed) via any combination of `click`, `hover` and `focus`. The
default trigger is `hover focus`. Or a trigger of manual can be specified, where the popover can
only be opened or closed [programmatically](#hiding-and-showing-tooltips-via-root-events).

If a tooltip has more than one trigger, then all triggers must be cleared before the tooltip will
close. I.e. if a tooltip has the trigger `focus click`, and it was opened by `focus`, and the user
then clicks the trigger element, they must click it again **and** move focus to close the tooltip.

```html
<div>
  <b-container>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip="'Tooltip!'" variant="outline-success">Hover + Focus</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover="'Tooltip!'" variant="outline-success">Hover</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.click="'Tooltip!'" variant="outline-success">Click</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.focus="'Tooltip!'" variant="outline-success">Focus</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-tooltip-triggers.vue -->
```

### Making tooltips work for keyboard and assistive technology users

You should only add tooltips to HTML elements that are traditionally keyboard-focusable and
interactive (such as links, buttons, or form controls). Although arbitrary HTML elements (such as
`<span>`s) can be made focusable by adding the `tabindex="0"` attribute, this will add potentially
annoying and confusing tab stops on non-interactive elements for keyboard users. In addition, most
assistive technologies currently do not announce the tooltip in this situation.

Additionally, do not rely solely on `hover` as the trigger for your tooltip, as this will make your
tooltips _impossible to trigger for keyboard-only users_.

### Disabled elements

Elements with the `disabled` attribute aren’t interactive, meaning users cannot focus, hover, or
click them to trigger a tooltip (or popover). As a workaround, you’ll want to trigger the tooltip
from a wrapper `<div>` or `<span>`, ideally made keyboard-focusable using `tabindex="0"`, and
override the `pointer-events` on the disabled element.

```html
<div>
  <span class="d-inline-block" tabindex="0" v-b-tooltip.top title="Disabled tooltip">
    <b-button variant="primary" style="pointer-events: none;" disabled>Disabled button</b-button>
  </span>
</div>

<!-- disabled-trigger-element.vue -->
```

### Dismiss on next click

Use both `click` and `blur` if you would like a tooltip that opens only on click of the element, but
will close when anything else in the document is clicked or receives focus.

Note that your element **must** be in the document tab sequence for this to work. If your element is
not tabbable, add the `tabindex="0"` attribute to the element.

## Title content

There are several options for providing the title of a tooltip.

By default, tooltip will use the `title` attribute of the element as the tooltip content. The title
can also be passed as an object to `v-b-tooltip` in the form of

<!-- eslint-disable no-unused-vars -->

```js
const options = {
  title: 'This is the title'
}
```

If your title content has basic HTML markup, then you will also need to set the `html` property to
true, or use the directive modifier `html`

<!-- eslint-disable no-unused-vars -->

```js
// Object format with HTML
const options = {
  title: 'This is the <strong>title</strong>',
  html: true
}
```

Title can also be a function reference, which is called each time the tooltip is opened. To make the
title returned by a function reactive while open, set the title to a _new_ function reference
whenever the content changes.

```html
<template>
  <b-container>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover :title="'Tip from title attribute ' + date" variant="success">Title</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover="'String Tip'" variant="success">String</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.html="tipData" variant="success">Data</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.html="tipMethod" variant="success">Method</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        tipData: { title: 'Tooltip <em>Message</em>' },
        date: new Date(),
        timer: null
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.date = new Date()
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      tipMethod() {
        // Note this is called each time the tooltip is first opened.
        return '<strong>' + new Date() + '</strong>'
      }
    }
  }
</script>

<!-- b-tooltip-content.vue -->
```

## Variants and custom class

BootstrapVue's tooltips support contextual color variants via our custom CSS, either by using
directive modifiers or config options:

```html
<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col>
        <b-button v-b-tooltip.hover.v-danger title="Danger variant">Danger Modifier</b-button>
      </b-col>
      <b-col>
        <b-button v-b-tooltip.hover="{ variant: 'info' }" title="Info variant">Info Config</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<!-- b-tooltip-variants.vue -->
```

Bootstrap default theme variants are: `danger`, `warning`, `success`, `primary`, `secondary`,
`info`, `light`, and `dark`. You can change or add additional variants via Bootstrap
[SCSS variables](/docs/reference/theming)

A custom class can be applied to the tooltip outer wrapper `<div>` by using the `customClass` option
property:

```html
<b-button v-b-tooltip.hover="{ customClass: 'my-tooltip-class' }" title="Tooltip">Button</b-button>
```

## Directive syntax and usage

```html
<b-button v-b-tooltip:[container].[mod1].[mod2].[...].[modN]="<value>">Button</b-button>
```

Where `[container]` can be (optional):

- An element ID (minus the #) to place the tooltip markup in
- If not provided, tooltips are appended to the `body`. If the trigger element is inside a modal,
  the tooltip will be appended to the modal's container

Where `[modX]` can be (all optional):

- Positioning: `top`, `bottom`, `left`, `right`, `auto`, `topleft`, `topright`, `bottomleft`,
  `bottomright`, `lefttop`, `leftbottom`, `righttop`, or `rightbottom` (last one found wins,
  defaults to `top`).
- Event trigger: `click`, `hover`, `focus`, `blur` (if none specified, defaults to `focus` and
  `hover`. `blur` is a close handler only, and if specified by itself, will be converted to
  `focus`). Use `manual` if you only want to control the visibility manually.
- `nofade` to turn off animation.
- `html` to enable rendering raw HTML. By default HTML is escaped and converted to text
- A delay value in the format of `d###` (where `###` is in ms, defaults to `50`), applied to both
  `hide` and `show`.
- A show delay value in the format of `ds###` (where `###` is in ms, defaults to `50`), applied to
  `show` trigger only.
- A hide delay value in the format of `dh###` (where `###` is in ms, defaults to `50`), applied to
  `hide` trigger only.
- An offset value in pixels in the format of `o###` (where `###` is the number of pixels, defaults
  to `0`. Negative values allowed).
- A boundary setting of `window` or `viewport`. The element to constrain the visual placement of the
  tooltip. If not specified, the boundary defaults to the trigger element's scroll parent (in most
  cases this will suffice).
- A contextual variant in the form of `v-XXX` (where `XXX` is the color variant name).

Where `<value>` can be (optional):

- A string containing the title of the tooltip
- A function reference to generate the title of the tooltip (receives one arg which is a reference
  to the DOM element triggering the tooltip)
- An object containing more complex configuration of tooltip. See below for accepted object
  properties:

**Options configuration object properties:**

| Property            | Type                                | Default          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | ----------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`         | Boolean                             | `true`           | Apply a CSS fade transition to the tooltip.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `container`         | String ID or HTMLElement or `false` | `false`          | Appends the tooltip to a specific element. Example: `container: '#body'`. This option is particularly useful in that it allows you to position the tooltip in the flow of the document near the triggering element - which will prevent the tooltip from floating away from the triggering element during a window resize. When set to `false` the tooltip will be appended to `body`, or if the trigger element is inside a modal it will append to the modal's container. |
| `delay`             | Number or Object                    | `50`             | Delay showing and hiding the tooltip (ms). If a number is supplied, delay is applied to both hide/show. Object structure is: `delay: { "show": 500, "hide": 100 }`                                                                                                                                                                                                                                                                                                          |
| `html`              | Boolean                             | `false`          | Allow HTML in the tooltip. If true, HTML tags in the tooltip's title will be rendered in the tooltip. If false, the title will be inserted as plain text. Use text if you're worried about XSS attacks.                                                                                                                                                                                                                                                                     |
| `placement`         | String or Function                  | `'top'`          | How to position the tooltip - `auto`, `top`, `bottom`, `left`, `right`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, or `rightbottom`. When `auto` is specified, it will dynamically reorient the tooltip.                                                                                                                                                                                                                      |
| `title`             | String or Element or Function       | `''`             | Default title value if title attribute isn't present. If a function is given, it must return a string.                                                                                                                                                                                                                                                                                                                                                                      |
| `trigger`           | String                              | `'hover focus'`  | How tooltip is triggered: `click`, `hover`, `focus`. You may pass multiple triggers; separate them with a space.                                                                                                                                                                                                                                                                                                                                                            |
| `offset`            | Number or String                    | `0`              | Offset of the tooltip relative to its target. For more information refer to Popper.js's offset docs.                                                                                                                                                                                                                                                                                                                                                                        |
| `fallbackPlacement` | String or Array                     | `'flip'`         | Allow to specify which position Popper will use on fallback. Can be `flip`, `clockwise`, `counterclockwise` or an array of placements. For more information refer to Popper.js's behavior docs.                                                                                                                                                                                                                                                                             |
| `boundary`          | String ID or HTMLElement            | `'scrollParent'` | The container that the tooltip will be constrained visually. The default should suffice in most cases, but you may need to change this if your target element is in a small container with overflow scroll. Supported values: `'scrollParent'` (default), `'viewport'`, `'window'`, or a reference to an HTML element.                                                                                                                                                      |
| `boundaryPadding`   | Number                              | `5`              | Amount of pixel used to define a minimum distance between the boundaries and the tooltip. This makes sure the tooltip always has a little padding between the edges of its container.                                                                                                                                                                                                                                                                                       |
| `variant`           | String                              | `null`           | Contextual color variant for the tooltip.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `customClass`       | String                              | `null`           | A custom classname to apply to the tooltip outer wrapper element.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `id`                | String                              | `null`           | An ID to use on the tooltip root element. If none is provided, one will automatically be generated. If you do provide an ID, it _must_ be guaranteed to be unique on the rendered page.                                                                                                                                                                                                                                                                                     |
| `disabled`          | Boolean                             | `false`          | Set to `true` to disable the tooltip                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### Usage

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

**Variant examples:**

```
v-b-tooltip.v-primary => `primary` variant
v-b-tooltip.v-danger => `danger` variant
```

**Trigger examples:**

```
v-b-tooltip.hover => Hover only
v-b-tooltip.click => Click only
v-b-tooltip.hover.focus => Both hover and focus
```

**Combo:**

```
v-b-tooltip.hover.bottom => Show on hover and place at bottom
v-b-tooltip.bottom.hover => Same as above
v-b-tooltip.bottom.hover.v-danger => Same as above, but with variant
```

**Object:**

```
v-b-tooltip="{ title: 'Title', placement: 'bottom', variant: 'danger' }"
```

## Hiding and showing tooltips via \$root events

You can close (hide) **all open tooltips** by emitting the `bv::hide::tooltip` event on \$root:

```js
this.$root.$emit('bv::hide::tooltip')
```

To close a **specific tooltip**, pass the trigger element's `id`, or the `id` of the tooltip (if one
was provided in the config object) as the first argument:

```js
this.$root.$emit('bv::show::tooltip', 'my-trigger-button-id')
```

To open a **specific tooltip**, pass the trigger element's `id`, or the `id` of the tooltip (if one
was provided in the config object) as the first argument when emitting the `bv::show::tooltip`
\$root event:

```js
this.$root.$emit('bv::show::tooltip', 'my-trigger-button-id')
```

To open all popovers simultaneously, omit the `id` argument when emitting the `bv::show::tooltip`
event.

These events work for both the component **and** directive versions of tooltip.

Note the **trigger element** must exist in the DOM and be in a visible state in order for the
tooltip to show.

## Disabling and enabling tooltips via \$root events

You can disable **all open tooltips** by emitting the `bv::disable::tooltip` event on \$root:

```js
this.$root.$emit('bv::disable::tooltip')
```

To disable a **specific tooltip**, pass the trigger element's `id`, or the `id` of the tooltip (if
one was provided in the config object) as the first argument:

```js
this.$root.$emit('bv::disable::tooltip', 'my-trigger-button-id')
```

To enable a **specific tooltip**, pass the trigger element's `id`, or the `id` of the tooltip (if
one was provided in the config object) as the first argument when emitting the `bv::enable::tooltip`
\$root event:

```js
this.$root.$emit('bv::enable::tooltip', 'my-trigger-button-id')
```

To enable all popovers simultaneously, omit the `id` argument when emitting the
`bv::enable::tooltip` event.

These events work for both the component **and** directive versions of tooltip.

Note the **trigger element** must exist in the DOM in order for the tooltip to be enabled or
disabled.

## See also

- [`v-b-popover` directive](/docs/directives/popover)
- [`<b-tooltip>` component](/docs/components/tooltip)
- [`<b-popover>` component](/docs/components/popover)

<!-- Directive reference section auto generated from directive package.json -->
