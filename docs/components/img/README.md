# Images

> Documentation and examples for opting images (via `<b-img>` component) into
responsive behavior (so they never become larger than their parent elements),
optionally adding lightweight styles to them — all via props. Support for
rounded images, thumbnail styling, alignment, and even the ability to create
blank images with  an optional solid background color.

## Responsive images
Images in Bootstrap-Vue can be made responsive with the `fluid` prop (which
sets `max-width: 100%; height: auto;` via CSS classes) are applied to the image
so that it scales with the parent element.

```html
<div>
  <b-img src="https://lorempixel.com/400/200/" fluid alt="Responsive image" />
</div>

<!-- b-img-responsive.vue -->
```

**Note:** _In Internet Explorer 10, SVG images with `fluid` are disproportionately sized.
To fix this, add the style `width: 100% \9;` where necessary. This fix improperly sizes
other image formats, so Bootstrap V4 doesn’t apply it automatically._

## Image thumbnails
You can use prop `thumbnail` to give an image a rounded light border appearance.

```html
<div class="p-5 bg-info text-center">
  <b-img src="https://lorempixel.com/200/200/technics/8/" thumbnail alt="Thumbnail image" />
</div>

<!-- b-img-thumbnail.vue -->
```

## Rounded corners
You can control which corners are rounded by setting hte rounded prop to one
of several values:
- `true` (or prop present with no value): round all corners
- `false` (or prop not present): no explit rounding or corners (default)
- `'top'`: round the top corners
- `'right'`: round the right corners
- `'bottom'`: round the bottom corners
- `'left'`: round the left corners
- `'circle'`: make a circle (if square image) or oval (of not square) border
- `'0'`: explicity turn off rounding or corenrs

```html
<div>
  <b-img rounded blank width="75" height="75" blank-color="#777" alt="img" />
  <b-img rounded="top" blank width="75" height="75" blank-color="#777" alt="img" />
  <b-img rounded="right" blank width="75" height="75" blank-color="#777" alt="img" />
  <b-img rounded="bottom" blank width="75" height="75" blank-color="#777" alt="img" />
  <b-img rounded="left" blank width="75" height="75" blank-color="#777" alt="img" />
  <b-img rounded="circle" blank width="75" height="75" blank-color="#777" alt="img" />
  <b-img rounded="0" blank width="75" height="75" blank-color="#777" alt="img" />
</div>

<!-- b-img-rounded.vue -->
```

## Aligning images
Align images with the `left` (floats left) `right`(floats right), and `center` (auto,
left+right margins) boolean props. You can also center images by placing them in a
container that has the class `text-center`.

**Left an Right aligned (float):**
```html
<div>
  <b-img src="https://lorempixel.com/125/125/technics/8/" left alt="left image" />
  <b-img src="https://lorempixel.com/125/125/technics/8/" right alt="right image" />
</div>

<!-- b-img-left-right.vue >
```

**Center aligned (block):**
```html
<div>
  <b-img src="https://lorempixel.com/125/125/technics/8/" center alt="center image" />
</div>

<!-- b-img-center.vue >
```

Note: `left` takes precedence over `right` which takes precedence over `center`.

## Blank (or solid color) Images
`<b-img>` provides built-in support for generating blank images (transparent by
default) of any width and height, by setting the `blank` prop, and specifying a width and
height value. You can apply anoy of the other props that `<b-img>` to change the
style of the image.

Set the prop `blank-color` to any valid CSS color (hex foramt, RGB, RGBA, named
color, etc). The default color is `transparent`.

```html
<div>
  <b-img blank width="75" height="75" alt="transparent img" />
  <b-img blank width="75" height="75" blank-color="#777" alt="img" />
  <b-img blank width="75" height="75" blank-color="red" alt="img" />
  <b-img blank width="75" height="75" blank-color="black" alt="img" />
  <b-img blank width="75" height="75" blank-color="#338833" alt="img" />
  <b-img blank width="75" height="75" blank-color="rgba(255,255,255,0.5)" alt="img" />
  <b-img blank width="75" height="75" blank-color="#88f" alt="img" />
</div>

<!-- b-img-rounded.vue -->
```

**Notes:**
- If only one of width or height is set, the image will be have both width and height set to the same value.
- If width and height are not set, both width and height will internally be set to 1.
- Blank images are rendered using SVG image data URLs.

