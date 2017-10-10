# Starter examples
> There are several ways you can create your app, from basic client side HTML
all the way up to using a build system and compilers.

In all cases, you should have familiarity with using [Vue](https://vuejs.org). A good
resource for Vue tutorials is [Laracasts](https://laracasts.com/search?q=vue).

## Basic example

Get started quickly without the need for a build system, by using standard `<script>` and `<link>`
tags to load the required javascript and CSS in your page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">

    <title>My first Bootstrap-Vue app</title>

    <!-- Required Stylesheets -->
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

    <!-- Required scripts -->
    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
    <script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
  </head>

  <body>
    <!-- Our application root element -->
    <div id="app">
      <b-container>
        <b-jumbotron header="Bootstrap Vue"
                     lead="Bootstrap 4 Components for Vue.js 2"
        >
          <p>For more information visit our website</p>
          <b-btn variant="primary" href="https://bootstrap-vue.js.org/">More Info</b-btn>
        </b-jumbotron>

        <b-form-group horizontal 
                      :label-cols="4"
                      description="Let us know your name."
                      label="Enter your name"
        >
           <b-form-input v-model.trim="name"></b-form-input>
        </b-form-group>

        <b-alert variant="success" :show="showAlert">
          Hello {{ name }}
        </b-alert>
      </b-container>
    </div>

    <!-- Start running your app -->
    <script>
      window.app = new Vue({
        el: "#app",
        data: {
          name: ''
        },
        computed: {
          showAlert() {
            return this.name.length > 4 ? true : false;
          }
        }
      })
    </script>

  </body>
</html>
```

## Vue-CLI

### `webpack-simple` example
Coming soon!

### `webpack` example
Coming soon!


## Individual component import example
Coming soon!


