# Modal

> Modals are streamlined, but flexible dialog prompts powered by JavaScript and CSS. They support a
> number of use cases from user notification to completely custom content and feature a handful of
> helpful sub-components, sizes, variants, accessibility, and more.

```html
<div>
  <b-button v-b-modal.modal-1>Launch demo modal</b-button>

  <b-modal id="modal-1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
</div>

<!-- b-modal.vue -->
```

## Overview

`<b-modal>`, by default, has an **OK** and **Cancel** buttons in the footer. These buttons can be
customized by setting various props on the component. You can customize the size of the buttons,
disable buttons, hide the **Cancel** button (i.e. `ok-only`), choose a variant (e.g. `danger` for a
red OK button) using the `ok-variant` and `cancel-variant` props, and provide custom button content
using the `ok-title` and `cancel-title` props, or using the named slots `modal-ok` and
`modal-cancel`.

`<b-modal>` supports close on ESC (enabled by default), close on backdrop click (enabled by
default), and the `X` close button in the header (enabled by default). These features may be
disabled by setting the props `no-close-on-esc`, `no-close-on-backdrop`, and `hide-header-close`
respectively.

You can override the modal title via the named slot `modal-title`, override the header completely
via the `modal-header` slot, and override the footer completely via the `modal-footer` slot.

**Note**: when using the `modal-footer` slot, the default **OK** and **Cancel** buttons will not be
present. Also, if you use the `modal-header` slot, the default header `X` close button will not be
present, nor can you use the `modal-title` slot.

Modals will not render their content in the document until they are shown (lazily rendered). Modals,
when visible, are rendered **appended to the `<body>` element**. The placement of the `<b-modal>`
component will not affect layout, as it always renders as a placeholder comment node (`<!---->`).
You can revert to the behaviour of older BootstrapVue versions via the use of the
[`static` prop](#lazy-loading-and-static-modals).

## Toggle modal visibility

There are several methods that you can employ to toggle the visibility of `<b-modal>`.

### Using `v-b-modal` directive

Other elements can easily show modals using the `v-b-modal` directive.

```html
<div>
  <!-- Using modifiers -->
  <b-button v-b-modal.my-modal>Show Modal</b-button>

  <!-- Using value -->
  <b-button v-b-modal="'my-modal'">Show Modal</b-button>

  <!-- The modal -->
  <b-modal id="my-modal">Hello From My Modal!</b-modal>
</div>

<!-- b-modal-directive.vue -->
```

This approach will automatically return focus to the trigger element once the modal closes (similar
to default Bootstrap functionality). Other approaches for toggling modal visibility may require
additional code to implement this accessibility feature.

See the [Accessibility](#accessibility) section below for details.

### Using `this.$bvModal.show()` and `this.$bvModal.hide()` instance methods

When BootstrapVue is installed as a plugin, or the `ModalPlugin` plugin is used, BootstrapVue will
inject a `$bvModal` object into every Vue instance (components, apps). `this.$bvModal` exposes
several methods, of which two are for showing and hiding modals:

| Method                   | Description                            |
| ------------------------ | -------------------------------------- |
| `this.$bvModal.show(id)` | Show the modal with the specified `id` |
| `this.$bvModal.hide(id)` | Hide the modal with the specified `id` |

Both methods return immediately after being called.

```html
<div>
  <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button>

  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      Using <code>$bvModal</code> Methods
    </template>
    <div class="d-block text-center">
      <h3>Hello From This Modal!</h3>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
  </b-modal>
</div>

<!-- b-modal-bv-modal-hide-show.vue -->
```

The `this.$bvModal` object is also used for displaying [modal message boxes](#modal-message-boxes).

### Using `show()`, `hide()`, and `toggle()` component methods

You can access modal using `ref` attribute and then call the `show()`, `hide()` or `toggle()`
methods.

```html
<template>
  <div>
    <b-button id="show-btn" @click="showModal">Open Modal</b-button>
    <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button>

    <b-modal ref="my-modal" hide-footer title="Using Component Methods">
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
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    }
  }
</script>

<!-- b-modal-methods.vue -->
```

The `hide()` method accepts an optional string `trigger` argument for defining what triggered the
modal to close. See section [Prevent Closing](#prevent-closing) below for details.

**Note:** It is recommended to use the `this.$bvModal.show()` and `this.$bvModal.hide()` methods
(mentioned in the previous section) instead of using `$ref` methods.

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

When using the `v-model` prop, **do not** use the `visible` prop at the same time.

### Using scoped slot scope methods

Refer to the [Custom rendering with slots](#custom-rendering-with-slots) section on using the
various methods passed to scoped slots for closing modals.

### Emitting events on \$root

You can emit `bv::show::modal`, `bv::hide::modal`, and `bv::toggle::modal` events on `$root` with
the first argument set to the modal's id. An optional second argument can specify the element to
return focus to once the modal is closed. The second argument can be a CSS selector, an element
reference, or a component reference (the root element of the component will be focused).

```html
<div>
  <b-button @click="showModal" ref="btnShow">Open Modal</b-button>
  <b-button @click="toggleModal" ref="btnToggle">Toggle Modal</b-button>

  <b-modal id="modal-1">
    <div class="d-block">Hello From My Modal!</div>
    <b-button @click="hideModal">Close Me</b-button>
    <b-button @click="toggleModal">Toggle Me</b-button>
  </b-modal>
</div>
```

```js
export default {
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    toggleModal() {
      this.$root.$emit('bv::toggle::modal', 'modal-1', '#btnToggle')
    }
  }
}
```

**Note:** It is recommended to use the `this.$bvModal.show()` and `this.$bvModal.hide()` methods
(mentioned in a previous section) instead of emitting `$root` events.

### Prevent closing

To prevent `<b-modal>` from closing (for example when validation fails). you can call the
`.preventDefault()` method of the event object passed to your `ok` (**OK** button), `cancel`
(**Cancel** button), `close` (modal header close button) and `hide` event handlers. Note that
`.preventDefault()`, when used, **must** be called synchronously, as async is not supported.

```html
<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames">{{ name }}</li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        nameState: null,
        submittedNames: []
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>

<!-- b-modal-prevent-closing.vue -->
```

**Note**: events `ok`, `cancel`, and `close` are emitted by modal's built in **OK**, **Cancel**, and
header close (**X**) buttons respectively. These events will not be emitted, by default, if you have
provided your own buttons in the `modal-footer` slot or have hidden the footer. In this case use the
`hide` event to control cancelling of the modal close. Event `hide` is always emitted, even if `ok`,
`cancel`, and `close` are emitted.

The `ok`, `cancel`, `close` and `hide` event object (`BvModalEvent`) contains several properties and
methods:

| Property or Method | Type     | Description                                                                                                                                                                                                                                                                                                 |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preventDefault()` | Method   | When called prevents the modal from closing                                                                                                                                                                                                                                                                 |
| `trigger`          | Property | Will be one of: `ok` (Default **OK** Clicked), `cancel` (Default **Cancel** clicked), `esc` (if the <kbd>Esc</kbd> key was pressed), `backdrop` (if the backdrop was clicked), `headerclose` (if the header X button was clicked), the first argument provided to the `hide()` method, or `null` otherwise. |
| `target`           | Property | A reference to the modal element                                                                                                                                                                                                                                                                            |
| `vueTarget`        | property | A reference to the modal's Vue VM instance                                                                                                                                                                                                                                                                  |
| `componentId`      | property | The modal's ID                                                                                                                                                                                                                                                                                              |

You can set the value of `trigger` by passing an argument to the component's `hide()` method for
advanced control (i.e. detecting what button or action triggered the modal to hide).

**Note:** `ok`, `cancel`, or `close` events will be only emitted when the argument to `hide()` is
strictly `'ok'`, `'cancel'`, or `'headerclose'` respectively. The argument passed to `hide()` will
be placed into the `trigger` property of the event object.

## Modal content

### Using the grid

Utilize the Bootstrap grid system within a modal by nesting `<b-container fluid>` within the
modal-body. Then, use the normal grid system `<b-row>` (or `<b-form-row>`) and `<b-col>` as you
would anywhere else.

### Tooltips and popovers

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

## Lazy loading and static modals

By default, modals will not render their content in the document until they are shown (lazily
rendered). Modals that, when visible, are rendered appended to the `<body>` element. The `<b-modal>`
component will not affect layout, as they render as a placeholder comment node (`<!---->`) in the
DOM position they are placed. Due to the portalling process, it can take two or more `$nextTick`s to
render changes of the content into the target.

Modals can be rendered _in-place_ in the document (i.e. where the `<b-modal>` component is placed in
the document) by setting the `static` prop to `true`. Note that the content of the modal will be
rendered in the DOM even if the modal is not visible/shown when `static` is `true`. To make `static`
modals lazy rendered, also set the `lazy` prop to `true`. The modal will then appear in the document
_only_ when it is visible. Note, when in `static` mode, placement of the `<b-modal>` component _may
affect layout_ of your document and the modal.

The `lazy` prop will have no effect if the prop `static` is not `true` (non-static modals will
_always_ be lazily rendered).

## Styling, options, and customization

### Modal sizing

Modals have three optional sizes, available via the prop `size`. These sizes kick in at certain
breakpoints to avoid horizontal scrollbars on narrower viewports. Valid optional sizes are `sm`,
`lg`, and `xl`.

```html
<div>
  <b-button v-b-modal.modal-xl variant="primary">xl modal</b-button>
  <b-button v-b-modal.modal-lg variant="primary">lg modal</b-button>
  <b-button v-b-modal.modal-sm variant="primary">sm modal</b-button>

  <b-modal id="modal-xl" size="xl" title="Extra Large Modal">Hello Extra Large Modal!</b-modal>
  <b-modal id="modal-lg" size="lg" title="Large Modal">Hello Large Modal!</b-modal>
  <b-modal id="modal-sm" size="sm" title="Small Modal">Hello Small Modal!</b-modal>
</div>

<!-- b-modal-sizes.vue -->
```

The `size` prop maps the size to the `.modal-<size>` classes.

### Scrolling long content

When modals become too long for the user's viewport or device, they scroll independent of the page
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

### Vertically centered modal

Vertically center your modal in the viewport by setting the `centered` prop.

```html
<div>
  <b-button v-b-modal.modal-center>Launch centered modal</b-button>

  <b-modal id="modal-center" centered title="BootstrapVue">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>
</div>

<!-- b-modal-center-vertically.vue -->
```

Feel free to mix vertically `centered` with `scrollable`.

### Variants

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
          <b-col cols="3"></b-col>
          <b-col>Background</b-col>
          <b-col>Text</b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="3">Header</b-col>
          <b-col>
            <b-form-select
              v-model="headerBgVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              v-model="headerTextVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="3">Body</b-col>
          <b-col>
            <b-form-select
              v-model="bodyBgVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              v-model="bodyTextVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">Footer</b-col>
          <b-col>
            <b-form-select
              v-model="footerBgVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              v-model="footerTextVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">Modal Footer Content</p>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="show=false"
          >
            Close
          </b-button>
        </div>
      </template>
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

### Hiding the backdrop

Hide the modal's backdrop via setting the `hide-backdrop` prop.

```html
<div>
  <b-button v-b-modal.modal-no-backdrop>Open modal</b-button>

  <b-modal id="modal-no-backdrop" hide-backdrop content-class="shadow" title="BootstrapVue">
    <p class="my-2">
      We've added the utility class <code>'shadow'</code>
      to the modal content for added effect.
    </p>
  </b-modal>
</div>

<!-- modal-no-backdrop.vue -->
```

Note that clicking outside of the modal will still close the modal even though the backdrop is
hidden. You can disable this behaviour by setting the `no-close-on-backdrop` prop on `<b-modal>`.

### Disable open and close animation

To disable the fading transition/animation when modal opens and closes, just set the prop `no-fade`
on the `<b-modal>` component.

### Footer button sizing

Fancy smaller or larger buttons in the default footer? Simply set the `button-size` prop to `'sm'`
for small buttons, or `'lg'` for larger buttons.

```html
<div>
  <b-button v-b-modal.modal-footer-sm>Small Footer Buttons</b-button>
  <b-button v-b-modal.modal-footer-lg>Large Footer Buttons</b-button>

  <b-modal id="modal-footer-sm" title="BootstrapVue" button-size="sm">
    <p class="my-2">This modal has small footer buttons</p>
  </b-modal>

  <b-modal id="modal-footer-lg" title="BootstrapVue" button-size="lg">
    <p class="my-2">This modal has large footer buttons</p>
  </b-modal>
</div>

<!-- modal-footer-btn-sizes.vue -->
```

The prop `button-size` has no effect if you have provided your own footer via the
[`modal-footer`](#custom-rendering-with-slots) slot.

### Disabling built-in footer buttons

You can disable the built-in footer buttons programmatically.

You can disable the **Cancel** and **OK** buttons individually by setting the `cancel-disabled` and
`ok-disabled` props, respectively, to `true`. Set the prop to `false` to re-enable the button.

To disable both **Cancel** and **OK** buttons at the same time, simply set the `busy` prop to
`true`. Set it to `false` to re-enable both buttons.

### Custom rendering with slots

`<b-modal>` provides several named slots (of which some are optionally scoped) that you can use to
customize the content of various sections of the modal.

| Slot                 | Optionally Scoped | Description                                                                           |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `default`            | Yes               | Main content of the modal                                                             |
| `modal-title`        | Yes               | Content to place in the modal's title                                                 |
| `modal-header`       | Yes               | Content to place in the header. Replaces the entire header including the close button |
| `modal-footer`       | Yes               | Content to place in the footer. Replaces the entire footer including the button(s)    |
| `modal-ok`           | No                | Content to place inside the footer OK button                                          |
| `modal-cancel`       | No                | Content to place inside the footer CANCEL button                                      |
| `modal-header-close` | No                | Content to place inside the header CLOSE (`x`) button                                 |

The scope available to the slots that support optional scoping are:

| Method or Property | Description                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `ok()`             | Closes the modal and fires the `ok` and `hide` events, with `bvModalEvent.trigger = 'ok'`                    |
| `cancel()`         | Closes the modal and fires the `cancel` and `hide` events, with `bvModalEvent.trigger = 'cancel'`            |
| `close()`          | Closes the modal and fires the `close` and `hide` events, with `bvModalEvent.trigger = 'headerclose'`        |
| `hide(trigger)`    | Closes the modal and fires the `hide` event, with the `bvModalEvent.trigger = trigger` (trigger is optional) |
| `visible`          | The visibility state of the modal. `true` if the modal is visible and `false` if not visible                 |

#### Example modal using custom scoped slots

```html
<template>
  <b-button @click="$bvModal.show('modal-scoped')">Open Modal</b-button>

  <b-modal id="modal-scoped">
    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-button size="sm" variant="outline-danger" @click="close()">
        Close Modal
      </b-button>
      <h5>Modal Header</h5>
    </template>

    <template #default="{ hide }">
      <p>Modal Body with button</p>
      <b-button @click="hide()">Hide Modal</b-button>
    </template>

    <template #modal-footer="{ ok, cancel, hide }">
      <b>Custom Footer</b>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="ok()">
        OK
      </b-button>
      <b-button size="sm" variant="danger" @click="cancel()">
        Cancel
      </b-button>
      <!-- Button with custom close trigger value -->
      <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
        Forget it
      </b-button>
    </template>
  </b-modal>
</template>

<!-- b-modal-scoped-slots.vue -->
```

## Multiple modal support

Unlike native Bootstrap v4, BootstrapVue supports multiple modals opened at the same time.

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

- Avoid nesting a `<b-modal>` _inside_ another `<b-modal>`, as it may get "constrained" to the
  boundaries of the parent modal dialog (specifically when static modals are used).
- The opaque backdrop will appear progressively darker for each modal that is opened. This is
  expected behaviour as each backdrop is opened over top the other modals and backdrops.

## Modal message boxes

BootstrapVue provides a few built in Message Box methods on the exposed `this.$bvModal` object.
These methods provide a way to generate simple OK and Confirm style modal messages, from anywhere in
your app without having to explicitly place a `<b-modal>` component in your pages.

| Method                                          | Description                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| `this.$bvModal.msgBoxOk(message, options)`      | Open a modal with `message` as the content and a single OK button    |
| `this.$bvModal.msgBoxConfirm(message, options)` | Open a modal with `message` as the content and CANCEL and OK buttons |

The `options` argument is an optional configuration object for adding titles and styling the Message
Box modal. The object properties correspond to `<b-modal>` props, except in <samp>camelCase</samp>
format instead of <samp>kebab-case</samp>.

Both methods return a `Promise` (requires a polyfill for IE 11 and older browser support) which
resolve into a value when the modal hides. `.msgBoxOk()` always resolves to the value `true`, while
`.msgBoxConfirm()` resolves to either `true` (OK button pressed), `false` (CANCEL button pressed),
or `null` (if the modal was closed via backdrop click, <kbd>Esc</kbd> press, or some other means.

If `message` is not provided, both methods will return immediately with the value `undefined`.

You can use either the `.then(..).catch(...)` or async `await` code styles (async `await` requires
modern browsers or a transpiler).

### OK message box

Example OK Message boxes

```html
<template>
  <div>
    <div class="mb-2">
     <b-button @click="showMsgBoxOne">Simple msgBoxOk</b-button>
     Return value: {{ String(boxOne) }}
    </div>
    <div class="mb-1">
     <b-button @click="showMsgBoxTwo">msgBoxOk with options</b-button>
     Return value: {{ String(boxTwo) }}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        boxOne: '',
        boxTwo: ''
      }
    },
    methods: {
      showMsgBoxOne() {
        this.boxOne = ''
        this.$bvModal.msgBoxOk('Action completed')
          .then(value => {
            this.boxOne = value
          })
          .catch(err => {
            // An error occurred
          })
      },
      showMsgBoxTwo() {
        this.boxTwo = ''
        this.$bvModal.msgBoxOk('Data was submitted successfully', {
          title: 'Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
          .then(value => {
            this.boxTwo = value
          })
          .catch(err => {
            // An error occurred
          })
      }
    }
  }
</script>

<!-- b-modal-msg-box-ok.vue -->
```

### Confirm message box

Example Confirm Message boxes

```html
<template>
  <div>
    <div class="mb-2">
     <b-button @click="showMsgBoxOne">Simple msgBoxConfirm</b-button>
     Return value: {{ String(boxOne) }}
    </div>
    <div class="mb-1">
     <b-button @click="showMsgBoxTwo">msgBoxConfirm with options</b-button>
     Return value: {{ String(boxTwo) }}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        boxOne: '',
        boxTwo: ''
      }
    },
    methods: {
      showMsgBoxOne() {
        this.boxOne = ''
        this.$bvModal.msgBoxConfirm('Are you sure?')
          .then(value => {
            this.boxOne = value
          })
          .catch(err => {
            // An error occurred
          })
      },
      showMsgBoxTwo() {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
          })
          .catch(err => {
            // An error occurred
          })
      }
    }
  }
</script>

<!-- b-modal-msg-box-confirm.vue -->
```

### Message box notes

- The `this.$bvModal` injection is only available when using the full `BootstrapVue` plugin or the
  `ModalPlugin` plugin. It is not available if importing just the `b-modal` component. To just
  import the injection, use the `BVModalPlugin` plugin.
- A new `$bvModal` injection (mixin) is created for each Vue virtual machine (i.e. each instantiated
  component), and is not usable via direct access to the `Vue.prototype`, as it needs access to the
  instance's `this` and `$root` contexts.
- Message Boxes require `Promise` support in the browser. If targeting your app for older browsers,
  such as IE 11, please include a polyfill that provides `Promise` support. If `Promise` support is
  not detected, then the message box methods will immediately return `undefined`.
- Message Boxes are an extension of the `<b-modal>` component, and hence support the majority of
  `<b-modal>` props (using <samp>camelCase</samp> format), with the exception of the following
  props: `lazy`, `static`, `busy`, `visible`, `noStacking`, `okOnly`, `okDisabled`, and
  `cancelDisabled`.
- When a `title` (or `titleHtml`) _is not_ provided in the options, the header will not be shown.
- When a `title` (or `titleHtml`) _is_ provided in the options, the header close button is not shown
  by default. You can enable the header close button by setting `hideHeaderClose: false` in the
  options.
- Message Boxes will throw an error (promise rejection) if they are closed/destroyed before they are
  hidden. Always include a `.catch(errHandler)` reject handler, event if using the async `await`
  style code.
- When using Vue Router (or similar), Message Boxes will close and reject if the route changes
  before the modal hides. If you wish for the message box to remain open when the route changes, use
  `this.$root.$bvModal` instead of `this.$bvModal`.
- Message boxes cannot be generated during Server Side Rendering (SSR).
- The Message Box `message` currently does not support HTML strings, however, you can pass an
  _array_ of `VNodes` as the `message` for fine grained control of the markup. You can use Vue's
  [`this.$createElement`](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments)
  method to generate VNodes. This can also be done for the modal title (by passing VNodes to the
  `title` option), OK button text (via the `okTitle` option), and the CANCEL button text (via the
  `cancelTitle` option).

### Message box advanced usage

When using the `this.$bvModal.msgBoxOk(...)` or `this.$bvModal.msgBoxConfirm(...)` methods for
generating modals, you may want the modal content to be more than just a string message. As
mentioned in the [message box notes](#message-box-notes) section above, you can pass _arrays_ of
VNodes as the message and title for more complex content.

Use Vue's
[`this.$createElement`](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments)
method to generate VNodes.

```html
<template>
  <div>
    <b-button @click="showMsgOk">Show OK message box with custom content</b-button>
  </div>
</template>

<script>
  export default {
    methods: {
      showMsgOk() {
        const h = this.$createElement
        // Using HTML string
        const titleVNode = h('div', { domProps: { innerHTML: 'Title from <i>HTML<i> string' } })
        // More complex structure
        const messageVNode = h('div', { class: ['foobar'] }, [
          h('p', { class: ['text-center'] }, [
            ' Flashy ',
            h('strong', 'msgBoxOk'),
            ' message ',
          ]),
          h('p', { class: ['text-center'] }, [h('b-spinner')]),
          h('b-img', {
            props: {
              src: 'https://picsum.photos/id/20/250/250',
              thumbnail: true,
              center: true,
              fluid: true, rounded: 'circle'
            }
          })
        ])
        // We must pass the generated VNodes as arrays
        this.$bvModal.msgBoxOk([messageVNode], {
          title: [titleVNode],
          buttonSize: 'sm',
          centered: true, size: 'sm'
        })
      }
    }
  }
</script>

<!-- modal-msg-box-advanced.vue -->
```

## Listening to modal changes via \$root events

To listen to any modal opening, use:

```js
export default {
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      console.log('Modal is about to be shown', bvEvent, modalId)
    })
  }
}
```

Refer to the [Events](#comp-ref-b-modal) section of this documentation for the full list of events
emitted.

## Accessibility

`<b-modal>` provides several accessibility features, including auto focus, return focus, keyboard
(tab) _focus containment_, and automated `aria-*` attributes.

**Note:** The animation effect of this component is dependent on the `prefers-reduced-motion` media
query. See the
[reduced motion section of our accessibility documentation](/docs/reference/accessibility) for
additional details.

### Modal ARIA attributes

The `aria-labelledby` and `aria-describedby` attributes will appear on the modal automatically in
most cases.

- The `aria-labelledby` attribute will **not** be present if you have the header hidden, or supplied
  your own header, or have not supplied a modal title. It is recommended to supply a title for your
  modals (when using the built in header). You can visually hide the header title, but still make it
  available to screen readers by setting the `title-sr-only` prop. If you do not have a header, you
  can supply a label for the modal by passing a string to the `aria-label` prop.
- The `aria-describedby` attribute will always point to the modal's body content.
- If the `aria-label` prop is specified with a string value, the `aria-labelledby` attribute will
  not be rendered, even if you have a title/header for your modal.

The `aria-label` and `title-sr-only` props were added in version `v2.0.0-rc.27`.

### Auto focus on open

`<b-modal>` will autofocus the modal _container_ when opened.

You can pre-focus an element within the `<b-modal>` by listening to the `<b-modal>` `shown` event,
and call the element's `focus()` method. `<b-modal>` will not attempt to autofocus if an element
already has focus within the `<b-modal>`.

```html
<b-modal @shown="focusMyElement">
  <div>
    <b-button>I Don't Have Focus</b-button>
  </div>

  <div>
    <b-form-input></b-form-input>
  </div>

  <div>
    <!-- Element to gain focus when modal is opened -->
    <b-form-input ref="focusThis"></b-form-input>
  </div>

  <div>
    <b-form-input></b-form-input>
  </div>
</b-modal>
```

```js
export default {
  methods: {
    focusMyElement() {
      this.$refs.focusThis.focus()
    }
  }
}
```

Alternatively, if using `b-form-*` form controls, you can use the `autofocus` prop to automatically
focus a form control when the modal opens. Note that the `autofocus` prop will not work with
`b-modal` if the `static` prop is used without the `lazy` prop set, as `autofocus` happens when the
`b-form-*` controls are _mounted in the DOM_.

If you want to auto focus one of the _built-in_ modal buttons (`ok`, `cancel` or the header `close`
button, you can set the prop `auto-focus-button` to one of the values `'ok'`, `'cancel'` or
`'close'` and `<b-modal>` will focus the specified button if it exists. This feature is also
available for modal message boxes.

<p class="alert alert-warning">
  <strong>Note:</strong> it is <strong>not recommended</strong> to autofocus an input or control
  inside of a modal for accessibility reasons, as screen reader users will not know the context of
  where the input is (the announcement of the modal may not be spoken). It is best to let
  <code>&lt;b-modal&gt;</code> focus the modal's container, allowing the modal information to be
  spoken to the user, and then allow the user to tab into the input.
</p>

### Returning focus to the triggering element

For accessibility reasons, it is desirable to return focus to the element that triggered the opening
of the modal, when the modal closes.

`<b-modal>` will try and automatically determine which element had focus before the modal was
opened, and will return the focus to that element when the modal has hidden if possible. However,
several methods and options are provided to allow you to specify the element to return focus to once
the modal has hidden.

#### Specify return focus element via the `return-focus` prop

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

#### Auto return focus

When `<b-modal>` is opened via the `v-b-modal` directive on an element, focus will be returned to
this element automatically when `<b-modal>` closes, unless an element has been specified via the
`return-focus` prop.

#### Specify return focus via event

When using the `bv::show::modal` event (emitted on `$root`), you can specify a second argument which
is the element to return focus to. This argument accepts the same types as the `return-focus` prop.

```js
this.$root.$emit('bv::show::modal', 'modal-1', '#focusThisOnClose')
```

_Tip:_ if using a click event (or similar) to trigger modal to open, pass the event's `target`
property:

```html
<div>
  <b-button @click="$root.$emit('bv::show::modal', 'modal-1', $event.target)">Open Modal</b-button>
</div>
```

**Note:** If the `<b-modal>` has the `return-focus` prop set, then the element specified via the
event will be ignored.

### Keyboard navigation

When tabbing through elements within a `<b-modal>`, if focus attempts to leave the modal into the
document, it will be brought back into the modal.

Avoid setting `tabindex` on elements within the modal to any value other than `0` or `-1`. Doing so
will make it difficult for people who rely on assistive technology to navigate and operate page
content and can make some of your elements unreachable via keyboard navigation.

If some elements outside the modal need to be focusable (i.e. for TinyMCE), you can add them as CSS
selectors to the `ignore-enforce-focus-selector` prop
<span class="badge badge-secondary">2.4.0+</span>, e.g.:

```html
<b-modal
  id="some-modal-id"
  title="Modal with TinyMCE Editor"
  ignore-enforce-focus-selector=".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root"
>
  <!-- Modal content with TinyMCE editor here -->
</b-modal>
```

In some circumstances, you may need to disable the enforce focus feature completely. You can do this
by setting the prop `no-enforce-focus`, although this is _highly discouraged_ for accessibility
reasons.

### `v-b-modal` directive accessibility

Notes on `v-b-modal` directive accessibility:

- If the element is anything other than a `<button>` (or component that renders a `<button>`), the
  ARIA `role` will be set to `button`, and a keydown event listeners for <kbd>Enter</kbd> and
  <kbd>Space</kbd> will be added, along with a `click` listener.
- If the element is anything other than a `<button>` or `<a>` (or a component that renders either),
  then a `tabindex` of `0` will be added to the element to ensure accessibility, unless there is
  already a `tabindex` set.

<!-- Component reference added automatically from component package.json -->
