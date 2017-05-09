# Quick start

### NPM (Webpack, Rollup)
If you are using module bundlers such as Webpack, Rollup, Laravel elixir/mix, etc you may prefer directly include package
into your project. To get started use yarn or npm to get latest version.

```sh
# Using YARN
yarn add bootstrap-vue

# Using NPM
npm install --save bootstrap-vue
```

Register BootstrapVue in your app entrypoint:

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
```

Import styles using style-loader:
```js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
```
If style-loader is not available, you have to manually include both bootstrap and bootstrap-vue css files in your css bundle

#### Using individual components
If for any reason just want to use a specific component, you can do this by directly importing that component.
This is not recommended as entire package gzipped size is ~15Kb and requires a supported vue bundler.
```js
import {bAlert, bBtn} from 'bootstrap-vue/lib/components'
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

Variant        | Environments                 | Package path
---------------|------------------------------|------------------------------------------------------------------------
**ES Module**  | Webpack 2 / Rollup           | `dist/bootstrap-vue.esm.js`
commonjs2      | Webpack 1 / ...              | `dist/bootstrap-vue.common.js`
UMD            | Browser                      | `dist/bootstrap-vue.js`

## Advanced Tips

### auto generated ids
Some HTML tags like `aria-*` and `for` need dom id reference in order to get working.
They are automatically added if `id` attribute is available on target element and it is *highly recommended adding them manually*.
For enabling auto generated ids you can set `window.UNSAFE_UID` or `process.env.UNSAFE_UID` 
to `true` but it is highly discouraged as `_uid` is internal and should not be used as part of the application state. [vuejs/vue#5573](https://github.com/vuejs/vue/issues/5573)
Enabling may also introduce problems if you are using SSR.