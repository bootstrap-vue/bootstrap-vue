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
| `limit` | Limit the maximum numbr of buttons (including ellipsis, but not prev/next)
| `firstText` | The "goto first page" button text (html supported)
| `prevText` | The "goto previous page" button text (html supported)
| `nextText` | The "goto next page" button text (html supported)
| `lastText` | The "goto last page" button text (html supported)
| `ellipsisText` | the `...` spacer text (html supported)

One smaller screens (`xs`), some of the page buttons will be hidden to ensure pagination
fits on a single line

### events
- `input` is emitted anytime the page number changes (either programmatically or via user interction)
- `change` is emitted only when the page number changes based on user interaction

Both events provide the single argument of the current page number (starting from 1)

