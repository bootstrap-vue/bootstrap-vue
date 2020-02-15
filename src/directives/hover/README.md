# Hover

> `v-b-hover` is a lightweight directive that allows you to react when an element either becomes
> hovered or unhovered.

The `v-b-hover` directive can be used as an alternative to using custom CSS to handle hover states.

The `v-b-hover` directive was added in version `2.5.0`.

## Overview

- `v-b-hover` will call your callback method with a boolean value indicating if the element is
  hovered or not.
- The directive can be placed on almost any element or component.
- Internally, BootstrapVue uses this directive in several components.

## Directive syntax and usage

```html
<div v-b-hover="callback">content</div>
```

Where callback is required:

- A function reference that will be called whenever hover state changes. The callback is passed a
  single boolean argument. `true` indicates that the element (or component) is hovered by the users
  pointing device, or `false` if the element is not hovered.

The directive has no modifiers.

### Usage example

```html
<template>
  <div v-b-hover="hoverHandler"> ... </div>
</template>

<script>
  export default {
    methods: {
      hoverHandler(isHovered) {
        if (isHovered) {
          // Do something
        } else {
          // Do something else
        }
      }
    }
  }
</script>
```

## Live example

In the following, we are swapping icons and tet color depending on the hover state of the element:

```html
<template>
  <div>
    <div v-b-hover="handleHover" class="border rounded py-3 px-4">
      <b-icon v-if="isHovered" icon="battery-full" scale="2"></b-icon>
      <b-icon v-else icon="battery" scale="2"></b-icon>
      <span class="ml-2" :class="isHovered ? 'text-danger' : ''">Hover this area</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isHovered: false
      }
    },
    methods: {
      handleHover(hovered) {
        this.isHovered = hovered
      }
    }
  }
</script>

<!-- b-v-hover-example.vue -->
```

## Accessibility concerns

Hover state should not be used to convey special meaning, as screen reader users and keyboard only
users typically ac not typically trigger hover state on elements.
