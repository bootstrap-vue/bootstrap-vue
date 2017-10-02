# Popover

> The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive
element via the `<b-popover>` component or [`v-b-popover`](/docs/directives/popover) directive.

```html
<div class="text-center my-3">
  <b-btn v-b-popover.hover.auto="'I am popover content!'" title="Popover Title">Hover Me</b-btn>
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

**Note:** _When using slots for content and/or title, `<b-popover>` transfers the
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

### Dismiss on next click (self dimissing)
Use the `focus` trigger by itself to dismiss popovers on the next click that the user makes.
`focus` also makes the popover activate on both `focus` and `click` (as a click makes
the element receive focus, assuming it is in the tab sequence of the page).

You can, however, specify your trigger as `click blur`,  which will make only a
click activate the popover, and either a click on the element - _or losing foucus
to another element or part of the document_ - will close the popover.

This `blur` trigger must be used in combination with the `click` trigger.


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
    data: {
        placements: [
            'topright', 'top', 'topleft',
            'bottomright', 'bottom', 'bottomleft',
            'righttop', 'right', 'lefttop',
            'rightbottom', 'left', 'leftbottom'
        ]
    }
}
</script>

<!-- popover-1.vue -->
```

### Component options via props

| Prop | Default | Description | Supported values
| ---- | ------- | ----------- | ----------------
| `target` | `null` | String ID of element, or a reference to an element or component, that you want to trigger the popover. **Required** | Any valid, in-document unique element ID, or in-document element/component reference
| `title` | `null` | Title of popover (text only, no HTML). if HTML is required, place it in the `title` named slot | Plain text
| `content` | `null` | Content of popover (text only, no HTML). if HTML is required, place it in the default slot | Plain text
| `placement` | `'top'` | Positioning of the popover, relative to the trigger element. | `top`, `bottom`, `left`, `right`, `auto`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, `rightbottom`
| `triggers` | `'click'` |  Space separated list of which event(s) will trigger open/close of popover | `hover`, `focus`, `click`. Note `blur` is a special use case to close popover on next click.
| `no-fade` | `false` | Disable fade animation when set to `true` | `true` or `false`
| `delay` | `0` | Number of milliseconds to delay showing and hidding of popover. Can also be specified as an object in the form of `{ show: 100, hide: 400 }` allowing different show and hide delays | `0` and up, integers only.
| `offset` | `0` | Number of pixels to shift the center of the popover. Also affects the position of the popover arrow. | Any negative or positive integer
| `container` | `null` | String ID of element to append rendered popover into. If `null` or element not found, popover is appended to `<body>` (default) | Any valid in-document unique  element ID.


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
`focus`, `hover` or `blur` triggers (use only `click`), otherwsie your popover will
close automatically as soon as someone trys to interact with the content.

If you absolutely must use a trigger other than `click` (or want to disable closing of the
popover when the trigger element is clicked a second time), then you can either:
 - Listen for the `hide` event on the `<b-popover>` element, and call the `preventDefault()` method (when apropriate) on the `BvEvent` passed to your `hide` handler, or
 - Disable your trigger element (if possible) as soon as the popover opens (via the `show` event), and re-enable it when apropriate.

For practical purposes, interactive content popovers should be minimal. The maximum
width of the popover is hard coded by Bootstrap V4 CSS to `276px`. Tall popovers on
small screens can be harder to deal with on mobile devices (such as smart-phones).

```html
<template>
  <div id="myContainer">
    <div class="my-3">
      <!-- our triggering (target) element -->
      <b-btn id="exPopoverReactive1"
             :disabled="disabled"
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
        <b-form-group label="Name" horizontal class="mb-1" description="Enter your name">
          <b-form-input ref="input1" size="sm" v-model="input1"></b-form-input>
        </b-form-group>
        <b-form-group label="Color" horizontal class="mb-1" description="Pick a color">
          <b-form-select size="sm" v-model="input2" :options="options"></b-form-select>
        </b-form-group>
        <b-alert show class="small">
          <strong>Current Values:</strong><br>
          Name: <strong>{{ input1 }}</strong><br>
          Color: <strong>{{ input2 }}</strong>
        </b-alert>
        <b-btn @click="onCancel" size="sm" variant="danger">Cancel</b-btn>
        <b-btn @click="onOk" size="sm" variant="primary">Ok</b-btn>
      </div>
    </b-popover>
  </div>
</template>

<script>
  export default {
    data: {
      input1: '',
      input2: '',
      options: [{text:'- Choose 1 -', value:''},'Red','Green','Blue'],
      input1Return: '',
      input2Return: '',
      disabled: false
    },
    methods: {
      onClose() {
        // Emitting 'close' on the popover will trigger it to hide for us
        this.$refs.popover.$emit('close');
      },
      onCancel() {
        // Emitting 'close' on the popover will trigger it to hide for us
        this.$refs.popover.$emit('close');
      },
      onOk() {
        if (!this.input1 || !this.input2) {
          alert('Please enter something');
        } else {
          alert('Thats great!');
          // Emitting 'close' on the popover will trigger it to hide for us
          this.$refs.popover.$emit('close');
          // "Return" our popover "form" results
          this.input1Return = this.input1;
          this.input2Return = this.input2;
        }
      },
      onShow() {
        // This is called just before the popover is shown
        // Reset our popover "form" variables
        this.input1 = '';
        this.input2 = '';
        this.input1Return = '';
        this.input2Return = '';
        // Disable our trigger button to prevent popover closing on second click
        this.disabled = true;
      },
      onShown() {
        // Called just after the popover has been shown
        // Transfer focus to the first input
        this.focusRef(this.$refs.input1);
      },
      onHidden() {
        // Called just after the popover has finished hiding
        // We re-enable our button
        this.disabled = false;
        // And bring focus back to it
        this.focusRef(this.$refs.button);
      },
      focusRef(ref) {
        // Some references may be a component, functional component, or plain element
        // This handles that check before focusing, assuming a focus() method exists
        // We do this in a double nextTick to ensure components have updated & popover positioned first
        this.$nextTick(() => {
            this.$nextTick(() => { (ref.$el || ref).focus(); });
        });
      }
    }
  };
</script>

<!-- popover-advanced-1.vue -->
```

## Closing popovers
You can close all open popovers by emitting the `bv::hide::popover` event on $root:

```js
this.$root.$emit('bv::hide::popover');
```

## Accessibility
Popovers, in their current state, are not overly accessible when used as interactive
components. Content may not be activly read to screen reader users, and the popover
markup not be located close to the trigger element in the DOM (as popovers usually
get appended to the end of `<body>`).

When using popovers as interactive component, you should transfer focus into the
popover if possible. When the popover is closed, you should return focus back to
your triggering element (assuming `focus` is not used as a trigger method), as we
have done in the above example.

You may also want to implement focus containment in the popover content while the
user is interactiving with it (keeping focus inside the popover until it is closed
by the user).

## Component Reference
