# Getting Started

## Webpack
If you are using module bundlers such as Webpack, Rollup, Laravel elixir/mix, etc you may prefer to directly include the package
into your project. To get started, use yarn or npm to get latest version of bootstrap-vue and bootstrap 4:

```bash
# With NPM:
npm i bootstrap-vue

# With Yarn:
yarn add bootstrap-vue
```

Then, register BootstrapVue plugin in your app entry point:

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
```

And import Bootstrap and Bootstrap-Vue css files:

```js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
```

**Note**: _requires webpack configuration to load css files ([official guide](https://webpack.js.org/guides/asset-management/#loading-css))_

## Nuxt.js
Install dependencies:

```bash
# With NPM:
npm i bootstrap-vue

# With Yarn:
yarn add bootstrap-vue
```

Add `bootstrap-vue/nuxt` to modules section of **nuxt.config.js**

```js
{
  modules: [
    'bootstrap-vue/nuxt',

    // Or if you have custom bootstrap CSS...
    ['bootstrap-vue/nuxt', { css: false }],
  ]
}
```

## vue-cli

Bootstrap-Vue has two vue-cli templates available:

- [webpack-simple](https://github.com/bootstrap-vue/webpack-simple): Quick scaffold for a proof of concept or small app
- [webpack](https://github.com/bootstrap-vue/webpack): Larger, production ready template with more options

```bash
# Ensure vue-cli is installed and up to date
npm i -g vue-cli
# Initialize a bootstrap project in the directory 'my-project'
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

## Individual components and directives

If you would like to only pull in a specific component or set of components, you can do
this by directly importing those components.

To cherry pick a component/directive, start by importing it in the file where it is being used:

```js
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
```

Then add it to your component definition:

```js
Vue.component('my-component', {
    components: {
        'b-modal': bModal
    },
    directives: {
        'b-modal': bModalDirective
    }
    // ...
})
```

Or register them globally:

```js
Vue.component('b-modal', bModal);
Vue.directive('b-modal', bModalDirective);
```

Vue and ES2015 allow for various syntaxes here, so feel free to utilize kebab-casing (shown),
camel-casing, pascal-casing, and/or object property shorthand.

### Component groups and Directives as Vue plugins

You can also import component groups and directives as Vue plugins by importing
the component group or directive directory:

```js
// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { Modal } from 'bootstrap-vue/es/components';
Vue.use(Modal);

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { Card } from 'bootstrap-vue/es/components';
Vue.use(Card);

// This imports directive v-b-scrollspy as a plugin:
import { Scrollspy } from 'bootstrap-vue/es/directives';
Vue.use(Scrollspy);
```

When importing as plugins, all subcomponents and related directives are imported in most cases.
i.e. When importing `<b-nav>`, all the `<nav-*>` sub components are also included, as well all
dropdown sub components.

Refer to the component and directive documentation for details.

### Webpack + Babel

When importing components/directives individually, you must configure your app to properly
build the bootstrap-vue library source code. This commonly involves white-listing the node
module for your babel loader rule in webpack.

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
                include: [ // use `include` vs `exclude` to white-list vs black-list
                    path.resolve(__dirname, "src"), // white-list your app source files
                    require.resolve("bootstrap-vue"), // white-list bootstrap-vue
                ],
                loader: "babel-loader"
            }
        ]
    }
}
```

## Browser

```html
<!-- Add this to <head> -->
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

<!-- Add this after vue.js -->
<script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
```

## Build variants

Choosing the best variant for your build environment / packager helps less bundle sizes.
If your bundler supports es modules, it will automatically prefer it over commonjs.

| Variant        | Environments         | Package path
| -------------- | -------------------- | -----------------------------------
| **ES Module**  | Webpack 2 / Rollup   | `dist/bootstrap-vue.esm.js`
| commonjs2      | Webpack 1 / ...      | `dist/bootstrap-vue.common.js`
| UMD            | Browser              | `dist/bootstrap-vue.js`

## Migrating a project already using Bootstrap

If you've already been using Bootstrap 4, there are a couple adjustments you may need to make to your project:

- Remove the bootstrap.js file from your page scripts or build pipeline
- If Bootstrap is the only thing relying on jQuery, you can safely remove it — BootstrapVue **does not** depend on jQuery
- Convert your native bootstrap HTML markup into the simplified Bootstrap-Vue custom component markup

## Browsers Support

### CSS

BootstrapVue is to be used with Bootstrap 4 CSS.
Please see [Browsers and devices](https://getbootstrap.com/docs/4.0/getting-started/browsers-devices)
for more information about browsers currently supported by Bootstrap 4.

### JS

BootstrapVue is written in Vue! So this is up to your project and bundler which browsers are supported.
If you want to support older IE, Android and IOS devices, you may want to use
[Babel Polyfill](https://babeljs.io/docs/usage/polyfill)

### IE 11

You'll need babel-polyfill for BootstrapVue to work properly. In order to support this browser:

- `npm install babel-polyfill`
- Import it in your app main entry point with `import 'babel-polyfill'`

## Tooling Support

### vscode + vetur

If you are using [vscode](https://code.visualstudio.com/) as your text editor, bootstrap-vue
has intellisense autocompletion for component attributes available when using the
[vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur).

[Twitter: vetur + bootstrap-vue](https://twitter.com/AlexSashaRegan/status/912769997776158723)
