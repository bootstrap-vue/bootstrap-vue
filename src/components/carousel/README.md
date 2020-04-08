# Carousel

> The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms.
> It works with a series of images, text, or custom markup. It also includes support for
> previous/next controls and indicators.

```html
<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>

    <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<!-- b-carousel.vue -->
```

Please be aware that nested carousels are **not** supported.

## Sizing

Carousels don't automatically normalize slide dimensions. As such, you may need to use additional
utilities or custom styles to appropriately size content. When using images in each slide, ensure
they all have the same dimensions (or aspect ratio).

When using `img-src` or `img-blank` on `<b-carousel-slide>`, you can set the image width and height
via the `img-width` and `img-height` props on `<b-carousel>` and have these values automatically
applied to each `carousel-slide` image.

Note that images will still be responsive and automatically grow or shrink to fit within the width
of its parent container.

Internally, `<b-carousel-slide>` uses the [`<b-img>`](/docs/components/image) component to render
the images. The `img-*` props map to the corresponding props available to `<b-img>`.

## Interval

Carousel defaults to an interval of `5000`ms (5 seconds). You can change the interval between slides
by setting the `interval` prop to the desired number of milliseconds. The smallest supported sliding
interval is 1000ms (1 second).

In browsers where the [Page Visibility API](https://www.w3.org/TR/page-visibility/) is supported,
the carousel will avoid sliding when the webpage is not visible to the user (such as when the
browser tab is inactive, the browser window is minimized, etc.). Sliding will resume when the
browser tab is active.

### Pausing the carousel

To pause the carousel from auto sliding, set the `interval` prop to `0`. To restart a paused
carousel, set the `interval` back to the desired number of ms.

When the carousel is paused, the user can still switch slides via the controls (if enabled) or touch
swipe (on touch enabled devices, if not disabled).

When the users mouse hovers the carousel it will automatically pause, and will automatically restart
when the mouse leaves the carousel. To disable this feature, set the `no-hover-pause` prop on
<b-carousel>`.

## Controls and indicators

Set the prop `controls` to enable the previous and next control buttons.

Set the prop `indicators` to show the slide indicator buttons.

Both indicators and controls can be set at the same time or independently.

## Carousel slide content

`b-carousel-slide` provides several props and slots for placing content in the slide.

### Props

- `caption` Text to use as the main title on the slide (placed inside the inner element which has
  the class `carousel-caption`)
- `text` Textual placed under the title (placed inside the inner element which has the class
  `carousel-caption`)
- `img-src` URL of image to be placed into the background of the slide
- `caption-html` Alternate prop to the `caption` prop, which supports HTML strings
- `html` Alternate prop to the `text` prop, which supports HTML strings

<p class="alert alert-danger">
  <strong>Warning:</strong> Be cautious of using the <code>caption-html</code> and <code>html</code>
  props to display user supplied content, as it may make your application vulnerable to
  <a class="alert-link" href="https://en.wikipedia.org/wiki/Cross-site_scripting">
  <abbr title="Cross Site Scripting Attacks">XSS attacks</abbr></a>, if you do not first
  <a class="alert-link" href="https://en.wikipedia.org/wiki/HTML_sanitization">sanitize</a> the
  user supplied string.
</p>

### Named slots

- `default` content that will be placed inside of the inner element which has the class
  `carousel-caption`. Appears after any content from the `caption` and `text` props.
- `img` content to place into the background of the slide. Despite the slot's name, you can place
  almost any content in this slot in lieu of using the `default` slot or `caption` and `text` props.

## Carousel animation

Carousel, by default, uses a sliding animation. You can change the slide animation to a cross-fade
animation, or disable animation completely.

### Crossfade animation

Set the `<b-carousel>` `fade` prop to `true` to animate slides with a fade transition instead of the
default slide animation.

```html
<div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="First slide"
      img-src="https://picsum.photos/1024/480/?image=10"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
  </b-carousel>
</div>

<!-- b-carousel-fade.vue -->
```

### Disable animation

Set the `<b-carousel>` `no-animation` prop to `true` to disable slide animation.

```html
<div>
  <b-carousel
    id="carousel-no-animation"
    style="text-shadow: 0px 0px 2px #000"
    no-animation
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="First slide"
      img-src="https://picsum.photos/1024/480/?image=10"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Fourth Slide"
      img-src="https://picsum.photos/1024/480/?image=23"
    ></b-carousel-slide>
  </b-carousel>
</div>

<!-- b-carousel-no-animation.vue -->
```

## Slide wrapping

Normally when the carousel reaches one end or the other in the list of slides, it will wrap to the
opposite end of the list of slides and continue cycling.

To disable carousel slide wrapping, set the `no-wrap` prop to true.

## Hide slide text content on small screens

On smaller screens you may want to hide the captions and headings. You can do so via the
`content-visible-up` prop of `<b-carousel-slide>`. The prop accepts a breakpoint name (i.e. `sm`,
`md`, `lg`, `xl`, or custom breakpoint names if you have defined them), and will hide the headings
and captions on screens _smaller_ than the breakpoint.

## Touch swipe support

On touch enabled devices, users can switch slides by swiping left or right on the carousel. To
disable touch control, set the `no-touch` prop to `true`.

## `v-model` support

Programmatically control which slide is showing via `v-model` (which binds to the `value` prop).
Note, that slides are indexed starting at `0`.

## Programmatic slide control

The `<b-carousel>` instance provides several public methods for controlling sliding:

| Method            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `setSlide(index)` | Go to slide specified by `index`                        |
| `next()`          | Go to next slide                                        |
| `prev()`          | Go to previous slide                                    |
| `pause()`         | Pause the slide cycling                                 |
| `start()`         | Start slide cycling (prop `interval` must have a value) |

You will need a reference (via `this.$refs`) to the carousel instance in order to call these
methods:

```html
<template>
  <b-carousel ref="myCarousel" .... >
    <!-- slides go here -->
  </b-carousel>
</template>

<script>
  export default {
    // ...
    methods: {
      prev() {
        this.$refs.myCarousel.prev()
      },
      next() {
        this.$refs.myCarousel.next()
      }
    }
  }
</script>
```

## Accessibility

Carousels are generally not fully compliant with accessibility standards, although we try to make
them as accessible as possible.

By providing a document unique value via the `id` prop, `<b-carousel>` will enable accessibility
features. It is highly recommended to always add an ID to all components.

All carousel controls and indicators have aria labels. These can be customized by setting the
various `label-*` props.

**Note:** The animation effect of this component is dependent on the `prefers-reduced-motion` media
query. See the
[reduced motion section of our accessibility documentation](/docs/reference/accessibility) for
additional details.

<!-- Component reference added automatically from component package.json -->
