# Toggle

> `v-b-toggle` is a light-weight directive for toggling the visibility of collapses and sidebars,
> and includes automated [WAI-ARIA accessibility](/docs/reference/accessibility) attribute handling.

## Overview

The `v-b-toggle` directive can be used on interactive elements, such as buttons, to toggle the
visibility state of the [`<b-collapse>`](/docs/components/collapse) and
[`<b-sidebar>`](/docs/components/sidebar) components.

Besides toggling the visibility of the target component, the directive automatically updates ARIA
accessibility attributes on the element it is applied to so that they reflect the visibility state
of the target component. Refer to the [Accessibility section](#accessibility) below for additional
details and caveats.

## Directive syntax and usage

The directive is applied to the element or component that triggers the visibility of hte target. The
target component can be specified (via its ID) as either a directive modifier(s), the directive
argument, or as a string/array passed to as the directive value:

- `v-b-toggle.my-collapse` - the directive modifier (multiple targets allowed, each modifier is a
  target ID)
- `v-b-toggle:my-collapse` - the directive argument
  ([Vue dynamic argument](https://vuejs.org/v2/guide/syntax.html#Dynamic-Arguments) is supported)
  <span class="badge badge-info small" aria-label="Available in BootstrapVue v2.14.0+">v2.14.0+</span>
- `v-b-toggle="'my-collapse'"` - the directive value as a string ID
- `v-b-toggle="'my-collapse1 my-collapse2'"` - the directive value as a space separated string of
  IDs
  <span class="badge badge-info small" aria-label="Available in BootstrapVue v2.14.0+">v2.14.0+</span>
- `v-b-toggle="['my-collapse1', 'my-collapse2']"` - the directive value as an array of string IDs
  <span class="badge badge-info small" aria-label="Available in BootstrapVue v2.14.0+">v2.14.0+</span>

Modifiers, argument, and the value can be used at the same time when targeting multiple components.

### Example usage

```html
<template>
  <div>
    <div class="mb-3">
      <b-button v-b-toggle.my-collapse>Toggle Collapse</b-button>
      <b-button v-b-toggle.my-sidebar>Toggle Sidebar</b-button>
    </div>

    <b-collapse id="my-collapse">
      <b-card title="Collapsible card">
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

## Hiding and showing content in the toggle trigger element

When using the `v-b-toggle` directive, the class `collapsed` will automatically be placed on the
trigger element when the target component is closed, and removed when open. As of BootstrapVue
`2.14.0`, the class `not-collapsed` will be applied when the target is _not_ closed.

**Example HTML markup:**

```html
<div>
  <b-button v-b-toggle:my-collapse>
    <span class="when-open">Close</span><span class="when-closed">Open</span> My Collapse
  </b-button>
  <b-collapse id="my-collapse">
    <!-- Content here -->
  </b-collapse>
</div>
```

**Example Custom CSS:**

```css
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
```

## Preventing the target from opening or closing

To prevent the trigger element from toggling the target, set the `disabled` prop on `<button>`,
`<b-button>`, or `<b-link>` and the toggle event will _not_ dispatched to the target(s).

`v-b-toggle` also checks if the `click` event (and `keydown` event for non-button/links) was
canceled (i.e. via `event.preventDefault()` or `@click.prevent`), and if so, it will _not_ dispatch
the toggle event to the target(s).

Because of this, avoid placing `v-b-toggle` on a `<b-button>` or `<b-link>` that has the `href` prop
set to `'#'`, as these components (or components based on them) call `event.preventDefault()` to
stop the browser from scrolling to the top of the page.

## Accessibility

The directive, for accessibility reasons, should be placed on an clickable interactive element such
as a `<button>` or `<b-button>`, which can easily be accessed by keyboard-only users and screen
reader users. Elements that do not natively have an accessibility role of `button` (or `link`) will
have the attributes `role="button"` and `tabindex="0"` applied, and will have the appropriate click
handler instantiated. Therefore it is _highly recommended_ to _not_ place the directive on form
controls other than buttons.

The directive applies, and dynamically updates, the following ARIA attributes on the trigger
element:

- `aria-controls` - the ID(s) of the collapse or sidebar component(s) being toggled
- `aria-expanded` - the visibility state of the collapse or sidebar (see the
  [caveats section](#caveats-with-multiple-targets) below)

### Caveats with multiple targets

When multiple targets are specified, the value of the `aria-expanded` attribute may not be correct
if the individual target components can have their collapsed state controlled independently (either
via `v-model`, other controls with `v-b-toggle` directive, or CSS visibility).

## See also

- [`<b-collapse>`](/docs/components/collapse) Collapsible content with accordion support
- [`<b-sidebar>`](/docs/components/sidebar) Off-canvas sidebar
- [`<b-navbar-toggle>`](/docs/components/navbar#b-navbar-toggle-and-b-collapse-is-nav) Navbar
  hamburger toggle button (based on `v-b-toggle` directive)
