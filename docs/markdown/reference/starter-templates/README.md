# Starter Templates

> There are several ways you can create your app, from basic client side HTML all the way up to
> using a build system and compilers.

In all cases, you should have familiarity with using [Vue](https://vuejs.org). A good resource for
Vue tutorials is [Laracasts](https://laracasts.com/search?q=vue).

## Basic example

Get started quickly without the need for a build system, by using standard `<script>` and `<link>`
tags to load the required javascript and CSS in your page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />

    <title>My first BootstrapVue app</title>

    <!-- Required Stylesheets -->
    <link
      type="text/css"
      rel="stylesheet"
      href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"
    />
    <link
      type="text/css"
      rel="stylesheet"
      href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"
    />

    <!-- Required scripts -->
    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
    <script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
  </head>
  <body>
    <!-- Our application root element -->
    <div id="app">
      <b-container>
        <b-jumbotron header="BootstrapVue" lead="Bootstrap 4 Components for Vue.js 2">
          <p>For more information visit our website</p>
          <b-btn variant="primary" href="https://bootstrap-vue.js.org/">More Info</b-btn>
        </b-jumbotron>

        <b-form-group
          horizontal
          :label-cols="4"
          description="Let us know your name."
          label="Enter your name"
        >
          <b-form-input v-model.trim="name"></b-form-input>
        </b-form-group>

        <b-alert variant="success" :show="showAlert">Hello {{ name }}</b-alert>
      </b-container>
    </div>

    <!-- Start running your app -->
    <script>
      window.app = new Vue({
        el: '#app',
        data: {
          name: ''
        },
        computed: {
          showAlert() {
            return this.name.length > 4 ? true : false
          }
        }
      })
    </script>
  </body>
</html>
```

## Vue CLI

### `webpack-simple` example

Starter template: https://github.com/bootstrap-vue/webpack-simple

Note: you may need to adjust the template package.json file to use the latest BootstrapVue version

Coming soon!

### `webpack` example

Starter template: https://github.com/bootstrap-vue/webpack

Note: you may need to adjust the template package.json file to use the latest BootstrapVue version

Coming soon!

## Building with customized Bootstrap V4 CSS

If you are using a build system, and would like to customize the Bootstrap V4 CSS, the following
references will be handy starting points:

- Article on
  [Integrating and Customising Bootstrap 4 in vue-js](https://medium.com/@_Dreamstream/integrating-and-customising-bootstrap-4-in-vue-js-cbc29ba7688e)
  hosted on medium.com
- Official Bootstrap [Theming Bootstrap](http://getbootstrap.com/docs/4.0/getting-started/theming/)
  guide

## Individual component import

There are a few methods that you can use to import individual components and directvies.

You will need `vue-loader` configured to handle the compiling any components that are internally
single file `.vue` components.

The BootstrapVue distribution now includes `ES` modules for all components and directives. These are
located in the `bootstrap-vue/es/components/` and `bootstrap-vue/es/directives/` directories, when
using the NPM bundle. When building from the BootstrapVue repo source the directories will be
created when you run `yarn build`.

### Importing individual components and directives as ES modules

Components and directives appear in sub directories, grouped by functionality. As an example, you
can import `<b-card>` (plus it's sub components) and `<b-table>` as follows:

```js
// Import the individual components
import BCard from 'bootstrap-vue/es/components/card/card'
import BCardHeader from 'bootstrap-vue/es/components/card/card-header'
import BCardBody from 'bootstrap-vue/es/components/card/card-body'
import BCardFooter from 'bootstrap-vue/es/components/card/card-footer'
import BCardImage from 'bootstrap-vue/es/components/card/card-footer'
import BTable from 'bootstrap-vue/es/components/table/table'

// Add components globally:
Vue.component('b-card', BCard)
Vue.component('b-card-header', BCardHeader)
Vue.component('b-card-body', BCardBody)
Vue.component('b-card-footer', BCardFooter)
Vue.component('b-card-img', BCardImg)
Vue.component('b-table', BTable)

// Or make available to your component or app:
export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardFooter,
    BCardImg,
    BTable
  }
  // ...
}
```

### Importing component groups and directives as Vue plugins

A component group and/or directive can be imported as a Vue plugin by importing the component group
or directive directory. Importing `<b-card>` (and related sub-components) and `<b-table>` can be
done with:

```js
// Import the components as Vue plugins
import { Card, Table } from 'bootstrap-vue/es/components'

// Add the plugins to Vue
Vue.use(Card)
Vue.use(Table)
```

Now you can use the `<b-card>` (including the `<b-card-*>` sub-components) and `<b-table>`
components in your project templates.

Note that some component plugins automatically import other directives and components (i.e. the
`modal` plugin also imports the `v-b-modal` directive, and `nav` plugin automatically imports all
`nav-*` sub-components and the dropdown sub-components). Refer to the component reference or
directive reference at the bottom of each documentation page for details.
