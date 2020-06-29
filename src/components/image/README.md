# Images

> Documentation and examples for opting images (via `<b-img>` component) into responsive behavior
> (so they never become larger than their parent elements), optionally adding lightweight styles to
> them — all via props.

BootstrapVue's image components support rounded images, thumbnail styling, alignment, and even the
ability to create blank images with an optional solid background color. Support for lazy loaded
images is available via the `<b-img-lazy>` complimentary component.

## Image src resolving

The `src` prop (and `blank-src` prop of `<b-img-lazy>`), out of the box, works only with absolute or
fully-qualified-domain-name URLs. If you are using project assets as image sources, please refer to
[Component img src resolving](/docs/reference/images) for configuring `vue-loader` to understand
custom component props that specify image sources.

## Styling images

Several props are available for styling the rendered image element. The following sub-sections cover
the various options.

### Responsive images

Images in BootstrapVue can be made responsive with the `fluid` prop (which sets
`max-width: 100%; height: auto;` via CSS classes) so that it scales with the parent element - up to
the maximum native width of the image.

```html
<div>
  <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
</div>

<!-- b-img-fluid.vue -->
```

To make a fluid image that will grow to fill the width of its container, use the `fluid-grow` prop.
Note this may cause blurring on small bitmap images.

```html
<div>
  <h5>Small image with <code>fluid</code>:</h5>
  <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>

  <h5 class="my-3">Small image with <code>fluid-grow</code>:</h5>
  <b-img src="https://picsum.photos/300/150/?image=41" fluid-grow alt="Fluid-grow image"></b-img>
</div>

<!-- b-img-fluid-grow.vue -->
```

Use the `block` prop to force the image to display as a block element rather than the browser
default of inline-block element.

**Note:** _In Internet Explorer 10, SVG images with `fluid` are disproportionately sized. To fix
this, add the style `width: 100% \9;` where necessary. This fix improperly sizes other image
formats, so Bootstrap v4 doesn't apply it automatically._

### Image thumbnails

You can use prop `thumbnail` to give an image a rounded light border appearance.

```html
<b-container fluid class="p-4 bg-dark">
  <b-row>
    <b-col>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1"></b-img>
    </b-col>
    <b-col>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
    </b-col>
    <b-col>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
    </b-col>
  </b-row>
</b-container>

<!-- b-img-thumbnail.vue -->
```

### Rounded corners

You can control which corners are rounded by setting the rounded prop to one of the following
values:

- `true` (or prop present with no value): round all corners
- `false` (or prop not present): no explicit rounding or corners (default)
- `'top'`: round the top corners
- `'right'`: round the right corners
- `'bottom'`: round the bottom corners
- `'left'`: round the left corners
- `'circle'`: make a circle (if square image) or oval (if not square) border
- `'0'`: explicitly turn off rounding of corners

```html
<template>
  <div>
    <b-img v-bind="mainProps" rounded alt="Rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="top" alt="Top-rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="right" alt="Right-rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="bottom" alt="Bottom-rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="left" alt="Left-rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
    <b-img v-bind="mainProps" rounded="0" alt="Not rounded image"></b-img>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mainProps: { blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' }
      }
    }
  }
</script>

<!-- b-img-rounded.vue -->
```

### Aligning images

Align images with the boolean props `left` (floats left) `right`(floats right), and `center` (auto
left+right margins). You can also center images by placing them in a container that has the class
`text-center`.

**Left an Right aligned (float):**

```html
<div class="clearfix">
  <b-img left src="https://picsum.photos/125/125/?image=58" alt="Left image"></b-img>
  <b-img right src="https://picsum.photos/125/125/?image=58" alt="Right image"></b-img>
</div>

<!-- b-img-left-right.vue -->
```

**Center aligned (block):**

```html
<div>
  <b-img center src="https://picsum.photos/125/125/?image=58" alt="Center image"></b-img>
</div>

<!-- b-img-center.vue -->
```

Note: `left` takes precedence over `right` which takes precedence over `center`.

## Blank (or solid color) images

`<b-img>` provides built-in support for generating blank images (transparent by default) of any
width and height, by setting the `blank` prop, and specifying `width` and `height` values (in
pixels). You can apply any of the other `<b-img>` props to change the style/behavior of the
generated image.

Use the `blank-color` prop to set the blank image color. The `blank-color`prop can accept any CSS
color value:

- Named colors — i.e. `orange` or `blue`
- Hex colors — i.e. `#FF9E2C`
- RGB and RGBa colors — i.e. `rgb(255, 158, 44)` and `rgba(255, 158, 44, .5)`
- HSL and HSLa colors — i.e. `hsl(32, 100%, 59%)` and `hsla(32, 100%, 59%, .5)`

The default `blank-color` is `transparent`.

```html
<template>
  <div>
    <b-img v-bind="mainProps" alt="Transparent image"></b-img>
    <b-img v-bind="mainProps" blank-color="#777" alt="HEX shorthand color image (#777)"></b-img>
    <b-img v-bind="mainProps" blank-color="red" alt="Named color image (red)"></b-img>
    <b-img v-bind="mainProps" blank-color="black" alt="Named color image (black)"></b-img>
    <b-img v-bind="mainProps" blank-color="#338833" alt="HEX color image"></b-img>
    <b-img v-bind="mainProps" blank-color="rgba(128, 255, 255, 0.5)" alt="RGBa color image"></b-img>
    <b-img v-bind="mainProps" blank-color="#88f" alt="HEX shorthand color (#88f)"></b-img>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mainProps: { blank: true, width: 75, height: 75, class: 'm1' }
      }
    }
  }
</script>

<!-- b-img-blank.vue -->
```

**Notes:**

- In blank image mode, if only one of width or height is set, the image will be have both width and
  height set to the same value.
- In blank image mode, if width and height are not set, both width and height will internally be set
  to 1.
- The `blank` prop takes precedence over the `src` prop. If you set both and later set `blank` to
  `false` the image specified in `src` will then be displayed.
- Blank images are rendered using SVG image data URLs.
- The `width` and `height` props will also apply the `width` and `height` attributes to the rendered
  `<img>` tag, even if `blank` is not set.

## `srcset` support

`<b-img>` supports the
[`srcset` and `sizes` attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
on images. The props accept either a string value, or an array of strings (the array of strings will
be converted into a single string separated by commas).

For details on usage of these attributes, refer to
[MDN's Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
guide.

**Notes:**

- If the `blank` prop is set, then `srcset` and `sizes` props are ignored
- IE 11 does not support `srcset` and `sizes`, so ensure you have a value for the `src` prop
- Vue-loader does not support project relative URLs (asset URLs) on the `srcset` attribute. Instead
  use `require(...)` to resolve the individual URL paths. Be cautious of creating a string of data
  URI's longer than supported by the maximum attribute value length of the browser. If your webpack
  config has a limit for the `url-loader` and you want to prevent inline data-urls, you may have to
  overwrite the loader limits: `require('!!url-loader?limit=0!./assets/photo.jpg')`
- Support for `srcset` and `sizes` was added in release `2.1.0`

## Lazy loaded images

> Use our complementary `<b-img-lazy>` image component (based on `<b-img>`) to lazy load images as
> they are scrolled into view (or within `offset` pixels of the viewport).

Lazy loading images uses
[`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
if supported by the browser (or via a polyfill) to detect when the image should be shown. If
`IntersectionObserver` support is _not detected_, then the image will _always_ be shown.

### Usage

Set the `src` prop to the URL of the image you want loaded lazily, and either specify a placeholder
image URL via the prop `blank-src`, or have a blank placeholder image generated for you by leaving
`blank-src` as `null`.

Specify the width and height of the placeholder via the `blank-width` and `blank-height` props. If
these props are not set, then they will fall back to the `width` and `height` props (which are
applied to the image specified via `src`).

Control the generated blank image color by setting the prop `blank-color`.

Placeholder images (either explicitly provided, or dynamically generated) should have the same width
and height values, or at least the same aspect ratio, as the `src` image.

Feel free to use the `fluid`, `fluid-grow`, `thumbnail`, and `rounded` props of `<b-img>`.

The `offset` prop specifies the number of pixels that an image needs to be near to the viewport to
trigger it to be shown. The default value is `360`.

The `throttle` prop controls how long (in ms) after a `scroll` (or `resize`, or `orientationchange`,
or `transitionend`) event happens before checking if the image has come within view (or within
`offset` of view). The default is `100` (ms). `throttle` has no effect if IntersectionObserver
support is detected.

Once an image has come into view and is shown, the event listeners and/or Intersection Observer are
removed.

**Example usage:**

```html
<template>
  <div>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(80)" alt="Image 1"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(82)" alt="Image 2"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(84)" alt="Image 3"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(85)" alt="Image 4"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(88)" alt="Image 5"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(90)" alt="Image 6"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(92)" alt="Image 7"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(94)" alt="Image 8"></b-img-lazy>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mainProps: {
          center: true,
          fluidGrow: true,
          blank: true,
          blankColor: '#bbb',
          width: 600,
          height: 400,
          class: 'my-5'
        }
      }
    },
    methods: {
      getImageUrl(imageId) {
        const { width, height } = this.mainProps
        return `https://picsum.photos/${width}/${height}/?image=${imageId}`
      }
    }
  }
</script>

<!-- b-img-lazy.vue -->
```

### Force show of lazy loaded image

To force the final image to be shown, set the `show` prop to `true`. The `show` prop supports the
Vue `.sync` modifier, and will be updated to `true` when the final image is shown.

### Lazy loaded `srcset` support

`<b-img-lazy>` supports setting the [`srcset` and `sizes`](#srcset-support) attributes on the
rendered `<img>` element. These props will only be applied to the image once it has come into view.

See [`srcset` support](#srcset-support) above for prop usage details and limitations.

Support for `srcset` and `sizes` was added in release `2.1.0`.

<!-- Component reference added automatically from component package.json -->
