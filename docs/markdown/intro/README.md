# Getting Started

> Get started with BootstrapVue, based on the world's most popular framework - Bootstrap
> v{{ bootstrapVersionMajor }}, for building responsive, mobile-first sites using Vue.js.

- [Vue.js](https://vuejs.org/) `v{{ vueVersionMinor }}` is required, `v{{ vueVersion }}` is
  recommended
- [Bootstrap](https://getbootstrap.com/) `v4.3.1` is required, `v{{ bootstrapVersion }}` is
  recommended
- [Popper.js](https://popper.js.org/) `v{{ popperVersionMinor }}` is required for dropdowns (and
  components based on dropdown), tooltips, and popovers. `v{{ popperVersion }}` is recommended
- [PortalVue](https://portal-vue.linusb.org/) `v{{ portalVueVersionMinor }}` is required by
  [Toasts](/docs/components/toast), `v{{ portalVueVersion }}` is recommended
- [jQuery](https://jquery.com/) is **not** required

Check out what is new in [BootstrapVue release v{{ version }}](/docs/reference/changelog).

If you are migrating from a previous `v2.0.0-rc.##` release, please see the
[`v2.0.0` migration guide](/docs/reference/changelog#v200).

## Documentation sections

The online documentation comprises:

- [Components](/docs/components) - Components and component plugin documentation
- [Directives](/docs/directives) - Directives and directive plugin documentation
- [Icons](/docs/icons) - Icons and icon plugin documentation <b-badge>v2.2.0+</b-badge>
- [Reference](/docs/reference) - Reference information and documentation
- [Playground](/play) - Online playground
- [Themes](/themes) - Themes and dashboards

## Prerequisites

This BootstrapVue documentation assumes you are familiar with Vue and and Bootstrap
v{{ bootstrapVersionMajor }} CSS. Good starting points for these:

- [Vue Guide](https://vuejs.org/v2/guide/)
- [Vue API](https://vuejs.org/v2/api/)
- [Bootstrap v{{bootstrapVersionMinor}} documentation](https://getbootstrap.com/)
- [Vue loader scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html), if using scoped
  styles in SFC (Single File Component) `.vue` files

## Documentation information

In many of the examples shown in BootstrapVue's documentation, you may see the use of CSS classes
such as <code class="text-nowrap">ml-2</code>, <code class="text-nowrap">py-1</code>, etc. These are
Bootstrap v{{bootstrapVersionMinor}} utility classes that help control padding, margins, positioning
and more. You can find information on these classes in the
[Utility Classes](/docs/reference/utility-classes) reference section.

Many of the examples in this documentation are _live_ and can be edited in-place for an enhanced
learning experience (note some examples may not work in IE 11 due to use of ES6 JavaScript code in
the `<template>` sections).

BootstrapVue also provides an [interactive playground](/play) where you can experiment with the
various components and export your results to JSFiddle, CodePen, and/or CodeSandbox.

## Important HTML globals

Bootstrap v{{bootstrapVersionMajor}} CSS employs a handful of important global styles and settings
that you'll need to be aware of when using it, all of which are almost exclusively geared towards
the normalization of cross browser styles. Refer to the following sub-sections for details.

### HTML5 doctype

Bootstrap requires the use of the `HTML5` doctype. Without it, you may see some strange incomplete
styling.

```html
<!doctype html>
<html lang="en">
  ...
</html>
```

### Responsive meta tag

Bootstrap is optimized for mobile devices first and then scales up components as necessary using CSS
media queries. To ensure proper rendering and touch zooming for all devices, **add the responsive
viewport meta** tag to your `<head>`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

### CSS box-sizing

For more straightforward sizing in CSS, the global `box-sizing` value is switched from `content-box`
to `border-box`. This ensures `padding` does not affect the final computed width of an element, but
it can cause problems with some third party software like Google Maps and Google Custom Search
Engine.

On the rare occasion you need to override it, use something like the following:

```css
.selector-for-some-widget {
  box-sizing: content-box;
}
```

With the above snippet, nested elements — including generated content via `::before` and `::after` —
will all inherit the specified `box-sizing` for that `.selector-for-some-widget`.

Learn more about [box model and sizing at CSS Tricks](https://css-tricks.com/box-sizing/).

### Style reboot

For improved cross-browser rendering, Bootstrap v{{ bootstrapVersionMinor }} uses
[Reboot](https://getbootstrap.com/docs/4.5/content/reboot/) to correct inconsistencies across
browsers and devices while providing slightly more opinionated resets to common
<abbr title="Hyper Text markup Language">HTML</abbr> elements.

## Using module bundlers

Most likely you are using module bundlers like [Webpack](https://webpack.js.org/),
[Parcel](https://parceljs.org/) or [rollup.js](https://rollupjs.org/), which makes it easy to
directly include the package into your project. To do this, use `npm` or `yarn` to get the latest
version of Vue.js, Bootstrap v4 and BootstrapVue:

```bash
# With npm
npm install vue bootstrap bootstrap-vue

# With yarn
yarn add vue bootstrap bootstrap-vue
```

Then, register BootstrapVue in your app entry point (typically `app.js` or `main.js`):

```js
// app.js
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
```

### Theming Bootstrap

If you want to change Bootstrap's default styles (e.g. the `$body-color`), you have to use
Bootstrap's and BootstrapVue's `scss` files.

Create your own `scss` file (e.g. `app.scss`) containing **both** your custom definitions **and**
the 2 `@import`'s at the end:

```scss
// app.scss

// Define variable defaults
$body-bg: #000;
$body-color: #111;

// Then import Bootstrap an BootstrapVue SCSS files (order is important)
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss';
```

Then import that single `scss` file into your project:

```js
// app.js
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

import './app.scss'

Vue.use(BootstrapVue)
```

Do not import the individual SCSS files separately into your project, because variables and
functions will fail to be shared between files.

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

**Example: Vue alias for [Vue CLI](https://cli.vuejs.org/) in `vue.config.js`**

```js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      // If using the runtime only build
      path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
      // Or if using full build of Vue (runtime + compiler)
      // path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
    )
  }
}
```

**Example: Vue alias in `webpack.config.js`**

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
`webpack.client.config.js`, etc.), you will need to set the appropriate alias in _all_ of them.

See the [Vue.js](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only)
Guide for full details on setting up aliases for [webpack](https://webpack.js.org/),
[rollup.js](https://rollupjs.org/), [Parcel](https://parceljs.org/), etc.

### Advanced module bundler usage

Webpack and Parcel support prepending the `scss` modules with tilde paths (`~`) when importing from
a `scss` file:

```scss
// Webpack example
@import '~bootstrap';
@import '~bootstrap-vue';
```

```scss
// Parcel example
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
```

For more details how to configure asset loading and how modules are resolved, please consult the
module bundlers documentation.

**Notes**:

- Webpack configuration to load CSS files
  ([official guide](https://webpack.js.org/guides/asset-management/#loading-css))
- Webpack Loader for SASS/SCSS files ([official guide](https://webpack.js.org/loaders/sass-loader/))
- Parcel CSS ([official guide](https://parceljs.org/css.html))
- Parcel SCSS ([official guide](https://parceljs.org/scss.html))

## Tree shaking with module bundlers

When using a module bundler you can optionally import only specific components groups (plugins),
components and/or directives. Note that tree shaking only applies to the JavaScript code and not
CSS/SCSS.

<div class="alert alert-info">
  <p class="mb-0">
    <b>Note:</b> Optimal tree shaking only works when webpack 4 is in
    <a href="https://webpack.js.org/guides/tree-shaking"><code>production</code></a> mode and
    javascript minification is enabled.
  </p>
</div>

### Component groups and directives as Vue plugins

You can import component groups and directives as Vue plugins by importing from the `bootstrap-vue`:

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

// This imports the dropdown and table plugins
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
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

When importing multiple component group and/or directive group plugins, include all imports in a
single `import` statement for optimal tree shaking.

### Individual components and directives

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
Vue.component('MyComponent', {
  components: { BModal },
  // Note that Vue automatically prefixes directive names with `v-`
  directives: { 'b-modal': VBModal }
  // ...
})
```

Or register them globally:

<!-- eslint-disable no-undef -->

```js
Vue.component('BModal', BModal)
// Note that Vue automatically prefixes directive names with `v-`
Vue.directive('b-modal', VBModal)
```

Vue allows for various component and directive name syntaxes here, so feel free to utilize
<samp>kebab-casing</samp> (shown), <samp>camelCasing</samp>, <samp>PascalCasing</samp>, and/or
object property shorthand (components only).

### Using BootstrapVue source code for smaller bundles

When using module bundlers, they will usually default to using the `esm/` modular build, which has
been pre-transpiled by Babel for our
[supported browsers](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/.browserslistrc).

You can override the use of the `esm/` build by aliasing `'bootstrap-vue'` to use the BootstrapVue
source files, and whitelisting `node_modules/bootstrap-vue/src/*` for transpilation by your build
process, in your module bundler config. This will allow you to transpile BootstrapVue for your
target browsers/environments and potentially reduce bundle sizes (and will only include the babel
helper utils once) at the expense of slightly longer build times.

**Example webpack.config.js for Babel transpilation:**

```js
module.exports = {
  resolve: {
    alias: {
      // Alias for using source of BootstrapVue
      'bootstrap-vue$': 'bootstrap-vue/src/index.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // Exclude transpiling `node_modules`, except `bootstrap-vue/src`
        exclude: /node_modules\/(?!bootstrap-vue\/src\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
```

You may need to install `babel-core`, `babel-loader`, and `babel-preset-env`:

```bash
# If using npm
npm install babel-core babel-loader babel-preset-env --save-dev

# If using yarn
yarn add babel-core babel-loader babel-preset-env --dev
```

For more details see:

- [Webpack `resolve.alias`](https://webpack.js.org/configuration/resolve/)
- [Webpack `rule`](https://webpack.js.org/configuration/module/#rule)
- [rollup.js](https://rollupjs.org/)
- [Parcel](https://parceljs.org/)

## Nuxt.js module

BootstrapVue provides a Nuxt.js module for easily importing BootstrapVue (or portions of
BootstrapVue) into your Nuxt.js app.

### Getting started with Nuxt.js

[Nuxt.js](https://nuxtjs.org/) version <code>{{ nuxtVersion }}</code> (or greater) is recommended.

Install dependencies:

```bash
# With npm
npm install bootstrap-vue

# With yarn
yarn add bootstrap-vue
```

Add `bootstrap-vue/nuxt` to modules section of your **`nuxt.config.js`** file.

This will include both `bootstrap.css` and `bootstrap-vue.css` default pre-compiled CSS.

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt']
}
```

Note that this will **not** install the Icons components. To see how to include icons via the
Nuxt.js module, refer to the [Icons section](#icons) below.

### Using custom Bootstrap SCSS

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

BootstrapVue's custom SCSS relies on Bootstrap SCSS variables and mixins, and any variable overrides
you may have set. You can include Bootstrap and BootstrapVue SCSS in your project's custom SCSS
file:

```scss
// custom.scss

// Custom Bootstrap variable overrides go first
$grid-breakpoints: (
  xs: 0,
  sm: 480px,
  md: 640px,
  lg: 992px,
  xl: 1300px
);
$enable-rounded: false;

// Then include the following
@import 'bootstrap/scss/bootstrap.scss';
@import 'bootstrap-vue/src/index.scss';

// And define any of your custom or additional CSS/SCSS here,
// or via an @import
```

In your app main entry point include the _single_ custom SCSS file (when using `sass-loader`):

```js
// app.js
import 'custom.scss'
```

### `transformAssetUrls` with Nuxt.js

The BootstrapVue Nuxt plugin module will automatically add in the BootstrapVue specific
[`transformAssetUrls`](/docs/reference/images) image `src` prop configuration for you.

### Tree shaking with Nuxt.js

If you wish to reduce your production bundle size because you only use a subset of the available
BootstrapVue plugins, you can configure the list of BootstrapVue `componentPlugins` or
`directivePlugins` you want to globally install in your Nuxt.js project. Note tree shaking only
applies to the JavaScript code and not CSS/SCSS.

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

There are two additional helper plugins for providing the `$bvModal` and `$bvToast` injections (if
you are not using the `ModalPlugin` or `ToastPlugin` plugins) that are available in the
`componentPlugins` option:

- `BVModalPlugin` - provides the injection `$bvModal` for generating
  [message boxes](/docs/components/modal#modal-message-boxes).
- `BVToastPlugin` - provides the injection `$bvToast` for generating
  [on demand toasts](/docs/components/toast#toasts-on-demand).

You can also optionally import individual components and/or directives, by configuring the list of
BootstrapVue `components` or `directives` you want to globally install in your Nuxt.js project.

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

If you want to import individual BootstrapVue components into _specific_ pages and/or components of
your Nuxt app, you may want to bypass the Nuxt.js module and, instead, follow the
[module bundlers](#using-module-bundlers) and
[Tree shaking with module bundlers](#tree-shaking-with-module-bundlers) sections above.
Alternatively you may want to to just import a few plugins (such as `LayoutPlugin`) in your Nuxt.js
module config, and then import additional components or plugins in the pages where needed.

### Icons

The [icons plugin](/docs/icons) is **not** automatically installed when using the Nuxt.js module.
You must either explicitly enable the `IconsPlugin`, or specify which icon components you wish to
import.

All Icons:

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt'],
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  }
}
```

Specific icons:

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt'],
  bootstrapVue: {
    // Add the desired icon components to the `components` array
    components: ['BIcon', 'BIconAlertFill', 'BIconCalendar', 'BIconGears']
  }
}
```

Icons plugin:

```js
module.exports = {
  modules: ['bootstrap-vue/nuxt'],
  bootstrapVue: {
    // Add the icon plugin to the `componentsPlugins` array
    componentPlugins: ['IconsPlugin']
  }
}
```

### Passing custom BootstrapVue config with Nuxt.js

If you need to pass a custom
[BootstrapVue configuration](/docs/reference/settings#default-bootstrapvue-configuration), you may
do so by setting the `config` property in your `nuxt.config.js`:

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

Nuxt.js module uses the pre-transpiled versions of BootstrapVue for faster development builds and
the source (`src/`) of BootstrapVue for higher quality and smaller production builds.

You can override this option using `usePretranspiled` option. Setting to `true` always uses the
pre-transpiled versions, while setting it to `false` will always use `src/`. By default
`usePretranspiled` is enabled in development mode only. You should not need to use this option as
the default is most optimal for performance.

## Vue CLI 3

Unlike V2, Vue CLI 3 doesn't use templates.

Create a new project in the directory `my-project`:

```bash
npx @vue/cli create my-project
```

Enter the `my-project` directory and install `bootstrap-vue`:

```bash
npm install bootstrap-vue
```

Under the hood, Vue CLI uses webpack, so we can register the BootstrapVue plugin as with the webpack
instructions.

```js
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
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

For Icons support, you may need to edit the resultant config file.

## Browser

If not using a module bundler or compile process, you can instead add the Bootstrap and BootstrapVue
CSS URLs in your HTML `<head>` section, followed by the required JavaScript files.

When supporting older browsers (see [Browser Support](#browser-support) below), you will need to
include a polyfill for handling modern JavaScript features before loading Vue and BootstrapVue
JavaScript files.

```html
<!-- Add this to <head> -->

<!-- Load required Bootstrap and BootstrapVue CSS -->
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />

<!-- Load polyfills to support older browsers -->
<script src="//polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver" crossorigin="anonymous"></script>

<!-- Load Vue followed by BootstrapVue -->
<script src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>

<!-- Load the following for BootstrapVueIcons support -->
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js"></script>
```

## Build variants

Choosing the best variant for your build environment / packager helps reduce bundle sizes. If your
bundler supports esm modules, it will automatically prefer it over commonjs.

| Variant        | Environments           | Tree Shake | Package path                                                           |
| -------------- | ---------------------- | ---------- | ---------------------------------------------------------------------- |
| **ESM module** | webpack 2+ / rollup.js | Yes        | `esm/index.js`                                                         |
| ESM bundle     | webpack 2+ / rollup.js | Yes        | `dist/bootstrap-vue.esm.js`                                            |
| commonjs2      | webpack 1 / ...        | No         | `dist/bootstrap-vue.common.js` _or_ `dist/bootstrap-vue.common.min.js` |
| UMD            | Browser                | No         | `dist/bootstrap-vue.js` _or_ `dist/bootstrap-vue.min.js`               |

Note the UMD (browser) variant **does not** include BootstrapVue [icons](/docs/icons) support. All
other variants listed above _do include_ the `BootstrapVueIcons` (`IconsPlugin`) plugin (note the
icons plugin is not automatically installed, and must explicitly installed via `Vue.use()`. See the
[Icons usage](/docs/icons#usage) section for more details.

Icons only modules:

| Variant        | Environments           | Tree Shake | Package path                                                                       |
| -------------- | ---------------------- | ---------- | ---------------------------------------------------------------------------------- |
| **ESM bundle** | webpack 2+ / rollup.js | Yes        | `dist/bootstrap-vue-icons.esm.js`                                                  |
| commonjs2      | webpack 1 / ...        | No         | `dist/bootstrap-vue-icons.common.js` _or_ `dist/bootstrap-vue-icons.common.min.js` |
| UMD            | Browser                | No         | `dist/bootstrap-vue-icons.js` _or_ `dist/bootstrap-vue-icons.min.js`               |

The `ESM` module build and the `ESM` bundles (single file) are
[tree-shakeable](#tree-shaking-with-module-bundlers), but you will experience smaller final bundle
sizes when using the `ESM` module _vs._ the `ESM` bundle.

All of the build variants listed above have been pre-transpiled targeting the
[browsers](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/.browserslistrc) supported by
BootstrapVue. However, if you are targeting only modern browsers, you may want to import
`BootstrapVue` from `src/index.js`, (by aliasing `bootstrap-vue` to `bootstrap-vue/src/index.js`)
and whitelisting `bootstrap-vue/src` for transpilation via your own project. This can potentially
reduce final project bundle sizes. See the
[Using BootstrapVue source code for smaller bundles](#using-bootstrapvue-source-code-for-smaller-bundles)
section above for more details.

### Dependencies

BootstrapVue relies on `Popper.js` (for Tooltip, Popover, and Dropdown positioning),
[`PortalVue`](https://portal-vue.linusb.org/) (for toasts) and
[`vue-functional-data-merge`](https://github.com/alexsasharegan/vue-functional-data-merge) (used by
our functional components). These three dependencies are included in the BootstrapVue `UMD` bundle,
while the UMD (browser) icons only bundle includes `vue-functional-data-merge`. All other builds do
not include these dependencies.

## Migrating a project already using Bootstrap

If you've already been using Bootstrap v{{bootstrapVersionMajor}}, there are a couple adjustments
you may need to make to your project:

- Remove the `bootstrap.js` file from your page scripts or build pipeline
- If Bootstrap is the only thing relying on `jQuery`, you can safely remove it — BootstrapVue **does
  not** depend on `jQuery`
- Convert your native Bootstrap HTML markup into the simplified BootstrapVue custom component markup
- Start by converting only the interactive controls that require Bootstrap's javascript first.

## Browser support

### CSS

BootstrapVue is to be used with Bootstrap v{{bootstrapVersionMinor}} CSS/SCSS. Please see
<b-link :href="bootstrapBrowserDevicesHref" target="_blank">Browsers and devices</b-link> for more
information about browsers currently supported by Bootstrap v{{bootstrapVersionMajor}}.

### JS

BootstrapVue is written in Vue.js! So it is up to your project and bundler which browsers are
supported.

Following features and APIs are used by BootstrapVue:

- ES6 (e.g. `Array.from()`, `Array.isArray()`, `Object.assign()`, `Object.is()`, etc.)
- `Promise`
- `MutationObserver`
- `IntersectionObserver` (optional)

If you want to support older IE, Android, and iOS device web browsers, you may want to use
[core-js](https://github.com/zloirock/core-js) and
[intersection-observer](https://www.npmjs.com/package/intersection-observer):

```bash
npm install core-js regenerator-runtime intersection-observer
```

Then import the polyfills in your app main entry point:

<!-- eslint-disable no-unused-vars -->

```js
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'intersection-observer' // Optional
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
```

If using deprecated [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill/):

```bash
npm install @babel/polyfill intersection-observer
```

Then import the polyfills in your app main entry point:

<!-- eslint-disable no-unused-vars -->

```js
import '@babel/polyfill'
import 'intersection-observer' // Optional
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
```

Alternatively, use [Polyfill.io](https://polyfill.io/) to dynamically serve browser specific
polyfills via `<script>` tags in the HTML `<head>` section. See the [Browser](#browser) section
above for an example.

## Tooling support

BootstrapVue provides additional helper files for auto completion in popular IDE editors.

### VS Code + Vetur

If you are using [VS Code](https://code.visualstudio.com/) as your text editor, BootstrapVue has
intellisense autocompletion for component attributes and directives available via the
`dist/vetur-tags.json` and `dist/vetur-attributes.json` files.

### JetBrains WebStorm (and compatible)

For [WebStorm](https://www.jetbrains.com/webstorm/) editor (or web-types compatible), BootstrapVue
provides the file `dist/web-types.json` for component attribute and directive auto-completion.
