# Badges

> Small and adaptive tag for adding context to just about any content.

```html
<div>
  <h3>Example heading <b-badge>New</b-badge></h3>
  <h4>Example heading <b-badge variant="primary">New</b-badge></h4>
  <h5>Example heading <b-badge pill variant="success">New</b-badge></h5>
</div>
  
<!-- badges.vue -->
```

### Contextual variations
Add any of the following variants via the `variant` prop to change the
appearance of a `<b-badge>`: `default`, `primary`, `success`, `warning`, `info`,
and `danger`. If no variant is specified `default` will be used.

#### Conveying meaning to assistive technologies:
Using color to add meaning only provides a visual indication, which will not
be conveyed to users of assistive technologies – such as screen readers. Ensure
that information denoted by the color is either obvious from the content itself
(e.g. the visible text), or is included through alternative means, such as
additional text hidden with the `.sr-only` class.

### Pill badges
Use the `pill` prop to make badges more rounded (with a larger border-radius
and additional horizontal padding). Useful if you miss the badges from Bootstrap v3.
