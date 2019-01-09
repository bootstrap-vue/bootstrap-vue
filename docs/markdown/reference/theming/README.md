# Theming Bootstrap & BootstrapVue

Theming is accomplished by Sass variables, Sass maps, and custom CSS. There’s no dedicated theme
stylesheet; instead, you can enable the built-in theme to add gradients, shadows, and more.

While BootstrapVue uses Bootstrap's CSS, cetain features of BootstrapVue uses custom CSS (i.e.
stacked tables, etc). Our custom CSS relies on variables defined the Bootstrap V4.x SCSS. The
`bootstrap-vue.css` is compiled using the default Bootstrap V4.x variables. Using the BootstrapVue
source SCSS, you can have your variable overrides (such as breakpoints, etc) adjust the custom
BootstrapVue css.

## Custom SCSS

To use your own theme and colors in `bootstrap-vue`, you will need to create a `custom.scss` file in
your project, which you can include in your main app:

**Via template:**

```html
<style lang="scss">
  @import 'assets/custom.scss';
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';

  body {
    margin: 0;
  }
  // ...
</style>
```

**Via app main entry point:**

Create a SCSS file:

```scss
// custom.scss

// Define your variable overrides here
$enable-shadows: true;
$enable-gradients: true;
$grid-breakpoints: (
  xs: 0,
  sm: 428px,
  md: 799px,
  lg: 899px,
  xl: 1234px xxl: 1600px
);

// Include Bootstrap and BootstrapVue SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
```

Then import that single SCSS file into your app code entry point:

```js
// app.js
import 'custom.scss'
```

The `_custom.scss` file, which needs to be loaded before Bootstrap's scss, will include your
Bootstrap V4 variable overrides (i.e. colors, shadows, font sizes, breakpoints, etc). You can find
all of the possible variables in `node_modules/bootstrap/scss/_variables.scss`.

Do not forget to include `node-sass` and `sass-loader` to use `scss` in Vue:

```sh
npm install --save-dev node-sass sass-loader
```

**Note:** You may need to adjust the SCSS import paths based on your build environment.

## See also

For more details on theming Bootstrap's CSS, refer to the
[**Official Bootstrap V4 Theming Documentation**](http://getbootstrap.com/docs/4.2/getting-started/theming/).
