# Spacing

> Bootstrap v4 CSS includes a wide range of shorthand responsive margin and padding utility classes
> to modify an element's appearance.

## How it works

Assign responsive-friendly margin or padding values to an element or a subset of its sides with
shorthand classes. Includes support for individual properties, all properties, and vertical and
horizontal properties. Classes are built from a default Sass map ranging from .25rem to 3rem.

## Notation

Spacing utilities that apply to all breakpoints, from xs to xl, have no breakpoint abbreviation in
them. This is because those classes are applied from `min-width: 0` and up, and thus are not bound
by a media query. The remaining breakpoints, however, do include a breakpoint abbreviation.

The classes are named using the format `{property}{sides}-{size}` for `xs` and
`{property}{sides}-{breakpoint}-{size}` for `sm`, `md`, `lg`, and `xl`.

Where _`property`_ is one of:

- `m` - for classes that set margin
- `p` - for classes that set padding

Where _`sides`_ is one of:

- `t` - for classes that set `margin-top` or `padding-top`
- `b` - for classes that set `margin-bottom` or `padding-bottom`
- `l` - for classes that set `margin-left` or `padding-left`
- `r` - for classes that set `margin-right` or `padding-right`
- `x` - for classes that set both `*-left` and `*-right`
- `y` - for classes that set both `*-top` and `*-bottom`
- blank - for classes that set `margin` or `padding` on all 4 sides of the element

Where _`size`_ is one of:

- `0` - for classes that eliminate the margin or padding by setting it to `0`
- `1` - (by default) for classes that set the `margin` or `padding` to `$spacer * .25`
- `2` - (by default) for classes that set the `margin` or `padding` to `$spacer * .5`
- `3` - (by default) for classes that set the `margin` or `padding` to `$spacer`
- `4` - (by default) for classes that set the `margin` or `padding` to `$spacer * 1.5`
- `5` - (by default) for classes that set the `margin` or `padding` to `$spacer * 3`

_(You can add more sizes by adding entries to the `$spacers` Sass map variable.)_

## Examples

Here are some representative examples of these classes:

```css
.mt-0 {
  margin-top: 0 !important;
}

.ml-1 {
  margin-left: ($spacer * 0.25) !important;
}

.px-2 {
  padding-left: ($spacer * 0.5) !important;
  padding-right: ($spacer * 0.5) !important;
}

.p-3 {
  padding: $spacer !important;
}
```

## Horizontal centering

Additionally, Bootstrap also includes an `.mx-auto` class for horizontally centering fixed-width
block level content — that is, content that has `display: block` and a `width` set—by setting the
horizontal margins to `auto`.

```html
<div class="mx-auto bg-info" style="width: 200px;">Centered element</div>

<!-- horizontal-centering.vue -->
```
