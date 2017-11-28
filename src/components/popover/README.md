# Popover

> The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive
element via the `<b-popover>` component or [`v-b-popover`](/docs/directives/popover) directive.

```html
<div class="my-3">
  <b-btn v-b-popover.hover="'I am popover content!'" title="Popover Title">
    Hover Me
  </b-btn>
</div>

<!-- popover-example-1.vue -->
```

## Overview

Things to know when using popover component:
 - Popovers rely on the 3rd party library Popper.js for positioning. The library is bundled with Bootstrap-Vue dist files!
 - Popovers with zero-length title _and_ content are never displayed.
 - Specify `container` as `null` (default, appends to `<body>`) to avoid rendering problems in more complex components (like input groups, button groups, etc). You can use `container` to optionally specify a different element to append the popover to.
 - Triggering popovers on hidden elements will not work.
 - Popovers for `disabled` elements must be triggered on a wrapper element.
 - When triggered from hyperlinks that span multiple lines, popovers will be centered. Use `white-space: nowrap;` on your `<a>`s, `<b-link>`s and `<router-link>`s to avoid this behavior.
 - Popovers must be hidden before their corresponding markup elements have been removed from the DOM.

The `<b-popover>` component inserts a hidden (`display: none;`) `<div>` intermediate container
element at the point in the DOM where the `<b-popover>` component is placed. This may
affect layout and/or styling of components such as `<b-button-group>`, `<b-button-toolbar>`,
and `<b-input-group>`. To avoid these posible layout issues, place the `<b-popover>`
component **outside** of theese types of components.

The target element **must** exist in the document before `<b-popover>` is mounted.
If the target element is not found during mount, the popover will never open. Always
place your `<b-popover>` component lower in the DOM than your target element.

>**Note:** _When using slots for content and/or title, `<b-popover>` transfers the
rendered DOM from those slots into the popover's markup when shown, and returns
them back to the `<b-popover>` component when hidden. This may cause some issues
in rare circumstances, so please test your implmentation accordingly! The `title`
and `content` props do not have this behavior. For simple popovers, we recommend
using the `v-b-popover` directive and enable the `html` modifer if needed._

## Positioning
Twelve options are available for positioning: `top`, `topleft`, `topright`, `right`, `righttop`,
`rightbottom`, `bottom`, `bottomleft`, `bottomright`, `left`, `lefttop`, and `leftbottom` aligned.
Positioning is relative to the trigger element.

<div class="bd-example bd-example-popover-static">
  <div class="popover bs-popover-top bs-popover-top-docs">
    <div class="arrow"></div>
    <h3 class="popover-header">Popover top</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>
  <div class="popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="left:93%"></div>
    <h3 class="popover-header">Popover topleft</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>
  <div class="popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="left:4%"></div>
    <h3 class="popover-header">Popover topright</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>

  <div class="popover bs-popover-right bs-popover-right-docs">
    <div class="arrow"></div>
    <h3 class="popover-header">Popover right</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>
  <div class="popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="top:89%"></div>
    <h3 class="popover-header">Popover righttop</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>
  <div class="popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="top:7%"></div>
    <h3 class="popover-header">Popover rightbottom</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>

  <div class="popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow"></div>
    <h3 class="popover-header">Popover bottom</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>
  <div class="popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="left:93%"></div>
    <h3 class="popover-header">Popover bottomleft</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>
  <div class="popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="left:4%"></div>
    <h3 class="popover-header">Popover bottomright</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>

  <div class="popover bs-popover-left bs-popover-left-docs">
    <div class="arrow"></div>
    <h3 class="popover-header">Popover left</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>
  <div class="popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="top:89%"></div>
    <h3 class="popover-header">Popover lefttop</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>
  <div class="popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="top:7%"></div>
    <h3 class="popover-header">Popover leftbottom</h3>
    <div class="popover-body">
      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
    </div>
  </div>

  <div class="clearfix"></div>
</div>


## Triggers
Popovers can be triggered (opened/closed) via any combination of `click`, `hover` and
`focus`. The default trigger is `click`.

If a popover has more than one trigger, then all triggers must be cleared before the
popover will close. I.e. if a popover has the trigger `focus click`, and it was opened by
`focus`, and the user then clicks the trigger element, they must click it again **and**
move focus to close the popover.

### Dismiss on next click (self-dismissing)
Use the `focus` trigger by itself to dismiss popovers on the next click that the user makes.
`focus` also makes the popover activate on both `focus` and `click` (as a click makes
the element receive focus, assuming it is in the tab sequence of the page).

You can, however, specify your trigger as `click blur`,  which will make only a
click activate the popover, and either a click on the element, _or_ losing focus
to another element or part of the document will close the popover.

The special `blur` trigger must be used in combination with the `click` trigger.


## `<b-popover>` Component basic usage
```html
<template>
  <b-container fluid>

    <h5 class="my-3">Placement</h5>
    <b-row>
      <b-col md="4" class="py-4 text-center"
           v-for="placement in placements" :key="placement">
        <b-btn :id="'exPopover1-'+placement" variant="primary">
          {{ placement }}
        </b-btn>
        <b-popover :target="'exPopover1-'+placement"
                   :placement="placement"
                   title="Popover!"
                   triggers="hover focus"
                   :content="`Placement ${placement}`">
        </b-popover>
      </b-col>
    </b-row>

    <h5 class="my-3">Content via properties or slots</h5>
    <b-row>
      <b-col md="6" class="py-4 text-center">
        <b-btn id="exPopover2" variant="primary">Using properties</b-btn>
        <b-popover target="exPopover2"
            title="Prop Examples"
            triggers="hover focus"
            content="Embedding content using properties is easy">
        </b-popover>
      </b-col>
      <b-col md="6" class="py-4 text-center">
        <b-btn id="exPopover3" variant="primary">Using slots</b-btn>
        <b-popover target="exPopover3" triggers="hover focus">
           <template slot="title">Content via Slots</template>
           Embedding content <span class="text-danger">using slots</span>
           affords you <em>greater <strong>control.</strong></em> and
           basic HTML support.
        </b-popover>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
export default {
  data () {
    return {
      placements: [
        'topright', 'top', 'topleft',
        'bottomright', 'bottom', 'bottomleft',
        'righttop', 'right', 'lefttop',
        'rightbottom', 'left', 'leftbottom'
      ]
    }
  }
}
</script>

<!-- popover-1.vue -->
```

### Component options via props

| Prop | Default | Description | Supported values
| ---- | ------- | ----------- | ----------------
| `target` | `null` | Element string ID, or a reference to an element or component, that you want to trigger the popover. **Required** | Any valid in-document unique element ID, or in-document element/component reference
| `title` | `null` | Popover title (text only, no HTML). If HTML is required, place it in the `title` named slot | Plain text
| `content` | `null` | Popover content (text only, no HTML). If HTML is required, place it in the default slot | Plain text
| `placement` | `'right'` | Positioning of the popover, relative to the trigger element. | `auto`, `top`, `bottom`, `left`, `right`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, `rightbottom`
| `disabled` | `false` | Programmatic control of the Popover display state. Recommended to use with [sync modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier). | `true`, `false`
| `triggers` | `'click'` | Space separated list of event(s), which will trigger open/close of popover using built-in handling | `hover`, `focus`, `click`. Note `blur` is a special use case to close popover on next click.
| `no-fade` | `false` | Disable fade animation when set to `true` | `true` or `false`
| `delay` | `0` | Delay showing and hiding of popover by specified number of milliseconds. Can also be defined as an object in the form of `{ show: 100, hide: 400 }` allowing different show and hide delays | `0` and up, integers only.
| `offset` | `0` | Shift the center of the popover by specified number of pixels. Also affects the position of the popover arrow. | Any negative or positive integer
| `container` | `null` | Element string ID to append rendered popover into. If `null` or element not found, popover is appended to `<body>` (default) | Any valid in-document unique  element ID.


### Programmatically show and hide popover

You can manually control the visibility of a popover via the syncable Boolean `show` prop.
Setting it to `true` will show the popover, while setting it to `false` will hide the popover.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-btn id="popoverButton-sync" variant="primary">I have a popover</b-btn>
    </div>
    <div class="p-2">
      <b-btn class="px-1" @click="show = !show">Toggle Popover</b-btn>

      <b-popover :show.sync="show" target="popoverButton-sync" title="Popover">
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

<!-- popover-show-sync.vue -->
```

Programmatic control can also be affected by submitting `'open'` and `'close'`
events to the popover by reference.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-btn id="popoverButton-event" variant="primary">I have a popover</b-btn>
    </div>
    <div class="p-2">
      <b-btn class="px-1" @click="onOpen">Open</b-btn>
      <b-btn class="px-1" @click="onClose">Close</b-btn>
    </div>

    <b-popover ref="popover" target="popoverButton-event" title="Popover">
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

<!-- popover-show-event.vue -->
```

To make the popover shown on initial render, simply add the `show` prop
on `<b-popover>`:

```html
<div class="text-center">
  <b-btn id="popoverButton-open" variant="primary">Button</b-btn>

  <b-popover show target="popoverButton-open" title="Popover">
    I start <strong>open</strong>
  </b-popover>
</div>

<!-- popover-show-open.vue -->
```

A popover which is opened programmatically via the 'show' property or by an event call
can only be closed programmatically. Built-in triggers will work inadequatly, because trigger
event will try to open the popover even though it is already opened.

In the below example, when the first Popover is opened with the 'open' event, it will
take two button clicks to close it. Play with the below demo to understand this. When
you desire graceful handling of both programmatic control of the Popover
component as well as user interaction triggers, you should disable built-in
triggers and handle control yourself as demonstrated by the second Popover.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-btn id="exPopoverManual1" variant="primary" ref="button">
        Unreliable
      </b-btn>
      <b-popover target="exPopoverManual1"
                 :show.sync="pop1"
                 triggers="click"
                 ref="popover1">
        I can be stubborn sometimes.
      </b-popover>
    </div>
    <div class="p-2">
      <b-btn id="exPopoverManual2" variant="primary" ref="button" @click="pop2 = !pop2">
        Comfortably Numb
      </b-btn>
      <b-popover target="exPopoverManual2"
                 :show.sync="pop2"
                 triggers=""
                 ref="popover2">
        I do believe it's working, good.
      </b-popover>
    </div>
    <div class="p-2">
      <b-btn class="px-1" @click="popOpen">
        Open
      </b-btn>
      <b-btn class="px-1" @click="popClose">
        Close
      </b-btn>
      <b-btn class="px-1" @click="popToggle">
        Toggle
      </b-btn>
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
        this.pop1 = this.pop2 = true;
      },
      popClose() {
        this.pop1 = this.pop2 = false;
      },
      popToggle() {
        this.pop1 = !this.pop1;
        this.pop2 = !this.pop2;
      }
    }
  }
</script>

<!-- popover-advanced-caution.vue -->
```

You can also use `$root` events to trigger the showing and hiding of popover(s).
See the **Hiding and showing popovers via $root events** section below for details.

### Programmatically disabling popover

You can disable popover via the syncable Boolean prop `disabled` (default vlaue is `false`)
Setting it to `true` will disable the popover. If the popover is currently visible
when disabled is set to `false`, it will remain visible until it is enabled or
programmatically closed. If the popover is disabled/enabled via $root events (see below),
your `disabled` value will be updated as long as you have provided the `.sync` prop modifier.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-btn id="popoverButton-disable" variant="primary">I have a popover</b-btn>
    </div>
    <div class="p-2">
      <b-btn @click="disabled = !disabled">
        {{ disabled ? 'Enable' : 'Disable' }} Popover by prop
      </b-btn>
      
      <b-btn @click="disableByRef">
        {{ disabled ? 'Enable' : 'Disable' }} Popover by $ref event
      </b-btn>

      <b-popover :disabled.sync="disabled" target="popoverButton-disable" title="Popover">
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
           if (this.disabled){
               this.$refs.popover.$emit('enable')
           }else{
               this.$refs.popover.$emit('disable')
           }
       } 
    }
  }
</script>

<!-- popover-disable.vue -->
```

Programmatic control can also be affected by submitting `'enable'` and `'disable'`
events to the popover by reference.

```html
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-btn id="popoverButton-disableevent" variant="primary">I have a popover</b-btn>
    </div>
    <div class="p-2">
      <b-btn class="px-1" @click="onEnable">Enable</b-btn>
      <b-btn class="px-1" @click="onDisable">Disable</b-btn>
    </div>

    <b-popover ref="popover" target="popoverButton-disableevent" title="Popover">
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

<!-- popover-disabled-event.vue -->
```

When disabled, the popover can be opened programmatically (either via the `show` prop,
methods or events).

You can also use `$root` events to trigger disabling and enabling of popover(s).
See the **Disabling and enabling popovers via $root events** section below for details.


## `v-b-popover` Directive usage

Just need quick popovers without too much markup? Use the
[`v-b-popover` directive](/docs/directives/popover):

```html
<template>
  <b-container fluid>

    <h4 class="mt-sm-4 ms-sm-4 text-muted">Placement</h4>
    <b-row>
      <b-col md="3" class="py-3 text-center">
        <b-btn v-b-popover.hover.top="'I am Top'"
               title="Popover!"
               variant="primary">Top</b-btn>
      </b-col>
      <b-col md="3" class="py-3 text-center">
        <b-btn v-b-popover.hover.left="'I am Left'"
               title="Popover!"
               variant="primary">Left</b-btn>
      </b-col>
      <b-col md="3" class="py-3 text-center">
        <b-btn v-b-popover.hover.right="'I am Right'"
               title="Popover!"
               variant="primary">Right</b-btn>
      </b-col>
      <b-col md="3" class="py-3 text-center">
        <b-btn v-b-popover.hover.bottom="'I am Bottom'"
               title="Popover!"
               variant="primary">Bottom</b-btn>
      </b-col>
    </b-row>

  </b-container>
</template>

<!-- popover-directive-1.vue -->
```

Refer to the [`v-b-popover` directive](/docs/directives/popover) documentation for detailed
information on the directive usage.

## Advanced `<b-popover>` usage with reactive content

You can even make your `<b-popover>` content interactive. Just remember not to use the
`focus`, `hover` or `blur` triggers (use only `click`), otherwise your popover will
close automatically as soon as someone will try to interact with the content.

If you absolutely must use a trigger other than `click` (or want to disable closing of the
popover when the trigger element is clicked a second time), then you can either:
 - Listen for the `hide` event on the `<b-popover>` element, and call the `preventDefault()` method (when appropriate) on the `BvEvent` object passed to your `hide` handler;
 - Disable your trigger element (if possible) as soon as the popover begins to open (via the `show` event), and re-enable it when appropriate (i.e. via the `hide` or `hidden` event).

For practical purposes, interactive content popovers should be minimal. The maximum
width of the popover is hard coded by Bootstrap V4 CSS to `276px`. Tall popovers on
small screens can be harder to deal with on mobile devices (such as smart-phones).

```html
<template>
  <div id="myContainer">
    <div class="my-3">
      <!-- our triggering (target) element -->
      <b-btn id="exPopoverReactive1"
             :disabled="popoverShow"
             variant="primary"
             ref="button">
        Reactive Content Using Slots
      </b-btn>
    </div>

    <!-- output from the popover interaction -->
    <b-card title="Returned values:" v-if="input1Return && input2Return">
      <p class="card-text" style="max-width:20rem;">
        Name: <strong>{{ input1Return }}</strong><br>
        Color: <strong>{{ input2Return }}</strong>
      </p>
    </b-card>

    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button in tab sequence -->
    <b-popover target="exPopoverReactive1"
               triggers="click"
               :show.sync="popoverShow"
               placement="auto"
               container="myContainer"
               ref="popover"
               @show="onShow"
               @shown="onShown"
               @hidden="onHidden">
      <template slot="title">
        <b-btn @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-btn>
        Interactive Content
      </template>
      <div>
        <b-form-group label="Name" :state="input1state" horizontal class="mb-1"
           description="Enter your name" invalid-feedback="This field is required">
          <b-form-input ref="input1" :state="input1state" size="sm" v-model="input1"></b-form-input>
        </b-form-group>
        <b-form-group label="Color" :state="input2state" horizontal class="mb-1"
           description="Pick a color" invalid-feedback="This field is required">
          <b-form-select size="sm" :state="input2state" v-model="input2" :options="options"></b-form-select>
        </b-form-group>
        <b-alert show class="small">
          <strong>Current Values:</strong><br>
          Name: <strong>{{ input1 }}</strong><br>
          Color: <strong>{{ input2 }}</strong>
        </b-alert>
        <b-btn @click="onClose" size="sm" variant="danger">Cancel</b-btn>
        <b-btn @click="onOk" size="sm" variant="primary">Ok</b-btn>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input1: '',
      input1state: null,
      input2: '',
      input2state: null,
      options: [{text: '- Choose 1 -', value: ''}, 'Red', 'Green', 'Blue'],
      input1Return: '',
      input2Return: '',
      popoverShow: false
    }
  },
  watch: {
    input1 (val) {
      if (val) {
        this.input1state = true
      }
    },
    input2 (val) {
      if (val) {
        this.input2state = true
      }
    }
  },
  methods: {
    onClose () {
      this.popoverShow = false
    },
    onOk () {
      if (!this.input1) { this.input1state = false }
      if (!this.input2) { this.input2state = false }
      if (this.input1 && this.input2) {
        this.onClose()
        // "Return" our popover "form" results
        this.input1Return = this.input1
        this.input2Return = this.input2
      }
    },
    onShow () {
      // This is called just before the popover is shown
      // Reset our popover "form" variables
      this.input1 = ''
      this.input2 = ''
      this.input1state = null
      this.input2state = null
      this.input1Return = ''
      this.input2Return = ''
    },
    onShown () {
      // Called just after the popover has been shown
      // Transfer focus to the first input
      this.focusRef(this.$refs.input1)
    },
    onHidden () {
      // Called just after the popover has finished hiding
      // Bring focus back to the button
      this.focusRef(this.$refs.button)
    },
    focusRef (ref) {
      // Some references may be a component, functional component, or plain element
      // This handles that check before focusing, assuming a focus() method exists
      // We do this in a double nextTick to ensure components have updated & popover positioned first
      this.$nextTick(() => {
        this.$nextTick(() => { (ref.$el || ref).focus() })
      })
    }
  }
}
</script>

<!-- popover-advanced-1.vue -->
```

## Hiding and showing popovers via $root events
You can close (hide) **all open popovers** by emitting the `bv::hide::popover` event on $root:

```js
this.$root.$emit('bv::hide::popover');
```

To close a **specific popover**, pass the trigger element's `id` as the first argument:

```js
this.$root.$emit('bv::show::popover', 'my-trigger-button-id');
```

To open (show) a **specific popover**, pass the trigger element's `id` as the first argument when
emitting the `bv::show::popover` event:

```js
this.$root.$emit('bv::show::popover', 'my-trigger-button-id');
```

To open all popovers simultaneously, omit the `id` argument when emitting the
`bv::show::popover` event.

These events work for both the component **and** directive versions of popover.

>**Note:** _The **trigger element** must exist in the DOM and be in a visible state in order for the popover to instantiate and show._


## Disabling and enabling popovers via $root events
You can disable **all** popovers by emitting the `bv::disable::popover` event on $root:

```js
this.$root.$emit('bv::disable::popover');
```

To disable a **specific popover**, pass the trigger element's `id` as the first argument:

```js
this.$root.$emit('bv::disable::popover', 'my-trigger-button-id');
```

To enable a **specific popover**, pass the trigger element's `id` as the first argument when
emitting the `bv::enable::popover` event:

```js
this.$root.$emit('bv::enable::popover', 'my-trigger-button-id');
```

To enable all popovers simultaneously, omit the `id` argument when emitting the
`bv::enable::popover` event.

These events work for both the component and directive versions of popover.

>**Note:** _The **trigger element** must exist in the DOM in order for the popover to be enabled or disabled._


## Accessibility
Popovers, in their current implementation, are not overly accessible when used as interactive
components. Content may not be actively read to screen reader users, and the popover
markup might not be located close to the trigger element in the DOM (as popovers usually
get appended to the end of `<body>`).

When using popovers as interactive component, you should transfer focus into the
popover if possible. When the popover is closed, you should return focus back to
your triggering element (assuming `focus` is not used as a trigger method), as we
have done in the above example.

You may also want to implement focus containment in the popover content while the
user is interacting with it (keeping focus inside the popover until it is closed
by the user).


## Component Reference
