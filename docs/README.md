# Quick start

### Beta Testing
For beta testing please explicitly require beta version instead of `bootstrap-vue`
```bash
yarn add bootstrap-vue@^1.0.0-beta.2 # or npm i bootstrap-vue@^1.0.0-beta.2
```

### Nuxt.js
You can use official [Nuxt.js](https://nuxtjs.org) module to add BootstrapVue support. ([module docs](https://github.com/nuxt-community/modules/tree/master/modules/bootstrap-vue))

- Add `@nuxtjs/bootstrap-vue` dependency using yarn or npm to your project:
- Add `@nuxtjs/bootstrap-vue` to modules section of **nuxt.config.js**

```js
{
  modules: [
    '@nuxtjs/bootstrap-vue',

    // Or if you have custom bootstrap CSS...
    ['@nuxtjs/bootstrap-vue', { css: false }],
  ]
}
```

### Webpack
If you are using module bundlers such as Webpack, Rollup, Laravel elixir/mix, etc you may prefer directly include package
into your project. To get started use yarn or npm to get latest version first:

```bash
yarn add bootstrap-vue # or npm i bootstrap-vue
```

Then, register BootstrapVue plugin in your app entry point:

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
```

And import styles: (needs `style-loader`)

```js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
```

**Note:** If you are unable or do not want to add style-loader as a dev dependency, you have to
manually include both [Bootstrap](https://v4-alpha.getbootstrap.com/getting-started/download/)
and [BootstrapVue](https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css) CSS files
in your bundle or reference them from `static/` via `index.html`.

### vue-cli

Download the dependencies:

```bash
yarn add --dev bootstrap-vue style-loader
```

In `src/main.js`, add the following lines, in priority order:

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
/* ...there may be other imports here */
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue)
```

### Individual components and directives
If for any reason just want to use a specific component, you can do this by directly importing that component.
This is not recommended as entire package gzipped size is ~15Kb!

```js
import { bAlert, bBtn, bCollapse } from 'bootstrap-vue/lib/components'
import { bToggle, bScrollspy } from 'bootstrap-vue/lib/directives'

new Vue({
  // ...
  components: {
    bAlert,
    bBtn,
    bCollapse
  },
  directives: {
    bToggle,
    bScrollspy
  },
  // ...
})
```
### Browser

```html
<!-- Add this to <head> -->
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

<!-- Add this after vue.js -->
<script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
<script src="//unpkg.com/tether@latest/dist/js/tether.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
```

## Build variants
Choosing the best variant for your build environment / packager helps less bundle sizes.
If your bundler supports es modules, it will automatically prefer it over commonjs.

| Variant        | Environments         | Package path
| -------------- | -------------------- | -----------------------------------
| **ES Module**  | Webpack 2 / Rollup   | `dist/bootstrap-vue.esm.js`
| commonjs2      | Webpack 1 / ...      | `dist/bootstrap-vue.common.js`
| UMD            | Browser              | `dist/bootstrap-vue.js`

## Migrating a project already using Bootstrap
If you've already been using Bootstrap 4, there are a couple adjustments you may need to make to your project:
 
- Remove the bootstrap.js file from your page scripts or build pipeline
- If Bootstrap is the only thing relying on jQuery, you can safely remove it — BootstrapVue **does not** depend on jQuery
- Don't forget to include the `bootstrap-vue.css` file!

## Browsers Support

**CSS**

BootstrapVue is to be used with Bootstrap 4 CSS.
Please see [Browsers and devices](https://v4-alpha.getbootstrap.com/getting-started/browsers-devices)
for more information about browsers currently supported by Bootstrap 4. 

**JS**

BootstrapVue is written in Vue! So this is up to your project and bundler that which browsers are supported.
If you want to support older IE, Android and IOS devices, you may want to use
[Babel Polyfill](https://babeljs.io/docs/usage/polyfill)

**IE 11**

You'll need babel-polyfill for BootstrapVue to work properly. In order to support this browser: 
- `npm install babel-polyfill`
- Import it in your app main entry point with `import 'babel-polyfill'`
