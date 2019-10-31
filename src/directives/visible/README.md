# Visible

> `v-b-visible` is a lightweight directive that allows you to react when an element becomes visible
> in the viewport and/or when it moves out of the viewport (or is no longer visible).

The `v-b-visible` directive was added in version `2.1.0`.

## Overview

- `v-b-visible` will call your callback method with a boolean value indicating if the element is
  visible (intersecting with the viewport) or not.
- The directive can be placed on almost any element or component.
- Changes in visibility can also be detected (such as `display: none`), as long as the element is
  within (or partially within) the viewport, or within the optional offset. Note: transitioning to a
  non-visible state due to `v-if="false"` _cannot_ be detected.
- Internally, BootstrapVue uses this directive in several components, such as `<b-img-lazy>`.
- The `v-b-visible` directive requires browser support of
  [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
  For older browsers that do not support `IntersectionObserver`, you will need to use a
  [polyfill](/docs/#js).
- If `IntersectionObserver` support is not detected, then `v-b-visible` will assume the element is
  _always visible_, and will call the callback once with the argument set to `true`.

## Directive syntax and usage

```html
<div v-b-visible.[mod1].[mod2]="callback">content</div>
```

Where `callback` is required:

- A function reference that will be called whenever visibility changes. The callback is passed a
  single boolean argument. `true` indicates that the element is intersecting (partially or entirely
  visible) in the viewport, or `false` if the element is not visible/intersecting with the viewport.
  The callback will be called each time the element's visibility changes (except when the `once`
  modifier is used. See below for details)

Where `[mod1]` or `[mod2]` can be (all optional):

- A positive integer number representing the offset (margin) in pixels _away_ from the edge of the
  _viewport_ to determine when the element is considered in (or just about to be in) the viewport.
  The value adds a margin around the viewport. The default value is `0`.
- The keyword `once`. When this modifier is present, the callback will be called only once the first
  time the element is visible (with the argument of `true` indicating the element is
  intersecting/visible). Note the callback _may be_ called prior to this with an argument of `false`
  signifying the element is not intersecting/visible.

The order of the modifiers is not important.

### Usage syntax examples

In all use cases, the callback function is required.

#### Basic (no modifiers)

```html
<template>
  <div v-b-visible="visibleHandler"> ... </div>
</template>
<script>
export default {
  methods: {
    visibleHandler(isVisible) {
      if (isVisible) {
        // Do something
      } else {
        // Do something else
      }
    }
  }
}
</script>
```

#### With viewport offset modifier

In this example, the modifier value represents 350px (if the element is outside of the physical
viewport by at least 350px, then it will be considered "visible"):

```html
<template>
  <div v-b-visible.350="visibleHandler"> ... </div>
</template>
<script>
export default {
  methods: {
    visibleHandler(isVisible) {
      if (isVisible) {
        // Do something
      } else {
        // Do something else
      }
    }
  }
}
</script>
```

#### With the `once` modifier

```html
<template>
  <div v-b-visible.once="visibleHandler"> ... </div>
</template>
<script>
export default {
  methods: {
    visibleHandler(isVisible) {
      if (isVisible) {
        // This will only ever happen once, when the
        // element has become visible for the first time
      } else {
        // This may happen zero or more times before
        // the element becomes visible, but will never
        // happen after the element has become visible
      }
    }
  }
}
</script>
```

#### With both `once` and offset modifiers

```html
<template>
  <div v-b-visible.once.350="visibleHandler"> ... </div>
</template>
<script>
export default {
  methods: {
    visibleHandler(isVisible) {
      if (isVisible) {
        // This will only ever happen once, when the
        // element is outside of the physical viewport
        // by at least 350px for the first time
      } else {
        // This may happen zero or more times before
        // the element becomes visible, but will never
        // happen after the element has become visible
      }
    }
  }
}
</script>
```

## Live examples

Here are two live examples showing two common use cases.

### Visibility of scrolled content

Scroll the container to see the reaction when the `<b-badge>` scrolls into view. Note that
visibility state will also change if the element is scrolled out of the viewport.

```html
<template>
  <div>
    <div
      :class="[isVisible ? 'bg-info' : 'bg-light', 'border', 'p-2', 'text-center']"
      style="height: 85px; overflow-y: scroll;"
    >
      <p>{{ text }}</p>
      <b-badge v-b-visible="handleVisibility">Element with v-b-visible directive</b-badge>
      <p>{{ text }}</p>
    </div>
    <p class="mt-2">
      Visible: {{ isVisible }}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isVisible: false,
        text: `
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur commodo
          non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur ipsum
          commodo tempor sunt in proident. Non elixir food exorcism nacho tequila tasty.
        `
      }
    },
    methods: {
      handleVisibility(isVisible) {
        this.isVisible = isVisible
      }
    }
  }
</script>

<!-- v-b-visible-scroll.vue -->
```

One use case for this, when combined with the `once` modifier, is to see if a user has scrolled to
the bottom of a page or scrollable div (i.e. has "read" the entire terms of service).

### CSS display visibility detection

Click the button to change the `<div>` visibility state. Note that visibility state will also change
if the element is scrolled out of the viewport.

```html
<template>
  <div>
    <b-button @click="show = !show" class="mb-2">Toggle display</b-button>
    <p>Visible: {{ isVisible }}</p>
    <div class="border p-3" style="height: 6em;">
      <!-- We use Vue's `v-show` directive to control the CSS `display` of the div -->
      <div v-show="show" class="bg-info p-3">
        <b-badge v-b-visible="handleVisibility">Element with v-b-visible directive</b-badge>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
        isVisible: false
      }
    },
    methods: {
      handleVisibility(isVisible) {
        this.isVisible = isVisible
      }
    }
  }
</script>

<!-- v-b-visible-display.vue -->
```

## See also

For more details on `IntersectionObserver`, refer to the
[MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
