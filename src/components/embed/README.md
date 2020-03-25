# Responsive Embeds

> Create responsive video or slideshow embeds based on the width of the parent by creating an
> intrinsic ratio that scales on any device.

Rules are directly applied to `<iframe>`, `<embed>`, `<video>`, and `<object>` elements

```html
<div>
  <b-embed
    type="iframe"
    aspect="16by9"
    src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
    allowfullscreen
  ></b-embed>
</div>

<!-- b-embed.vue -->
```

## Embed types

Supported embed types are `iframe` (default), `video`, `embed` and `object`, which translate to the
standard HTML `<iframe>`, `<video>`, `<embed>` and `<object>` elements.

Set the type of embed you would like via the `type` prop.

## Aspect ratios

Aspect ratios can be set via the `aspect` prop. Supported aspect ratios are: `21by9` (21:9), `16by9`
(16:9), `4by3` (4:3) and `1by1` (1:1). The default aspect is `16by9`. Aspect ratios are defined in
Bootstrap's SCSS and translate to the classname `embed-responsive-{aspect}` (i.e.
`embed-responsive-16by9`, `embed-responsive-4by3`, etc.).

## Wrapper element

The Responsive embed is wrapped in an outer element (default is `div`) to enforce the responsive
aspect ratio. You can change this tag via the `tag` prop.

## Attributes and child elements

Any additional attributes provided to `<b-embed>` (other than the above `type`, `aspect` and `tag`
props) are applied to the inner embedded element (i.e. the `iframe`, `video`, `embed` or `object`).

Any children elements between the opening and closing `<b-embed>` will be placed inside the inner
embedded element. Note that the type `iframe` does not support any children.

**Example: Responsive embedding of an HTML5 `<video>`**

```html
<div>
  <b-embed type="video" aspect="4by3" controls poster="poster.png">
    <source src="dev-stories.webm" type="video/webm">
    <source src="dev-stories.mp4" type="video/mp4">
  </b-embed>
</div>
```

## See also

- [`<b-aspect>` component](/docs/components/aspect)

<!-- Component reference added automatically from component package.json -->
