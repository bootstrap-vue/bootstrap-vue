# Layout and Grid System

> Use the powerful mobile-first flexbox grid (via the `<b-container>`, `<b-row>`,
`<b-form-row>` and `<b-col>` components) to build layouts of all shapes and sizes
thanks to a twelve column system, five default responsive tiers, CSS Sass variables
and mixins, and dozens of predefined classes.

Here’s how it works:
- Containers provide a means to center your site’s contents. Use `<b-container>` for
fixed width or `<b-container fluid>` for full width.
- Rows are horizontal groups of columns that ensure your columns are lined up properly.
We use the negative margin method on `<b-row>` to ensure all your content is aligned
properly down the left side.
- Content should be placed within `<b-col>` columns, and only columns may be immediate
children of `<b-row>`.
- Thanks to flexbox, grid columns without a set width will automatically layout with
equal widths. For example, four instances of `<b-col sm="auto">` will each automatically be
25% wide for small breakpoints.
- Column prop `cols` indicates the number of columns you’d like to use out of the possible
12 per row regardless of breakpoint (starting at breakpoint `xs`). So, if you want three
equal-width columns at any breakpoint, you can use `<b-col cols="4">`.
- Column props `sm`, `md`, `lg`, `xl` indicate the number of columns you’d like to use
out of the possible 12 per row. at the various breakpoints. So, if you want three
equal-width columns at breakpoint `sm`, you can use `<b-col sm="4">`. the special value
`auto` can be used to ake up the remaining available column space in a row.
- Column widths, internally, are set in percentages, so they’re always fluid and sized
relative to their parent element.
- Columns have horizontal padding to create the gutters between individual columns,
however, you can remove the margin from `<b-row>` and padding from `<b-col>` by setting the
`no-gutters` prop on `<b-row>`.
- There are five grid tiers, one for each responsive breakpoint: all breakpoints (extra
small), small, medium, large, and extra large.
- Grid tiers are based on minimum widths, meaning they apply to that one tier and all those
above it (e.g., `<b-col-sm="4">` applies to small, medium, large, and extra large devices).
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

`<b-col>` provides many optional props for controling width and offest at
various viewport breakpoints.

**Note:** _The `offest-*` props will work once Bootstrap V4.0.0.beta.2 is released.
The current V4.0.0.beta.1 CSS does not include the required `.offest-*` classes._


## Examples

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

```html
<div id="app">
    <b-container>
        <b-row>
            <b-col>
                <h2>Grid Columns</h2>
            </b-col>
        </b-row>
    </b-container>
    <div class="bv-example-row">
        <b-container>

            <b-row>
                <b-col class="header">
                    <h3>Equal Width</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>1 of 2</b-col>
                <b-col>1 of 2</b-col>
            </b-row>
            <b-row>
                <b-col>1 of 3</b-col>
                <b-col>1 of 3</b-col>
                <b-col>1 of 3</b-col>
            </b-row>

            <b-row>
                <b-col class="header">
                    <h3>Setting one column width</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>1 of 3</b-col>
                <b-col cols="5">2 of 3 (cols = 5)</b-col>
                <b-col>3 of 3</b-col>
            </b-row>
            <b-row>
                <b-col>1 of 3</b-col>
                <b-col cols="6">2 of 3 (cols = 6)</b-col>
                <b-col>3 of 3</b-col>
            </b-row>

            <b-row>
                <b-col class="header">
                    <h3>Variable width content</h3>
                </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
                <b-col col
                       lg="2">1 of 3</b-col>
                <b-col cols="12"
                       md="auto">Variable width content</b-col>
                <b-col col
                       lg="2">3 of 3</b-col>
            </b-row>
            <b-row>
                <b-col>1 of 3</b-col>
                <b-col cols="12"
                       md="auto">Variable width content</b-col>
                <b-col col
                       lg="2">3 of 3</b-col>
            </b-row>

            <b-row>
                <b-col class="header">
                    <h3>Equal-width multi-row</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>col</b-col>
                <b-col>col</b-col>
                <div class="w-100"></div>
                <b-col>col</b-col>
                <b-col>col</b-col>
            </b-row>

            <b-row>
                <b-col class="header">
                    <h3>All breakpoints</h3>
                </b-col>
            </b-row>
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

            <b-row>
                <b-col class="header">
                    <h3>Stacked to horizontal</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="8">col-sm-8</b-col>
                <b-col sm="4">col-sm-4</b-col>
            </b-row>
            <b-row>
                <b-col sm>col-sm</b-col>
                <b-col sm>col-sm</b-col>
                <b-col sm>col-sm</b-col>
            </b-row>

            <b-row>
                <b-col class="header">
                    <h3>Mix and match</h3>
                </b-col>
            </b-row>
            <!-- Stack the columns on mobile by making one full-width and the other half-width -->
            <b-row>
                <b-col md="8">.col .col-md-8</b-col>
                <b-col cols="6"
                       md="4">.col-6 .col-md-4</b-col>
            </b-row>

            <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
            <b-row>
                <b-col cols="6"
                       md="4">.col-6 .col-md-4</b-col>
                <b-col cols="6"
                       md="4">.col-6 .col-md-4</b-col>
                <b-col cols="6"
                       md="4">.col-6 .col-md-4</b-col>
            </b-row>

            <!-- Columns are always 50% wide, on mobile and desktop -->
            <b-row>
                <b-col cols="6">.col-6</b-col>
                <b-col cols="6">.col-6</b-col>
            </b-row>
        </b-container>
    </div>
</div>

<!-- col-3.vue -->
```
