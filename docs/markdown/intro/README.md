# Getting Started

> Get started with BootstrapVue, based on the world's most popular framework - Bootstrap v4, for
> building responsive, mobile-first sites using Vue.js.

- [Vue.js](https://vuejs.org/) `v2.6` is required, `v{{ vueVersion }}` is recommended
- [Bootstrap](https://getbootstrap.com/) `v4.3` is required, `v{{ bootstrapVersion }}` is
  recommended
- [PortalVue](https://portal-vue.linusb.org/) `v2.1` is required by
  [Toasts](/docs/components/toast), `v{{ portalVueVersion }}` is recommended
- [jQuery](https://jquery.com/) is **not** required

## Prerequisites

Before getting started with BootstrapVue, you should have general familiarity with Vue functionality
and Bootstrap v4.3 CSS. If you are unfamiliar with Vue and/or Bootstrap, good starting points would
be:

- [Vue Guide](https://vuejs.org/v2/guide/)
- [Vue API](https://vuejs.org/v2/api/)
- [Bootstrap documentation](https://getbootstrap.com/)

In many of the examples in BootstrapVue's documentation, you may see CSS classes used such as `ml-2`,
`py-1`, etc., which are Bootstrap v4.3 utility classes. You can find information on these classes in
the [Utility Classes](/docs/reference/utility-classes) reference section.

## Using module bundlers

If you are using module bundlers like [webpack](https://webpack.js.org/),
[rollup.js](https://rollupjs.org/), etc you may prefer to directly include the package into your
project. To get started, use `yarn` or `npm` to get the latest version of Vue.js, BootstrapVue and
Bootstrap v4:

```bash
# With npm
npm i vue bootstrap-vue bootstrap

# With yarn
yarn add vue bootstrap-vue bootstrap
```

Then, register BootstrapVue plugin in your app entry point:

```js
// app.js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
```

And import Bootstrap and BootstrapVue `css` files:

```js
// app.js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
```

Or import Bootstrap and BootstrapVue `scss` files via a single custom SCSS file:

```scss
// custom.scss
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
```

```js
// app.js
import 'custom.scss'
```

Be sure to `@import` or define your custom variable values _before_ including Bootstrap SCSS
(`bootstrap.scss`), and include BootstrapVue SCSS (`bootstrap-vue.scss`) _after that_ to ensure
variables are set up correctly.

Make sure you place all the SCSS `@import`s into a single SCSS file, and import that single file
into your project. Importing individual SCSS files into your project will **not** share variable
values and functions between files by default.

**Note**: _Requires webpack configuration to load CSS/SCSS files
([official guide](https://webpack.js.org/guides/asset-management/#loading-css))_.

For information on theming Bootstrap, check out the [Theming](/docs/reference/theming) reference
section.

### Aliasing Vue import

BootstrapVue and PortalVue require access to the global `Vue` reference (via
`import Vue from 'vue'`).

<div class="alert alert-info mb-3">
  <p class="mb-0">
    If you are using a specific build of Vue (i.e. runtime-only vs. compiler + runtime), you will
    need to set up an alias to <code>'vue'</code> in your bundler config to ensure that your
    project, BootstrapVue and PortalVue are all using the same build version of Vue. If you are
    seeing an error such as <code>"$attr and $listeners is readonly"</code>, or
    <code>"Multiple instances of Vue detected"</code>, then you will need to set up an alias.
  </p>
</div>

**Example: Vue alias in webpack.config.js**

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      // If using the runtime only build
      vue$: 'vue/dist/vue.runtime.esm.js' // 'vue/dist/vue.runtime.common.js' for webpack 1
      // Or if using full build of Vue (runtime + compiler)
      // vue$: 'vue/dist/vue.esm.js'      // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}
```

**Note:** If your project has multiple webpack config files (i.e. `webpack.config.js`,
`webpack.renderer.config.js`, `webpack.vendor.config.js`, `webpack.server.config.js`,
`webpack.client.config.js`, etc), you will need to set the appropriate alias in all of them.

See the [Vue.js](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only)
Guide for full details on setting up aliases for [webpack](https://webpack.js.org/),
[rollup.js](https://rollupjs.org/), [Parcel](https://parceljs.org/), etc.

## Nuxt.js module

[Nuxt.js](https://nuxtjs.org/) version <code>{{ nuxtVersion }}</code> (or greater) is recommended.

Install dependencies:

```bash
# With npm
npm i bootstrap-vue

# With yarn
yarn add bootstrap-vue
```

Add `bootstrap-vue/nuxt` to modules section of **nuxt.config.js**.

This will include both `boostrap.css` and `bootstrap-vue.css` default pre-compiled CSS.

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt']
}
```

If you are using custom Bootstrap SCSS, you can disable automatic inclusion of Bootstrap and
BootstrapVue pre-compiled CSS files by setting the following option(s) to `false`:

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt'],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  }
}
```

BootstrapVue's custom SCSS relies on Bootstrap SCSS variables and mixins. You can include Bootstrap
and BootstrapVue SCSS in your project's custom SCSS file:

```scss
// custom.scss

// Custom overrides go first
$grid-breakpoints: (
  xs: 0,
  sm: 480px,
  md: 640px,
  lg: 992px,
  xl: 1300px
);

// Then include the following
@import 'bootstrap/scss/bootstrap.scss';
@import 'bootstrap-vue/src/index.scss';

// And define any of your custom overrides or additional CSS/SCSS here,
// or via an @import
```

In your app main entry point include the single custom SCSS file (when using `sass-loader`):

```js
// app.js
import 'custom.scss'
```

### transformAssetUrls with Nuxt.js

<span class="badge badge-info small">NEW in v2.0.0-rc.22</span> The BootstrapVue Nuxt plugin module
will automatically add in the BootstrapVue specific [`transformAssetUrls`](/docs/reference/images)
image `src` prop configuration for you.

### Tree shaking with Nuxt.js

<span class="badge badge-info small">ENHANCED in 2.0.0-rc.20</span>

If you wish to reduce your production bundle size because you only use a subset of the available
BootstrapVue plugins, you can configure the list of BootstrapVue `componentPlugins` or
`directivePlugins` you want to globally install in your Nuxt.js project.

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt'],
  bootstrapVue: {
    componentPlugins: [
      'LayoutPlugin',
      'FormPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
      'ToastPlugin',
      'ModalPlugin'
    ],
    directivePlugins: ['VBPopoverPlugin', 'VBTooltipPlugin', 'VBScrollspyPlugin']
  }
}
```

<span class="badge badge-info small">NEW in 2.0.0-rc.20</span> There are two additional helper
plugins for providing the `$bvModal` and `$bvToast` injections (if you are not using the
`ModalPlugin` or `ToastPlugin` plugins) that are available in the `componentPlugins` option:

- `BVModalPlugin` - provides the injection `$bvModal` for generating
  [message boxes](/docs/components/modal#modal-message-boxes).
- `BVToastPlugin` - provides the injection `$bvToast` for generating
  [on demand toasts](/docs/components/toast#toasts-on-demand).

<span class="badge badge-info small">NEW in 2.0.0-rc.20</span> You can also optionally import
individual components and/or directives, by configuring the list of BootstrapVue `components` or
`directives` you want to globally install in your Nuxt.js project.

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt'],
  bootstrapVue: {
    components: ['BContainer', 'BRow', 'BCol', 'BFormInput', 'BButton', 'BTable', 'BModal'],
    directives: ['VBModal', 'VBPopover', 'VBTooltip', 'VBScrollspy']
  }
}
```

Feel free to mix and match plugin imports with individual component and directive imports.

Refer to the reference section at the bottom of each of the [component](/docs/components) and
[directive](/docs/directives) docs for details on the plugin names available (and which components
and directives are included in each plugin) and component and/or directive import names.

Note that when importing individual components, any component aliases will **not** be available.

<div class="alert alert-info">
  <p class="mb-0">
    <b>Note:</b> Optimal tree shaking only works when your Nuxt.js app is in <code>production</code>
    mode. You may notice larger bundle sizes when not in <code>production</code> mode (i.e.
    <code>dev</code> mode).
  </p>
</div>

Do not use the Nuxt module If you want to import individual BootstrapVue components into _specific_
pages and/or components of your Nuxt app. Instead follow the
[module bundlers](#using-module-bundlers) section above as well as the
[selective import](#selective-component-and-directive-inclusion-in-module-bundlers) sections below.

### Passing custom BootstrapVue config with Nuxt.js

If you need to pass a custom
[BootstrapVue configuration](/docs/misc/settings#default-bootstrapvue-configuration), you may do so
by setting the `config` property in your `nuxt.config.js`:

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt'],
  bootstrapVue: {
    config: {
      // Custom config options here
    }
  }
}
```

### Using pretranspiled version of BootstrapVue for Nuxt.js

Nuxt.js module uses the precompiled versions of BootstrapVue for faster development builds and the
source (`src/`) of BootstrapVue for higher quality production builds.

You can override this option using `usePretranspiled` option. Setting to `true` always uses the
pre-transpiled versions, while setting it to `false` will always use `src/`. By default
`usePretranspiled` is enabled in development mode only. You should not need to use this option as
the default is most optimal for performance.

## Vue CLI 2

<span class="badge badge-warning small">DEPRECATED</span> Use [Vue CLI 3](#vue-cli-3) instead.

BootstrapVue has two Vue CLI templates available:

- [webpack-simple](https://github.com/bootstrap-vue/webpack-simple): Quick scaffold for a proof of
  concept or small app
- [webpack](https://github.com/bootstrap-vue/webpack): Larger, production ready template with more
  options

```bash
# Ensure Vue CLI is installed and up to date
npm i -g vue-cli

# Initialize a BootstrapVue project in the directory 'my-project'
vue init bootstrap-vue/webpack-simple my-project

# Change into the directory
cd my-project

# Install dependencies
npm i

# Fire up the dev server with HMR
npm run dev
```

You can repeat the commands above replacing `bootstrap-vue/webpack-simple` with
`bootstrap-vue/webpack` for the webpack template.

## Vue CLI 3

Unlike V2, Vue CLI 3 doesn't use templates.

Create a new project in the directory `my-project`:

```bash
npx @vue/cli create my-project
```

Enter the `my-project` directory and install `bootstrap-vue`:

```bash
npm i bootstrap-vue
```

Under the hood, Vue CLI uses webpack, so we can register the BootstrapVue plugin as with the webpack
instructions.

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
```

For additional configuration for Vue CLI 3 for using project relative paths for image src props on
various BootstrapVue components, refer to the Vue CLI 3 section of the
[Image Src Resolving](/docs/reference/images#vue-cli-3-support) reference page.

### Vue CLI 3 plugin

As an alternative, you can use the
[Bootstrap-Vue Vue CLI 3 plugin](https://github.com/GregYankovoy/vue-cli-plugin-bootstrap-vue) to
help you configure your app.

```bash
vue create my-app
cd my-app
vue add bootstrap-vue
```

This will create a new app with basic BootstrapVue settings to get your project started.

In the future this plugin will provide options for more advanced configurations and templates.

## Selective component and directive inclusion in module bundlers

<span class="badge badge-info small">SIMPLIFIED in 2.0.0-rc.20</span>

When using a module bundler you can optionally import only specific components groups (plugins),
components and/or directives.

<div class="alert alert-info">
  <p class="mb-0">
    <b>Note:</b> Optimal tree shaking only works when webpack 4 is in
    <a href="https://webpack.js.org/guides/tree-shaking"><code>production</code></a> mode and
    javascript minification is enabled.
  </p>
</div>

### Component groups and directives as Vue plugins

<span class="badge badge-info small">CHANGED in 2.0.0-rc.22</span>

You can import component groups and directives as Vue plugins by importing from the `components` or
`directives` directory:

<!-- eslint-disable import/first, import/no-duplicates -->

```js
// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

// This imports directive v-b-scrollspy as a plugin:
import { VBScrollspyPlugin } from 'bootstrap-vue'
Vue.use(VBScrollspyPlugin)
```

When importing as plugins, all subcomponents and related directives are imported in most cases. i.e.
When importing `<b-nav>`, all the `<nav-*>` sub components are also included, as well all dropdown
sub components. Component shorthand aliases (if any) are also included in the plugin. Refer to the
component and directive documentation for details.

There are two additional helper plugins for providing the `$bvModal` and `$bvToast` injections (if
you are not using the `ModalPlugin` or `ToastPlugin` plugins) which are available for import from
`'bootstrap-vue'`:

- `BVModalPlugin` - provides the injection `$bvModal` for generating
  [message boxes](/docs/components/modal#modal-message-boxes).
- `BVToastPlugin` - provides the injection `$bvToast` for generating
  [on demand toasts](/docs/components/toast#toasts-on-demand).

### Individual components and directives

<span class="badge badge-info small">CHANGED in 2.0.0-rc.22</span>

If you would like to only pull in a specific component or set of components, you can do this by
directly importing those components.

To cherry pick a component/directive, start by importing it in the file where it is being used:

<!-- eslint-disable no-unused-vars -->

```js
// Place all imports from 'bootstrap-vue' in a single import
// statement for optimal bundle sizes
import { BModal, VBModal } from 'bootstrap-vue'
```

Then add it to your component definition:

<!-- eslint-disable no-undef -->

```js
Vue.component('my-component', {
  components: {
    'b-modal': BModal
  },
  directives: {
    // Note that Vue automatically prefixes directive names with `v-`
    'b-modal': VBModal
  }
  // ...
})
```

Or register them globally:

<!-- eslint-disable no-undef -->

```js
Vue.component('b-modal', BModal)
// Note that Vue automatically prefixes directive names with `v-`
Vue.directive('b-modal', VBModal)
```

Vue allows for various component and directive name syntaxes here, so feel free to utilize
<samp>kebab-casing</samp> (shown), <samp>camelCasing</samp>, <samp>PascalCasing</samp>, and/or
object property shorthand (components only).

## Browser

Add the Boostrap and BootstrapVue CSS URLs in your HTML `<head>` section, followed by the required
JavaScript files.

When supporting older browsers (see [Browser Support](#browser-support) below), you will need to
include a polyfill for handling modern JavaScript features before loading Vue and BoostrapVue
JavaScript files.

```html
<!-- Add this to <head> -->

<!-- Load required Bootstrap and BootstrapVue CSS -->
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />

<!-- Load polyfills to support older browsers -->
<script src="//polyfill.io/v3/polyfill.min.js?features=es2015%2CMutationObserver" crossorigin="anonymous"></script>

<!-- Load Vue followed by BootstrapVue -->
<script src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>
```

## Build variants

Choosing the best variant for your build environment / packager helps less bundle sizes. If your
bundler supports es modules, it will automatically prefer it over commonjs.

| Variant        | Environments           | Package path                                                                     |
| -------------- | ---------------------- | -------------------------------------------------------------------------------- |
| **ESM module** | webpack 2+ / rollup.js | `esm/index.js`                                                                   |
| **ESM bundle** | webpack 2+ / rollup.js | `dist/bootstrap-vue.esm.js` _or_ `dist/bootstrap-vue.esm.min.js`                 |
| commonjs2      | webpack 1 / ...        | `dist/bootstrap-vue.common.js` _or_ `dist/bootstrap-vue.common.min.js`           |
| UMD            | Browser                | `dist/bootstrap-vue.js` _or_ `dist/bootstrap-vue.min.js`                         |
| ES module      | webpack 2+ / rollup.js | `es/index.js` <span class="badge badge-warning">Deprecated in 2.0.0-rc.22</span> |

All of the build variants listed above have been pre-transpiled targeting the browsers supported by
BootstrapVue. However, if you are targeting only modern browsers, you may want to import
`BootstrapVue` from `src/index.js`, and whitelisting `bootstrap-vue/src` for transpilation via your
own project. This can potentially reduce bundle sizes.

BootstrapVue relies on `Popper.js` (for Tooltip, Popover, and Dropdown positioning), `PortalVue`
(for toasts), and `vue-functional-data-merge` (for functional components) and parts of `core-js`.
These four dependencies are included in the `UMD` bundle.

## Migrating a project already using Bootstrap

If you've already been using Bootstrap v4, there are a couple adjustments you may need to make to
your project:

- Remove the `bootstrap.js` file from your page scripts or build pipeline
- If Bootstrap is the only thing relying on `jQuery`, you can safely remove it — BootstrapVue **does
  not** depend on `jQuery`
- Convert your native Bootstrap HTML markup into the simplified BootstrapVue custom component markup

## Browser support

### CSS

BootstrapVue is to be used with Bootstrap v4.3 CSS/SCSS. Please see
[Browsers and devices](https://getbootstrap.com/docs/4.3/getting-started/browsers-devices) for more
information about browsers currently supported by Bootstrap v4.

### JS

BootstrapVue is written in Vue.js! So it is up to your project and bundler which browsers are
supported.

Following features and APIs are used by BootstrapVue:

- ES6 (e.g. `Array.from()`, `Array.isArray()`, `Object.assign()`, `Object.is()`, etc.)
- `Promise`
- `MutationObserver`

If you want to support older IE, Android and iOS devices, you may want to use
[core-js](https://github.com/zloirock/core-js) and
[mutationobserver-shim](https://www.npmjs.com/package/mutationobserver-shim):

- `npm install core-js regenerator-runtime mutationobserver-shim`
- Import the polyfills in your app main entry point:

<!-- eslint-disable no-unused-vars -->

```js
import 'core-js/stable"'
import 'regenerator-runtime/runtime'
import 'mutationobserver-shim'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
```

If using deprecated [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill/):

- `npm install @babel/polyfill mutationobserver-shim`
- Import the polyfills in your app main entry point:

<!-- eslint-disable no-unused-vars -->

```js
import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
```

Alternatively, use [Polyfill.io](https://polyfill.io/) to dynamically serve browser specific
polyfills via `<script>` tags in the HTML `<head>` section. See the [Browser](#browser) section
above for an example.

## Tooling support

### VS Code + Vetur

If you are using [VS Code](https://code.visualstudio.com/) as your text editor, BootstrapVue has
intellisense autocompletion for component attributes available when using the
[Vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur).

[Twitter: Vetur + BootstrapVue](https://twitter.com/AlexSashaRegan/status/912769997776158723)
