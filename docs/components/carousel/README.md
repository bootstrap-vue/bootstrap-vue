# Carousel

>  The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms.
It works with a series of images, text, or custom markup. It also includes support for previous/next
controls and indicators.

```html
<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
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
      <b-carousel-slide img="https://lorempixel.com/1024/480/technics/8/">
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid"
             src="https://lorempixel.com/1024/480/technics/5/" alt="image slot">
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain aspect ratio -->
      <b-carousel-slide caption="Blank Image">
        <b-img slot="img" width="1024" height="480" fluid blank alt="blank img"></b-img>
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
  data: {
    slide: 0,
    sliding: null
  },
  methods: {
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

### Sizing
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

Both indicators and controls can be set at the same time or independently.


### V-model support
Programaticaly xontrol which slide is showing via `v-model` (which binds to the
`value` prop). Note slides are indexed starting at `0`.


### Accessibility
By providing a document unique value via the `id` prop, `<b-carousel>` will enable
accessibility features.  It is highly recommended to always add an ID to all components.

All carousel controls and indicateors have aria labels.  These can be customized by
setting the various `label-*` props.
