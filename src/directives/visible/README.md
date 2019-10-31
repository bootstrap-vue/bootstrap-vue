# Visible

> The `v-b-visible` directive allows you to react when an element becomes visible in the viewport.

The `v-b-visible` directive was added in version `2.1.0`.

## Overview

- `v-b-visible` will call your callback method with a boolean value indicating if the element is
  visible (intersecting) with the viewport.
- The directive can be placed on almost any element or component.
- Changes in visibility cqn also be detected (such as `display: none`), as long as the element is
  within (or partially within) the viewport, or within the optional offset.
- Several BootstrapVue components use `v-b-visible`, such as `<b-img-lazy>`.
- The `v-b-visible` directive requires browser support of
  [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
  For older browsers that do not support `IntersectionObserver`, you will need to use a
  [polyfill](/docs/#js).

## Directive syntax and usage

```html
<div v-b-visible.[mod].[...]="callback">content</div>
```

Where `callback` is required:

- A function reference that will be called whenever visibility changes. The callback is passed a
  single boolean argument. `true` indicates that the element is intersecting (partially or entirely
  visible) in the viewport, or `false` if the element is not visible/intersecting with the viewport.
  The callback will be called each time the element's visibility changes (except when hte `once`
  modifier is used. See below for details)

Where `[mod]` can be (all optional):

- A positive number representing the offset (margin) in pixels _away_ from the edge of the viewport
  to determine when the element is considered in (or just about to be in) the viewport. The value
  adds a margin around the view port. The default value is `0`.
- The keyword `once`. When this modifier is present, the callback will be called once (with the
  argument of `true` indicating the element is intersecting/visible) when the element is
  intersecting with the viewport. Note the callback may be called prior to this with an argument of
  `false` signifying the element is not intersecting/visible.

### Usage examples

Basic:

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

With viewport offset modifier of 350px (if the element is outside of the physical viewport by at
least 350px, then it will be considered "visible"):

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

With `once` modifier:

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

With `once` and offset modifiers:

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
