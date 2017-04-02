# BootstrapVue

<p align="center">
<a href="https://bootstrap-vue.github.io">
    <img src="https://github.com/bootstrap-vue/bootstrap-vue/raw/master/banner.png" width="200px">
</a>
<br>
<a href="https://circleci.com/gh/bootstrap-vue/bootstrap-vue">
    <img alt="" src="https://img.shields.io/circleci/project/github/bootstrap-vue/bootstrap-vue/master.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/bootstrap-vue">
    <img alt="" src="https://img.shields.io/npm/dt/bootstrap-vue.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/bootstrap-vue">
    <img alt="" src="https://img.shields.io/npm/v/bootstrap-vue.svg?style=flat-square">
</a>
<a href="https://github.com/sindresorhus/xo">
    <img alt="" src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square">
</a>
<a href="https://v4-alpha.getbootstrap.com">
    <img alt="" src="https://img.shields.io/badge/bootstrap-4.0.0--alpha.6-800080.svg?style=flat-square">
</a>
<a href="https://vuejs.org">
    <img alt="" src="https://img.shields.io/badge/vue.js-2.2.x-green.svg?style=flat-square">
</a>
</p>

> [Bootstrap 4](https://v4-alpha.getbootstrap.com/) components for [Vue.js 2](https://vuejs.org/)

🚧 [Release Notes](https://github.com/bootstrap-vue/bootstrap-vue/releases)

✔ If you are using older versions, please read usage guides below.      
⚠ bootstrap-vue now has a separate css file for packaging quality improvements.   

# Getting started
Please refer to [Official Documentation](https://bootstrap-vue.github.io) for setup guide, examples and documentation.

### NPM (Webpack, Rollup)

Get it via your favorite package manager:
```bash
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
// import BootstrapVue from 'bootstrap-vue';

// Import styles if style-loader is available
// You have to manually add css files if lines below are not working
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Globally register components
Vue.use(BootstrapVue);
```

### CDN (Browser)

Package size is about 100kb <strong>(20kb gzipped)</strong>

```html
<!-- Add this to <head> -->
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

<!-- Add this after vue.js -->
<script src="//unpkg.com/bootstrap-vue@latest/tether/dist/js/tether.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
```

**NUXT.JS**

If you are using [nuxt.js](https://github.com/nuxt/nuxt.js), you can easily register bootstrap-vue components using [nuxt helpers](https://github.com/fandogh/nuxt-helpers).

# Build variants 
Choosing the best variant for your build environment / packager helps less bundle sizes using tree-shaking.

Variant        | Environments                 | Package path
---------------|------------------------------|------------------------------------------------------------------------
**ES Module**  | Webpack 2 / Rollup           | `dist/bootstrap-vue.esm.js`
commonjs2      | Webpack 1 / ...              | `dist/bootstrap-vue.common.js`
UMD            | Browser                      | `dist/bootstrap-vue.js`

# Contribution

**Playground**

If you want to play with BootstrapVue components without any local setup just head to
[OnlinePlayground](https://bootstrap-vue.github.io/play) and you can interactively play and test components with a fresh vue instance.
If you want to keep your changes or make PRs reporting components misbehaviour you can save them in JSFiddle and provide that link in issues. 

Also if you want to hack and improve components locally, you can follow this steps:

Common part:
- Clone this repo.
- Make sure you have node & yarn installed locally.
- Run `yarn install` to get all dependencies installed.

Playground:
- Run `yarn docs-dev` to run local development server.
- Head to `http://localhost:3000/play`.
- Now you can locally make changes to components (they are located at `components` directory). 
  Changes will be applied with webpack hot-reloading without need to reload page.
- Finally feel free to share your awesome hacks with others and opening a PR.

**Inside your project**

If you want to see your changes in your project instead of playground:
- Invoke `yarn link` inside *bootstrap-vue* directory.
- In your project run `yarn link-bootstrap-vue`
- Run `yarn watch` inside *bootstrap-vue*
- Now every time you change a component, a new production version will be built and ready on your project. 

# License
The MIT License (MIT) - Copyright (c) 2016-present Pooya Parsa.   
Designed and built with all the love in the world.
Maintained by the [core team](https://github.com/orgs/bootstrap-vue/people) with the help of our contributors.