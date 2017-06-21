# Pagination

> Quick previous and next links for simple pagination implementations with light markup and styles.
  It’s great for simple sites like blogs or magazines.
  Provide pagination links for your site or app with the multi-page pagination component.

`b-pagination` is a custom input component that provides a current page number (starting from 1) input.
The value should be bound via `v-model` in your app.

### Customizing
Pagination supports selveral props that allow you to customize the apperance.

| Prop | Description
| ---- | -----------
| `limit` | Limit the maximum numbr of buttons (including ellipsis if present, but not first/prev/next/last)
| `first-text` | The "goto first page" button text (html supported)
| `prev-text` | The "goto previous page" button text (html supported)
| `next-text` | The "goto next page" button text (html supported)
| `last-text` | The "goto last page" button text (html supported)
| `ellipsis-text` | the `...` spacer text (html supported)
| `hide-ellipsis` | never show ellipsis indicators
| `hide-goto-end-buttons` | never display goto first/last buttons

### Small screen support (`xs`)
One smaller screens, some of the page buttons will be hidden to ensure pagination
fits on a single line.

- The ellipsis indicators will be hidden on screens `xs` and smaller.
- Page number buttons will be limitted to a maximum of 3 visible on `xs` screens and smaller.

This ensures that no more than 3 page number buttons are visible,
along with the goto _first_, _prev_, _next_, and _last_ buttons.


### events
- `input` is emitted anytime the page number changes (either programmatically or via user interction)
- `change` is emitted only when the page number changes based on user interaction

Both events provide the single argument of the current page number (starting from 1)

