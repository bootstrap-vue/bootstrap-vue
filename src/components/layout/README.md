# Layout and Grid System

> Use the powerful mobile-first flexbox grid (via the `<b-container>`, `<b-row>`, `<b-form-row>` and
> `<b-col>` components) to build layouts of all shapes and sizes thanks to a twelve column system,
> five default responsive tiers, CSS Sass variables and mixins, and dozens of predefined classes.

BootstrapVue provides several convenient _functional_ components tailored for layout, which can
simplify your complex page markup compared to traditional Bootstrap V4 markup. Feel free to switch
back and forth between traditional Bootstrap V4 markup (i.e. `<div>`s and classes) and BootstrapVue
functional layout components.

## How It Works

Bootstrap’s grid system uses a series of containers, rows, and columns to lay out and align content.
It’s built with flexbox and is fully responsive. Below is an example and an in-depth look at how the
grid comes together.

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
using BS4's predefined grid classes. Those columns are centered in the page with the parent
.container.

Here’s how it works:

- Containers provide a means to center your site’s contents. Use `<b-container>` for fixed width or
  `<b-container fluid>` for full width.
- Rows are horizontal groups of columns that ensure your columns are lined up properly. We use the
  negative margin method on `<b-row>` to ensure all your content is aligned properly down the left
  side.
- Content should be placed within `<b-col>` columns, and only columns may be immediate children of
  `<b-row>`.
- Thanks to flexbox, grid columns without a set width will automatically layout with equal widths.
  For example, four instances of `<b-col sm="auto">` will each automatically be 25% wide for small
  breakpoints.
- Column prop `cols` indicates the number of columns you’d like to use out of the possible 12 per
  row regardless of breakpoint (starting at breakpoint `xs`). So, if you want three equal-width
  columns at any breakpoint, you can use `<b-col cols="4">`.
- Column props `sm`, `md`, `lg`, `xl` indicate the number of columns you’d like to use out of the
  possible 12 per row. at the various breakpoints. So, if you want three equal-width columns at
  breakpoint `sm`, you can use `<b-col sm="4">`. the special value `auto` can be used to take up the
  remaining available column space in a row.
- Column widths, internally, are set in percentages, so they’re always fluid and sized relative to
  their parent element.
- Columns have horizontal padding to create the gutters between individual columns, however, you can
  remove the margin from `<b-row>` and padding from `<b-col>` by setting the `no-gutters` prop on
  `<b-row>`.
- There are five grid tiers, one for each responsive breakpoint: all breakpoints (extra small),
  small, medium, large, and extra large.
- Grid tiers are based on minimum widths, meaning they apply to that one tier and all those above it
  (e.g., `<b-col sm="4">` applies to small, medium, large, and extra large devices).
- You can use predefined grid classes or Sass mixins for more semantic markup.

Be aware of the limitations and [bugs around flexbox](https://github.com/philipwalton/flexbugs),
like the
[inability to use some HTML elements as flex containers](https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers).

## Containers `<b-container>`

Containers (`<b-container>`) are the most basic layout element in Bootstrap and is **required when
using the grid system**. Choose from a responsive, fixed-width container (meaning its max-width
changes at each breakpoint) by default, or fluid-width (meaning it’s 100% wide all the time) by
setting 'fluid' prop.

While containers can be nested, most layouts do not require a nested container.

**Fixed width container, based on viewport breakpoints:**

```html
<b-container>
  <!-- Content here -->
</b-container>
```

**Fluid container which is always 100% width, regardless of viewport breakpoint:**

```html
<b-container fluid>
  <!-- Content here -->
</b-container>
```

## Rows `<b-row>` and `<b-form-row>`

`<b-row>` components must be placed inside a `<b-container>` component, or an element (such as a
`<div>`) that has the class `container` or `container-fluid` applied to it.

You can remove the margin from `<b-row>` and padding from `<b-col>` by setting the `no-gutters` prop
on `<b-row>`.

Or, for compact margins (smaller gutters between columns), use the `<b-form-row>` component, which
is typically used in [forms](/docs/components/form).

## Columns `<b-col>`

`<b-col>` Must be placed inside a `<b-row>` component, or an element (such as a `<div>`) that has
the class `row` applied to it, or - in the case of [forms](/docs/components/form) - inside a
`<b-form-row>` component to obtain columns with more compact margins.

## Grid options

While Bootstrap uses `ems` or `rems` for defining most sizes, `px`s are used for grid breakpoints
and container widths. This is because the viewport width is in pixels and does not change with the
[font size](https://drafts.csswg.org/mediaqueries-3/#units).

See how aspects of the Bootstrap grid system work across multiple devices with a handy table.

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th></th>
      <th>
        <strong>Extra small</strong><br>
        <code>&lt;576px</code>
      </th>
      <th>
        <strong>Small</strong><br>
        <code>≥576px</code>
      </th>
      <th>
        <strong>Medium</strong><br>
        <code>≥768px</code>
      </th>
      <th>
        <strong>Large</strong><br>
        <code>≥992px</code>
      </th>
      <th>
        <strong>Extra large</strong><br>
        <code>≥1200px</code>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Max container width</strong></td>
      <td>None (auto)</td>
      <td>540px</td>
      <td>720px</td>
      <td>960px</td>
      <td>1140px</td>
    </tr>
    <tr>
      <td><strong>Prop</strong></td>
      <td><code>cols="*"</code></td>
      <td><code>sm="*"</code></td>
      <td><code>md="*"</code></td>
      <td><code>lg="*"</code></td>
      <td><code>xl="*"</code></td>
    </tr>
    <tr>
      <td><strong># of columns</strong>
      <td colspan="5">12</td>
    </tr>
    <tr>
      <td><strong>Gutter width</strong>
      <td colspan="5">30px (15px on each side of a column)</td>
    </tr>
    <tr>
      <td><strong>Nestable</strong>
      <td colspan="5">Yes</td>
    </tr>
    <tr>
      <td><strong>Offset</strong></td>
      <td><code>offset="*"</code></td>
      <td><code>offset-sm="*"</code></td>
      <td><code>offset-md="*"</code></td>
      <td><code>offset-lg="*"</code></td>
      <td><code>offset-xl="*"</code></td>
    </tr>
    <tr>
      <td><strong>Order</strong></td>
      <td><code>order="*"</code></td>
      <td><code>order-sm="*"</code></td>
      <td><code>order-md="*"</code></td>
      <td><code>order-lg="*"</code></td>
      <td><code>order-xl="*"</code></td>
    </tr>
  </tbody>
</table>

## Auto-layout columns

Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered prop
like `<b-col sm="6">`.

### Equal-Width

For example, here are two grid layouts that apply to every device and viewport, from xs to xl. Add
any number of unit-less classes for each breakpoint you need and every column will be the same
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

Equal-width columns can be broken into multiple lines, but there is a
[Safari flexbox bug](https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrapping-flex-items)
that prevents this from working without an explicit flex-basis or border. Our example works thanks
to the border being set; you can do the same with `.col { border: 1px solid transparent; }`.
Alternatively, you can set the flex-basis to the width of the column (e.g.,
`.col { flex: 1 0 50%; }`).

Both these fixes have been documented in a
[reduced test case outside Bootstrap](https://output.jsbin.com/micohor).

```html
<b-container class="bv-example-row">
  <b-row>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <div class="w-100" />
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

Use `${breakpoint}-auto` props to size columns based on the natural width of their content.

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

Bootstrap’s grid includes five tiers of predefined classes for building complex responsive layouts.
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

Don’t want your columns to simply stack in some grid tiers? Use a combination of different props for
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

### Vertical Alignment

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
</b-container>

<!-- b-grid-vertical-alignment.vue -->
```

```html
<b-container class="bv-example-row bv-example-row-flex-cols">
  <b-row>
    <b-col align-self="start">One of three columns</b-col>
    <b-col align-self="center">One of three columns</b-col>
    <b-col align-self="end">One of three columns</b-col>
  </b-row>
</b-container>

<!-- b-grid-align-self.vue -->
```

### Horizontal Alignment

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

### Ordering Columns

Use `order-*` props for controlling the visual order of your content. These props are responsive, so
you can set the order by breakpoint (e.g., `order="1" order-md="2"`). Includes support for 1 through
12 across all five grid tiers.

```html
<b-container fluid class="bv-example-row">
  <b-row>
    <b-col>First, but unordered</b-col>
    <b-col order="12">Second, but last</b-col>
    <b-col order="1">Third, but first</b-col>
  </b-row>
</b-container>

<!-- b-grid-order.vue -->
```

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

<!-- Component reference added automatically from component package.json -->
