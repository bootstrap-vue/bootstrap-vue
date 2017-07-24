# Media

>  The media object helps build complex and repetitive components where some media is positioned alongside content that doesn’t wrap around said media. Plus, it does this with only two required classes thanks to flexbox.

```html
<b-card>
  <b-media>
    <img slot="aside" src="https://placeholdit.imgix.net/~text?txt=64x64&w=64&h=64">
    <h5 class="mt-0">Media Title</h5>
    <p>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
      sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
      Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis
      in faucibus.
    </p>
    <p class="mb-0">
      Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </p>
    <b-media>
      <img slot="aside" src="https://placeholdit.imgix.net/~text?txt=64x64&w=64&h=64">
      <h5 class="mt-0">Nested Media</h5>
      Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </b-media>
  </b-media>
</b-card>

<!-- media-1.vue -->
```

### Usage

```html
<b-media>
    <img slot="aside" alt="Media Aside" />

    <h2>Media Body</h2>
    <p>Some text</p>
    
    <!-- [Optional: add media children here for nesting] -->
</b-media>
```

### Nesting
You can easily nest media objects by including another media inside parent's body.

### Vertical Align
Aside can be vertical aligned using `vertical-align` should be either `top`, `center` or `end` default is `top`.
