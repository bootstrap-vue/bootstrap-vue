# Carousel

**Note:** Carousel component is not stable yet.

>  The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms and a bit of JavaScript. It works with a series of images, text, or custom markup. It also includes support for previous/next controls and indicators.

```html
<template>
  <div>
    <b-carousel id="carousel1"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                :trasitioning.sync="trans"
                v-model="slide"
    >

      <!-- Text slides with image -->
      <b-carousel-slide caption="First slide"
                        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                        img="https://lorempixel.com/1024/480/technics/2/"
      />

      <!-- Slides with custom text -->
      <b-carousel-slide img="https://lorempixel.com/1024/480/technics/4/">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img="http://lorempixel.com/1024/480/technics/8/" />

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
      Transitioning: {{ trans }}
    <p>

  </div>
</template>

<script>
export default {
  data: {
    slide: 0,
    trans: null // Will be true if carousel is transitioning
  },
  methods: {
    blankImg(x, y) {
      // Return a blank SVG image of a certen width and height
      // Handy for maintaining aspect ratio for text only slides
      return "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D" +
             "'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' " +
             "viewBox%3D'0 0 " + x + " " + y + "'%2F%3E";
    }
  }
}
</script>
<!-- carousel-1.vue -->
```

### Accessibility
By providing a document unique value via the `id` prop, `<b-carousel>` will enable accessibility
features.  It is highly recommended to always add an ID to all components.

All controls have aria labels.  These can be customized by setting the various `label-*` props.
