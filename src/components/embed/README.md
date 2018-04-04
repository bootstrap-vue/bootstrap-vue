# Responsive Embeds

> Create responsive video or slideshow embeds based on the width of the parent by creating
an intrinsic ratio that scales on any device.

Rules are directly applied to `<iframe>`, `<embed>`, `<video>`, and `<object>` elements

```html
<div>
  <b-embed type="iframe"
           aspect="16by9"
           src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
           allowfullscreen
  ></b-embed>
</div>

<!-- b-embed-1.vue -->
```

## Embed types
Supported embed types are `iframe` (default), `video`, `embed` and `object`, which
translate to the standard HTML `<iframe>`, `<video>`, `<embed>` and `<object>` elements.

Set the type of embed you would like via the `type` prop.


## Aspect ratios
Aspect ratios can be set via the `aspect` prop. Supported aspect rations are:
`21by9` (21:9), `16by9` (16:9), `4by3` (4:3) and `1by1` (1:1). The default aspect
is `16by9`.


## Wrapper element
The Responsive embed is wrapped in an outer element (default is `div`) to enforce
the responsive aspect ratio. You can change this tag via the `tag` prop.


## Attributes and Child Elements
Any additional attributes provided to `<b-embed>` (other than the above `type`,
`aspect` and `tag` props are applied to the inner embeded element (i.s. `iframe`,
`video`, `embed` and `object`).

Any children elements between the opening and closing `<b-embed>` will be placed
inside the inner embded element. Note that type `iframe` does not support any children.

**Example: Responsive embdeding of an HTML5 `<video>`**
```html
<b-embed type="video" aspect="4by3" controls poster="poster.png">
  <source src="devstories.webm" 
          type='video/webm;codecs="vp8, vorbis"' />
  <source src="devstories.mp4"
          type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
</b-embed>
```

## Component Reference
