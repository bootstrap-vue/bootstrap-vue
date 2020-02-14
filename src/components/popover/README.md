# Popover

> The Popover feature, which provides a tooltip-like behavior, can be easily applied to any
> interactive element via the `<b-popover>` component or [`v-b-popover`](/docs/directives/popover)
> directive.

```html
<div class="text-center my-3">
  <b-button v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title">
    Hover Me
  </b-button>

  <b-button id="popover-target-1">
    Hover Me
  </b-button>
  <b-popover target="popover-target-1" triggers="hover" placement="top">
    <template v-slot:title>Popover Title</template>
    I am popover <b>component</b> content!
  </b-popover>
</div>

<!-- b-popover.vue -->
```

## Overview

Things to know when using popover component:

- Popovers rely on the 3rd party library [Popper.js](https://popper.js.org/) for positioning.
- Popovers require BootstrapVue's custom SCSS/CSS in order to function correctly, and for variants.
- Specify `container` as `null` (default, appends to `<body>`) to avoid rendering problems in more
  complex components (like input groups, button groups, etc). You can use `container` to optionally
  specify a different element to append the rendered popover to.
- Triggering popovers on hidden elements will not work.
- Popovers for `disabled` elements must be triggered on a wrapper element.
- When triggered from hyperlinks that span multiple lines, popovers will be centered. Use
  `white-space: nowrap;` on your `<a>`s, `<b-link>`s and `<router-link>`s to avoid this behavior.

The target element **must** exist in the document before `<b-popover>` is mounted. If the target
element is not found during mount, the popover will never open. Always place your `<b-popover>`
component lower in the DOM than your target element.

## Positioning

Twelve options are available for positioning: `top`, `topleft`, `topright`, `right`, `righttop`,
`rightbottom`, `bottom`, `bottomleft`, `bottomright`, `left`, `lefttop`, and `leftbottom` aligned.
Positioning is relative to the trigger element.

<div class="bd-example bd-example-popover-static">
  <div class="popover b-popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="left: calc(50% - 8px)"></div>
    <h3 class="popover-header">Popover top</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="right: 0px"></div>
    <h3 class="popover-header">Popover topleft</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="left: 0px"></div>
    <h3 class="popover-header">Popover topright</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover b-popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="top: calc(50% - 4px)"></div>
    <h3 class="popover-header">Popover right</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="bottom: 0px"></div>
    <h3 class="popover-header">Popover righttop</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="top: 0px"></div>
    <h3 class="popover-header">Popover rightbottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover b-popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="left: calc(50% - 8px)"></div>
    <h3 class="popover-header">Popover bottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="right: 0px"></div>
    <h3 class="popover-header">Popover bottomleft</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="left: 0px"></div>
    <h3 class="popover-header">Popover bottomright</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover b-popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="top: calc(50% - 4px)"></div>
    <h3 class="popover-header">Popover left</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="bottom: 0px"></div>
    <h3 class="popover-header">Popover lefttop</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="top: 0px"></div>
    <h3 class="popover-header">Popover leftbottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="clearfix"></div>
</div>

## Triggers

Popovers can be triggered (opened/closed) via any combination of `click`, `hover` and `focus`. The
default trigger is `click`. Or a trigger of `manual` can be specified, where the popover can only be
opened or closed [programmatically](#programmatically-disabling-popover).

If a popover has more than one trigger, then all triggers must be cleared before the popover will
close. I.e. if a popover has the trigger `focus click`, and it was opened by `focus`, and the user
then clicks the trigger element, they must click it again **and** move focus to close the popover.

### Caveats with `focus` trigger on `<button>` elements

For proper cross-browser and cross-platform behavior when using only the `focus` trigger, you must
use an element that renders the `<a>` tag, not the `<button>` tag, and you also must include a
`tabindex="0"` attribute.

The following will generate an `<a>` that looks like a button:

```html
<b-button
  href="#"
  tabindex="0"
  v-b-popover.focus="'Popover content'"
  title="Popover title"
>
  Link button with popover directive
</b-button>

<b-button id="link-button" href="#" tabindex="0">
  Link button with popover component
</b-button>
<b-popover target="link-button" title="Popover title" triggers="focus">
  Popover content
</b-popover>
```

### Dismiss on next click (self-dismissing)

Use the `focus` trigger by itself to dismiss popovers on the next click that the user makes. `focus`
also makes the popover activate on both `focus` and `click` (as a click makes the element receive
focus on most browsers, assuming it is in the tab sequence of the page).

You can, however, specify your trigger as `click blur`, which will make only a click activate the
popover, and either a click on the element, _or_ losing focus to another element or part of the
document will close the popover.

The special `blur` trigger **must** be used in combination with the `click` trigger.

## `<b-popover>` Component basic usage

```html
<template>
  <b-container fluid>
    <h5 class="my-3">Placement</h5>
    <b-row>
      <b-col
        v-for="placement in placements"
        :key="placement"
        md="4"
        class="py-4 text-center"
      >
        <b-button :id="`popover-1-${placement}`" variant="primary">{{ placement }}</b-button>
        <b-popover
          :target="`popover-1-${placement}`"
          :placement="placement"
          title="Popover!"
          triggers="hover focus"
          :content="`Placement ${placement}`"
        ></b-popover>
      </b-col>
    </b-row>

    <h5 class="my-3">Content via properties or slots</h5>
    <b-row>
      <b-col md="6" class="py-4 text-center">
        <b-button id="popover-2" variant="primary">Using properties</b-button>
        <b-popover
          target="popover-2"
          title="Prop Examples"
          triggers="hover focus"
          content="Embedding content using properties is easy"
        ></b-popover>
      </b-col>

      <b-col md="6" class="py-4 text-center">
        <b-button id="popover-3" variant="primary">Using slots</b-button>
        <b-popover target="popover-3" triggers="hover focus">
          <template v-slot:title>Content via Slots</template>
          Embedding content <span class="text-danger">using slots</span> affords you
          <em>greater <strong>control.</strong></em> and basic HTML support.
        </b-popover>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        placements: [
          'topright',
          'top',
          'topleft',
          'bottomright',
          'bottom',
          'bottomleft',
          'righttop',
          'right',
          'lefttop',
          'rightbottom',
          'left',
          'leftbottom'
        ]
      }
    }
  }
</script>

<!-- b-popover-placements.vue -->
```

### Component options via props

| Prop                 | Default          | Description                                                                                                                                                                                                | Supported values                                                                                                                                 |
| -------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `target`             | `null`           | Element string ID, or a reference to an element or component, that you want to trigger the popover. **Required**                                                                                           | Any valid in-document unique element ID, or in-document element/component reference                                                              |
| `title`              | `null`           | Popover title (text only, no HTML). If HTML or reactivity is required, use the `title` named slot                                                                                                          | Plain text                                                                                                                                       |
| `content`            | `null`           | Popover content (text only, no HTML). If HTML or reactivity is required, use the default slot                                                                                                              | Plain text                                                                                                                                       |
| `placement`          | `'right'`        | Positioning of the popover, relative to the trigger element.                                                                                                                                               | `auto`, `top`, `bottom`, `left`, `right`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, `rightbottom` |
| `fallback-placement` | `'flip'`         | Auto-flip placement behaviour of the popover, relative to the trigger element.                                                                                                                             | `flip`, `clockwise`, `counterclockwise`, or an array of valid placements evaluated from left to right                                            |
| `disabled`           | `false`          | Programmatic control of the Popover display state. Recommended to use with [sync modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier).                                                      | `true`, `false`                                                                                                                                  |
| `triggers`           | `'click'`        | Space separated list of event(s), which will trigger open/close of popover using built-in handling                                                                                                         | `hover`, `focus`, `click`. Note `blur` is a special use case to close popover on next click.                                                     |
| `no-fade`            | `false`          | Disable fade animation when set to `true`                                                                                                                                                                  | `true` or `false`                                                                                                                                |
| `delay`              | `50`             | Delay showing and hiding of popover by specified number of milliseconds. Can also be defined as an object in the form of `{ show: 100, hide: 400 }` allowing different show and hide delays                | `0` and up, integers only.                                                                                                                       |
| `offset`             | `0`              | Shift the center of the popover by specified number of pixels. Also affects the position of the popover arrow.                                                                                             | Any negative or positive integer                                                                                                                 |
| `container`          | `null`           | Element string ID to append rendered popover into. If `null` or element not found, popover is appended to `<body>` (default)                                                                               | Any valid in-document unique element ID.                                                                                                         |
| `boundary`           | `'scrollParent'` | The container that the popover will be constrained visually. The default should suffice in most cases, but you may need to change this if your target element is in a small container with overflow scroll | `'scrollParent'` (default), `'viewport'`, `'window'`, or a reference to an HTML element.                                                         |
| `boundary-padding`   | `5`              | Amount of pixel used to define a minimum distance between the boundaries and the popover. This makes sure the popover always has a little padding between the edges of its container.                      | Any positive number                                                                                                                              |
| `variant`            | `null`           | Contextual color variant for the popover                                                                                                                                                                   | Any contextual theme color variant name                                                                                                          |
| `custom-class`       | `null`           | A custom classname to apply to the popover outer wrapper element                                                                                                                                           | A string                                                                                                                                         |
| `id`                 | `null`           | An ID to use on the popover root element. If none is provided, one will automatically be generated. If you do provide an ID, it _must_ be guaranteed to be unique on the rendered page.                    | A valid unique element ID string                                                                                                                 |

### Variants and custom class

BootstrapVue's popovers support contextual color variants via our custom CSS, via the `variant`
prop:

```html
<div class="text-center">
  <b-button id="popover-button-variant" href="#" tabindex="0">Button</b-button>
  <b-popover target="popover-button-variant" variant="danger" triggers="focus">
    <template v-slot:title>Danger!</template>
    Danger variant popover
  </b-popover>
</div>

<!-- b-popover-variant.vue -->
```

Bootstrap default theme variants are: `danger`, `warning`, `success`, `primary`, `secondary`,
`info`, `light`, and `dark`. You can change or add additional variants via Bootstrap
[SCSS variables](/docs/reference/theming)

A custom class can be applied to the popover outer wrapper `<div>` by using the `custom-class` prop:

```html
<div class="text-center">
  <b-button id="my-button">Button</b-button>
  <b-popover target="my-button" custom-class="my-popover-class">
    <template v-slot:title>Popover Title</template>
    Popover content
  </b-popover>
</div>
```

`variant` and `custom-class` are reactive and can be changed while the popover is open.

Refer to the [popover directive](/docs/directives/popover) docs on applying variants and custom
class to the directive version.

### Programmatically show and hide popover

You can manually control the visibility of a popover via the syncable Boolean `show` prop. Setting
it to `true` will show the popover, while setting it to `false` will hide the popover.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-button-sync" variant="primary">I have a popover</b-button>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="show = !show">Toggle Popover</b-button>

      <b-popover :show.sync="show" target="popover-button-sync" title="Popover">
        Hello <strong>World!</strong>
      </b-popover>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>

<!-- b-popover-show-sync.vue -->
```

Programmatic control can also be affected by submitting `'open'` and `'close'` events to the popover
by reference.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-button-event" variant="primary">I have a popover</b-button>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="onOpen">Open</b-button>
      <b-button class="px-1" @click="onClose">Close</b-button>
    </div>

    <b-popover ref="popover" target="popover-button-event" title="Popover">
      Hello <strong>World!</strong>
    </b-popover>
  </div>
</template>

<script>
  export default {
    methods: {
      onOpen() {
        this.$refs.popover.$emit('open')
      },
      onClose() {
        this.$refs.popover.$emit('close')
      }
    }
  }
</script>

<!-- b-popover-show-event.vue -->
```

To make the popover shown on initial render, simply add the `show` prop on `<b-popover>`:

```html
<div class="text-center">
  <b-button id="popover-button-open" variant="primary">Button</b-button>

  <b-popover show target="popover-button-open" title="Popover">
    I start <strong>open</strong>
  </b-popover>
</div>

<!-- b-popover-show-open.vue -->
```

A popover which is opened programmatically via the 'show' property or by an event call can only be
closed programmatically. Built-in triggers will work inadequately, because trigger event will try to
open the popover even though it is already opened.

In the below example, when the first Popover is opened with the 'open' event, it will take two
button clicks to close it. Play with the below demo to understand this. When you desire graceful
handling of both programmatic control of the Popover component as well as user interaction triggers,
you should disable built-in triggers and handle control yourself as demonstrated by the second
Popover.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-manual-1" variant="primary" ref="button">Unreliable</b-button>

      <b-popover target="popover-manual-1" :show.sync="pop1" triggers="click">
        I can be stubborn sometimes.
      </b-popover>
    </div>

    <div class="p-2">
      <b-button id="popover-manual-2" variant="primary" ref="button" @click="pop2 = !pop2">
        Comfortably Numb
      </b-button>

      <b-popover target="popover-manual-2" :show.sync="pop2" triggers="">
        I do believe it's working, good.
      </b-popover>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="popOpen">Open</b-button>
      <b-button class="px-1" @click="popClose">Close</b-button>
      <b-button class="px-1" @click="popToggle">Toggle</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pop1: false,
        pop2: false
      }
    },
    methods: {
      popOpen() {
        this.pop1 = this.pop2 = true
      },
      popClose() {
        this.pop1 = this.pop2 = false
      },
      popToggle() {
        this.pop1 = !this.pop1
        this.pop2 = !this.pop2
      }
    }
  }
</script>

<!-- b-popover-advanced-caution.vue -->
```

You can also use `$root` events to trigger the showing and hiding of popover(s). See the **Hiding
and showing popovers via \$root events** section below for details.

### Programmatically disabling popover

You can disable popover via the syncable Boolean prop `disabled` (default value is `false`) Setting
it to `true` will disable the popover. If the popover is currently visible when disabled is set to
`false`, it will remain visible until it is enabled or programmatically closed. If the popover is
disabled/enabled via \$root events (see below), your `disabled` value will be updated as long as you
have provided the `.sync` prop modifier.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-button-disable" variant="primary">I have a popover</b-button>
    </div>

    <div class="p-2">
      <b-button @click="disabled = !disabled">
        {{ disabled ? 'Enable' : 'Disable' }} Popover by prop
      </b-button>
      <b-button @click="disableByRef">
        {{ disabled ? 'Enable' : 'Disable' }} Popover by $ref event
      </b-button>

      <b-popover
        :disabled.sync="disabled"
        target="popover-button-disable"
        title="Popover"
        ref="popover"
      >
        Hello <strong>World!</strong>
      </b-popover>
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
          this.$refs.popover.$emit('enable')
        } else {
          this.$refs.popover.$emit('disable')
        }
      }
    }
  }
</script>

<!-- b-popover-disable.vue -->
```

Programmatic control can also be affected by submitting `'enable'` and `'disable'` events to the
popover by reference.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-button-disable-event" variant="primary">I have a popover</b-button>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="onEnable">Enable</b-button>
      <b-button class="px-1" @click="onDisable">Disable</b-button>
    </div>

    <b-popover ref="popover" target="popover-button-disable-event" title="Popover">
      Hello <strong>World!</strong>
    </b-popover>
  </div>
</template>

<script>
  export default {
    methods: {
      onEnable() {
        this.$refs.popover.$emit('enable')
      },
      onDisable() {
        this.$refs.popover.$emit('disable')
      }
    }
  }
</script>

<!-- b-popover-disabled-event.vue -->
```

When disabled, the popover can be opened programmatically (either via the `show` prop, methods or
events).

You can also use `$root` events to trigger disabling and enabling of popover(s). See the **Disabling
and enabling popovers via \$root events** section below for details.

## `v-b-popover` Directive usage

Just need quick popovers without too much markup? Use the
[`v-b-popover` directive](/docs/directives/popover):

```html
<div>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.top="'Popover!'" title="Title" variant="primary">Top</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.right="'Popover!'" title="Title" variant="primary">Right</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.left="'Popover!'" title="Title" variant="primary">Left</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.bottom="'Popover!'" title="Title" variant="primary">Bottom</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-popover-directive-placement.vue -->
```

Refer to the [`v-b-popover` directive](/docs/directives/popover) documentation for detailed
information on the directive usage.

## Advanced `<b-popover>` usage with reactive content

You can even make your `<b-popover>` content interactive. Just remember not to use the `focus` or
triggers (use only `click`).

If you absolutely must use a trigger other than `click` (or want to disable closing of the popover
when the trigger element is clicked a second time), then you can either:

- Listen for the `hide` event on the `<b-popover>` element, and call the `preventDefault()` method
  (when appropriate) on the `BvEvent` object passed to your `hide` handler;
- Disable your trigger element (if possible) as soon as the popover begins to open (via the `show`
  event), and re-enable it when appropriate (i.e. via the `hide` or `hidden` event).

For practical purposes, **interactive content popovers should be minimal**. The maximum width of the
popover is hard coded by Bootstrap v4 CSS to `276px`. Tall popovers on small screens can be harder
to deal with on mobile devices (such as smart-phones).

```html
<template>
  <div id="my-container">
    <div class="my-3">
      <!-- Our triggering (target) element -->
      <b-button id="popover-reactive-1" variant="primary" ref="button">
        Reactive Content Using Slots
      </b-button>
    </div>

    <!-- Output from the popover interaction -->
    <b-card title="Returned values:" v-if="input1Return && input2Return">
      <p class="card-text" style="max-width: 20rem;">
        Name: <strong>{{ input1Return }}</strong><br>
        Color: <strong>{{ input2Return }}</strong>
      </p>
    </b-card>

    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
      target="popover-reactive-1"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template v-slot:title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        Interactive Content
      </template>

      <div>
        <b-form-group
          label="Name"
          label-for="popover-input-1"
          label-cols="3"
          :state="input1state"
          class="mb-1"
          description="Enter your name"
          invalid-feedback="This field is required"
        >
          <b-form-input
            ref="input1"
            id="popover-input-1"
            v-model="input1"
            :state="input1state"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Color"
          label-for="popover-input-2"
          label-cols="3"
          :state="input2state"
          class="mb-1"
          description="Pick a color"
          invalid-feedback="This field is required"
        >
          <b-form-select
            id="popover-input-2"
            v-model="input2"
            :state="input2state"
            :options="options"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-alert show class="small">
          <strong>Current Values:</strong><br>
          Name: <strong>{{ input1 }}</strong><br>
          Color: <strong>{{ input2 }}</strong>
        </b-alert>

        <b-button @click="onClose" size="sm" variant="danger">Cancel</b-button>
        <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
      </div>
    </b-popover>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input1: '',
        input1state: null,
        input2: '',
        input2state: null,
        options: [{ text: '- Choose 1 -', value: '' }, 'Red', 'Green', 'Blue'],
        input1Return: '',
        input2Return: '',
        popoverShow: false
      }
    },
    watch: {
      input1(val) {
        if (val) {
          this.input1state = true
        }
      },
      input2(val) {
        if (val) {
          this.input2state = true
        }
      }
    },
    methods: {
      onClose() {
        this.popoverShow = false
      },
      onOk() {
        if (!this.input1) {
          this.input1state = false
        }
        if (!this.input2) {
          this.input2state = false
        }
        if (this.input1 && this.input2) {
          this.onClose()
          // Return our popover form results
          this.input1Return = this.input1
          this.input2Return = this.input2
        }
      },
      onShow() {
        // This is called just before the popover is shown
        // Reset our popover form variables
        this.input1 = ''
        this.input2 = ''
        this.input1state = null
        this.input2state = null
        this.input1Return = ''
        this.input2Return = ''
      },
      onShown() {
        // Called just after the popover has been shown
        // Transfer focus to the first input
        this.focusRef(this.$refs.input1)
      },
      onHidden() {
        // Called just after the popover has finished hiding
        // Bring focus back to the button
        this.focusRef(this.$refs.button)
      },
      focusRef(ref) {
        // Some references may be a component, functional component, or plain element
        // This handles that check before focusing, assuming a `focus()` method exists
        // We do this in a double `$nextTick()` to ensure components have
        // updated & popover positioned first
        this.$nextTick(() => {
          this.$nextTick(() => {
            ;(ref.$el || ref).focus()
          })
        })
      }
    }
  }
</script>

<!-- b-popover-advanced.vue -->
```

## 'Global' \$root instance events

Using `$root` instance it is possible to emit and listen events somewhere out of a component, where
`<b-collapse>` is used. In short, `$root` behaves like a global event emitters and listener. Details
about `$root` instance can be found in
[the official Vue docs](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-the-Root-Instance).

### Hiding and showing popovers via \$root events

You can close (hide) **all open popovers** by emitting the `bv::hide::popover` event on \$root:

```js
this.$root.$emit('bv::hide::popover')
```

To close a **specific popover**, pass the trigger element's `id`, or the `id` of the popover (if one
was provided via the `id` prop), as the first argument:

```js
this.$root.$emit('bv::hide::popover', 'my-trigger-button-id')
```

To open (show) a **specific popover**, pass the trigger element's `id`, or the `id` of the popover
(if one was provided via the `id` prop), as the first argument when emitting the `bv::show::popover`
event:

```js
this.$root.$emit('bv::show::popover', 'my-trigger-button-id')
```

To open all popovers simultaneously, omit the `id` argument when emitting the `bv::show::popover`
event.

These events work for both the component **and** directive versions of popover.

**Note:** _The **trigger element** must exist in the DOM and be in a visible state in order for the
popover to instantiate and show._

### Disabling and enabling popovers via \$root events

You can disable **all** popovers by emitting the `bv::disable::popover` event on \$root:

```js
this.$root.$emit('bv::disable::popover')
```

To disable a **specific popover**, pass the trigger element's `id`, or the `id` of the popover (if
one was provided via the `id` prop), as the first argument:

```js
this.$root.$emit('bv::disable::popover', 'my-trigger-button-id')
```

To enable a **specific popover**, pass the trigger element's `id`, or the `id` of the popover (if
one was provided via the `id` prop), as the first argument when emitting the `bv::enable::popover`
event:

```js
this.$root.$emit('bv::enable::popover', 'my-trigger-button-id')
```

To enable all popovers simultaneously, omit the `id` argument when emitting the
`bv::enable::popover` event.

These events work for both the component and directive versions of popover.

**Note:** _The **trigger element** must exist in the DOM in order for the popover to be enabled or
disabled._

### Listening to popover changes via \$root events

To listen to any popover opening, use:

```js
export default {
  mounted() {
    this.$root.$on('bv::popover::show', bvEventObj => {
      console.log('bvEventObj:', bvEventObj)
    })
  }
}
```

Refer to the [Events](/docs/components/popover#component-reference) section of documentation for the
full list of events.

## Accessibility

Popovers, in their current implementation, are not overly accessible when used as interactive
components. Content may not be actively read to screen reader users, and the popover markup might
not be located close to the trigger element in the DOM (as popovers usually get appended to the end
of `<body>`).

When using popovers as interactive component, you should transfer focus into the popover if
possible. When the popover is closed, you should return focus back to your triggering element
(assuming `focus` is not used as a trigger method), as we have done in the above example.

You may also want to implement focus containment in the popover content while the user is
interacting with it (keeping focus inside the popover until it is closed by the user).

### Making popovers work for keyboard and assistive technology users

To allow keyboard users to activate your popovers, you should only add them to HTML elements that
are traditionally keyboard-focusable and interactive (such as links or form controls). Although
arbitrary HTML elements (such as `<span>`s) can be made focusable by adding the `tabindex="0"`
attribute, this will add potentially annoying and confusing tab stops on non-interactive elements
for keyboard users, and most assistive technologies currently do not announce the popover's content
in this situation. Additionally, do not rely solely on `hover` as the trigger for your popovers, as
this will make them impossible to trigger for keyboard users.

While you can insert rich, structured HTML and/or components in popovers via slots, we strongly
recommend that you avoid adding an excessive amount of content. The way popovers currently work is
that, once displayed, their content is tied to the trigger element with the `aria-describedby`
attribute. As a result, the entirety of the popover's content will be announced (read) to assistive
technology users as one long, uninterrupted stream.

Additionally, while it is possible to also include interactive controls (such as form elements or
links) in your popover, be aware that currently the popover does not manage keyboard focus order.
When a keyboard user opens a popover, focus remains on the triggering element, and as the popover
usually does not immediately follow the trigger in the document's structure, there is no guarantee
that moving forward/pressing <kbd>TAB</kbd> will move a keyboard user into the popover itself. In
short, simply adding interactive controls to a popover is likely to make these controls
unreachable/unusable for keyboard users and users of assistive technologies, or at the very least
make for an illogical overall focus order. **In these cases, consider using a `<b-modal>` dialog
instead**.

<!-- Component reference added automatically from component package.json -->
