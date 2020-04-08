# Component img src resolving

## Using project relative image URLs for BootstrapVue custom components

vue-loader automatically converts project relative `src` attributes on `<img>` tags, but doesn't
automatically for BootstrapVue custom components that accept image src url tags.

## Vue Loader `transformAssetUrls` to resolve img paths

To have your project convert these custom component image URLs for you, you will need to customize
the [`transformAssetUrls`](https://vue-loader.vuejs.org/options.html#transformasseturls) `option`
for `vue-loader` in your webpack config.

The default value for `transformAssetUrls` is:

<!-- eslint-disable no-unused-vars -->

```js
const options = {
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
```

To allow BootstrapVue components to use project relative URLs, use the following configuration:

<!-- eslint-disable no-unused-vars -->

```js
const options = {
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href',
    'b-avatar': 'src',
    'b-img': 'src',
    'b-img-lazy': ['src', 'blank-src'],
    'b-card': 'img-src',
    'b-card-img': 'src',
    'b-card-img-lazy': ['src', 'blank-src'],
    'b-carousel-slide': 'img-src',
    'b-embed': 'src'
  }
}
```

This will allow you to use the following format in your `.vue` files:

```html
<b-img src="~/static/picture.jpg"></b-img>

<b-card-img src="~/static/picture.jpg"></b-card-img>
```

### Vue CLI 3 Support

Vue CLI 3 changed the way that webpack compiles a Vue app, in order to make BootstrapVue work again,
you need to do the following steps:

1.  Create `vue.config.js` in the root directory (next to `package.json`).
2.  Put the following code

```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src'
        }

        return options
      })
  }
}
```

### Configuring `transformAssetUrls` in Nuxt.js

In your `nuxt.config.js` file, add the following to your build section:

```js
module.exports = {
  build: {
    extend(config) {
      const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader')
      vueLoader.options.transformAssetUrls = {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href',
        'b-avatar': 'src',
        'b-img': 'src',
        'b-img-lazy': ['src', 'blank-src'],
        'b-card': 'img-src',
        'b-card-img': 'src',
        'b-card-img-lazy': ['src', 'blank-src'],
        'b-carousel-slide': 'img-src',
        'b-embed': 'src'
      }
    }
  }
}
```

If using the [BootstrapVue Nuxt](/docs#nuxtjs-module) module with Nuxt.js, the plugin module will
automatically add in the BootstrapVue specific `transformAssetUrls` configuration for you.

## Using `require` to resolve image paths

If you cannot set the `transformAssetUrls` in your view-loader config, you can alternatively use the
`require` method:

```html
<b-img :src="require('../static/picture.jpg')"></b-img>

<b-card-img :src="require('../static/picture.jpg')"></b-card-img>
```
