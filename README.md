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
<a href="https://www.codacy.com/app/pi0/bootstrap-vue?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bootstrap-vue/bootstrap-vue&amp;utm_campaign=Badge_Grade">
    <img src="https://api.codacy.com/project/badge/Grade/efdefff98c8848a9b6038b164f10acc6"/>
</a>
</p>

> [Bootstrap 4](https://v4-alpha.getbootstrap.com/) components for [Vue 2](https://vuejs.org/)

# Getting started
Please refer to [Official Documentation](https://bootstrap-vue.github.io) for setup guide, examples and documentation.

**NPM**

Get it via your favorite package manager:
```bash
$ yarn add bootstrap-vue
# OR
$ npm i bootstrap-vue
```

Register components:
```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';

// Globally register bootstrap-vue components
Vue.use(BootstrapVue);
```

**CDN**

Simply include this inside your HTML templates:
```html
<script src="https://unpkg.com/bootstrap-vue/dist/bootstrap-vue.js"></script>
```

**NUXT.JS**

If you are using [nuxt.js](https://github.com/nuxt/nuxt.js), you can register bootstrap-vue components using [nuxt helpers](https://github.com/fandogh/nuxt-helpers).

# Included components

**Stable**

- [Alerts](https://bootstrap-vue.github.io/docs/components/alerts)
- [Breadcrumb](https://bootstrap-vue.github.io/docs/components/breadcrumb)
- [Buttons](https://bootstrap-vue.github.io/docs/components/buttons)
- [Button group](https://bootstrap-vue.github.io/docs/components/button-group)
- [Dropdown](https://bootstrap-vue.github.io/docs/components/dropdowns)
- [Form Inputs](https://bootstrap-vue.github.io/docs/components/form-inputs)
- [Form Radio](https://bootstrap-vue.github.io/docs/components/form-radio)
- [Form Checkbox](https://bootstrap-vue.github.io/docs/components/form-checkbox)
- [Form Select](https://bootstrap-vue.github.io/docs/components/form-select)
- [Nav](https://bootstrap-vue.github.io/docs/components/nav)
- [NavBar](https://bootstrap-vue.github.io/docs/components/navbar)
- [Pagination](https://bootstrap-vue.github.io/docs/components/pagination)
- [Popover](https://bootstrap-vue.github.io/docs/components/popover)
- [Tables](https://bootstrap-vue.github.io/docs/components/tables)
- [Modals](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/modal.vue)
- [Badge](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/badge.vue)
- [Progress](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/progress.vue)

**Even more**
Additionally, [many more components](https://github.com/bootstrap-vue/bootstrap-vue/tree/master/components)
are available, but they are still not documented or under development.
 
- [Card](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/card.vue)
- [Carousel](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/carousel.vue)
- [Jumbotrons](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/carousel.vue)
- [Media](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/media.vue)
- [Tab](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/tab.vue) 
- [Tabs](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/tabs.vue)
- [Tooltip](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/components/tooltip.vue)

# Playground & Contribution
If you want to play with bootstrap-vue components without any local setup just head to
[BootstrapVue Playground](https://bootstrap-vue.github.io/play) and you can interactively play and test components with a fresh vue instance.

If you want to keep your changes or make PRs reporting components misbehaviour you can save them in JSFiddle and provide that link in issues. 

Also if you want to hack and improve components locally, you can follow this steps:
- Clone this repo `git clone https://github.com/bootstrap-vue/bootstrap-vue.git`
- Make sure you have node & yarn installed locally
- Run `yarn install` to get all dependencies installed
- Run `yarn docs-dev` to run local development server.
- Head to **http://localhost:3000/play**
- Now you can locally make changes to components (they are located at `components` directory). 
  Changes will be applied with webpack hot-reloading without need to reload page.
- Finally feel free to share your awesome hacks with others and opening a PR.

# License
The MIT License (MIT) - Copyright (c) 2016-present Pooya Parsa.   
Designed and built with all the love in the world.
Maintained by the [core team](https://github.com/orgs/bootstrap-vue/people) with the help of our contributors.
Documentation is generated using [Nuxt.js](https://nuxtjs.org)