# Theming Bootstrap

Theming is accomplished by Sass variables, Sass maps, and custom CSS. There’s no dedicated
theme stylesheet; instead, you can enable the built-in theme to add gradients, shadows, and more.


## Custom SCSS
To use your own theme and colors in `bootstrap-vue`, you will need to create a
`_custom.scss` file in your project, which you can include in your main app:

```html
<style lang="scss">

  @import "assets/_custom.scss";
  @import "~bootstrap/scss/bootstrap.scss";
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  body {
    margin: 0;
  }
  // ...
</style>
```

The `_custom.scss` file, which needs to be loaded before Bootstrap's scss, will include your
Bootstrap V4 variable overrides (i.e. colors, shadows, font sizes, breakpoints, etc).
You can find all of the possible variables in `node_modules/bootstrap/scss/_variables.scss`.

Do not forget to include `node-sass` and `sass-loader` to use `scss` in Vue:

```sh
npm install --save-dev node-sass sass-loader
```


## See also
For more details on theming Bootstrap's CSS, refer to the
[**Official Bootstrap V4 Theming Documentation**](http://getbootstrap.com/docs/4.1/getting-started/theming/).

