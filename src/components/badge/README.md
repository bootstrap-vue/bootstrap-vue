# Badges

> Small and adaptive tag for adding context to just about any content.

Badges scale to match the size of the immediate parent element by using relative font sizing and
`em` units.

```html
<div>
  <h2>Example heading <b-badge>New</b-badge></h2>
  <h3>Example heading <b-badge>New</b-badge></h3>
  <h4>Example heading <b-badge>New</b-badge></h4>
  <h5>Example heading <b-badge>New</b-badge></h5>
  <h6>Example heading <b-badge>New</b-badge></h6>
</div>

<!-- b-badges.vue -->
```

Badges can be used as part of links or buttons to provide a counter (or similar flag).

```html
<div class="text-center">
  <b-button variant="primary">
    Notifications <b-badge variant="light">4</b-badge>
  </b-button>
</div>

<!-- b-badge-button.vue -->
```

Note that depending on how they are used, badges may be confusing for users of screen readers and
similar assistive technologies. While the styling of badges provides a visual cue as to their
purpose, these users will simply be presented with the content of the badge. Depending on the
specific situation, these badges may seem like random additional words or numbers at the end of a
sentence, link, or button.

Unless the context is clear (as with the “Notifications” example, where it is understood that the
“4” is the number of notifications), consider including additional context with a visually hidden
piece of additional text.

```html
<div class="text-center">
  <b-button variant="primary">
    Profile
    <b-badge variant="light">9 <span class="sr-only">unread messages</span></b-badge>
  </b-button>
</div>

<!-- b-badge-button-aria.vue -->
```

## Contextual variations

Add any of the following variants via the `variant` prop to change the appearance of a `<b-badge>`:
`default`, `primary`, `success`, `warning`, `info`, and `danger`. If no variant is specified
`default` will be used.

```html
<div>
  <b-badge variant="primary">Primary</b-badge>
  <b-badge variant="secondary">Secondary</b-badge>
  <b-badge variant="success">Success</b-badge>
  <b-badge variant="danger">Danger</b-badge>
  <b-badge variant="warning">Warning</b-badge>
  <b-badge variant="info">Info</b-badge>
  <b-badge variant="light">Light</b-badge>
  <b-badge variant="dark">Dark</b-badge>
</div>

<!-- b-badge-variants.vue -->
```

### Conveying meaning to assistive technologies:

Using color to add meaning only provides a visual indication, which will not be conveyed to users of
assistive technologies – such as screen readers. Ensure that information denoted by the color is
either obvious from the content itself (e.g. the visible text), or is included through alternative
means, such as additional text hidden with the `.sr-only` class.

## Pill badges

Use the `pill` prop to make badges more rounded (with a larger border-radius and additional
horizontal padding). Useful if you miss the badges from Bootstrap v3.

```html
<div>
  <b-badge pill variant="primary">Primary</b-badge>
  <b-badge pill variant="secondary">Secondary</b-badge>
  <b-badge pill variant="success">Success</b-badge>
  <b-badge pill variant="danger">Danger</b-badge>
  <b-badge pill variant="warning">Warning</b-badge>
  <b-badge pill variant="info">Info</b-badge>
  <b-badge pill variant="light">Light</b-badge>
  <b-badge pill variant="dark">Dark</b-badge>
</div>

<!-- b-badge-pill.vue -->
```

## Actionable badges

Quickly provide actionable badges with hover and focus states by specifying either the `href` prop
(links) or `to` prop (router-links):

```html
<div>
  <b-badge href="#" variant="primary">Primary</b-badge>
  <b-badge href="#" variant="secondary">Secondary</b-badge>
  <b-badge href="#" variant="success">Success</b-badge>
  <b-badge href="#" variant="danger">Danger</b-badge>
  <b-badge href="#" variant="warning">Warning</b-badge>
  <b-badge href="#" variant="info">Info</b-badge>
  <b-badge href="#" variant="light">Light</b-badge>
  <b-badge href="#" variant="dark">Dark</b-badge>
</div>

<!-- b-badge-action.vue -->
```

Refer to the [Router support](/docs/reference/router-links) reference page for router-link specific
props.

<!-- Component reference added automatically from component package.json -->
