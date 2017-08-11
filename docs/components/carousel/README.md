# Carousel

>  The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms.
It works with a series of images, text, or custom markup. It also includes support for previous/next
controls and indicators.

```html
<template>
  <div>
    <b-carousel id="carousel1"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                v-model="slide"
                @slide="onSlide"
                @slid="onSlid"
    >

      <!-- Text slides with image -->
      <b-carousel-slide caption="First slide"
                        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                        img="https://lorempixel.com/1024/480/technics/2/"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img="https://lorempixel.com/1024/480/technics/4/">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img="http://lorempixel.com/1024/480/technics/8/">
      </b-carousel-slide>

      <!-- Slide with blank image to maintain aspect ratio -->
      <b-carousel-slide caption="Blank Image" :img="blankImg(1024,480)">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eros felis, tincidunt a tincidunt eget, convallis vel est. Ut pellentesque
          ut lacus vel interdum. Nulla bibendum tincidunt erat, sed tincidunt
          magna finibus ac.
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
  data: {
    slide: 0,
    sliding: null
  },
  methods: {
    blankImg(x, y) {
      // Return a blank SVG image with specified width and height
      // Handy for maintaining aspect ratio for text only slides
      return "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D" +
             "'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' " +
             "viewBox%3D'0 0 " + x + " " + y + "'%2F%3E";
    },
    onSlide(slide) {
        this.sliding = true;
    },
    onSlid(slide) {
        this.sliding = false;
    }
  }
}
</script>
<!-- carousel-1.vue -->
```

Carousels don’t automatically normalize slide dimensions. As such, you may need to use
additional utilities or custom styles to appropriately size content. When using images
in each slide, ensure they all have the same dimensions (or aspect ratio).


### Interval
Carousel defults to an interval of `5000`ms (5 seconds). To pause the caurousel from
auto sliding, set the `interval` prop to `0`. To restart a paused carousel, set the
`interval` back to the number of ms.


### Controls and Indicators
Set the prop `controls` to enable the previous and next control buttons.

Set the prop `indicators` to show the slide indicator buttons.

Both indicators andcontrols can be set at the same time


### V-modal support
Control which slide is howing programaticaly via `v-model` (which binds to the `value` prop


### Accessibility
By providing a document unique value via the `id` prop, `<b-carousel>` will enable accessibility
features.  It is highly recommended to always add an ID to all components.

All controls have aria labels.  These can be customized by setting the various `label-*` props.
