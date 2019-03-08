# Pagination

> Quick first, previous, next, last, and page buttons for pagination control of another component
> (such as `<b-table>` or lists).

For pagination that navigates to a new URL, use the
[`<b-pagination-nav>`](/docs/components/pagination-nav) component instead.

```html
<template>
  <div class="overflow-auto">
    <div>
      <h6>Default</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" size="md" />
    </div>

    <div class="mt-3">
      <h6>Small</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" size="sm" />
    </div>

    <div class="mt-3">
      <h6>Large</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" size="lg" />
    </div>

    <div class="mt-3">Current Page: {{ currentPage }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rows: 100,
        perPage: 10,
        currentPage: 3
      }
    }
  }
</script>

<!-- b-pagination.vue -->
```

## Overview

`<b-pagination>` is a custom input component that provides a current page number input control. The
value should be bound via `v-model` in your app. Page numbers are indexed from 1. The number of
pages is computed from the provided prop values for `total-rows` and `per-page`.

## Customizing appearance

`<b-pagination>` supports several props/slots that allow you to customize the appearance. All
`*-text` props are text-only and strip out HTML but you can use their equally named slot
counterparts for that.

For a full list of all available slots see the [Slots](#comp-ref-b-pagination-slots) section below.

```html
<template>
  <div class="overflow-auto">
    <!-- Use text in props -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last" />

    <!-- Use emojis in props -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-4" />

    <!-- Use HTML and sub-components in slots -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      class="mt-4"
    >
      <span class="text-success" slot="first-text">First</span>
      <span class="text-danger" slot="prev-text">Prev</span>
      <span class="text-warning" slot="next-text">Next</span>
      <span class="text-info" slot="last-text">Last</span>
      <div class="d-flex align-items-center h-100" slot="ellipsis-text">
        <b-spinner small type="grow" />
        <b-spinner small type="grow" />
        <b-spinner small type="grow" />
      </div>
    </b-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rows: 100,
        perPage: 10,
        currentPage: 1
      }
    }
  }
</script>

<!-- b-pagination-appearance.vue -->
```

## Button Size

Optionally change from the default button size by setting the `size` prop to either `'sm'` for
smaller buttons or `'lg'` for larger buttons.

```html
<template>
  <div class="overflow-auto">
    <div>
      <h6>Small</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" size="sm" />
    </div>

    <div class="mt-3">
      <h6>Default</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" />
    </div>

    <div class="mt-3">
      <h6>Large</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" size="lg" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rows: 100,
        currentPage: 1
      }
    }
  }
</script>

<!-- b-pagination-size.vue -->
```

## Alignment

By default the pagination component is left aligned. Change the alignment to `center` or `right`
(`right` is an alias for `end`) by setting the prop `align` to the appropriate value.

```html
<template>
  <div class="overflow-auto">
    <div>
      <h6>Left alignment (default)</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" />
    </div>

    <div class="mt-3 text-center">
      <h6>Center alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="center" />
    </div>

    <div class="mt-3 text-right">
      <h6>Right (end) alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="right" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rows: 100,
        currentPage: 3
      }
    }
  }
</script>

<!-- b-pagination-alignment.vue -->
```

## Small screen support

On smaller screens (i.e. mobile), some of the `<b-pagination>` buttons will be hidden to minimize
the potential of the pagination interface wrapping onto multiple lines:

- The ellipsis indicators will be hidden on screens `xs` and smaller.
- Page number buttons will be limited to a maximum of 3 visible on `xs` screens and smaller.

This ensures that no more than 3 page number buttons are visible, along with the goto _first_,
_prev_, _next_, and _last_ buttons.

## Accessibility

The `<b-pagination>` component provides many features to support assistive technology users, such as
`aria-` attributes and keyboard navigation.

### `aria-controls`

When pagination is controlling another component on the page (such as `<b-table>`), set the
`aria-controls` prop to the `id` of the element it is controlling. This will help non-sighted users
know what component is being updated/controlled.

### ARIA labels

`<b-pagination>` provides various `*-label-*` props which are used to set the `aria-label`
attributes on the various elements within the component, which will help users of assistive
technology.

| Prop               | `aria-label` content default                            |
| ------------------ | ------------------------------------------------------- |
| `label-first-page` | "Goto first page"                                       |
| `label-prev-page`  | "Goto previous page"                                    |
| `label-next-page`  | "Goto next page"                                        |
| `label-last-page`  | "Goto last page"                                        |
| `label-page`       | "Goto page", appended with the page number              |
| `aria-label`       | "Pagination", applied to the outer pagination container |

### Keyboard navigation support

`<b-pagination>` supports keyboard navigation out of the box.

- Tabbing into the pagination component will autofocus the current page button
- <kbd>LEFT</kbd> and <kbd>RIGHT</kbd> arrow keys will focus the previous and next buttons in the
  page list, respectively, and <kbd>ENTER</kbd> or <kbd>SPACE</kbd> keys will select (click) the
  focused page button

## See Also

For navigation based pagination, please see the
[`<b-pagination-nav>`](/docs/components/pagination-nav) component.

<!-- Component reference added automatically from component package.json -->
