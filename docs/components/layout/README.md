# Layout and Grid System

> Use the powerful mobile-first flexbox grid (via the `<b-container>`, `<b-row>`,
`<b-form-row>` and `<b-col>` components) to build layouts of all shapes and sizes
thanks to a twelve column system, five default responsive tiers, CSS Sass variables
and mixins, and dozens of predefined classes.

## How It Works

Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive. Below is an example and an in-depth look at how the grid comes together.

```html
<b-container class="bv-example-row">
    <b-row>
        <b-col>1 of 3</b-col>
        <b-col>2 of 3</b-col>
        <b-col>3 of 3</b-col>
    </b-row>
</b-container>

<!-- how-it-works.vue -->
```

The above example creates three equal-width columns on small, medium, large, and extra large devices using BS4's predefined grid classes. Those columns are centered in the page with the parent .container.

Here’s how it works:

- Containers provide a means to center your site’s contents. Use `<b-container>` for fixed width or `<b-container fluid>` for full width.
- Rows are horizontal groups of columns that ensure your columns are lined up properly. We use the negative margin method on `<b-row>` to ensure all your content is aligned properly down the left side.
- Content should be placed within `<b-col>` columns, and only columns may be immediate children of `<b-row>`.
- Thanks to flexbox, grid columns without a set width will automatically layout with equal widths. For example, four instances of `<b-col sm="auto">` will each automatically be 25% wide for small breakpoints.
- Column prop `cols` indicates the number of columns you’d like to use out of the possible 12 per row regardless of breakpoint (starting at breakpoint `xs`). So, if you want three equal-width columns at any breakpoint, you can use `<b-col cols="4">`.
- Column props `sm`, `md`, `lg`, `xl` indicate the number of columns you’d like to use out of the possible 12 per row. at the various breakpoints. So, if you want three equal-width columns at breakpoint `sm`, you can use `<b-col sm="4">`. the special value `auto` can be used to ake up the remaining available column space in a row.
- Column widths, internally, are set in percentages, so they’re always fluid and sized relative to their parent element.
- Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from `<b-row>` and padding from `<b-col>` by setting the `no-gutters` prop on `<b-row>`.
- There are five grid tiers, one for each responsive breakpoint: all breakpoints (extra small), small, medium, large, and extra large.
- Grid tiers are based on minimum widths, meaning they apply to that one tier and all those above it (e.g., `<b-col-sm="4">` applies to small, medium, large, and extra large devices).
- You can use predefined grid classes or Sass mixins for more semantic markup.

Be aware of the limitations and [bugs around flexbox](https://github.com/philipwalton/flexbugs),
like the [inability to use some HTML elements as flex
containers](https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers).

## Containers

Containers (`<b-container>`) are the most basic layout element in Bootstrap and
is **required when using the grid system**. Choose from a responsive, fixed-width
container (meaning its max-width changes at each breakpoint) by default, or
fluid-width (meaning it’s 100% wide all the time) by setting 'fluid' prop.

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

## Rows

`<b-row>` components must be placed inside a `<b-container>` component, or an
element (such as a `<div>`) that has the class `container` or `container-fluid`
applied to it.

You can remove the margin from `<b-row>` and padding from `<b-col>` by setting the
`no-gutters` prop on `<b-row>`.

## Columns

`<b-col>` Must be placed inside a `<b-row>` component, or an element (such as a `<div>`)
that has the class `row` applied to it, or - in the case of [forms](/docs/components/form) -
inside a `<b-form-row>` component to obtain columns with more compact margins.

**Note:** _The `offset-*` props will work once Bootstrap <mark>V4.0.0.beta.2</mark> is released. The current <mark>V4.0.0.beta.1</mark> CSS does not include the required `.offset-*` classes._

## Grid options

While Bootstrap uses `ems` or `rems` for defining most sizes, `px`s are used for grid breakpoints and container widths. This is because the viewport width is in pixels and does not change with the [font size](https://drafts.csswg.org/mediaqueries-3/#units).

See how aspects of the Bootstrap grid system work across multiple devices with a handy table.

|  | **Extra small** <br> `<576px` | **Small** <br> `≥576px` | **Medium** <br> `≥768px` | **Large** <br> `≥992px` | **Extra large** <br> `≥1200px` |
|--|--|--|--|--|--|
| **Max container width** | None (auto) | 540px | 720px | 960px | 1140px |
| **Prop** | `cols="*"` | `sm="*"` | `md="*"` | `lg="*"` | `xl="*"` |
| **# of columns** <td colspan="5">12</td> |
| **Gutter width** <td colspan="5">30px (15px on each side of a column)</td> |
| **Nestable** <td colspan="5">Yes</td> |
| **Offset*** | `offset="*"` | `offset-sm="*"` | `offset-md="*"` | `offset-lg="*"` | `offset-xl="*"` |
| **Order** | `order="*"` | `order-sm="*"` | `order-md="*"` | `order-lg="*"` | `order-xl="*"` |

<small class="text-muted"><em>* Not available until Bootstrap <mark>v4.0.0.beta.2</mark></em></small>

## Auto-layout columns

Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered prop like `<b-col sm="6">`.

### Equal-Width

For example, here are two grid layouts that apply to every device and viewport, from xs to xl. Add any number of unit-less classes for each breakpoint you need and every column will be the same width.

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

<!-- col-1.vue -->
```

Equal-width columns can be broken into multiple lines, but there is a [Safari flexbox bug](https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrapping-flex-items) that prevents this from working without an explicit flex-basis or border. Our example works thanks to the border being set; you can do the same with `.col { border: 1px solid transparent; }`. Alternatively, you can set the flex-basis to the width of the column (e.g., `.col { flex: 1 0 50%; }`).

Both these fixes have been documented in a [reduced test case outside Bootstrap](https://output.jsbin.com/micohor).

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

<!-- col-2.vue -->
```

### Setting one column width

Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.

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

<!-- b-col-3.vue -->
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

<!-- b-col-4.vue -->
```

### Equal-width multi-row

Create equal-width columns that span multiple rows by inserting a `.w-100` where you want the columns to break to a new line. Make the breaks responsive by mixing the `.w-100` with some [responsive display utilities](https://getbootstrap.com/docs/4.0/utilities/display/).

```html
<b-container class="bv-example-row">
    <b-row>
        <b-col>col</b-col>
        <b-col>col</b-col>
        <div class="w-100"></div>
        <b-col>col</b-col>
        <b-col>col</b-col>
    </b-row>
</b-container>

<!-- b-col-5.vue -->
```

## Responsive classes

Bootstrap’s grid includes five tiers of predefined classes for building complex responsive layouts. Customize the size of your columns on extra small, small, medium, large, or extra large devices however you see fit.

### All breakpoints

For grids that are the same from the smallest of devices to the largest, use the `col` and `cols="*"` props. Specify a number of `cols` when you need a particularly sized column; otherwise, feel free to stick to `col` (which is applied automatically if no `cols` are specified).

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

<!-- b-col-5.vue -->
```

### Stacked to horizontal

Using a single set of `sm="*"` or `sm` (boolean for equal width @sm) props, you can create a basic grid system that starts out stacked on extra small devices before becoming horizontal on desktop (medium) devices.

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

<!-- b-col-6.vue -->
```

### Mix and match

Don’t want your columns to simply stack in some grid tiers? Use a combination of different props for each tier as needed. See the example below for a better idea of how it all works.

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

<!-- b-col-7.vue -->
```
