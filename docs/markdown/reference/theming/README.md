# Theming Bootstrap & BootstrapVue

> Theming is accomplished by Sass variables, Sass maps, and custom CSS. There's no dedicated theme
> stylesheet; instead, you can enable the built-in theme to add gradients, shadows, and more.

While BootstrapVue uses Bootstrap's CSS, certain features of BootstrapVue uses custom CSS (i.e.
stacked tables, etc). Our custom CSS relies on variables defined the Bootstrap v4.x SCSS. The
`bootstrap-vue.css` is compiled using the default Bootstrap v4.x variables. Using the BootstrapVue
source SCSS, you can have your variable overrides (such as breakpoints, etc) adjust the custom
BootstrapVue css.

## SASS Variable defaults

Every Sass variable in Bootstrap 4 includes the `!default` flag allowing you to override the
variable’s default value in your own Sass without modifying Bootstrap’s source code. Copy and paste
variables as needed, modify their values, and remove the `!default` flag. If a variable has already
been assigned, then it won’t be re-assigned by the default values in Bootstrap.

You will find the complete list of Bootstrap’s variables in `bootstrap/scss/_variables.scss`. Some
variables are set to `null`, these variables don’t output the property unless they are overridden in
your configuration.

Variable overrides within the same Sass file can come before or after the default variables. However,
when overriding across Sass files, your overrides must come _before_ you import Bootstrap’s Sass
files.

Here’s an example that changes the `background-color` and `color` for the `<body>` when importing and
compiling Bootstrap SCSS:

```scss
// Your variable overrides
$body-bg: #000;
$body-color: #111;

// Bootstrap and its default variables
@import "../node_modules/bootstrap/scss/bootstrap";
// BootstrapVue and its default variables
@import "../node_modules/bootstrap-vue/src/index.scss";
```

## Default theme colors

The default them colors defined in the Bootstrap v4.3 SCSS are as follows:

<div class="row">
  <div class="col-md-4">
    <div class="p-3 mb-3 bg-primary text-light">Primary</div>
  </div>
  <div class="col-md-4">
    <div class="p-3 mb-3 bg-secondary text-light">Secondary</div>
  </div>
  <div class="col-md-4">
    <div class="p-3 mb-3 bg-success text-light">Success</div>
  </div>
  <div class="col-md-4">
    <div class="p-3 mb-3 bg-danger text-light">Danger</div>
  </div>
  <div class="col-md-4">
    <div class="p-3 mb-3 bg-warning text-dark">Warning</div>
  </div>
  <div class="col-md-4">
    <div class="p-3 mb-3 bg-info text-light">Info</div>
  </div>
  <div class="col-md-4">
    <div class="p-3 mb-3 bg-light text-dark">Light</div>
  </div>
  <div class="col-md-4">
    <div class="p-3 mb-3 bg-dark text-light">Dark</div>
  </div>
</div>

Various components will use variations (intensities) of these default theme colors.

You can alter the theme colors, and create addditional theme colors, as needed via SASS variables and
maps. Refer to the [Bootstrap theming](https://getbootstrap.com/docs/4.3/getting-started/theming/)
docs for more details. All theme colors automatically become available as
[color variants](/docs/reference/color-variants) to all BootstrapVue components.

## SASS options

Customize Bootstrap 4 with the built-in custom variables file and easily toggle global CSS preferences
with Bootstrap's `$enable-*` Sass variables.

Some commonly used Bootstrap v4 variables are:

| Variable                        | Type    | Default | Description                                                                                                  |
| ------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `$enable-rounded`               | Boolean | `true`  | Enables predefined `border-radius` styles on various components                                              |
| `$enable-shadows`               | Boolean | `false` | Enables predefined `box-shadow` styles on various components                                                 |
| `$enable-gradients`             | Boolean | `false` | Enables predefined gradients via `background-image` styles on various components                             |
| `$enable-transitions`           | Boolean | `true`  | Enables predefined `transition`s on various components                                                       |
| `$enable-responsive-font-sizes` | Boolean | `false` | Enables [responsive font sizes](https://getbootstrap.com/docs/4.3/content/typography/#responsive-font-sizes) |
| `$enable-validation-icons`      | Boolean | `true`  | Enables `background-image` icons within textual inputs and some custom forms for validation states           |

Refer to [Bootstrap's theming](https://getbootstrap.com/docs/4.3/getting-started/theming/) docs for
additional variable information.

BootstrapVue also defines several SCSS variables for controlling BootstrapVue's custom CSS generation:

| Variable                      | Type    | Default | Description                             |
| ----------------------------- | ------- | ------- | --------------------------------------- |
| `$bv-enable-table-stacked`    | Boolean | `true`  | Enables stacked table CSS generation    |
| `$bv-enable-tooltip-variants` | Boolean | `true`  | Enables tooltip variant CSS generation  |
| `$bv-enable-popover-variants` | Boolean | `true`  | Enables popover variant CSS generation  |

You can find additional variables that control various aspects of BootstrapVue's custom CSS at
[`bootstrap-vue/src/_variables.scss`](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/src/_variables.scss). 
BootstrapVue's custom SCSS relies on Bootstrap's SASS variables, functions, and mixins.

## Generating custom themes

To use your own theme and colors in BootstrapVue, you will need to create a `custom.scss` file in
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

Create an SCSS file:

```scss
// custom.scss

// Define your variable overrides here
$enable-shadows: true;
$enable-gradients: true;
$grid-breakpoints: (
  xs: 0,
  sm: 456px,
  md: 789px,
  lg: 999px,
  xl: 1234px
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

The `custom.scss` file, which needs to be loaded before Bootstrap's SCSS, will include your
Bootstrap v4 variable overrides (i.e. colors, shadows, font sizes, breakpoints, etc). You can find
all of the possible variables in `node_modules/bootstrap/scss/_variables.scss`.

Do not forget to include `node-sass` and `sass-loader` to use `scss` in Vue:

```sh
npm install --save-dev node-sass sass-loader
```

**Note:** You may need to adjust the SCSS import paths based on your build environment.

## CSS variables

Bootstrap's SCSS generates around two dozen
[CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)
in the compiled CSS. These provide easy access to commonly used values like theme colors,
breakpoints, and primary font stacks when working in your browser’s Inspector, a code sandbox, or
general prototyping.

### Available Bootstrap CSS variables

Here are the variables that are generated (note that the :root is required). The values shown are
based on the Bootstrap v4 defaults:

```scss
:root {
  --blue: #007bff;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #28a745;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #007bff;
  --secondary: #6c757d;
  --success: #28a745;
  --info: #17a2b8;
  --warning: #ffc107;
  --danger: #dc3545;
  --light: #f8f9fa;
  --dark: #343a40;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
```

### Example

CSS variables offer similar flexibility to SASS’s variables, but without the need for compilation
before being served to the browser. For example, here we are resetting our page’s font and link
styles, as well as creating a custom class that uses theme colors, via the use of CSS variables.

```scss
body {
  font: 1rem/1.5 var(--font-family-sans-serif);
}

a {
  color: var(--blue);
}

.custom-class {
  color: var(--primary);
  background-color: var(--dark);
}
```

## See also

- If you are defining custom breakpoint names, please see the
  [BootstrapVue settings](/docs/misc/settings) page on how to update BootstrapVue `<b-col>` and
  `<b-form-group>` breakpoint specific props.
- For more details on theming Bootstrap's SCSS/CSS, refer to the
  [**Official Bootstrap v4 Theming Documentation**](https://getbootstrap.com/docs/4.3/getting-started/theming/).
