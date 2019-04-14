# Toasts

> Push notifications to your visitors with a `<b-toast>` and `<b-toaster>`, lightweight components
> whch are easily customizable for generating alert messages

Toasts are lightweight notifications designed to mimic the push notifications that have been
popularized by mobile and desktop operating systems. They’re built with flexbox, so they’re easy
to align and position inside a `<b-toaster>` target component.

Toasts are intended to be small interruptions to your visitors or users, and therefore should
contain minimal, to-the-point, content.

## Overview

To encourage extensible and predictable toasts, we recommend providing a header (title) and body.
Toast headers use `display: flex;`, allowing easy alignment of content thanks to Bootstrap's
[margin and flexbox utility classes](/docs/reference/utility-classes).

Toasts are slightly translucent, too, so they blend over whatever they might appear over. For
browsers that support the `backdrop-filter` CSS property, we’ll also attempt to blur the
elements under a toast.

```html
<template>
  <div class="bg-light p-3">
    <b-toast title="BootstrapVue" show static>
      Hello, world! This is a toast message.
    </b-toast>
  </div>
</template>

<!-- toast-intro.vue -->
```

**Note:** we are using the `static` prop in the above example to render the toast in-pace in the
document, rather than transporting it to a `<b-toaster>` target container.

## `<b-toaster>` target component

TBD

## Using `this.$bvToast` helper instance object

Generate a dynamic toast from anywhere in your app via the `this.$bvToast` Vue instance
injection, without the need to place a `<b-toast>` in your app.

TBD

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

`<b-taost>`, by default, sets the attributes `role` to `'alert'` and `aria-live` to `'assertive'`.
If it’s an important message like an error, this default setting is appropriate, otherwise set the
prop `is-status` to `true` to change the attributes  `role` to `'status'` and `aria-live` to `'polite'`.

When setting prop `auto-hide` to `false`, you must have a close button to allow users to dismiss the
toast. If you have set prop `no-close-button` to true, you must provide your own close button.

