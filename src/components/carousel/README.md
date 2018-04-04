# Carousel

>  The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms.
It works with a series of images, text, or custom markup. It also includes support for previous/next
controls and indicators. Please be aware that nested carousels are **not** supported.

```html
<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

      <!-- Text slides with image -->
      <b-carousel-slide caption="First slide"
                        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                        img-src="https://lorempixel.com/1024/480/technics/2/"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/4/">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://lorempixel.com/1024/480/technics/8/">
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="https://lorempixel.com/1024/480/technics/5/" alt="image slot">
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eros felis, tincidunt a tincidunt eget, convallis vel est. Ut pellentesque
          ut lacus vel interdum.
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
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
<!-- carousel-1.vue -->
```


## Sizing
Carousels don’t automatically normalize slide dimensions. As such, you may need to use
additional utilities or custom styles to appropriately size content. When using images
in each slide, ensure they all have the same dimensions (or aspect ratio).

When using `img-src` or `img-blank` on `<b-carousel-slide>`, you can set the image
width and height via the `img-width` and `img-height` props on `<b-carousel>` and
have these values automatically applied to each `carousel-slide` image.

Note that images will still be responsive and automatically grow or shrink to fit
within the width of its parent container.

Internally, `<b-carousel-slide>` uses the [`<b-img>`](/docs/components/img)
component to render the images. The `img-*` props map to the corresponsing props
available to `<b-img>`.


## Interval
Carousel defaults to an interval of `5000`ms (5 seconds). To pause the carousel from
auto sliding, set the `interval` prop to `0`. To restart a paused carousel, set the
`interval` back to the number of ms.

In browsers where the [Page Visibility API](https://www.w3.org/TR/page-visibility/)
is supported, the carousel will avoid sliding when the webpage is not visible to
the user (such as when the browser tab is inactive, the browser window is minimized, etc.).


## Controls and Indicators
Set the prop `controls` to enable the previous and next control buttons.

Set the prop `indicators` to show the slide indicator buttons.

Both indicators and controls can be set at the same time or independently.


## V-model support
Programmaticaly control which slide is showing via `v-model` (which binds to the
`value` prop). Note, that slides are indexed starting at `0`.


## Accessibility
Carousels are generally not fully compliant with accessibility standards, although
we try to make them as accessible as possible.

By providing a document unique value via the `id` prop, `<b-carousel>` will enable
accessibility features. It is highly recommended to always add an ID to all components.

All carousel controls and indicators have aria labels. These can be customized by
setting the various `label-*` props.

## Component Reference
