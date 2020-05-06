# Toggle

> `v-b-toggle` is a lighweight directive for toggling the visibility of collapses and sidebars,
> and includes automated accessibility handling.

## Overview

The `v-b-toggle` directive can be used on interative elements, such as buttons, to toggle the
visibility state of the [`<b-collapse>`](/docs/components/collapse) and
[`<b-sidebar>`](/docs/components/sidebar) components.

Besides toggling the visibility of the target component, the directive automatically updates ARIA
accessibility attributes on the element it is applied to so that they reflect the visibility state
of the target component. Refer to the [Accessibility section](#accessibility) below for additional
details.

## Directive syntax and usage

The directive is applied to the element or component that triggers the visibility of hte target. The
target component can be sepcified (via ID) as either a directive modifier(s) or as a string passed
to as the directive value:

- `v-b-toggle.my-collapse` - the directive modifier (multiple targets allowed)
- `v-b-toggle="'my-collapse'"` - the directive value (as a String, single target only)

Modifiers and the value can be used at the same time.

### Example usage

```html
<template>
  <div>
    <b-button v-b-toggle.my-collaspe>Toggle Collapse</b-button>
    <b-button v-b-toggle.my-sidebar>Toggle Sidebar</b-button>
    <b-collapse id="my-collapse">
      <b-card title="Collapsable card">
        Hello world!
      </b-card>
    </b-collapse>
    <b-sidebar id="my-sidebar" title="Sidebar" shadow>
      <div class="px-3 py-2">
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </div>
    </b-sidebar>
  </div>
</template>

<!-- v-b-toggle-directive.vue -->
```

## Accessibility

The directive, for accessibility reasons, should be placed on an clickable interactive element such
as a `<button>` or `<b-button>`, which can easily be accessed by keyboard-only users and screen
reader users. Elements that do not natively have an accessibility role of `button` will have the
attributes `role="button"` and `tabindex="0"` applied, and will have the apropriate click and
keyboard handlers instantiated. Therefore it is _highly reccommended_ to _not_ place the directive
on form controls other than buttons.

The directive applies, and dynamically updates, the following ARIA attributes on the trigger
element:

- `aria-controls` - the ID of the collaspe or sidebar component(s) being toggled 
- `aria-expanded` - the visibility state of the collapse or sidebar

When the target component is _not_ expanded, the trigger element will have the class `collapsed`
applied. When the target component is expanded, the `collapsed` class will be removed from the
trigger element.

## See also

- [`<b-collapse>`](/docs/components/collapse) Collapsable content with accordion support
- [`<b-sidebar>`](/docs/components/sidebar) Off-canvas sidebar
