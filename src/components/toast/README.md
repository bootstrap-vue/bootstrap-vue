# Toasts

> Push notifications to your visitors with a `<b-toast>` and `<b-toaster>`, lightweight components
> which are easily customizable for generating alert messages

Toasts are lightweight notifications designed to mimic the push notifications that have been
popularized by mobile and desktop operating systems. They’re built with flexbox, so they’re easy to
align and position inside a `<b-toaster>` target component.

Toasts are intended to be small interruptions to your visitors or users, and therefore should
contain minimal, to-the-point, non-interactive content.

<p class="alert alert-warning mb-0" role="alert">
  <strong>BETA warning</strong><br>
  Toasts are in their preliminary stages of being developed,
  and usage is subject to change in future releases.
</p>

## Overview

To encourage extensible and predictable toasts, we recommend providing a header (title) and body.
Toast headers use the style `'display: flex'`, allowing easy alignment of content thanks to
Bootstrap's [margin and flexbox utility classes](/docs/reference/utility-classes).

Toasts are slightly translucent, too, so they blend over whatever they might appear over. For
browsers that support the `backdrop-filter` CSS property, we’ll also attempt to blur the elements
under a toast.

```html
<template>
  <div class="p-3 bg-secondary progress-bar-striped" style="min-height: 150px;">
    <b-toast title="BootstrapVue" visible static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast>
  </div>
</template>

<!-- toast-intro.vue -->
```

**Note:** we are using the `static` prop in the above example to render the toast in-pace in the
document, rather than transporting it to a `<b-toaster>` target container. And we have added classes
`bg-secondary` and `progress-bar-striped` to the outer <samp>&lt;div&gt;</samp> for illustrative
purposes of toast transparency only.

### Toast features

- Toasts can be generated on demand via the injection `this.$bvToast` object, or manually created
  using the `<b-toast>` component.
- Toasts will auto hide after a default of 5 seconds (5000ms). The duration can be changed via the
  `auto-hide-delay` prop (value is specified in milliseconds), and disabled with the `no-auto-hide`
  prop.
- Toasts include a close button on their top right to allow users to manually dismiss them. The
  close button can be hidden via the `no-close-button` prop.
- Titles are optional, but should be included, titles are rendered inside a `<strong>` element,
  unless using the `toast-title` slot.
- If you disable the auto-hide feature, avoid hiding the close button, or if you hide the close
  button be sure to allow the toast to auto-dismiss.
- Toast transparency can be disabled by setting the `solid` prop to `true`.
- Toasts will show inside a named `<b-toaster>` target component. BootstrapVue comes with four
  pre-defined toaster targets. Toasts will check for the named toaster in the document before they
  are shown, and will dynamically create the named toaster target if one is not found.
- Toaster targets are defined completely with CSS for controlling the positioning of the contained
  `<b-toast>` components.
- Toasts can can targeted to any named toaster.

BootstrapVue uses [PortalVue](https://portal-vue.linusb.org/) to transport toasts into the toasters.

## On demand toasts

Generate a dynamic toast from anywhere in your app via the `this.$bvToast` Vue instance injection,
without the need to place a [`<b-toast>`](#b-toast-component) component in your app.

Use the `this.$bvToast.toast()` method to generate on demand toasts. The method accepts two
arguments:

- `message`: the content of the toast body (either a string, or an array of `VNodes`)
- `options`: an options object for providing a title and/or additional configuration options.

The options argument accepts most of the props that the `<b-toast>` component accepts (with the
exception of `static`, and `visible`) in <samp>camelCase</samp> name format.

```html
<template>
  <div>
    <b-button @click="makeToast()">Show Toast</b-button>
    <b-button @click="makeToast(true)">Show Toast (appended)</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        toastCount: 0
      }
    },
    methods: {
      makeToast(append = false) {
        this.toastCount++
        this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
          title: 'BootstrapVue Toast',
          autoHideDelay: 5000,
          appendToast: append
        })
      }
    }
  }
</script>

<!-- toasts-bv-toast-example.vue -->
```

## Options

### Transparency

Toasts have a semi-transparent background by default. To disabled the default transparency, just set
the `solid` prop to `true`

### Variants

BootstrapVue toasts provide custom CSS to define color variants. variants follow the standard
Bootstrap V4 variant names. If you have custom SCSS defined Bootstrap color variants, the toast
custom SCSS will automatically create toast variants for you.

```html
<template>
  <div>
    <b-button @click="makeToast()">Default</b-button>
    <b-button variant="primary" @click="makeToast('primary')">Primary</b-button>
    <b-button variant="secondary" @click="makeToast('secondary')">Secondary</b-button>
    <b-button variant="danger" @click="makeToast('danger')">Danger</b-button>
    <b-button variant="warning" @click="makeToast('warning')">Warning</b-button>
    <b-button variant="success" @click="makeToast('success')">Success</b-button>
    <b-button variant="info" @click="makeToast('info')">Info</b-button>
  </div>
</template>

<script>
  export default {
    methods: {
      makeToast(variant = null) {
        this.$bvToast.toast('Toast body content', {
          title: `Variant ${variant || 'default'}`,
          variant: variant,
          solid: true
        })
      }
    }
  }
</script>

<!-- toast-variants.vue -->
```

### Toaster target

BootstrapVue comes with the following "built-in" toaster names (and associated styles defined in
SCSS):

- `b-toaster-top-right`
- `b-toaster-top-left`
- `b-toaster-bottom-right`
- `b-toaster-bottom-left`

```html
<template>
  <div>
    <b-button @click="toast('b-toaster-top-right')">b-toaster-top-right</b-button>
    <b-button @click="toast('b-toaster-top-left')">b-toaster-top-left</b-button>
    <b-button @click="toast('b-toaster-bottom-right')">b-toaster-bottom-right</b-button>
    <b-button @click="toast('b-toaster-bottom-left')">b-toaster-bottom-left</b-button>
  </div>
</template>

<script>
  export default {
    methods: {
      toast(toaster) {
        this.$bvToast.toast('Toast body content', {
          title: `Toaster ${toaster}`,
          toaster: toaster,
          solid: true
        })
      }
    }
  }
</script>

<!-- toast-targets.vue -->
```

**Note**: Toaster target names that have not been defined in CSS will render at the bottom of the
document, stacked and not positioned (appended to `<body>` inside a `<b-toaster>` with class name
and ID set to the toaster target name). The only default styling the toaster will have is
`position: fixed;`, a `max-width` and a `z-index` of `1100`.

### Prepend and append

Toasts default to prepending themselves to the top of the toasts shown in the specified toaster in
the order they were created. To append new toasts to the bottom, set the `append-toast` prop to
`true`

### Auto-hide

Change to auto hide delay time via the `auto-hide-delay` prop (value is in milliseconds), which
defaults to `5000`. Or, disable the auto-hide feature completely by setting the `no-auto-hide` prop
to `true`.

### Toast roles

Toasts are rendered with a default `role` attribute of `'alert'` and `aria-live` attribute of
`'assertive'`. for toasts that are meant for a casual notification, set the `is-status` prop to
`true`, which will change the `role` and `aria-live` attributes to `'status'` and `'polite'`
respectively.

For more information, please the the [Accessibility](#accessibility) section below.

### Links

Optionally convert the toast body to a link (`<a>`) or `<router-link>` (or `<nuxt-link>` via the
`href` and `to` props respectively. When set, the entire toast body becomes a link.

### Slots

- `toast-title`: Content to replace the default title element.
- `default`: Content of the toast body

Both slots are optionally scoped with the following scope:

| Method or property | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `hide()`           | Hides the toast when called. Useful if you are providing your own close button. |

## `<b-toast>` component

When you have an custom component that would like to display just a single toast at a time, use the
`<b-toast>` component. The `<b-toast>` component can be placed anywhere im your custom component or
app, and do not render an element (they render a comment placeholder node which will not affect
layout).

The toast can be made visible via a `v-model` (tied to the `visible` prop), or shown using the
components `show()` and `hide()` instance methods, or via the `this.$bvToast.show(id)` and
`this.$bvToast.hide(id)` methods (requires that a unique ID be set on the `<b-toast>` component).

Toasts, by default will be paced into the `b-toaster-top-right` `<b-toaster>` component. The toaster
specified by the `toaster` prop will be created on demand if it doesn't already exist in document.

You can force a `<b-toast>` to appear in-place in the document by setting the `static` prop to
`true`. you still need to show and hide the toast, but it will not be transported into a toaster
component.

## `<b-toaster>` target component

The `<b-toaster>` component provides a container where toasts will appear (the _Toaster_). Toasters
require a unique name, and toasts can be targeted to appear in a specific named toaster.

In most cases you will not need to directly use this component, as `<b-toast>` will automatically
insert a `<b-toaster>` component (appended to `<body>`) with the requested toaster name if one is
not found in the document. But sometimes you may want to explicitly place a toaster in your app.

The toaster `name` becomes the ID of the inserted container, and will also be used a class name on
the rendered toaster container.

Toaster positioning and the positioning of toasts inside the toaster is driven completely by CSS
classes (based on the name of the toaster)

The following "built-in" toaster names (and associated styles) are defined in BootstrapVue's custom
SCSS:

- `b-toaster-top-right`
- `b-toaster-top-left`
- `b-toaster-bottom-right`
- `b-toaster-bottom-left`

The above toasters place the toasts in a stacked (columnar format), fixed within the viewport
(meaning they will always be in view regardless of viewport scroll position). If there are more
toasts than can fit on the viewport screen, some will be visually hidden until other toasts are
closed.

`<b-toast>` uses the `b-toaster-top-right` toaster by default.

**Note:** If a `<b-toaster>` with the same name already exists in document (either auto-created by
`<b-toast>`, or manually placed), then `<b-toaster>` will just render an empty `<div>` element and
issue a console warning.

<!--
### Toaster transition

TBD
-->

## Accessibility

Toasts are intended to be small interruptions to your visitors or users, so to help those with
screen readers and similar assistive technologies, toasts are wrapped in an aria-live region.
Changes to live regions (such as injecting/updating a toast component) are automatically announced
by screen readers without needing to move the user’s focus or otherwise interrupt the user.
Additionally, `aria-atomic="true"` is automatically set to ensure that the entire toast is always
announced as a single (atomic) unit, rather than announcing what was changed (which could lead to
problems if you only update part of the toast’s content, or if displaying the same toast content at
a later point in time).

If the information needed is important for the process, e.g. for a list of errors in a form, then
use the [`<b-alert>`](/docs/components/alert) component instead of `<b-toast>`.

`<b-toast>`, by default, sets the attributes `role` to `'alert'` and `aria-live` to `'assertive'`.
If it’s an important message like an error, this default setting is appropriate, otherwise set the
prop `is-status` to `true` to change the attributes `role` to `'status'` and `aria-live` to
`'polite'`.

When setting prop `auto-hide` to `false`, you must have a close button to allow users to dismiss the
toast. If you have set prop `no-close-button` to true, you must provide your own close button.
