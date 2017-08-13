# Quick start

### NPM (Webpack, Rollup)
If you are using module bundlers such as Webpack, Rollup, Laravel elixir/mix, etc you may prefer directly include package
into your project. To get started use yarn or npm to get latest version.

1- Download dependencies:

```bash
# Using YARN
yarn add bootstrap-vue
yarn add bootstrap@4.0.0-alpha.6
yarn add -D style-loader

# Using NPM
npm install --save bootstrap-vue
```

2- Register BootstrapVue in your app entry point:

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
```

3- Import styles using style-loader:
```js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
```

##### For users of Webpack or Webpack-Simple from `vue-cli` follow these instructions:
1 -  Download the dependencies:

```bash
yarn add bootstrap-vue
yarn add bootstrap@4.0.0-alpha.6
yarn add -D style-loader
```

2 - In `src/main.js`, add the following lines, in priority order:

```js
import Vue from 'vue';
/* ( there may be other imports here ) */
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
/* ( there may be other imports here ) */

Vue.use(BootstrapVue);
```

#### Note on style-loader:
If you are unable or do not want to add style-loader as a developer dependency, you have to
manually include both [Bootstrap's](https://v4-alpha.getbootstrap.com/getting-started/download/)
and [BootstrapVue's](https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css) CSS files
in your bundle or reference them from `static/` via `index.html`.


#### Using individual components and directives
If for any reason just want to use a specific component, you can do this by directly importing that component.
This is not recommended as entire package gzipped size is ~15Kb and requires a supported vue bundler.

```js
import {bAlert, bBtn, bCollapse} from 'bootstrap-vue/lib/components'
import (bToggle, bScrollspy} from 'bootstrap-vue/lib/directives'

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

### CDN (Browser)

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
