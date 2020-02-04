# Tooltips

> Easily add tooltips to elements or components via the `<b-tooltip>` component or
> [`v-b-tooltip`](/docs/directives/tooltip) directive (preferred method).

```html
<div class="text-center my-3">
  <b-button v-b-tooltip.hover title="Tooltip directive content">
    Hover Me
  </b-button>

  <b-button id="tooltip-target-1">
    Hover Me
  </b-button>
  <b-tooltip target="tooltip-target-1" triggers="hover">
    I am tooltip <b>component</b> content!
  </b-tooltip>
</div>

<!-- b-tooltip.vue -->
```

## Overview

Things to know when using tooltip component:

- Tooltips rely on the 3rd party library [Popper.js](https://popper.js.org/) for positioning.
- Tooltips require BootstrapVue's custom SCSS/CSS in order to function correctly, and for variants.
- Triggering tooltips on hidden elements will not work.
- Specify `container` as `null` (default, appends to `<body>`) to avoid rendering problems in more
  complex components (like input groups, button groups, etc). You can use container to optionally
  specify a different element to append the rendered tooltip to.
- Tooltips for `disabled` elements must be triggered on a wrapper element.
- When triggered from hyperlinks that span multiple lines, tooltips will be centered. Use
  white-space: nowrap; on your `<a>`s, `<b-link>`s and `<router-link>`s to avoid this behavior.

The target element **must** exist in the document before `<b-tooltip>` is mounted. If the target
element is not found during mount, the tooltip will never open. Always place your `<b-tooltip>`
component lower in the DOM than your target element. This rule also applies if a callback is used as
target element, since that callback is called only once on mount.

## Positioning

Twelve options are available for positioning: `top`, `topleft`, `topright`, `right`, `righttop`,
`rightbottom`, `bottom`, `bottomleft`, `bottomright`, `left`, `lefttop`, and `leftbottom` aligned.
The default position is `top`. Positioning is relative to the trigger element.

<div class="bd-example bd-example-tooltip-static">
  <div class="tooltip b-tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow" style="left: calc(50% - 6px)"></div>
    <div class="tooltip-inner">Tooltip on the top</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow" style="right: 0px"></div>
    <div class="tooltip-inner">Tooltip on the topleft</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-top bs-tooltip-top-docs" role="tooltip">
    <div class="arrow" style="left: 0px"></div>
    <div class="tooltip-inner">Tooltip on the topright</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow" style="top: 5px"></div>
    <div class="tooltip-inner">Tooltip on the right</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow" style="bottom: 0px"></div>
    <div class="tooltip-inner">Tooltip on the righttop</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-right bs-tooltip-right-docs" role="tooltip">
    <div class="arrow" style="top: 0px"></div>
    <div class="tooltip-inner">Tooltip on the rightbottom</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow" style="left: calc(50% - 6px)"></div>
    <div class="tooltip-inner">Tooltip on the bottom</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow" style="right: 0px"></div>
    <div class="tooltip-inner">Tooltip on the bottomleft</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-bottom bs-tooltip-bottom-docs" role="tooltip">
    <div class="arrow" style="left: 0px"></div>
    <div class="tooltip-inner">Tooltip on the bottomright</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow" style="top: 5px"></div>
    <div class="tooltip-inner">Tooltip on the left</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow" style="bottom: 0px"></div>
    <div class="tooltip-inner">Tooltip on the lefttop</div>
  </div>
  <div class="tooltip b-tooltip bs-tooltip-left bs-tooltip-left-docs" role="tooltip">
    <div class="arrow" style="top: 0px"></div>
    <div class="tooltip-inner">Tooltip on the leftbottom</div>
  </div>
</div>

## Triggers

Tooltips can be triggered (opened/closed) via any combination of `click`, `hover` and `focus`. The
default trigger is `hover focus`. Or a trigger of `manual` can be specified, where the popover can
only be opened or closed [programmatically](#programmatically-disabling-tooltip).

If a tooltip has more than one trigger, then all triggers must be cleared before the tooltip will
close. I.e. if a tooltip has the trigger `focus click`, and it was opened by `focus`, and the user
then clicks the trigger element, they must click it again **and** move focus to close the tooltip.

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
  <span id="disabled-wrapper" class="d-inline-block" tabindex="0">
    <b-button variant="primary" style="pointer-events: none;" disabled>Disabled button</b-button>
  </span>
  <b-tooltip target="disabled-wrapper">Disabled tooltip</b-tooltip>
</div>

<!-- disabled-trigger-element.vue -->
```

## `<b-tooltip>` component usage

```html
<b-container fluid>
  <b-row>
    <b-col md="4" class="py-4">
      <b-button id="button-1" variant="outline-success">Live chat</b-button>
    </b-col>
    <b-col md="4" class="py-4">
      <b-button id="button-2" variant="outline-success">Html chat</b-button>
    </b-col>
    <b-col md="4" class="py-4">
      <b-button ref="button-3" variant="outline-success">Alternative chat</b-button>
    </b-col>
  </b-row>

  <!-- Tooltip title specified via prop title -->
  <b-tooltip target="button-1" title="Online!"></b-tooltip>

  <!-- HTML title specified via default slot -->
  <b-tooltip target="button-2" placement="bottom">
    Hello <strong>World!</strong>
  </b-tooltip>

  <!-- Tooltip for an element identified by ref -->
  <b-tooltip :target="() => $refs['button-3']" title="Alternative!"></b-tooltip>
</b-container>

<!-- b-tooltip-component.vue -->
```

### Component options

| Prop                 | Default          | Description                                                                                                                                                                                                | Supported values                                                                                                                                 |
| -------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `target`             | `null`           | Element String ID, or a reference to an element or component, or a function returning either of them, that you want to trigger the tooltip **Required**                                                    | Any valid, in-document unique element ID, element reference or component reference or a function returning any such ID / reference               |
| `title`              | `null`           | Tooltip content (text only, no HTML). if HTML is required, place it in the default slot                                                                                                                    | Plain text                                                                                                                                       |
| `placement`          | `'top'`          | Tooltip position, relative to the trigger element                                                                                                                                                          | `top`, `bottom`, `left`, `right`, `auto`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, `rightbottom` |
| `fallback-placement` | `'flip'`         | Auto-flip placement behaviour of the tooltip, relative to the trigger element                                                                                                                              | `flip`, `clockwise`, `counterclockwise`, or an array of valid placements evaluated from left to right                                            |
| `triggers`           | `'hover focus'`  | Space separated list of event(s), which will trigger open/close of tooltip                                                                                                                                 | `hover`, `focus`, `click`. Note `blur` is a special use case to close tooltip on next click, usually used in conjunction with `click`.           |
| `no-fade`            | `false`          | Disable fade animation when set to `true`                                                                                                                                                                  | `true` or `false`                                                                                                                                |
| `delay`              | `50`             | Delay showing and hiding of tooltip by specified number of milliseconds. Can also be specified as an object in the form of `{ show: 100, hide: 400 }` allowing different show and hide delays              | `0` and up, integers only.                                                                                                                       |
| `offset`             | `0`              | Shift the center of the tooltip by specified number of pixels                                                                                                                                              | Any negative or positive integer                                                                                                                 |
| `container`          | `null`           | Element string ID to append rendered tooltip into. If `null` or element not found, tooltip is appended to `<body>` (default)                                                                               | Any valid in-document unique element ID.                                                                                                         |
| `boundary`           | `'scrollParent'` | The container that the tooltip will be constrained visually. The default should suffice in most cases, but you may need to change this if your target element is in a small container with overflow scroll | `'scrollParent'` (default), `'viewport'`, `'window'`, or a reference to an HTML element.                                                         |
| `boundary-padding`   | `5`              | Amount of pixel used to define a minimum distance between the boundaries and the tooltip. This makes sure the tooltip always has a little padding between the edges of its container                       | Any positive number                                                                                                                              |
| `noninteractive`     | `false`          | Wether the tooltip should not be user-interactive                                                                                                                                                          | `true` or `false`                                                                                                                                |
| `variant`            | `null`           | Contextual color variant for the tooltip                                                                                                                                                                   | Any contextual theme color variant name                                                                                                          |
| `custom-class`       | `null`           | A custom classname to apply to the tooltip outer wrapper element                                                                                                                                           | A string                                                                                                                                         |
| `id`                 | `null`           | An ID to use on the tooltip root element. If none is provided, one will automatically be generated. If you do provide an ID, it _must_ be guaranteed to be unique on the rendered page                     | A valid unique element ID string                                                                                                                 |

### Noninteractive tooltips

BootstrapVue's tooltips are user-interactive by default for accessability reasons. To restore
Bootstraps default behavior apply the `noninteractive` prop:

```html
<div class="text-center">
  <div>
    <b-button id="tooltip-button-interactive">My tooltip is interactive</b-button>
    <b-tooltip target="tooltip-button-interactive">I will stay open when hovered</b-tooltip>
  </div>

  <div class="mt-3">
    <b-button id="tooltip-button-not-interactive">Mine is not...</b-button>
    <b-tooltip target="tooltip-button-not-interactive" noninteractive>Catch me if you can!</b-tooltip>
  </div>
</div>

<!-- b-tooltip-interactive.vue -->
```

### Variants and custom class

BootstrapVue's tooltips support contextual color variants via our custom CSS, via the `variant`
prop:

```html
<div class="text-center">
  <b-button id="tooltip-button-variant">Button</b-button>
  <b-tooltip target="tooltip-button-variant" variant="danger">Danger variant tooltip</b-tooltip>
</div>

<!-- b-tooltip-variant.vue -->
```

Bootstrap default theme variants are: `danger`, `warning`, `success`, `primary`, `secondary`,
`info`, `light`, and `dark`. You can change or add additional variants via Bootstrap
[SCSS variables](/docs/reference/theming)

A custom class can be applied to the tooltip outer wrapper `<div>` by using the `custom-class` prop:

```html
<div class="text-center">
  <b-button id="my-button">Button</b-button>
  <b-tooltip target="my-button" custom-class="my-tooltip-class">Tooltip Title</b-tooltip>
</div>
```

`variant` and `custom-class` are reactive and can be changed while the tooltip is open.

Refer to the [tooltip directive](/docs/directives/tooltip) docs on applying variants and custom
class to the directive version.

### Programmatically show and hide tooltip

You can manually control the visibility of a tooltip via the syncable Boolean `show` prop. Setting
it to `true` will show the tooltip, while setting it to `false` will hide the tooltip.

```html
<template>
  <div class="text-center">
    <div>
      <b-button id="tooltip-button-1" variant="primary">I have a tooltip</b-button>
    </div>

    <div class="mt-3">
      <b-button @click="show = !show">Toggle Tooltip</b-button>
    </div>

    <b-tooltip :show.sync="show" target="tooltip-button-1" placement="top">
      Hello <strong>World!</strong>
    </b-tooltip>
  </div>
</template>
<script>
  export default {
    data: {
      show: true
    }
  }
</script>

<!-- b-tooltip-show-sync.vue -->
```

To make the tooltip shown on initial render, simply add the `show` prop on `<b-tooltip>`:

```html
<div class="text-center">
  <b-button id="tooltip-button-2" variant="primary">Button</b-button>
  <b-tooltip show target="tooltip-button-2">I start open</b-tooltip>
</div>

<!-- b-tooltip-show-open.vue -->
```

Programmatic control can also be affected by submitting `'open'` and `'close'` events to the tooltip
by reference.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="tooltip-button-show-event" variant="primary">I have a tooltip</b-button>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="onOpen">Open</b-button>
      <b-button class="px-1" @click="onClose">Close</b-button>
    </div>

    <b-tooltip ref="tooltip" target="tooltip-button-show-event">
      Hello <strong>World!</strong>
    </b-tooltip>
  </div>
</template>

<script>
  export default {
    methods: {
      onOpen() {
        this.$refs.tooltip.$emit('open')
      },
      onClose() {
        this.$refs.tooltip.$emit('close')
      }
    }
  }
</script>

<!-- b-tooltip-show-ref-event.vue -->
```

You can also use `$root` events to trigger the showing and hiding of tooltip(s). See the **Hiding
and showing tooltips via \$root events** section below for details.

### Programmatically disabling tooltip

You can disable tooltip via the syncable Boolean prop `disabled` (default is `false`) Setting it to
`true` will disable the tooltip. If the tooltip is currently visible when disabled is set to
`false`, the tooltip will remain visible until it is enabled or programmatically closed. If the
tooltip is disabled/enabled via \$root events (see below), your `disabled` value will be updated as
long as you have provided the `.sync` prop modifier.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="tooltip-button-disable" variant="primary">I have a tooltip</b-button>
    </div>

    <div class="p-2">
      <b-button @click="disabled = !disabled">
        {{ disabled ? 'Enable' : 'Disable' }} Tooltip by prop
      </b-button>
      <b-button @click="disableByRef">
        {{ disabled ? 'Enable' : 'Disable' }} Tooltip by $ref event
      </b-button>

      <b-tooltip :disabled.sync="disabled" ref="tooltip" target="tooltip-button-disable">
        Hello <strong>World!</strong>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        disabled: false
      }
    },
    methods: {
      disableByRef() {
        if (this.disabled) {
          this.$refs.tooltip.$emit('enable')
        } else {
          this.$refs.tooltip.$emit('disable')
        }
      }
    }
  }
</script>

<!-- b-tooltip-disable.vue -->
```

**Note:** _In the above example, since we are using the default tooltip triggers of `focus hover`,
the tooltip will close before it is disabled due to loosing focus (and hover) to the toggle button._

You can also emit `$root` events to trigger disabling and enabling of tooltip(s). See the
**Disabling and enabling tooltips via \$root events** section below for details.

You can also emit `$root` events to trigger disabling and enabling of popover(s). See the
**Disabling and enabling tooltips via \$root events** section below for details.

## `v-b-tooltip` directive usage

The `v-b-tooltip` directive makes adding tooltips even easier, without additional placeholder
markup:

```html
<b-container fluid>
  <b-row>
    <b-col md="6" class="py-4">
      <b-button v-b-tooltip title="Online!" variant="outline-success">Live chat</b-button>
    </b-col>

    <b-col md="6" class="py-4">
      <b-button
        v-b-tooltip.html
        title="Hello <strong>World!</strong>"
        variant="outline-success"
      >
        Html chat
      </b-button>
    </b-col>
  </b-row>
</b-container>

<!-- b-tooltip-directive.vue -->
```

Refer to the [`v-b-tooltip` documentation](/docs/directives/tooltip) for more information and
features of the directive format.

## 'Global' \$root instance events

Using `$root` instance it is possible to emit and listen events somewhere out of a component, where
`<b-collapse>` is used. In short, `$root` behaves like a global event emitters and listener. Details
about `$root` instance can be found in
[the official Vue docs](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-the-Root-Instance).

### Hiding and showing tooltips via \$root events

You can close (hide) **all open tooltips** by emitting the `bv::hide::tooltip` event on \$root:

```js
this.$root.$emit('bv::hide::tooltip')
```

To close a **specific tooltip**, pass the trigger element's `id`, or the `id` of the tooltip (if one
was provided via the `id` prop), as the argument:

```js
this.$root.$emit('bv::show::tooltip', 'my-trigger-button-id')
```

To open a **specific tooltip**, pass the trigger element's `id`, or the `id` of the tooltip (if one
was provided via the `id` prop), as the argument when emitting the `bv::show::tooltip` \$root event:

```js
this.$root.$emit('bv::show::tooltip', 'my-trigger-button-id')
```

To open all tooltips simultaneously, omit the `id` argument when emitting the `bv::show::tooltip`
event.

These events work for both the component **and** directive versions of tooltip.

**Note:** _the **trigger element** must exist in the DOM and be in a visible state in order for the
tooltip to show._

### Disabling and enabling tooltips via \$root events

You can disable **all open tooltips** by emitting the `bv::disable::tooltip` event on \$root:

```js
this.$root.$emit('bv::disable::tooltip')
```

To disable a **specific tooltip**, pass the trigger element's `id`, or the `id` of the tooltip (if
one was provided via the `id` prop), as the argument:

```js
this.$root.$emit('bv::disable::tooltip', 'my-trigger-button-id')
```

To enable a **specific tooltip**, pass the trigger element's `id`, or the `id` of the tooltip (if
one was provided via the `id` prop), as the argument when emitting the `bv::enable::tooltip` \$root
event:

```js
this.$root.$emit('bv::enable::tooltip', 'my-trigger-button-id')
```

To enable all tooltips simultaneously, omit the `id` argument when emitting the
`bv::enable::tooltip` event.

These events work for both the component **and** directive versions of tooltip.

**Note:** _The **trigger element** must exist in the DOM in order for the tooltip to be enabled or
disabled._

### Listening to tooltip changes via \$root events

To listen to any tooltip opening, use:

```js
export default {
  mounted() {
    this.$root.$on('bv::tooltip::show', bvEvent => {
      console.log('bvEvent:', bvEvent)
    })
  }
}
```

Refer to the [Events](/docs/components/tooltip#component-reference) section of documentation for the
full list of events.

<!-- Component reference added automatically from component package.json -->
