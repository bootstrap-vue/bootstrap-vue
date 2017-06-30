# Carousel

**Note:** Carousel component is not stable yet.

>  The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms and a bit of JavaScript. It works with a series of images, text, or custom markup. It also includes support for previous/next controls and indicators.

### Usage

```html
<b-carousel controls indicators :interval="3000" background="grey">

  <!-- Text slides -->
  <b-carousel-slide background="grey" height="300px"
                    caption="First slide"
                    text="Nulla vitae elit libero, a pharetra augue mollis interdum.">
  </b-carousel-slide>
  
  <!-- Slides with custom text -->
  <b-carousel-slide background="grey" height="300px">
     Hello world
  </b-carousel-slide>
  
  <!-- Slides with image -->
  <b-carousel-slide background="grey" height="300px"
                    img="http://placeskull.com/600/300/ABABAB/-1/0">
  </b-carousel-slide>
  
</b-carousel>
```

### Accessibility
By providing a document unique value via the `id` prop, `b-carousel` will enable acessibility
features.  It is highlt recommended to alway ad adn ID to all components.

All controls have aria labels.  these can be customized by setting the various `label-*` props.
