# Getting Started

> Get started with BootstrapVue, based on the world's most popular framework - Bootstrap V4, for
> building responsive, mobile-first sites using Vue.js.

- [Vue.js](https://vuejs.org/) `v2.6` is required, `v{{ vueVersion }}` is recommended
- [Bootstrap](https://getbootstrap.com/) `v4.3` is required, `v{{ bootstrapVersion }}` is
  recommended
- [PortalVue](https://portal-vue.linusb.org/) `v2.1` is required, `v{{ portalVueVersion }}` is
  recommended
- [jQuery](https://jquery.com/) is **not** required

## Using module bundlers

If you are using module bundlers like [webpack](https://webpack.js.org/),
[rollup.js](https://rollupjs.org/), etc you may prefer to directly include the package into your
project. To get started, use `yarn` or `npm` to get the latest version of Vue.js, BootstrapVue and
Bootstrap 4:

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

<div class="alert alert-info mb-0">
  <p class="mb-2">
    BootstrapVue and PortalVue require access to the global <code>Vue</code> reference (via <code>
    import Vue from 'vue'</code>).
  </p>
  <p class="mb-2">
    If you are using a specific build of Vue (i.e. runtime-only vs. compiler + runtime), you will
    need to set up an alias to <code>'vue'</code> in your bundler config to ensure that your
    project, BootstrapVue and PortalVue are all using the same build version of Vue. If you are
    seeing an error such as <code>"$attr and $listeners is readonly"</code>, then you will need to
    set up an alias.
  </p>
  <p class="mb-0">
    See the
    <a class="alert-link" href="https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only">Vue.js
    Guide</a> for details on setting up aliases for
    <a class="alert-link" href="https://webpack.js.org/">webpack</a>,
    <a class="alert-link" href="https://rollupjs.org/">rollup.js</a>,
    <a class="alert-link" href="hhttps://parceljs.org/">Parcel</a>, etc.
  </p>
</div>

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

// And define any of your custom overides or additional CSS/SCSS here,
// or via an @import
```

In your app main entry point include the single custom SCSS file (when using `sass-loader`):

```js
// app.js
import 'custom.scss'
```

### Tree shaking with Nuxt.js

<span class="badge badge-info small">ENHANCED in 2.0.0-rc.20</span>

If you wish to reduce your bundle size because you only use a subset of the available BootstrapVue
plugins, you can configure the list of BootstrapVue `componentPlugins` or `directivePlugins` you
want to globally install in your Nuxt.js project.

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

Note that when importing individual components, the component aliases will not be available.

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

Nuxt.js module uses the precompiled version of BootstrapVue (`es/`) for faster development builds
and the source (`src/`) of BootstrapVue for higher quality production builds.

You can override this option using `usePretranspiled` option. Setting to `true` uses `es/` instead
of `src/`. By default `usePretranspiled` is enabled in development mode only.

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

Optionally, you can import components individually, as
[below](#individual-components-and-directives). To shorten import paths, we can add a webpack alias
via `vue.config.js`.

```js
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components')
      }
    }
  }
}
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

### Component groups and directives as Vue plugins

You can import component groups and directives as Vue plugins by importing from the `components`
or `directives` directory:

<!-- eslint-disable import/first, import/no-duplicates -->

```js
// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from 'bootstrap-vue/es/components'
Vue.use(LayoutPlugin)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue/es/components'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue/es/components'
Vue.use(CardPlugin)

// This imports directive v-b-scrollspy as a plugin:
import { VBScrollspyPlugin } from 'bootstrap-vue/es/directives'
Vue.use(VBScrollspyPlugin)
```

When importing as plugins, all subcomponents and related directives are imported in most cases. i.e.
When importing `<b-nav>`, all the `<nav-*>` sub components are also included, as well all dropdown
sub components. Component shorthand aliases (if any) are also included in the plugin. Refer to the
component and directive documentation for details.

There are two additional helper plugins for providing the `$bvModal` and `$bvToast` injections (if
you are not using the `ModalPlugin` or `ToastPlugin` plugins) which are available for import from
`'bootstrap-vue/es/components'` and `'bootstrap-vue/src/components'`:

- `BVModalPlugin` - provides the injection `$bvModal` for generating
  [message boxes](/docs/components/modal#modal-message-boxes).
- `BVToastPlugin` - provides the injection `$bvToast` for generating
  [on demand toasts](/docs/components/toast#toasts-on-demand).

### Individual components and directives

If you would like to only pull in a specific component or set of components, you can do this by
directly importing those components.

To cherry pick a component/directive, start by importing it in the file where it is being used:

<!-- eslint-disable no-unused-vars -->

```js
import { BModal } from 'bootstrap-vue/es/components'
import { VBModal } from 'bootstrap-vue/es/directives'
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
<samp>kebab-casing</samp> (shown), <samp>camelCasing</samp>, <samp>PascalCasing</samp>, and/or object
property shorthand (components only).

### webpack + Babel

When importing components/directives individually, you must configure your app to properly build the
BootstrapVue library source code. This commonly involves white-listing the node module for your
babel loader rule in webpack.

```js
// webpack.config.js
const path = require('path')

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          // Use `include` vs `exclude` to whitelist vs blacklist
          path.resolve(__dirname, 'src'), // Whitelist your app source files
          require.resolve('bootstrap-vue') // Whitelist `bootstrap-vue`
        ],
        loader: 'babel-loader'
      }
    ]
  }
}
```

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

| Variant        | Environments          | Package path                                                           |
| -------------- | --------------------- | ---------------------------------------------------------------------- |
| **ES Modules** | webpack 2 / rollup.js | `es/index.js`                                                          |
| **ESM Module** | webpack 2 / rollup.js | `dist/bootstrap-vue.esm.js` _or_ `dist/bootstrap-vue.esm.min.js`       |
| commonjs2      | webpack 1 / ...       | `dist/bootstrap-vue.common.js` _or_ `dist/bootstrap-vue.common.min.js` |
| UMD            | Browser               | `dist/bootstrap-vue.js` _or_ `dist/bootstrap-vue.min.js`               |

BootstrapVue relies on `Popper.js` (for Tooltip, Popover, and Dropdown positioning), `PortalVue`
(for toasts, etc), and `vue-functional-data-merge` (for functional components). These three
dependencies are included in the `commonjs2` and `UMD` bundles.

<div class="alert alert-info">
  <p class="mb-0">
    <strong>Note:</strong> When using the <code>commonjs2</code> build, and importing indvidual
    plugins or components, you may need to explicitly <code>require</code> the
    <code>.default</code> export when not importing named exports. i.e.
    <code class="text-nowrap">const foo = require("some/module").default;</code>
  </p>
</div>

## Migrating a project already using Bootstrap

If you've already been using Bootstrap 4, there are a couple adjustments you may need to make to
your project:

- Remove the bootstrap.js file from your page scripts or build pipeline
- If Bootstrap is the only thing relying on jQuery, you can safely remove it — BootstrapVue **does
  not** depend on jQuery
- Convert your native Bootstrap HTML markup into the simplified BootstrapVue custom component markup

## Browser support

### CSS

BootstrapVue is to be used with Bootstrap 4.3 CSS/SCSS. Please see
[Browsers and devices](https://getbootstrap.com/docs/4.3/getting-started/browsers-devices) for more
information about browsers currently supported by Bootstrap 4.

### JS

BootstrapVue is written in Vue.js! So it is up to your project and bundler which browsers are
supported.

Following features and APIs are used by BootstrapVue:

- ES5 (e.g. `Array.from()`, `Array.isArray()`, `Object.assign()`, `Object.is()`, etc.)
- `Promise`
- `MutationObserver`

If you want to support older IE, Android and iOS devices, you may want to use
[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill/) and
[mutationobserver-shim](https://www.npmjs.com/package/mutationobserver-shim):

- `npm install @babel/polyfill mutationobserver-shim`
- Import the polyfills in your app main entry point:

<!-- eslint-disable no-unused-vars -->

```js
import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
```

Alternatively use [Polyfill.io](https://polyfill.io/) to dynamically serve browser specific
polyfills via `<script>` tags in the HTML `<head>` section. See [Browser](#browser) section for an
example.

## Tooling support

### VS Code + Vetur

If you are using [VS Code](https://code.visualstudio.com/) as your text editor, BootstrapVue has
intellisense autocompletion for component attributes available when using the
[Vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur).

[Twitter: Vetur + BootstrapVue](https://twitter.com/AlexSashaRegan/status/912769997776158723)
