# Pagination

> Quick first, previous, next, last, and page buttons for pagination control of another component
> (such as `<b-table>` or lists).

For pagination that changes to a new URL, use the
[`<b-pagination-nav>`](/docs/components/pagination-nav) component instead.

**Example Usage with `<b-table>`:**

```html
<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        perPage: 3,
        currentPage: 1,
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ]
      }
    },
    computed: {
      rows() {
        return this.items.length
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

### Limiting the number of displayed buttons

To restrict the number of page buttons (including the ellipsis, but excluding the first, prev, next,
and last buttons) shown, use the `limit` prop to specify the desired number of page buttons
(including the ellipsis, if shown). The default `limit` is `5`. The minimum supported value is `3`.
When `limit` is set to `3`, no ellipsis indicators will be shown for practical purposes.

The `first` and `last` buttons can be optionally hidden by setting the `hide-goto-end-buttons` prop.

The showing of the `ellipsis` can be optionally disabled by setting the `hide-ellipsis` prop.

#### Small screen support

On smaller screens (i.e. mobile), some of the `<b-pagination>` buttons will be hidden to minimize
the potential of the pagination interface wrapping onto multiple lines:

- The ellipsis indicators will be hidden on screens `xs` and smaller.
- Page number buttons will be limited to a maximum of 3 visible on `xs` screens and smaller.

This ensures that no more than 3 page number buttons are visible, along with the goto _first_,
_prev_, _next_, and _last_ buttons.

### Button content

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
      last-text="Last"
    ></b-pagination>

    <!-- Use emojis in props -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-4"
    ></b-pagination>

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
      <div slot="ellipsis-text">
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
      </div>
      <span slot="page" slot-scope="{ page, active }">
        <b v-if="active">{{ page }}</b>
        <i v-else>{{ page }}</i>
      </span>
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

The slot `page` is always scoped, while the slots `first-text`, `prev-text`, `next-text` and
`last-text` are optionally scoped. The `ellipsis-text` slot is not scoped.

**Scoped variables properties available to the `page` slot:**

| Property   | Type    | Description                                          |
| ---------- | ------- | ---------------------------------------------------- |
| `page`     | Number  | Page number (from `1` to `numberOfPages`)            |
| `index`    | Number  | Page number (indexed from `0` to `numberOfPages -1`) |
| `active`   | Boolean | If the page is the active page                       |
| `disabled` | Boolean | If the page button is disabled                       |
| `content`  | String  | Page number as a string                              |

**Scoped variables properties available to the `first-text`, `prev-text`, `next-text` and
`last-text` slots:**

| Property   | Type    | Description                                          |
| ---------- | ------- | ---------------------------------------------------- |
| `page`     | Number  | Page number (from `1` to `numberOfPages`)            |
| `index`    | Number  | Page number (indexed from `0` to `numberOfPages -1`) |
| `disabled` | Boolean | If the page button is disabled                       |

### Button size

Optionally change from the default button size by setting the `size` prop to either `'sm'` for
smaller buttons or `'lg'` for larger buttons.

```html
<template>
  <div class="overflow-auto">
    <div>
      <h6>Small</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" size="sm"></b-pagination>
    </div>

    <div class="mt-3">
      <h6>Default</h6>
      <b-pagination v-model="currentPage" :total-rows="rows"></b-pagination>
    </div>

    <div class="mt-3">
      <h6>Large</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" size="lg"></b-pagination>
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

### Alignment

By default the pagination component is left aligned. Change the alignment to `center`, `right`
(`right` is an alias for `end`), or `fill` by setting the prop `align` to the appropriate value.

```html
<template>
  <div class="overflow-auto">
    <div>
      <h6>Left alignment (default)</h6>
      <b-pagination v-model="currentPage" :total-rows="rows"></b-pagination>
    </div>

    <div class="mt-3">
      <h6 class="text-center">Center alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="center"></b-pagination>
    </div>

    <div class="mt-3">
      <h6 class="text-right">Right (end) alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="right"></b-pagination>
    </div>

    <div class="mt-3">
      <h6 class="text-center">Fill alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="fill"></b-pagination>
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

The `label-page` will optionally accept a function to generate the aria-label. The function is
passed a single argument which is the page number (indexed from 1 to number of pages).

You can remove any label by setting the prop to an empty string (`''`), although this is not
recommended unless the content of the button textually conveys it's purpose.

### Keyboard navigation support

`<b-pagination>` supports keyboard navigation out of the box.

- Tabbing into the pagination component will autofocus the current page button
- <kbd>LEFT</kbd> and <kbd>RIGHT</kbd> arrow keys will focus the previous and next buttons in the
  page list, respectively, and <kbd>ENTER</kbd> or <kbd>SPACE</kbd> keys will select (click) the
  focused page button

## See also

For navigation based pagination, please see the
[`<b-pagination-nav>`](/docs/components/pagination-nav) component.

<!-- Component reference added automatically from component package.json -->
