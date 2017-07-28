# Pagination Naviagtion

> Quick first, previous, next, last, and page buttons for pagination based navigation, supporting
regular links or router links.

```html
<template>
<div>
    <h6>Default</h6>
    <b-pagination-nav base-url="#" :number-of-pages="10" v-model="currentPage" />
    <br>

    <div>currentPage: {{currentPage}}</div>
</div>    
</template>

<script>
export default {
    data: {
        currentPage: 1
    }
}
</script>

<!-- pagination-1.vue -->
```

`<b-pagination-nav>` is a custom input component that provides navigational
pagination. The current page should be set via the `value` prop (or `v-model`),
and the total number of pages set with `number-of-pages`. Page numbers are indexed
from 1 through `number-of-pages`.

### Current page
You should **always** set the current page number by setting the prop `value` (or
using `v-model`) to ensure that correct active page number is highligted.


### Base URL
A base URL for the pages can be specified via the prop `base-url`.  All page links
will have an HREF (or TO in the case of router links) that is compsised of the 
`base-url` with the page number appended.

The `base-url` defaults to `/`.


### Router links
By default `<b-pagination-nav>` generates standard links with and HREF. To generate
page links as router links, set the `use-router` prop.  The HREF will then become
the `to` prop of the router link.


### Customizing
`<b-pagination-nav>` supports several props that allow you to customize the appearance.

| Prop | Description
| ---- | -----------
| `limit` | Limit the maximum number of displayed page buttons (including ellipsis if present, and excluding first/prev/next/last buttons)
| `number-of-pages` | The total number of pages
| `first-text` | The "goto first page" button text (html supported)
| `prev-text` | The "goto previous page" button text (html supported)
| `next-text` | The "goto next page" button text (html supported)
| `last-text` | The "goto last page" button text (html supported)
| `ellipsis-text` | the `...` indicator text (html supported)
| `hide-ellipsis` | never show ellipsis indicators
| `hide-goto-end-buttons` | never display goto first/last buttons

Ellipsis inidcator(s) will only be ever shown at the front and/or end of
the page number buttons. For `limit` values less than or equal to `3`, the ellipsis
indicator(s) will never be shown for practical display reasons.

### Alignment
By default the pagination component is left aligned. Change the alignment to
`center` or `right` (`right` is an alias for `end`) by setting the prop
`align` to the appropriate value.

```html
<template>
<div>
    <h6>Left alignment (default)</h6>
    <b-pagination-nav :number-of-pages="10" base-url="#" v-model="currentPage" />
    <br>

    <h6>Center alignment</h6>
    <b-pagination-nav align="center" :number-of-pages="10" base-url="#" v-model="currentPage" />
    <br>

    <h6>Right (end) alignment</h6>
    <b-pagination-nav align="right" :number-of-pages="10" base-url="#" v-model="currentPage" />
    <br>

    <div>currentPage: {{currentPage}}</div>
</div>    
</template>

<script>
export default {
    data: {
        currentPage: 1
    }
}
</script>

<!-- pagination-2.vue -->
```


### Small screen support (`xs`)
On smaller screens (i.e. mobile), some of the `<b-pagination>` buttons will be hidden to
minimize the potential of the pagination interface wrapping onto multiple lines:

- The ellipsis indicators will be hidden on screens `xs` and smaller.
- Page number buttons will be limited to a maximum of 3 visible on `xs` screens and smaller.

This ensures that no more than 3 page number buttons are visible,
along with the goto _first_, _prev_, _next_, and _last_ buttons.


### Accessibility
The `<b-pagination>` component provides many features to support assistive technology users,
such as `aria-` attributes and keyboard navigation.

#### ARIA labels:
`<b-pagination>` provides various `*-label-*` props which are used to set the `aria-label`
attributes on the various elements within the component, which will help users of
assistive technology.

| Prop | `aria-label` content default
| ---- | -----------
| `label-first-page` | "Goto first page"
| `label-prev-page` | "Goto previous page"
| `label-next-page` | "Goto next page"
| `label-last-page` | "Goto last page"
| `label-page` | "Goto page", appended with the page number
| `aria-label` | "Pagination", applied to the outer pagination container

#### Keyboard navigtion support:
`<b-pagination>` supports keyboard navigation out of the box.
- Tabbing into the pagination component will autofocus the current page button
- <kbd>LEFT</kbd> and <kbd>RIGHT</kbd> arrow keys will focus the previous and next buttons in the page
list, respectively, and <kbd>ENTER</kbd> or <kbd>SPACE</kbd> keys will select (click) the focused page button


### See also
For pagination control of a component (such as `<b-table>`), use the
[`<b-pagination>`](./pagination) component instead.

