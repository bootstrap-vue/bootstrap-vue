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
- If `IntersectionObserver` support is not detected, then `v-b-visible` will assume the element is
  always visible, and will call the callback once with the argument set to `true`

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

- A positive number representing the offset (margin) in pixels _away_ from the edge of the viewport
  to determine when the element is considered in (or just about to be in) the viewport. The value
  adds a margin around the view port. The default value is `0`.
- The keyword `once`. When this modifier is present, the callback will be called once (with the
  argument of `true` indicating the element is intersecting/visible) when the element is
  intersecting with the viewport. Note the callback may be called prior to this with an argument of
  `false` signifying the element is not intersecting/visible.

The order of the modifiers is not important.

### Usage syntax examples

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
  <div v-b-visible.350="visibleHandler"> ... </div>
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
  <div v-b-visible.350.once="visibleHandler"> ... </div>
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

## Live examples

Here are two live examples showing two use cases.

### Visibility of scrolled content

Scroll the container to see the reaction when the `<b-badge>` scrolls into view:

```html
<template>
  <div>
    <div
      :class="[isVisible ? 'bg-info' : 'bg-light', 'border', 'p-2', 'text-center']"
      style="height: 100px; overflow-y: scroll;"
    >
      <br><br><br><br><br><br><br><br>
      <b-badge v-b-visible="handleVisibility">Element with v-b-visible directive</b-badge>
      <br><br><br><br><br><br><br><br>
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

<!-- v-b-visible-scroll.vue -->
```

### CSS display visibility detection

Click the button to change the `<div>` visibility state:

```html
<template>
  <div>
    <b-button @click="show = !show" class="mb-2">Toggle display</b-button>
    <p>Visible: {{ isVisible }}</p>
    <div class="border p-3" style="height: 6em;">
      <!-- We use Vue's v-show directive to control the display of the div --> 
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
