# Modals

> Modals are streamlined, but flexible dialog prompts powered by JavaScript and CSS. They support a
> number of use cases from user notification to completely custom content and feature a handful of
> helpful sub-components, sizes, variants, accessibility, and more.

```html
<div>
  <b-button v-b-modal.modal1>Launch demo modal</b-button>

  <!-- Modal Component -->
  <b-modal id="modal1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
</div>

<!-- b-modal.vue -->
```

## Overview

`<b-modal>`, by default, has an **OK** and **Cancel** buttons in the footer. These buttons can be
customized by setting various props on the component. You can customize the size of the buttons,
disable buttons, hide the **Cancel** button (i.e. OK Only), choose a variant (e.g. `danger` for a
red OK button) using the `ok-variant` and `cancel-variant` props, and provide custom button content
using the `ok-title` and `cancel-title` props, or using the named slots `modal-ok` and
`modal-cancel`.

`<b-modal>` supports close on ESC (enabled by default), close on backdrop click (enabled by
default), and the `X` close button in the header (enabled by default). These features may be
disabled by setting the the props `no-close-on-esc`, `no-close-on-backdrop`, and `hide-header-close`
respectively.

You can override the modal title via the named slot `modal-title`, override the header completely
via the `modal-header` slot, and override the footer completely via the `modal-footer` slot.

**Note**: when using the `modal-footer` slot, the default **OK** and **Cancel** buttons will not be
present. Also, if you use the `modal-header` slot, the default header `X` close button will not be
present, nor can you use the `modal-title` slot.

## Toggle Modal Visibility

There are several methods that you can employ to toggle the visibility of `<b-modal>`.

### Using `v-b-modal` directive

Other elements can easily show modals using the `v-b-modal` directive.

```html
<div>
  <!-- Using modifiers -->
  <b-button v-b-modal.myModal>Show Modal</b-button>

  <!-- Using value -->
  <b-button v-b-modal="'myModal'">Show Modal</b-button>

  <!-- The modal -->
  <b-modal id="myModal">Hello From My Modal!</b-modal>
</div>

<!-- b-modal-directive.vue -->
```

This approach will automatically return focus to the trigger element once the modal closes (similar
to default Bootstrap functionality). Other approaches for toggling modal visibility will require
additional code to implement this accessibility feature.

See the **Accessibility** section below for details.

### Using `show()`, `hide()`, and `toggle()` component methods

You can access modal using `ref` attribute and then call the `show()`, `hide()` or `toggle()`
methods.

```html
<template>
  <div>
    <b-button @click="showModal" id="showBtn">Open Modal</b-button>
    <b-button @click="toggleModal" id="toggleBtn">Toggle Modal</b-button>

    <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
    </b-modal>
  </div>
</template>

<script>
  export default {
    methods: {
      showModal() {
        this.$refs.myModalRef.show()
      },
      hideModal() {
        this.$refs.myModalRef.hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to when
        // the modal has hidden
        this.$refs.myModalRef.toggle('#toggleBtn')
      }
    }
  }
</script>

<!-- b-modal-methods.vue -->
```

The `hide()` method accepts an optional argument. See section **Prevent Closing** below for details.

### Using `v-model` property

`v-model` property is always automatically synced with `<b-modal>` visible state and you can
show/hide using `v-model`.

```html
<template>
  <div>
    <b-button @click="modalShow = !modalShow">Open Modal</b-button>

    <b-modal v-model="modalShow">Hello From Modal!</b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modalShow: false
      }
    }
  }
</script>

<!-- b-modal-v-model.vue -->
```

When using the `v-model` property, do not use the `visible` property at the same time.

### Emitting Events on \$root

You can emit `bv::show::modal`, `bv::hide::modal`, and `bv::toggle::modal` events on `$root` with
the first argument set to the modal's id. An optional second argument can specify the element to
return focus to once the modal is closed. The second argument can be a CSS selector, an element
reference, or a component reference (the root element of the component will be focused).

```html
<div>
  <b-button @click="showModal" ref="btnShow">Open Modal</b-button>
  <b-button @click="toggleModal" ref="btnToggle">Toggle Modal</b-button>

  <b-modal id="modal1">
    <div class="d-block">Hello From My Modal!</div>
    <b-button @click="hideModal">Close Me</b-button>
    <b-button @click="toggleModal">Toggle Me</b-button>
  </b-modal>
</div>
```

```js
methods: {
  showModal () {
    this.$root.$emit('bv::show::modal','modal1', '#btnShow')
  },
  hideModal () {
    this.$root.$emit('bv::hide::modal','modal1', '#btnShow')
  },
  toggleModal () {
    this.$root.$emit('bv::toggle::modal','modal1', '#btnToggle')
  }
}
```

### Prevent Closing

To prevent `<b-modal>` from closing (for example when validation fails). you can call the
`.preventDefault()` method of the event object passed to your `ok` (**OK** button), `cancel`
(**Cancel** button) and `hide` event handlers. Note that `.preventDefault()`, when used, must be
called synchronously, as async is not supported.

```html
<template>
  <div>
    <b-button v-b-modal.modalPrevent>Launch demo modal</b-button>

    <!-- Main UI -->
    <div class="mt-3 mb-3">
      Submitted Names:
      <ul>
        <li v-for="n in names">{{ n }}</li>
      </ul>
    </div>

    <!-- Modal Component -->
    <b-modal
      id="modalPrevent"
      ref="modal"
      title="Submit your name"
      @ok="handleOk"
      @shown="clearName"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" placeholder="Enter your name" v-model="name" />
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        names: []
      }
    },
    methods: {
      clearName() {
        this.name = ''
      },
      handleOk(evt) {
        // Prevent modal from closing
        evt.preventDefault()
        if (!this.name) {
          alert('Please enter your name')
        } else {
          this.handleSubmit()
        }
      },
      handleSubmit() {
        this.names.push(this.name)
        this.clearName()
        this.$nextTick(() => {
          // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modal.hide()
        })
      }
    }
  }
</script>

<!-- b-modal-prevent-closing.vue -->
```

**Note**: events `ok` and `cancel` are emitted by modal's built in **OK** and **Cancel** buttons
respectively. These events will not be emitted, by default, if you have provided your own buttons in
the `modal-footer` slot or have hidden the footer. In this case use the `hide` event to control
cancelling of the modal close. Event `hide` is always emitted, even if `ok` and `cancel` are
emitted.

The `ok`, `cancel`, and `hide` event object contains several properties and methods:

| Property or Method   | Type     | Description                                                                                                                                                                                                                                                                                                |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `e.preventDefault()` | Method   | When called prevents the modal from closing                                                                                                                                                                                                                                                                |
| `trigger`            | Property | Will be one of: `ok` (Default **OK** Clicked), `cancel` (Default **Cancel** clicked), `esc` (if the <kbd>ESC</kbd> key was pressed), `backdrop` (if the backdrop was clicked), `headerclose` (if the header X button was clicked), the argument provided to the `hide()` method, or `undefined` otherwise. |
| `target`             | Property | A reference to the modal element                                                                                                                                                                                                                                                                           |
| `vueTarget`          | property | A reference to the modal's Vue VM instance                                                                                                                                                                                                                                                                 |

You can set the value of `trigger` by passing an argument to the component's `hide()` method for
advanced control.

**Note:** `ok` and `cancel` events will be only emitted when the argument to `hide()` is strictly
`'ok'` or `'cancel'` respectively. The argument passed to `hide()` will be placed into the `trigger`
property of the event object.

## Modal sizing

Modals have three optional sizes, available via the prop `size`. These sizes kick in at certain
breakpoints to avoid horizontal scrollbars on narrower viewports. Valid optional sizes are `sm`,
`lg`, and `xl`

```html
<div>
  <b-button v-b-modal.modalxl variant="primary">xl modal</b-button>
  <b-button v-b-modal.modallg variant="primary">lg modal</b-button>
  <b-button v-b-modal.modalsm variant="primary">sm modal</b-button>

  <b-modal id="modalxl" size="xl" title="Extra Large Modal">Hello Extra Large Modal!</b-modal>
  <b-modal id="modallg" size="lg" title="Large Modal">Hello Large Modal!</b-modal>
  <b-modal id="modalsm" size="sm" title="Small Modal">Hello Small Modal!</b-modal>
</div>

<!-- b-modal-sizes.vue -->
```

The `size` prop maps the size to the `.modal-<size>` classes.

## Scrolling long content

When modals become too long for the user’s viewport or device, they scroll independent of the page
itself. Try the demo below to see what we mean.

```html
<div>
  <b-button v-b-modal.modal-tall>Launch overflowing modal</b-button>

  <b-modal id="modal-tall" title="Overflowing Content">
    <p class="my-4" v-for="i in 20" :key="i">
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </p>
  </b-modal>
</div>

<!-- b-modal-scroll-overflow.vue -->
```

You can also create a scrollable modal that allows the scrolling of the modal body by setting the
prop `scrollable` to `true`.

```html
<div>
  <b-button v-b-modal.modal-scrollable>Launch scrolling modal</b-button>

  <b-modal id="modal-scrollable" scrollable title="Scrollable Content">
    <p class="my-4" v-for="i in 20" :key="i">
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </p>
  </b-modal>
</div>

<!-- b-modal-scrollable-content.vue -->
```

## Vertically centered modal

Vertically center your modal in the viewport by setting the `centered` prop.

```html
<div>
  <b-button v-b-modal.modal-center>Launch centered modal</b-button>

  <!-- Modal Component -->
  <b-modal id="modal-center" centered title="BootstrapVue">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>
</div>

<!-- b-modal-center-vertically.vue -->
```

Feel free to mix vertically `centered` with `scrollable`.

## Using the grid

Utilize the Bootstrap grid system within a modal by nesting `<b-container fluid>` within the
modal-body. Then, use the normal grid system `<b-row>` (or `<b-form-row>`) and `<b-col>` as you
would anywhere else.

## Tooltips and popovers

Tooltips and popovers can be placed within modals as needed. When modals are closed, any tooltips
and popovers within are also automatically dismissed. Tooltips and popovers are automatically
appended to the modal element (to ensure correct z-indexing), although you can override where they
are appended by specifying a container ID (refer to tooltip and popover docs for details).

```html
<div>
  <b-button v-b-modal.modalPopover>Show Modal</b-button>

  <b-modal id="modalPopover" title="Modal with Popover" ok-only>
    <p>
      This
      <b-button v-b-popover="'Popover inside a modal!'" title="Popover">Button</b-button>
      triggers a popover on click.
    </p>
    <p>
      This <a href="#" v-b-tooltip title="Tooltip in a modal!">Link</a> will show a tooltip on
      hover.
    </p>
  </b-modal>
</div>

<!-- b-modal-popover.vue -->
```

## Variants

Control the header, footer, and body background and text variants by setting the
`header-bg-variant`, `header-text-variant`, `body-bg-variant`, `body-text-variant`,
`footer-bg-variant`, and `footer-text-variant` props. Use any of the standard Bootstrap variants
such as `danger`, `warning`, `info`, `success`, `dark`, `light`, etc.

The variants for the bottom border of the header and top border of the footer can be controlled by
the `header-border-variant` and `footer-border-variant` props respectively.

```html
<template>
  <div>
    <b-button @click="show=true" variant="primary">Show Modal</b-button>

    <b-modal
      v-model="show"
      title="Modal Variants"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col cols="3" />
          <b-col>Background</b-col>
          <b-col>Text</b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="3">Header</b-col>
          <b-col><b-form-select :options="variants" v-model="headerBgVariant" /></b-col>
          <b-col><b-form-select :options="variants" v-model="headerTextVariant" /></b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="3">Body</b-col>
          <b-col><b-form-select :options="variants" v-model="bodyBgVariant" /></b-col>
          <b-col><b-form-select :options="variants" v-model="bodyTextVariant" /></b-col>
        </b-row>

        <b-row>
          <b-col cols="3">Footer</b-col>
          <b-col><b-form-select :options="variants" v-model="footerBgVariant" /></b-col>
          <b-col><b-form-select :options="variants" v-model="footerTextVariant" /></b-col>
        </b-row>
      </b-container>

      <div slot="modal-footer" class="w-100">
        <p class="float-left">Modal Footer Content</p>
        <b-button size="sm" class="float-right" variant="primary" @click="show=false">Close</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'warning',
        footerTextVariant: 'dark'
      }
    }
  }
</script>

<!-- b-modal-variants.vue -->
```

You can also apply arbitrary classes to the modal dialog container, content (modal window itself),
header, body and footer via the `modal-class`, `content-class`, `header-class`, `body-class` and
`footer-class` props, respectively. The props accept either a string or array of strings.

## Lazy loading

Modal will always render its HTML markup in the document at the location that the `<b-modal>`
component is placed (even if it is not shown). You can hide the modal markup from being in the DOM
while modal is in the hidden state by setting the `lazy` prop.

## Disable open and close animation

To disable the fading transition/animation when modal opens and closes, just set the prop `no-fade`
on the `<b-modal>` component.

## Disabling built-in buttons

You can disable the built-in footer buttons programmatically.

You can disable the **Cancel** and **OK** buttons individually by setting the `cancel-disabled` and
`ok-disabled` props, respectively, to `true`. Set the prop to `false` to re-enable the button.

To disable both **Cancel** and **OK** buttons at the same time, simply set the `busy` prop to
`true`. Set it to `false` to re-enable both buttons.

## Multiple modal support

Unlike native Bootstrap V4, BootstrapVue supports multiple modals opened at the same time.

To disable stacking for a specific modal, just set the prop `no-stacking` on the `<b-modal>`
component. This will hide the modal before another modal is shown.

```html
<div>
  <b-button v-b-modal.modal-multi-1>Open First Modal</b-button>

  <b-modal id="modal-multi-1" size="lg" title="First Modal" ok-only no-stacking>
    <p class="my-2">First Modal</p>
    <b-button v-b-modal.modal-multi-2>Open Second Modal</b-button>
  </b-modal>

  <b-modal id="modal-multi-2" title="Second Modal" ok-only>
    <p class="my-2">Second Modal</p>
    <b-button v-b-modal.modal-multi-3 size="sm">Open Third Modal</b-button>
  </b-modal>

  <b-modal id="modal-multi-3" size="sm" title="Third Modal" ok-only>
    <p class="my-1">Third Modal</p>
  </b-modal>
</div>

<!-- b-modal-multiple.vue -->
```

**Notes:**

- Do not nest `b-modal` _inside_ another `b-modal`, as it will get "constrained" to the boundaries
  of the containing modal dialog.
- The opaque backdrop will appear progressively darker for each modal that is opened. This is
  expected behaviour as each backdrop is opened over top the other backdrops.
- For multiple modals to stack properly, they **must** be defined in the document in the order they
  will be opened, otherwise a newly opened modal may appear hidden or obscured by a currently open
  modal.

## Listening to modal changes via \$root events

To listen to any modal opening, use:

```js
mounted() {
  this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
    console.log('Modal is about to be shown', bvEvent, modalId)
  })
}
```

Refer to the [Events](/docs/components/modal#component-reference) section of documentation for the
full list of events.

## Accessibility

`<b-modal>` provides several accessibility features, including auto focus, return focus, and
keyboard (tab) _focus containment_.

For `aria-labelledby` and `aria-described` by attributes to appear on the modal, you **must** supply
an `id` attribute on `<b-modal>`. `aria-labelledby` will not be present if you have the header
hidden.

## Auto Focus on open

`<b-modal>` will autofocus the modal container when opened.

You can pre-focus an element within the `<b-modal>` by listening to the `<b-modal>` `shown` event,
and call the element's `focus()` method. `<b-modal>` will not attempt to autofocus if an element
already has focus within the `<b-modal>`.

```html
<b-modal @shown="focusMyElement">
  <div>
    <b-button>I Don't Have Focus</b-button>
  </div>

  <div>
    <b-form-input type="text" />
  </div>

  <div>
    <!-- Element to gain focus when modal is opened -->
    <b-form-input ref="focusThis" type="text" />
  </div>

  <div>
    <b-form-input type="text" />
  </div>
</b-modal>
```

```js
methods: {
  focusMyElement(e) {
    this.$refs.focusThis.focus()
  }
}
```

## Returning focus to the triggering element

For accessibility reasons, it is desirable to return focus to the element that triggered the opening
of the modal, when the modal closes. `<b-modal>` provides several methods and options for returning
focus to the triggering element.

### Specify Return Focus Element via the `return-focus` Prop

You can also specify an element to return focus to, when modal closes, by setting the `return-focus`
prop to one of the following:

- A CSS Query Selector string (or an element ID prepended with `#`)
- A component reference (which is mounted on a focusable element, such as `<b-button>`)
- A reference to a DOM element that is focusable

If the passed in element is not focusable, then the browser will determine what has focus (usually
`<body>`, which is not desirable)

This method for returning focus is handy when you use the `<b-modal>` methods `show()` and `hide()`,
or the `v-model` prop. Note this property takes precedence over other methods of specifying the
return focus element.

### Auto Return Focus

When `<b-modal>` is opened via the `v-b-modal` directive on an element, focus will be returned to
this element automatically when `<b-modal>` closes, unless an element has been specified via the
`return-focus` prop.

### Specify Return Focus via Event

When using the `bv::show::modal` event (emitted on `$root`), you can specify a second argument which
is the element to return focus to. This argument accepts the same types as the `return-focus` prop.

```js
this.$root.$emit('bv::show::modal', 'modal1', '#focusThisOnClose')
```

_Tip:_ if using a click event (or similar) to trigger modal to open, pass the event's `target`
property:

```html
<div>
  <b-button @click="$root.$emit('bv::show::modal', 'modal1', $event.target)">Open Modal</b-button>
</div>
```

**Note:** If the `<b-modal>` has the `return-focus` prop set, then the element specified via the
event will be ignored.

## Keyboard Navigation

When tabbing through elements within a `<b-modal>`, if focus attempts to leave the modal into the
document, it will be brought back into the modal.

In some circumstances, you may need to disable the enforce focus feature. You can do this by setting
the prop `no-enforce-focus`.

<!-- Component reference added automatically from component package.json -->
