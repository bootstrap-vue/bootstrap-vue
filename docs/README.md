# Introduction

> Bootstrap is the world’s most popular framework for building responsive, mobile-first sites and applications. Inside you’ll find high quality HTML, CSS, and JavaScript to make starting any project easier than ever. Vue is a library that focuses heavily on the ViewModel—the two-way data bindings that tie what we see and interact with on the screen with the application's data mode. 
This library helps you quickly integrate bootstrap 4 components with vue.js 2.

## Quick start

<br>

### NPM (Webpack, Rollup)
If you are using module bundlers such as Webpack, Rollup, Laravel elixir, etc you may prefer directly include package
into your project. To get started use yarn or npm to get latest version.

```sh
# Using YARN
yarn add bootstrap-vue

# Using NPM
npm install --save bootstrap-vue
```

Then register components in your app entrypoint:

```js
import Vue from 'vue'

// ES build is more efficient by reducing unneeded components with tree-shaking.
// (Needs Webpack 2 or Rollup)
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

// Use commonjs version if es build is not working
import BootstrapVue from 'bootstrap-vue';

// Import styles if style-loader is available
// You have to manually add css files if lines below are not working
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Globally register components
Vue.use(BootstrapVue);
```

<br>

### CDN (Browser)

```html
<!-- Add this to <head> -->
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

<!-- Add this after vue.js -->
<script src="//unpkg.com/tether@latest/dist/js/tether.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
```

