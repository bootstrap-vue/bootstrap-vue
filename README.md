<p align="center">
<a href="https://bootstrap-vue.github.io">
    <img src="https://github.com/bootstrap-vue/bootstrap-vue/raw/master/banner.png" width="300px">
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
<a href="https://bootstrap-vue.now.sh/">
    <img alt="" src="https://bootstrap-vue.now.sh/badge.svg">
</a>

</p>

> [Bootstrap 4](https://v4-alpha.getbootstrap.com/) components for [Vue.js 2](https://vuejs.org/)

 ⚠ [Release Notes](https://github.com/bootstrap-vue/bootstrap-vue/releases)

# ✔ Getting started
Please refer to [Official Documentation](https://bootstrap-vue.github.io) for setup guide, examples and documentation.

Get the package:
```bash
yarn add bootstrap-vue
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

# License
MIT