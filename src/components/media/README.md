# Media

> The media object helps build complex and repetitive components where some media is positioned
> alongside content that doesn’t wrap around said media. Plus, it does this with only two required
> classes thanks to flexbox.

```html
<div>
  <b-card>
    <b-media>
      <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"></b-img>

      <h5 class="mt-0">Media Title</h5>
      <p>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </p>
      <p>
        Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </p>

      <b-media>
        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"></b-img>

        <h5 class="mt-0">Nested Media</h5>
        <p class="mb-0">
          Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
          faucibus.
        </p>
      </b-media>
    </b-media>
  </b-card>
</div>

<!-- b-media.vue -->
```

## Usage

```html
<div>
  <b-media>
    <img slot="aside" src="..." alt="Media Aside">

    <h2>Media Body</h2>
    <p>Some text</p>

    <!-- b-[Optional: add media children here for nesting] -->
  </b-media>
</div>
```

## No Body (with sub-components)

```html
<div>
  <b-card>
    <b-media no-body>
      <b-media-aside vertical-align="center">
        <b-img blank blank-color="#ccc" width="128" height="256" alt="placeholder"></b-img>
      </b-media-aside>

      <b-media-body class="ml-3">
        <h5 class="mt-0">Media Title</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
          sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce
          condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
        <p class="mb-0">
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>

        <b-media>
          <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
          <h5 class="mt-0">Nested Media</h5>
          Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
          faucibus.
        </b-media>
      </b-media-body>
    </b-media>
  </b-card>
</div>

<!-- b-media-no-body.vue -->
```

## Order

Change the order of content in media objects by adding `right-align` property.

```html
<div>
  <b-media right-align vertical-align="center">
    <b-img slot="aside" blank blank-color="#ccc" width="80" alt="placeholder"></b-img>

    <h5 class="mt-0 mb-1">Media object</h5>
    <p class="mb-0">
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
      Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
      nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </p>
  </b-media>
</div>

<!-- b-media-order.vue -->
```

## Nesting

You can easily nest media objects by including another `<b-media>` inside parent's body.

## Vertical Align

Aside can be vertical aligned using `vertical-align` should be either `top`, `center` or `end`.
Default is `top`.

## Media list

Because the media object has so few structural requirements, you can also use these component as
list HTML elements. On your `<ul>` or `<ol>`, add the class `list-unstyled` to remove any browser
default list styles, and then use the `<b-media>` component with `tag` prop set to `li`. As always,
use spacing utilities wherever needed to fine tune.

```html
<div>
  <ul class="list-unstyled">
    <b-media tag="li">
      <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder"></b-img>

      <h5 class="mt-0 mb-1">List-based media object</h5>
      <p class="mb-0">
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </p>
    </b-media>

    <b-media tag="li" class="my-4">
      <b-img slot="aside" blank blank-color="#cba" width="64" alt="placeholder"></b-img>

      <h5 class="mt-0 mb-1">List-based media object</h5>
      <p class="mb-0">
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </p>
    </b-media>

    <b-media tag="li">
      <b-img slot="aside" blank blank-color="#bac" width="64" alt="placeholder"></b-img>

      <h5 class="mt-0 mb-1">List-based media object</h5>
      <p class="mb-0">
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </p>
    </b-media>
  </ul>
</div>

<!-- b-media-list.vue -->
```

<!-- Component reference added automatically from component package.json -->
