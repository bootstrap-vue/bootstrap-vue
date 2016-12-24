<p align="center"><img src="https://github.com/pi0/bootstrap-vue/raw/master/banner.png"></p>

# Bootstrap Vue
[Twitter Bootstrap 4](https://v4-alpha.getbootstrap.com/) components for [Vue.js 2](https://vuejs.org/)

[![CircleCI](https://circleci.com/gh/bootstrap-vue/bootstrap-vue.svg?style=svg)](https://circleci.com/gh/bootstrap-vue/bootstrap-vue)

[![NPM](https://nodei.co/npm-dl/bootstrap-vue.png?months=3&height=3)](https://nodei.co/npm/bootstrap-vue/)

## Quick Start

Install via **NPM**:   

`npm i --save-dev bootstrap-vue`

Install via **YARN** (recommended):   

`yarn add --dev bootstrap-vue`

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';

// Globally register bootstrap-vue components
Vue.use(BootstrapVue);
```

Or simply include js inside HTML templates: (CDN Powered by unpkg)

```html
<script src="https://unpkg.com/bootstrap-vue/dist/bootstrapVue.js"></script>
```

## Bootstrap CSS

Because Bootstrap can be customized so heavily, this package does not include the Bootstrap CSS. You can load the bootstrap@4.0.0-alpha.5 CSS in several ways:
* [Via CDN](https://v4-alpha.getbootstrap.com/getting-started/introduction/#quick-start)
* Bundled with your own CSS
* [Via npm or yarn](https://v4-alpha.getbootstrap.com/getting-started/download/#npm), using the [webpack css loader](https://github.com/webpack/css-loader), and including like this:
```js
import 'path/to/node_modules/bootstrap/dist/css/bootstrap.css'
// OR
import 'path/to/node_modules/bootstrap/dist/css/bootstrap-flex.css'
```

## Docs
[Official Docs Website](https://bootstrap-vue.github.io/)

## Credits
+ This project and docs were originally ported from the Vue 1.x version
 [kzima/vuestrap-base-components](https://github.com/kzima/vuestrap-base-components)
 , so original credit backs to him :)
