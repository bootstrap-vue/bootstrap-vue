# Getting Started

## General

If you are using module bundlers like [webpack](https://webpack.js.org/),
[rollup.js](https://rollupjs.org), etc you may prefer to directly include the package into your
project. To get started, use `yarn` or `npm` to get the latest version of Vue, BootstrapVue and
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

Or import Bootstrap and BootstrapVue `scss` files via a custom SCSS file:

```scss
// custom.scss
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
```

```js
// app.js
import 'custom.scss'
```

Be sure to include your custom variables before `bootstrap.scss` and include BootstrapVue SCSS
_after_ Bootstrap SCSS to ensure variables are set up correctly.

**Note**: _Requires webpack configuration to load CSS/SCSS files
([official guide](https://webpack.js.org/guides/asset-management/#loading-css))_.

## Nuxt.js plugin module

Install dependencies:

```bash
# With npm
npm i bootstrap-vue

# With yarn
yarn add bootstrap-vue
```

Add `bootstrap-vue/nuxt` to modules section of **nuxt.config.js**.

This will include both `boostrap.css` and `bootstrap-vue.css` default CSS.

```js
{
  modules: ['bootstrap-vue/nuxt']
}
```

If you are using custom Bootstrap SCSS, you can disable automatic inclusion of Bootstrap and
BootstrapVue pre-compiled CSS files by setting the folliwing option(s) to `false`:

```js
{
  modules: [['bootstrap-vue/nuxt', { bootstrapCss: false, bootstrapVueCss: false }]]
}
```

BootstrapVue's custom CSS relies on some Boostrap SCSS variables. You can include Bootstrap and
BootstrapVue SCSS in your project's custom SCSS file:

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
@include 'bootstrap/scss/bootstrap';
@include 'bootstrap-vue/src/index.scss';
```

In your app main entry point include the single custom SCSS file (when using `sass-loader`):

```js
// app.js
import 'custom.scss'
```

## Vue CLI 2

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

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
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

## Individual components and directives

If you would like to only pull in a specific component or set of components, you can do this by
directly importing those components.

To cherry pick a component/directive, start by importing it in the file where it is being used:

```js
import BModal from 'bootstrap-vue/es/components/modal/modal'
import BModalDirective from 'bootstrap-vue/es/directives/modal/modal'
```

Then add it to your component definition:

```js
Vue.component('my-component', {
  components: {
    'b-modal': BModal
  },
  directives: {
    'b-modal': BModalDirective
  }
  // ...
})
```

Or register them globally:

```js
Vue.component('b-modal', BModal)
Vue.directive('b-modal', BModalDirective)
```

Vue and ES2015 allow for various syntaxes here, so feel free to utilize kebab-casing (shown),
camelCasing, PascalCasing, and/or object property shorthand.

### Component groups and Directives as Vue plugins

You can also import component groups and directives as Vue plugins by importing the component group
or directive directory:

```js
// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { Layout } from 'bootstrap-vue/es/components'
Vue.use(Layout)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { Modal } from 'bootstrap-vue/es/components'
Vue.use(Modal)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { Card } from 'bootstrap-vue/es/components'
Vue.use(Card)

// This imports directive v-b-scrollspy as a plugin:
import { Scrollspy } from 'bootstrap-vue/es/directives'
Vue.use(Scrollspy)
```

When importing as plugins, all subcomponents and related directives are imported in most cases. i.e.
When importing `<b-nav>`, all the `<nav-*>` sub components are also included, as well all dropdown
sub components. Component shorthand aliases (if any) are also included in the plugin.

Refer to the component and directive documentation for details.

### webpack + Babel

When importing components/directives individually, you must configure your app to properly build the
BootstrapVue library source code. This commonly involves white-listing the node module for your
babel loader rule in webpack.

```js
// webpack.config.js
const webpack = require('webpack')
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
          require.resolve('bootstrap-vue') // Whitelist bootstrap-vue
        ],
        loader: 'babel-loader'
      }
    ]
  }
}
```

## Browser

```html
<!-- Add this to <head> -->
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
<link
  type="text/css"
  rel="stylesheet"
  href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"
/>

<script src="//unpkg.com/@babel/polyfill@latest/dist/polyfill.min.js"></script>
<script src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>
```

## Build Variants

Choosing the best variant for your build environment / packager helps less bundle sizes. If your
bundler supports es modules, it will automatically prefer it over commonjs.

| Variant        | Environments          | Package path                                                           |
| -------------- | --------------------- | ---------------------------------------------------------------------- |
| **ES Module**  | webpack 2 / rollup.js | `es/index.js`                                                          |
| **ESM Module** | webpack 2 / rollup.js | `dist/bootstrap-vue.esm.js` _or_ `dist/bootstrap-vue.esm.min.js`       |
| commonjs2      | webpack 1 / ...       | `dist/bootstrap-vue.common.js` _or_ `dist/bootstrap-vue.common.min.js` |
| UMD            | Browser               | `dist/bootstrap-vue.js` _or_ `dist/bootstrap-vue.min.js`               |

## Migrating a project already using Bootstrap

If you've already been using Bootstrap 4, there are a couple adjustments you may need to make to
your project:

- Remove the bootstrap.js file from your page scripts or build pipeline
- If Bootstrap is the only thing relying on jQuery, you can safely remove it — BootstrapVue **does
  not** depend on jQuery
- Convert your native Bootstrap HTML markup into the simplified BootstrapVue custom component markup

## Browser Support

### CSS

BootstrapVue is to be used with Bootstrap 4 CSS/SCSS. Please see
[Browsers and devices](https://getbootstrap.com/docs/4.2/getting-started/browsers-devices) for more
information about browsers currently supported by Bootstrap 4.

### JS

BootstrapVue is written in Vue! So this is up to your project and bundler which browsers are
supported.

If you want to support older IE, Android and IOS devices, you may want to use
[Babel Polyfill](https://babeljs.io/docs/usage/polyfill):

- `npm install @babel/polyfill`
- Import it in your app main entry point with `import '@babel/polyfill'`

## Tooling Support

### VS Code + Vetur

If you are using [VS Code](https://code.visualstudio.com/) as your text editor, BootstrapVue has
intellisense autocompletion for component attributes available when using the
[Vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur).

[Twitter: Vetur + BootstrapVue](https://twitter.com/AlexSashaRegan/status/912769997776158723)
