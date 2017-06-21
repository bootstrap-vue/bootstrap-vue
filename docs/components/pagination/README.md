# Pagination

> Quick previous and next links for simple pagination implementations with light markup and styles.
  It’s great for simple sites like blogs or magazines.
  Provide pagination links for your site or app with the multi-page pagination component.

`b-pagination` is a custom input component that provides a current page number input control.
The value should be bound via `v-model` in your app. Page numbers are indexed from 1. The number
of pages is computed from the provided prop values for `total-rows` and `per-page`.

### Customizing
Pagination supports selveral props that allow you to customize the apperance.

| Prop | Description
| ---- | -----------
| `limit` | Limit the maximum numbr of page buttons (including ellipsis if present, but not the first/prev/next/last buttons)
| `total-rows` | The total number of records in your data
| `per-page` | The maximum number of data records per page
| `first-text` | The "goto first page" button text (html supported)
| `prev-text` | The "goto previous page" button text (html supported)
| `next-text` | The "goto next page" button text (html supported)
| `last-text` | The "goto last page" button text (html supported)
| `ellipsis-text` | the `...` indicator text (html supported)
| `hide-ellipsis` | never show ellipsis indicators
| `hide-goto-end-buttons` | never display goto first/last buttons

Ellipsis inidcator(s) will only be ever shown at the front and/or end of
the page number buttons. For `limit` values less than or equal to `4`, the ellipsis indicator(s) will never
be shown for practial display reasons.


### Small screen support (`xs`)
On smaller screens (i.e. mobile), some of the pagination buttons will be hidden to
minimize the potntial of the pagination interface wraping onto multiple lines:

- The ellipsis indicators will be hidden on screens `xs` and smaller.
- Page number buttons will be limitted to a maximum of 3 visible on `xs` screens and smaller.

This ensures that no more than 3 page number buttons are visible,
along with the goto _first_, _prev_, _next_, and _last_ buttons.

### Accessibility
`b-pagination` provides various `xxx-label` attributes which are used for `aria-label`
attributes on the various elements within the component, to help
assistive technology users

Keyboard navigtion is also supported out of the box:
- Tabbing into the pagination component will autofocus the current page button
- Left and right arrow keys will focus the previous and next buttons in the page
list, and `ENTER` and `SAPCE` keys will select (click) the focused page button

### Events
`b-pagination` provides two events that are emitted on the component:
- `input` is emitted anytime the page number changes (either programmatically or via user interaction)
- `change` is emitted only when the page number changes based on user interaction

Both events provide the single argument of the current page number (starting from 1)

