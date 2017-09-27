# Getting Started

## Webpack
If you are using module bundlers such as Webpack, Rollup, Laravel elixir/mix, etc you may prefer to directly include the package
into your project. To get started, use yarn or npm to get latest version of bootstrap-vue and bootstrap 4:

```bash
# With NPM:
npm i bootstrap-vue bootstrap@4.0.0-beta
# With Yarn:
yarn add bootstrap-vue bootstrap@4.0.0-beta
```

Then, register BootstrapVue plugin in your app entry point:

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
```

And import the css from both Bootstrap 4 & Bootstrap-Vue: _(requires webpack `style-loader`)_

```js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
```

**Note:** If you are unable or do not want to add style-loader as a dev dependency, you have to
manually include both [Bootstrap](https://v4-alpha.getbootstrap.com/getting-started/download/)
and [BootstrapVue](https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css) CSS files
in your bundle or reference them from `static/` via `index.html`.

## Nuxt.js
You can use official [Nuxt.js](https://nuxtjs.org) module to add BootstrapVue support. ([module docs](https://github.com/nuxt-community/modules/tree/master/modules/bootstrap-vue))

- Add `@nuxtjs/bootstrap-vue` dependency using yarn or npm to your project:
- Add `@nuxtjs/bootstrap-vue` to modules section of **nuxt.config.js**

```js
{
  modules: [
    '@nuxtjs/bootstrap-vue',

    // Or if you have custom bootstrap CSS...
    ['@nuxtjs/bootstrap-vue', { css: false }],
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

You can repeat the commands above replacing `bootstrap-vue/webpack-simple` with `bootstrap-vue/webpack` for the webpack template.

## Individual components and directives

If you would like to only pull in a specific component or set of components, you can do this by directly importing those components.

To cherry pick a component/directive, start by importing it in the file where it is being used:

```js
import { bModal } from 'bootstrap-vue/lib/components'
import { bModal as bModalDirective } from 'bootstrap-vue/lib/directives'
```

Then add it to your component definition:

```js
Vue.component("my-component", {
    components: {
        'b-modal': bModal
    },
    directives: {
        'b-modal': bModalDirective
    }
    // ...
})
```

Vue and ES2015 allow for various syntaxes here, so feel free to utilize kebab-casing (shown), camel-casing, pascal-casing, and/or object property shorthand.

### Webpack + Babel

When importing components/directives individually, you must configure your app to properly build the bootstrap-vue library source code. This commonly involves white-listing the node module for your babel loader rule in webpack.

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
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
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
- Don't forget to include the `bootstrap-vue.css` file!

## Browsers Support

### CSS

BootstrapVue is to be used with Bootstrap 4 CSS.
Please see [Browsers and devices](https://v4-alpha.getbootstrap.com/getting-started/browsers-devices)
for more information about browsers currently supported by Bootstrap 4.

### JS

BootstrapVue is written in Vue! So this is up to your project and bundler that which browsers are supported.
If you want to support older IE, Android and IOS devices, you may want to use
[Babel Polyfill](https://babeljs.io/docs/usage/polyfill)

### IE 11

You'll need babel-polyfill for BootstrapVue to work properly. In order to support this browser:

- `npm install babel-polyfill`
- Import it in your app main entry point with `import 'babel-polyfill'`

## Tooling Support

### vscode + vetur

If you are using [vscode](https://code.visualstudio.com/) as your text editor, bootstrap-vue has intellisense autocompletion for component attributes available when using the [vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur).

[Twitter: vetur + bootstrap-vue](https://twitter.com/AlexSashaRegan/status/912769997776158723)
