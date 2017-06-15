# Pagination

> Quick previous and next links for simple pagination implementations with light markup and styles.
  It’s great for simple sites like blogs or magazines.
  Provide pagination links for your site or app with the multi-page pagination component.

`b-pagination` is a custom input component that provides a current page number (starting from 1) input.
The value should be bound via `v-model` in your app.

### events
- `input` is emitted anytime the page number changes (either programmatically or via user interction)
- `change` is emitted only when the page number changes based on user interaction

Both events provide the signel argument of hte current page number (starting from 1)

