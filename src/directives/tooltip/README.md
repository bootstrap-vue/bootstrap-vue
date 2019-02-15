# Tooltips

> Documentation and examples for adding custom BootstrapVue tooltips, using Bootstrap V4 CSS for
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

Things to know when using tooltips:

- Tooltips rely on the 3rd party library Popper.js for positioning. The library is bundled with
  BootstrapVue!
- Tooltips with zero-length titles are never displayed.
- Specify container: 'body' (default) to avoid rendering problems in more complex components (like
  input groups, button groups, etc).
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
        <b-button v-b-tooltip.hover.top="'ToolTip!'" variant="primary">Top</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.right="'ToolTip!'" variant="primary">Right</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.left="'ToolTip!'" variant="primary">Left</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover.bottom="'ToolTip!'" variant="primary">Bottom</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-tooltip-positioning.vue -->
```

## Triggers

Tooltips can be triggered (opened/closed) via any combination of `click`, `hover` and `focus`. The
default trigger is `hover focus`.

If a tooltip has more than one trigger, then all triggers must be cleared before the tooltip will
close. I.e. if a tooltip has the trigger `focus click`, and it was opened by `focus`, and the user
then clicks the trigger element, they must click it again **and** move focus to close the tooltip.

```html
<div>
  <b-container>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip="'ToolTip!'" variant="outline-success">Hover + Focus</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover="'ToolTip!'" variant="outline-success">Hover</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.click="'ToolTip!'" variant="outline-success">Click</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.focus="'ToolTip!'" variant="outline-success">Focus</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-tooltip-triggers.vue -->
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

```js
{
   title: 'This is the title',
}
```

If your title content has basic HTML markup, then you will also need to set the `html` property to
true, or use the directive modifier `html`

```js
// Object format with HTML:
{
   title: 'This is the <string>title</strong>',
   html: true
}
```

Title can also be a function reference, which is called each time the tooltip is opened.

```html
<template>
  <b-container>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-tooltip.hover title="Tip from title attribute" variant="success">Title</b-button>
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
        tipData: 'Tooltip <em>Message</em>'
      }
    },
    methods: {
      tipMethod() {
        return '<strong>' + new Date() + '</string>'
      }
    }
  }
</script>

<!-- b-tooltip-content.vue -->
```

## Directive syntax and usage

```
v-b-tooltip:[container].[mod1].[mod2].[...].[modN]="<value>"
```

Where [container] can be (optional)

- An element ID (minus the #) to place the tooltip markup in
- If not provided, tooltips are appended to the `body`. If the trigger element is inside a modal,
  the tooltip will be appended to the modal's container

Where [modX] can be (all optional):

- Positioning: `top`, `bottom`, `left`, `right`, `auto`, `topleft`, `topright`, `bottomleft`,
  `bottomright`, `lefttop`, `leftbottom`, `righttop`, or `rightbottom` (last one found wins,
  defaults to `top`)
- Event trigger: `click`, `hover`, `focus`, `blur` (if none specified, defaults to `focus` and
  `hover`. `blur` is a close handler only, and if specified by itself, will be converted to `focus`)
- `nofade` to turn off animation
- `html` to enable rendering raw HTML. By default HTML is escaped and converted to text
- A delay value in the format of `d###` (where `###` is in ms, defaults to 0);
- An offset value in pixels in the format of `o###` (where `###` is the number of pixels, defaults
  to 0. Negative values allowed)
- A boundary setting of `window` or `viewport`. The element to constrain the visual placement of the
  tooltip. If not specified, the boundary defaults to the trigger element's scroll parent (in most
  cases this will suffice).

Where `<value>` can be (optional):

- A string containing the title of the tooltip
- A function reference to generate the title of the tooltip (receives one arg which is a reference
  to the DOM element triggering the tooltip)
- An object containing more complex configuration of tooltip. See below for accepted object
  properties:

**Options configuration object properties:**

| Property            | Type                            | Default                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`         | boolean                         | `true`                                                                                                   | Apply a CSS fade transition to the tooltip.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `container`         | string or Element or `false`    | `false`                                                                                                  | Appends the tooltip to a specific element. Example: `container: 'body'`. This option is particularly useful in that it allows you to position the tooltip in the flow of the document near the triggering element - which will prevent the tooltip from floating away from the triggering element during a window resize. When set to `false` the tooltip will be appended to `body`, or if the trigger element is inside a modal it will append to the modal's container. |
| `delay`             | Number or Object                | `0`                                                                                                      | Delay showing and hiding the tooltip (ms). If a number is supplied, delay is applied to both hide/show. Object structure is: `delay: { "show": 500, "hide": 100 }`                                                                                                                                                                                                                                                                                                         |
| `html`              | Boolean                         | `false`                                                                                                  | Allow HTML in the tooltip. If true, HTML tags in the tooltip's title will be rendered in the tooltip. If false, the titkle will be inserted as plain text. Use text if you're worried about XSS attacks.                                                                                                                                                                                                                                                                   |
| `placement`         | String or Function              | `'top'`                                                                                                  | How to position the tooltip - `auto`, `top`, `bottom`, `left`, `right`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, or `rightbottom`. When `auto` is specified, it will dynamically reorient the tooltip.                                                                                                                                                                                                                     |
| `template`          | String                          | `'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'` | Base HTML to use when creating the tooltip. The tooltip's title will be injected into the `.tooltip-inner`, while `.arrow` will become the tooltip's arrow. The outermost wrapper element should have the `.tooltip` class.                                                                                                                                                                                                                                                |
| `title`             | String or Element or function   | `''`                                                                                                     | Default title value if title attribute isn't present. If a function is given, it must return a string.                                                                                                                                                                                                                                                                                                                                                                     |
| `trigger`           | String                          | `'hover focus'`                                                                                          | How tooltip is triggered: `click`, `hover`, `focus`. You may pass multiple triggers; separate them with a space.                                                                                                                                                                                                                                                                                                                                                           |
| `offset`            | Number or String                | `0`                                                                                                      | Offset of the tooltip relative to its target. For more information refer to Popper.js's offset docs.                                                                                                                                                                                                                                                                                                                                                                       |
| `fallbackPlacement` | String or Array                 | `'flip'`                                                                                                 | Allow to specify which position Popper will use on fallback. For more information refer to Popper.js's behavior docs.                                                                                                                                                                                                                                                                                                                                                      |
| `boundary`          | String or HTMLElement reference | `'scrollParent'`                                                                                         | The container that the tooltip will be constrained visually. The default should suffice in most cases, but you may need to chagne this if your target element is in a small container with overflow scroll. Supported values: `'scrollParent'` (default), `'viewport'`, `'window'`, or a reference to an HTML element.                                                                                                                                                     |
| `boundaryPadding`   | Number                          | `5`                                                                                                      | Amount of pixel used to define a minimum distance between the boundaries and the tooltip. This makes sure the tooltip always has a little padding between the edges of its container.                                                                                                                                                                                                                                                                                      |

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
```

**Object:**

```
v-b-tooltip="{title: 'Title', placement: 'bottom'}"
```

## Hiding and showing tooltips via \$root events

You can close (hide) **all open tooltips** by emitting the `bv::hide::tooltip` event on \$root:

```js
this.$root.$emit('bv::hide::tooltip')
```

To close a **specific tooltip**, pass the trigger element's `id` as the first argument:

```js
this.$root.$emit('bv::show::tooltip', 'my-trigger-button-id')
```

To open a **specific tooltip**, pass the trigger element's `id` as the first argument when emitting
the `bv::show::tooltip` \$root event:

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

To disable a **specific tooltip**, pass the trigger element's `id` as the first argument:

```js
this.$root.$emit('bv::disable::tooltip', 'my-trigger-button-id')
```

To enable a **specific tooltip**, pass the trigger element's `id` as the first argument when
emitting the `bv::enable::tooltip` \$root event:

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
