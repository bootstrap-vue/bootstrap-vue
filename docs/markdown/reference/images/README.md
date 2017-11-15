# Project relative image URLs for Bootstrap Vue custom components

> vue-loader automatically converts project relative `src` attributes
on `<img>` tags, but doesn't automatically for Bootrap-Vue custom
components that accept image src url tags.

## Vue-loader `transformToRequire` to resolve img paths
To have your project convert these custom component image URLs for you, you will need to
customize the [`transformToRequire`](https://vue-loader.vuejs.org/en/options.html#transformtorequire)
`option` for `vue-loader` in your webpack config.

The default value for `transformToRequire` is:

```js
transformToRequire: {
  'img': 'src',
  'image': 'xlink:href'
}
```

To allow Bootstrap-Vue components to use project relative URLs,
use the following configuration:

```js
transformToRequire: {
  'img': 'src',
  'image': 'xlink:href',
  'b-img': 'src',
  'b-img-lazy': ['src', 'blank-src'],
  'b-card': 'img-src',
  'b-card-img': 'img-src',
  'b-carousel-slide': 'img-src',
  'b-embed': 'src'
}
```

This will allow you to use the following format in your `.vue` files:

```html
<b-img src="~/static/picture.jpg" />

<b-card-img img-src="~/static/picture.jpg" />
```

### Configuring `transformToRequire` in Nuxt

In your `nuxt.config.js` file, add the following to your build section:

```js
build: {   
  extend (config, ctx) {
    const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader')
    vueLoader.options.transformToRequire = {
      'img': 'src',
      'image': 'xlink:href',
      'b-img': 'src',
      'b-img-lazy': ['src', 'blank-src'],
      'b-card': 'img-src',
      'b-card-img': 'img-src',
      'b-carousel-slide': 'img-src',
      'b-embed': 'src'
    }
  }
}
```

## Using `require` to resolve image paths
If you cannot set the `transforToRequire` in your view-loader config, you
can alternatively use the `require` method:

```html
<b-img :src="require('../static/picture.jpg')" />

<b-card-img :img-src="require('../static/picture.jpg')" />
```
