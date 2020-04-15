# Color variants and CSS class mapping

> Below are the variants available when using the default Bootstrap v4 CSS. When using BootstrapVue
> components, the variants are referred to by their variant name, rather than by the underlying CSS
> classname

## Base variants

- `primary` - <span class="text-primary">Primary</span>
- `secondary` - <span class="text-secondary">Secondary</span>
- `success` - <span class="text-success">Success</span>
- `warning` - <span class="text-warning">Warning</span>
- `danger` - <span class="text-danger">Danger</span>
- `info` - <span class="text-info">Info</span>
- `light` - <span class="text-light">Light</span>
- `dark` - <span class="text-dark">Dark</span>

The base variants will translate to various Bootstrap v4 contextual class names based on the
component (and variant purpose) where they are used. See the sections below for details.

## Background and border variants

All the **base variants** plus:

- `white`
- `transparent`

These translate to class names `bg-{variant}` for backgrounds and `border-{variant}` for borders.

These variants are used by components (such as `<b-card>`, `<b-jumbotron>`, `<b-modal>`, etc.) that
provide `bg-variant`, `*-bg-variant`, `border-variant` and `*-border-variant` props.

## Text variants

All the **base variants** plus:

- `muted`
- `white`
- `black`

These translate to class names `text-{variant}`

These variants are used by components (such as `<b-card>`, `<b-jumbotron>`, `<b-modal>`, etc.) that
provide `text-variant` and `*-text-variant` props.

## Component specific variants

Some Bootstrap v4 components require additional CSS styling, or additional pseudo selector styling
(i.e buttons), and hence have their own underlying variant CSS classes.

### Alert variants

All the **base variants**

These translate to class names `alert-{variant}`.

### Badge variants

All the **base variants**

These translate to class names `badge-{variant}`.

### Button variants

All the **base variants** plus:

- `outline-{base variant}` which generates an outline button version of the base variant
- `link` which renders the button with the look of a link but retains button padding and margins

These translate to class names `btn-{variant}` and `btn-outline-{variant}`.

Note the `link` variant does not have an outline version.

### Table variants

All the **base variants** plus:

- `active`

These variants translate to class names `table-{variant}`.

When the table has the `dark` prop set, the variants translate to the `bg-{variant}` classes.

Note that the `active` variant is only applicable to `<tr>` elements within the `<tbody>`, and can
not be applied to individual table cells or used as the `table-variant`.

### Popover variants

All the **base variants**

These translate to BootstrapVue custom class names `b-popover-{variant}`.

### Tooltip variants

All the **base variants**

These translate to BootstrapVue custom class names `b-tooltip-{variant}`.

### Toast variants

All the **base variants**

These translate to BootstrapVue custom class names `b-toast-{variant}`.

## Using variant classes

You may also use the underlying class names directly on elements (and some components) via the
standard HTML `class="..."` attribute.

## Creating custom variants

When creating custom variants, follow the Bootstrap v4 variant CSS class naming scheme and they will
become available to the various components that use that scheme (i.e. create a custom CSS class
`btn-purple` and `purple` becomes a valid variant to use on `<b-button>`).

Alternatively, you can create new variant theme colors by supplying custom Bootstrap SCSS them color
maps. The default theme color map is (from `bootstrap/scss/_variables.scss`):

```scss
// Base grayscale colors definitions
$white: #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
$black: #000 !default;

// Base colors definitions
$blue: #007bff !default;
$indigo: #6610f2 !default;
$purple: #6f42c1 !default;
$pink: #e83e8c !default;
$red: #dc3545 !default;
$orange: #fd7e14 !default;
$yellow: #ffc107 !default;
$green: #28a745 !default;
$teal: #20c997 !default;
$cyan: #17a2b8 !default;

// Theme color default definitions
$primary: $blue !default;
$secondary: $gray-600 !default;
$success: $green !default;
$info: $cyan !default;
$warning: $yellow !default;
$danger: $red !default;
$light: $gray-100 !default;
$dark: $gray-800 !default;

// This table defines the theme colors (variant names)
$theme-colors: () !default;
$theme-colors: map-merge(
  (
    'primary': $primary,
    'secondary': $secondary,
    'success': $success,
    'info': $info,
    'warning': $warning,
    'danger': $danger,
    'light': $light,
    'dark': $dark
  ),
  $theme-colors
);
```

Refer to the [Theming section](/docs/reference/theming) for details on customizing Bootstrap and
BootstrapVue styles.
