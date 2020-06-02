# Layout and Grid System

> Use the powerful mobile-first flexbox grid (via the `<b-container>`, `<b-row>`, `<b-form-row>` and
> `<b-col>` components) to build layouts of all shapes and sizes thanks to a twelve column system,
> five default responsive tiers, CSS Sass variables and mixins, and dozens of predefined classes.

BootstrapVue provides several convenient _functional_ components tailored for layout, which can
simplify your complex page markup compared to traditional Bootstrap v4 markup. Feel free to switch
back and forth between traditional Bootstrap v4 markup (i.e. `<div>`s and classes) and
BootstrapVue's convenient functional layout components.

## How it works

Bootstrap's grid system uses a series of containers, rows, and columns to layout and align content.
It's built with
[flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
and is fully responsive. Below is an example and an in-depth look at how the grid comes together.

```html
<b-container class="bv-example-row">
  <b-row>
    <b-col>1 of 3</b-col>
    <b-col>2 of 3</b-col>
    <b-col>3 of 3</b-col>
  </b-row>
</b-container>

<!-- b-grid-how-it-works.vue -->
```

The above example creates three equal-width columns on small, medium, large, and extra large devices
using Bootstrap v4's predefined grid classes. Those columns are centered in the page with the parent
`.container`.

Breaking it down, here's how it works:

- Containers provide a means to center and horizontally pad your site's contents. Use
  `<b-container>` for a responsive pixel width or `<b-container fluid>` for `width: 100%` across all
  viewport and device sizes.
- Rows are wrappers for columns. Each column has horizontal `padding` (called a gutter) for
  controlling the space between them. This `padding` is then counteracted on the rows with negative
  margins. This way, all the content in your columns is visually aligned down the left side.
- In a grid layout, content must be placed within columns and only columns may be immediate children
  of rows.
- Thanks to flexbox, grid columns without a set width will automatically layout with equal widths.
  For example, four instances of `<b-col sm="auto">` will each automatically be 25% wide for small
  breakpoints.
- Column prop `cols` indicates the number of columns you'd like to use out of the possible 12 per
  row regardless of breakpoint (starting at breakpoint `xs`). So, if you want three equal-width
  columns at any breakpoint, you can use `<b-col cols="4">`.
- Column props `sm`, `md`, `lg`, `xl` indicate the number of columns you'd like to use out of the
  possible 12 per row, at the various breakpoints. So, if you want three equal-width columns at
  breakpoint `sm`, you can use `<b-col sm="4">`. the special value `auto` can be used to take up the
  remaining available column space in a row.
- Column `width`s are set in percentages, so they're always fluid and sized relative to their parent
  element.
- Columns have horizontal `padding` to create the gutters between individual columns, however, you
  can remove the `margin` from `<b-row>` and `padding` from `<b-col>` by setting the `no-gutters`
  prop on `<b-row>`.
- To make the grid responsive, there are five grid breakpoints, one for each responsive breakpoint:
  all breakpoints (extra small), small, medium, large, and extra large.
- Grid breakpoints are based on minimum width media queries, meaning **they apply to that one
  breakpoint and all those above it** (e.g., `<b-col sm="4">` applies to small, medium, large, and
  extra large devices, but not the first `xs` breakpoint).
- You can use predefined grid classes or Sass mixins for more semantic markup.

Be aware of the limitations and [bugs around flexbox](https://github.com/philipwalton/flexbugs),
like the
[inability to use some HTML elements as flex containers](https://github.com/philipwalton/flexbugs#flexbug-9).

## Containers `<b-container>`

Containers (`<b-container>`) are the most basic layout element in Bootstrap. Choose from a
responsive, fixed-width container (meaning its `max-width` changes at each breakpoint) by default,
or fluid-width (meaning it's 100% wide all the time) by setting 'fluid' prop, or responsive
containers where the container is fluid up until a specific breakpoint (requires Bootstrap CSS
`v4.4+`).

While containers can be nested, most layouts do not require a nested container.

The default breakpoint widths can be configured using Bootstrap V4.x SCSS variables. See the
[Theming](/docs/reference/theming) reference page for additional details, and the table in the
[Grid options](#grid-options) section below.

### Default container

The default `<b-container>` is a responsive, fixed-width container, meaning its `max-width` changes
at each viewport width breakpoint.

```html
<b-container>
  <!-- Content here -->
</b-container>
```

### Fluid width container

Using the `fluid` prop on `<b-container>` will render a container that is always 100% width,
regardless of viewport breakpoint.

```html
<b-container fluid>
  <!-- Content here -->
</b-container>
```

Setting the `fluid` prop to true (or an empty string) is equivalent to the Bootstrap
`.container-fluid` class.

### Responsive fluid containers

<span class="badge badge-info small">Requires Bootstrap v4.4+ CSS</span>

Responsive containers are new in Bootstrap v4.4. They allow you to specify a container that is 100%
wide (fluid) until particular breakpoint is reached at which point a `max-width` is applied. For
example, setting prop `fluid` to `'md'` will render a container that is 100% wide to start until the
`'md'` breakpoint is reached, at which point it will become a standard non-fluid container.

```html
<b-container fluid="sm">
  100% wide until small breakpoint
</b-container>
<b-container fluid="md">
  100% wide until medium breakpoint
</b-container>
<b-container fluid="lg">
  100% wide until large breakpoint
</b-container>
<b-container fluid="xl">
  100% wide until extra large breakpoint
</b-container>
```

Setting the fluid prop to a breakpoint name translates to the Bootstrap class
`.container-{breakpoint}`.

Refer to the [Grid options section](#grid-options) table below for the default container width
values.

## Rows `<b-row>` and `<b-form-row>`

Rows are wrappers for [columns](#columns-b-col). Each column has horizontal padding (called a
gutter) for controlling the space between them. This padding is then counteracted on the rows with
negative margins. This way, all the content in your columns is visually aligned down the left side.

You can remove the margin from `<b-row>` and padding from `<b-col>` by setting the `no-gutters` prop
on `<b-row>`.

Or, for compact margins (smaller gutters between columns), use the `<b-form-row>` component, which
is typically used when laying out [forms](/docs/components/form).

## Columns `<b-col>`

`<b-col>` Must be placed inside a `<b-row>` component, or an element (such as a `<div>`) that has
the class `row` applied to it, or - in the case of [forms](/docs/components/form) - inside a
`<b-form-row>` component (to obtain columns with more compact margins).

## Grid options

While Bootstrap uses `em` or `rem` units for defining most sizes, `px`s are used for grid
breakpoints and container widths. This is because the viewport width is in pixels and does not
change with the [font size](https://drafts.csswg.org/mediaqueries-3/#units).

See how aspects of the Bootstrap grid system work across multiple devices with a handy table.

<div class="table-responsive-sm">
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th></th>
        <th>
          <strong>Extra small</strong> (xs)<br>
          <code>&lt;576px</code>
        </th>
        <th>
          <strong>Small</strong> (sm)<br>
          <code>≥576px</code>
        </th>
        <th>
          <strong>Medium</strong> (md)<br>
          <code>≥768px</code>
        </th>
        <th>
          <strong>Large</strong> (lg)<br>
          <code>≥992px</code>
        </th>
        <th>
          <strong>Extra large</strong> (xl)<br>
          <code>≥1200px</code>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="text-left">Max container width</th>
        <td>None (auto)</td>
        <td>540px</td>
        <td>720px</td>
        <td>960px</td>
        <td>1140px</td>
      </tr>
      <tr>
        <th class="text-left">Prop</th>
        <td><code>cols="*"</code></td>
        <td><code>sm="*"</code></td>
        <td><code>md="*"</code></td>
        <td><code>lg="*"</code></td>
        <td><code>xl="*"</code></td>
      </tr>
      <tr>
        <th class="text-left"># of columns</th>
        <td colspan="5">12</td>
      </tr>
      <tr>
        <th class="text-left">Gutter width</th>
        <td colspan="5">30px (15px on each side of a column)</td>
      </tr>
      <tr>
        <th class="text-left">Nestable</th>
        <td colspan="5">Yes</td>
      </tr>
      <tr>
        <th class="text-left">Offset</th>
        <td><code>offset="*"</code></td>
        <td><code>offset-sm="*"</code></td>
        <td><code>offset-md="*"</code></td>
        <td><code>offset-lg="*"</code></td>
        <td><code>offset-xl="*"</code></td>
      </tr>
      <tr>
        <th class="text-left">Order</th>
        <td><code>order="*"</code></td>
        <td><code>order-sm="*"</code></td>
        <td><code>order-md="*"</code></td>
        <td><code>order-lg="*"</code></td>
        <td><code>order-xl="*"</code></td>
      </tr>
    </tbody>
  </table>
</div>

**Notes:**

- There is no `xs` prop. The `cols` prop refers to the `xs` (smallest) breakpoint.
- The above breakpoint values and names are the Bootstrap defaults. They can be customized via
  [SCSS variables](/docs/reference/theming), and (if also using custom breakpoint names), via the
  BootstrapVue [global configuration](/docs/reference/settings).

### Container sizes

The following table outlines the default container maximum widths at the various breakpoints. These
may vary if you are using custom themed Bootstrap v4 SCSS/CSS.

| Container type | Extra small `<576px` | Small `≥576px` | Medium `≥768px` | Large `≥992px` | Extra large `≥1200px` |
| -------------- | -------------------- | -------------- | --------------- | -------------- | --------------------- |
| _default_      | `100%`               | `540px`        | `720px`         | `960px`        | `1140px`              |
| `fluid`        | `100%`               | `100%`         | `100%`          | `100%`         | `100%`                |
| `fluid="sm"`   | `100%`               | `540px`        | `720px`         | `960px`        | `1140px`              |
| `fluid="md"`   | `100%`               | `100%`         | `720px`         | `960px`        | `1140px`              |
| `fluid="lg"`   | `100%`               | `100%`         | `100%`          | `960px`        | `1140px`              |
| `fluid="xl"`   | `100%`               | `100%`         | `100%`          | `100%`         | `1140px`              |

Refer to the [Containers `<b-container>` section](#containers-b-container) section above for
additional information

## Auto-layout columns

Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered prop
like `<b-col sm="6">`.

### Equal-width columns

For example, here are two grid layouts that apply to every device and viewport, from `xs` to `xl`.
Add any number of unit-less classes for each breakpoint you need and every column will be the same
width.

```html
<b-container class="bv-example-row">
  <b-row>
    <b-col>1 of 2</b-col>
    <b-col>2 of 2</b-col>
  </b-row>

  <b-row>
    <b-col>1 of 3</b-col>
    <b-col>2 of 3</b-col>
    <b-col>3 of 3</b-col>
  </b-row>
</b-container>

<!-- b-grid-equal-width.vue -->
```

### Equal-width multi-line

Create equal-width columns that span multiple lines by inserting a `.w-100` where you want the
columns to break to a new line. Make the breaks responsive by mixing `.w-100` with some
[responsive display utilities](https://getbootstrap.com/docs/4.5/utilities/display/).

There was a [Safari flexbox bug](https://github.com/philipwalton/flexbugs#flexbug-11) that prevented
this from working without an explicit `flex-basis` or `border`. There are workarounds for older
browser versions, but they shouldn't be necessary if your target browsers don't fall into the buggy
versions.

```html
<b-container class="bv-example-row">
  <b-row>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <div class="w-100"></div>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
  </b-row>
</b-container>

<!-- b-grid-equal-width-multiple-lines.vue -->
```

### Setting one column width

Auto-layout for flexbox grid columns also means you can set the width of one column and have the
sibling columns automatically resize around it. You may use predefined grid classes (as shown
below), grid mixins, or inline widths. Note that the other columns will resize no matter the width
of the center column.

```html
<b-container class="bv-example-row">
  <b-row class="text-center">
    <b-col>1 of 3</b-col>
    <b-col cols="8">2 of 3 (wider)</b-col>
    <b-col>3 of 3</b-col>
  </b-row>

  <b-row class="text-center">
    <b-col>1 of 3</b-col>
    <b-col cols="5">2 of 3 (wider)</b-col>
    <b-col>3 of 3</b-col>
  </b-row>
</b-container>

<!-- b-grid-one-width.vue -->
```

### Variable width content

Use `{breakpoint}="auto"` props to size columns based on the natural width of their content.

```html
<b-container class="bv-example-row">
  <b-row class="justify-content-md-center">
    <b-col col lg="2">1 of 3</b-col>
    <b-col cols="12" md="auto">Variable width content</b-col>
    <b-col col lg="2">3 of 3</b-col>
  </b-row>

  <b-row>
    <b-col>1 of 3</b-col>
    <b-col cols="12" md="auto">Variable width content</b-col>
    <b-col col lg="2">3 of 3</b-col>
  </b-row>
</b-container>

<!-- b-grid-variable-width.vue -->
```

## Responsive classes

Bootstrap's grid includes five tiers of predefined classes for building complex responsive layouts.
Customize the size of your columns on extra small, small, medium, large, or extra large devices
however you see fit.

### All breakpoints

For grids that are the same from the smallest of devices to the largest, use the `col` and
`cols="*"` props. Specify a number of `cols` when you need a particularly sized column; otherwise,
feel free to stick to `col` (which is applied automatically if no `cols` are specified).

```html
<b-container class="bv-example-row">
  <b-row>
    <b-col>col</b-col>
    <b-col>col</b-col>
    <b-col>col</b-col>
    <b-col>col</b-col>
  </b-row>

  <b-row>
    <b-col cols="8">col-8</b-col>
    <b-col cols="4">col-4</b-col>
  </b-row>
</b-container>

<!-- b-grid-size-all-breakpoints.vue -->
```

### Stacked to horizontal

Using a single set of `sm="*"` or `sm` (boolean for equal width @sm) props, you can create a basic
grid system that starts out stacked on extra small devices before becoming horizontal on desktop
(medium) devices.

```html
<b-container class="bv-example-row">
  <b-row>
    <b-col sm="8">col-sm-8</b-col>
    <b-col sm="4">col-sm-4</b-col>
  </b-row>

  <b-row>
    <b-col sm>col-sm</b-col>
    <b-col sm>col-sm</b-col>
    <b-col sm>col-sm</b-col>
  </b-row>
</b-container>

<!-- b-grid-horizontal-stacked.vue -->
```

### Mix and match

Don't want your columns to simply stack in some grid tiers? Use a combination of different props for
each tier as needed. See the example below for a better idea of how it all works.

```html
<b-container class="bv-example-row">
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <b-row>
    <b-col cols="12" md="8">cols="12" md="8"</b-col>
    <b-col cols="6" md="4">cols="6" md="4"</b-col>
  </b-row>

  <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
  <b-row>
    <b-col cols="6" md="4">cols="6" md="4"</b-col>
    <b-col cols="6" md="4">cols="6" md="4"</b-col>
    <b-col cols="6" md="4">cols="6" md="4"</b-col>
  </b-row>

  <!-- Columns are always 50% wide, on mobile and desktop -->
  <b-row>
    <b-col cols="6">cols="6"</b-col>
    <b-col cols="6">cols="6"</b-col>
  </b-row>
</b-container>

<!-- b-grid-mix-and-match.vue -->
```

## Alignment

Use flexbox alignment utilities to vertically and horizontally align columns.

**Note:** Internet Explorer 11 does not support vertical alignment of flex items when the flex
container has a `min-height` as shown below.
[See Flexbugs #3 for more details](https://github.com/philipwalton/flexbugs#flexbug-3).

### Vertical alignment

For vertical alignment of all grid cells in a row, use the `align-v` prop on `<b-row>`. Possible
values are `'start'`, `'center'`, `'end'`, `'baseline'`, and `'stretch'`:

```html
<b-container class="bv-example-row bv-example-row-flex-cols">
  <b-row align-v="start">
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
  </b-row>

  <b-row align-v="center">
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
  </b-row>

  <b-row align-v="end">
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
  </b-row>

  <b-row align-v="baseline">
    <b-col style="font-size: 0.75rem;">One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col style="font-size: 1.25rem;">One of three columns</b-col>
  </b-row>

  <b-row align-v="stretch">
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
  </b-row>
</b-container>

<!-- b-grid-vertical-alignment.vue -->
```

For individual grid cell vertical alignment, use the `align-self` prop on `<b-col>`. Possible values
are `'start'`, `'center'`, `'end'`, `'baseline'`, and `'stretch'`:

```html
<b-container class="bv-example-row bv-example-row-flex-cols">
  <b-row>
    <b-col align-self="start">One of three columns</b-col>
    <b-col align-self="center">One of three columns</b-col>
    <b-col align-self="end">One of three columns</b-col>
  </b-row>
  <b-row>
    <b-col align-self="baseline">One of two columns</b-col>
    <b-col align-self="stretch">One of two  columns</b-col>
  </b-row>
</b-container>

<!-- b-grid-align-self.vue -->
```

### Horizontal alignment

To horizontally align grid cells within a row, use the `align-h` prop on `<b-row>`. Possible values
are: `'start'`, `'center'`, `'end'`, `'around'`, and `'between'`:

```html
<b-container class="bv-example-row">
  <b-row align-h="start">
    <b-col cols="4">One of two columns</b-col>
    <b-col cols="4">One of two columns</b-col>
  </b-row>

  <b-row align-h="center">
    <b-col cols="4">One of two columns</b-col>
    <b-col cols="4">One of two columns</b-col>
  </b-row>

  <b-row align-h="end">
    <b-col cols="4">One of two columns</b-col>
    <b-col cols="4">One of two columns</b-col>
  </b-row>

  <b-row align-h="around">
    <b-col cols="4">One of two columns</b-col>
    <b-col cols="4">One of two columns</b-col>
  </b-row>

  <b-row align-h="between">
    <b-col cols="4">One of two columns</b-col>
    <b-col cols="4">One of two columns</b-col>
  </b-row>
</b-container>

<!-- b-grid-horizontal-alignment.vue -->
```

## Reordering

### Ordering columns

Use `order-*` props for controlling the visual order of your content. These props are responsive, so
you can set the order by breakpoint (e.g., `order="1" order-md="2"`). Includes support for 1 through
12 across all five grid tiers. `<b-col>` defaults to an order value of `0`.

```html
<b-container fluid class="bv-example-row">
  <b-row class="mb-3">
    <b-col>First in DOM, no order applied</b-col>
    <b-col order="5">Second in DOM, with a larger order</b-col>
    <b-col order="1">Third in DOM, with an order of 1</b-col>
  </b-row>

  <b-row class="mb-3">
    <b-col order="6">First in DOM, with order of 6</b-col>
    <b-col order="1">Second in DOM, with an order of 1</b-col>
    <b-col>Third in DOM, no order applied</b-col>
  </b-row>
</b-container>

<!-- b-grid-order.vue -->
```

Ordering is controlled by flexbox's CSS style `order`.

### Offsetting columns

You can offset grid columns in two ways: our responsive `offset-*` props or the
[margin](/docs/reference/spacing-classes) utility classes. Grid `offset-*` props are sized to match
columns while margins utility classes are more useful for quick layouts where the width of the
offset is variable.

```html
<b-container fluid class="bv-example-row">
  <b-row>
    <b-col md="4">md="4"</b-col>
    <b-col md="4" offset-md="4">md="4" offset-md="4"</b-col>
  </b-row>

  <b-row>
    <b-col md="3" offset-md="3">md="3" offset-md="3"</b-col>
    <b-col md="3" offset-md="3">md="3" offset-md="3"</b-col>
  </b-row>

  <b-row>
    <b-col md="6" offset-md="3">md="6" offset-md="3"</b-col>
  </b-row>
</b-container>

<!-- b-grid-offset.vue -->
```

In addition to column clearing at responsive breakpoints, you may need to reset offsets by setting
the offset to `0` at a larger breakpoint:

```html
<b-container fluid class="bv-example-row">
  <b-row>
    <b-col sm="5" md="6">sm="5" md="6"</b-col>
    <b-col sm="5" offset-sm="2" md="6" offset-md="0">sm="5" offset-sm="2" md="6" offset-md="0"</b-col>
  </b-row>

  <b-row>
    <b-col sm="6" md="5" lg="6">sm="6" md="5" lg="6"</b-col>
    <b-col sm="6" md="5" offset-md="2" lg="6" offset-lg="0">sm="6" md="5" offset-md="2" col-lg="6" offset-lg="0"</b-col>
  </b-row>
</b-container>

<!-- b-grid-offset-reset.vue -->
```

### Margin utilities on columns

With the move to flexbox in Bootstrap v4, you can use
[margin and spacing](/docs/reference/spacing-classes) utility classes like `.mr-auto` to force
sibling columns away from one another.

```html
<b-container fluid class="text-light text-center">
  <b-row class="mb-3">
    <b-col md="4" class="p-3 bg-info">md="4"</b-col>
    <b-col md="4" class="ml-auto p-3 bg-info">md="4" .ml-auto</b-col>
  </b-row>

  <b-row class="mb-3">
    <b-col md="3" class="ml-md-auto p-3 bg-info">md="3" .ml-md-auto</b-col>
    <b-col md="3" class="ml-md-auto p-3 bg-info">md="3" .ml-md-auto</b-col>
  </b-row>

  <b-row>
    <b-col cols="auto" class="mr-auto p-3 bg-info">cols="auto" .mr-auto</b-col>
    <b-col cols="auto" class="p-3 bg-info">cols="auto"</b-col>
  </b-row>
</b-container>

<!-- b-grid-margins.vue -->
```

## Nesting grids

To nest your content with the default grid, add a new `<b-row>` and set of `<b-col>` components
within an existing `<b-col>` component. Nested rows should include a set of columns that add up to
12 or fewer (it is not required that you use all 12 available columns).

```html
<b-container fluid class="bv-example-row">
  <b-row>
    <b-col sm="9">
      Level 1: sm="9"
      <b-row>
        <b-col cols="8" sm="6">Level 2: cols="8" sm="6"</b-col>
        <b-col cols="4" sm="6">Level 2: cols="4" sm="6"</b-col>
      </b-row>
    </b-col>
  </b-row>
</b-container>

<!-- b-grid-nesting.vue -->
```

## Row columns

<span class="badge badge-info small">Requires Bootstrap v4.4+ CSS</span>

Use the responsive `cols-*` props in `<b-row>` to quickly set the number of columns that best render
your content and layout. Whereas normal column widths are apply to the individual `<b-col>` columns
(e.g., `<b-col md="4">`), the row columns `col-*` props are set on the parent `<b-row>` as a
shortcut.

Use these row columns to quickly create basic grid layouts or to control your card layouts. The
default maximum number of row columns in Bootstrap v4.4 is `6` (unlike the regular columns which
have a default maximum of `12` columns)

The value specified in the `<b-row>` prop(s) is the number of columns to create per row (whereas the
props on `<b-col>` refer to the number of columns to occupy).

```html
<b-container class="bv-example-row mb-3">
  <b-row cols="2">
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
  </b-row>
</b-container>

<b-container class="bv-example-row mb-3">
  <b-row cols="3">
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
  </b-row>
</b-container>

<b-container class="bv-example-row mb-3">
  <b-row cols="4">
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
  </b-row>
</b-container>

<b-container class="bv-example-row">
  <b-row cols="4">
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col cols="6">Column</b-col>
    <b-col>Column</b-col>
  </b-row>
</b-container>

<!-- b-grid-row-cols-introduction.vue -->
```

You can control the number of columns at each breakpoint level via the following `<b-row>` props:

- `cols` for `xs` and up screens
- `cols-sm` for `sm` and up screens
- `cols-md` for `md` and up screens
- `cols-lg` for `lg` and up screens
- `cols-xl` for `xl` and up screens

```html
<b-container class="bv-example-row">
  <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6">
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
  </b-row>
</b-container>

<!-- b-grid-row-cols-breakpoints.vue -->
```

## Utilities for layout

For faster mobile-friendly and responsive development, Bootstrap includes dozens of
[utility classes](/docs/reference/utility-classes) for showing, hiding, aligning, and spacing
content.

### Changing `display`

Use Bootstrap's [display utilities](/docs/reference/utility-classes) for responsively toggling
common values of the `display` property. Mix it with the grid system, content, or components to show
or hide them across specific viewports.

### Flexbox options

Bootstrap 4 is built with flexbox, but not every element’s `display` has been changed to
`display: flex` as this would add many unnecessary overrides and unexpectedly change key browser
behaviors. Most of the components are built with flexbox enabled.

Should you need to add `display: flex` to an element, do so with `.d-flex` or one of the responsive
variants (e.g., `.d-sm-flex`). You’ll need this class or `display` value to allow the use of the
extra [flexbox utilities](/docs/reference/utility-classes) for sizing, alignment, spacing, and more.

### Margin and padding

Use the `margin` and `padding` [spacing utilities](/docs/reference/utility-classes) to control how
elements and components are spaced and sized. Bootstrap 4 includes a five-level scale for spacing
utilities, based on a `1rem` value default SASS `$spacer` variable. Choose values for all viewports
(e.g., `.mr-3` for `margin-right: 1rem`), or pick responsive variants to target specific viewports
(e.g., `.mr-md-3` for `margin-right: 1rem` starting at the `md` breakpoint).

### Toggle `visibility`

When toggling `display` isn’t needed, you can toggle the `visibility` of an element with the
[visibility utility classes](/docs/reference/utility-classes). Invisible elements will still affect
the layout of the page, but are visually hidden from visitors.

<!-- Component reference added automatically from component package.json -->
