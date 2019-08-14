# Sizing props and classes

> Bootstrap v4 CSS provides several classes that control the sizing of elements, of which some of
> these have been translated into props on components.

## Component `size` prop

Various components allow for an optional size (via the `size` prop). Below are the sizes supported
via the default Bootstrap v4 CSS.

Available Sizes:

- `sm` small
- `lg` large

When no size is specified, this results in normal sized appearance (usually referred to as `md`).

These size values will be translated into the appropriate Bootstrap CSS class, depending on the
component used on, such as `.btn-<size>` for buttons, `.modal-<size>` for modal,
`.form-control-<size>` for form elements, `.pagination-<size>` for pagination buttons, etc.

## Breakpoint sizes

Bootstrap v4 also includes viewport breakpoint sizes: `xs`, `sm`, `md`, `lg`, and `xl`. which refer
to the width of the user's view port.

For details on breakpoint sizes, please check the [Layout and Grid](/docs/layout/) documentation.

## Sizing utility classes

Easily make an element as wide or as tall (relative to its parent) with the width and height
utilities classes.

Width and height utilities are generated from the `$sizes` Sass map in Bootstrap's
`_variables.scss`. Includes support for `25%`, `50%`, `75%`, and `100%` by default. Modify those
values as you need to generate different utilities here.

**Widths:**

```html
<div class="text-center">
  <div class="w-25 p-3 mb-1 bg-secondary text-light">Width 25%</div>
  <div class="w-50 p-3 mb-1 bg-secondary text-light">Width 50%</div>
  <div class="w-75 p-3 mb-1 bg-secondary text-light">Width 75%</div>
  <div class="w-100 p-3 bg-secondary text-light">Width 100%</div>
</div>

<!-- widths.vue -->
```

**Heights:**

```html
<div style="height: 100px; background-color: rgba(255,0,0,0.1);">
  <div class="h-25 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">
    Height 25%
  </div>
  <div class="h-50 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">
    Height 50%
  </div>
  <div class="h-75 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">
    Height 75%
  </div>
  <div class="h-100 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">
    Height 100%
  </div>
</div>

<!-- heights.vue -->
```

**Max width and height:**

You can also use `mw-100` (`max-width: 100%;`) and `mh-100` (`max-height: 100%;`) utilities as
needed.

## Additional resources

Refer to [Bootstrap v4](https://getbootstrap.com/) official documentation site for more information.
