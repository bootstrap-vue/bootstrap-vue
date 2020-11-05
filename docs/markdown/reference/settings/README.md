# Settings

> BootstrapVue provides a few options for customizing component default values, and more.

## Configuring defaults

BootstrapVue is pre-configured for the default Bootstrap v4.x configuration. It assumes the
breakpoints are the standard breakpoint names of `xs`, `sm`, `md`, `lg`, and `xl`. Also various
BootstrapVue components have props with default variants and text content.

BootstrapVue provides several methods for changing the default configuration.

Note that it is not possible to change the defaults when using BootstrapVue via a `<script>` tag.

### Default configuration

Default breakpoint names are stored in the `breakpoints` property and all other shared component
configurations (like `formControls`) are listed below.

Component specific defaults are keyed by their `PascalCase` name with the props as `camelCase`
properties.

```json
{
  // Breakpoint configuration
  "breakpoints": ["xs", "sm", "md", "lg", "xl"],

  // Shared component configuration
  "formControls": {
    "disabled": undefined,
    "required": false,
    "form": undefined,
    "autofocus": false,
    "plain": false,
    "size": undefined
  },
  "formOptionControls": {
    "options": [],
    "valueField": "value",
    "textField": "text",
    "htmlField": "html",
    "disabledField": "disabled"
  },
  "formRadioCheckGroups": {
    "validated": false,
    "ariaInvalid": false,
    "stacked": false,
    "buttons": false,
    "buttonVariant": undefined,
    "plain": false
  },
  "formRadioCheckControls": {
    "value": undefined,
    "checked": undefined,
    "inline": false,
    "button": false,
    "buttonVariant": undefined,
    "ariaLabel": undefined,
    "ariaLabelledby": undefined,
    "plain": false
  },
  "formState": {
    "state": null
  },
  "formTextControls": {
    "value": "",
    "ariaInvalid": false,
    "readonly": false,
    "plaintext": false,
    "autocomplete": undefined,
    "placeholder": undefined,
    "formatter": undefined,
    "lazyFormatter": false,
    "trim": false,
    "number": false,
    "lazy": false,
    "debounce": 0
  },

  // Component configuration
  "BAlert": {
    "variant": "info"
    // ...
  }
  // ...
}
```

### Setting new configuration values

When you `Vue.use(BootstrapVue)`, you can optionally pass a configuration object which specifies new
values to replace the default values. For example if you wish to define new breakpoint names (which
will generate appropriate properties on components such as `<b-col>` and `<b-form-group>`), so that
the new breakpoints are `['aa', 'bb', 'cc', 'dd']` then `<b-col>` will now have `bb`, `cc`, and `dd`
props instead of `sm`, `md`, `lg` and `xl` props (similar for the `label-cols-{breakpoint}` and
`label-align-{breakpoint}` props on `<b-form-group>`):

```js
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue, {
  breakpoints: [`xs`, 'sm', 'md', 'lg', 'xl', 'xxl']
})
```

Or if changing the default variants for `<b-button>` and `<b-alert>`:

```js
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue, {
  BAlert: { variant: 'danger' },
  BButton: { variant: 'primary' }
})
```

The values provided as the config option to `Vue.use` will be merged with the default values.

**Note:** When defining custom breakpoints, keep the names short (2 to 3 characters). At least two
breakpoint names must be defined. The breakpoint names **must** match the breakpoint names defined
in your custom Bootstrap SCSS. Breakpoint names must not conflict with non-breakpoint prop names
used on various components (i.e. avoid `to`, `col`, etc.)

### Setting config via individual component group plugin imports

When importing individual component plugins, you can specify a config as well (using the same config
structure as above. You only need to provide configuration to the first component you import, but
each successive config will be merged with the previous config provided.

Note breakpoint names should be defined before using any components as they are required to generate
component breakpoint specific props. Once the component that has breakpoint specific props is used,
and subsequent changes to the breakpoints will **not** be reflected.

**Example 1 (least preferred method):**

<!-- eslint-disable import/first, import/no-duplicates -->

```js
import { LayoutPlugin, AlertPlugin, ButtonPlugin } from 'bootstrap-vue'

// Supply configs via each plugin as it is `Vue.use()`'d
Vue.use(LayoutPlugin, { breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'] })
Vue.use(AlertPlugin, { BAlert: { variant: 'danger' } })
Vue.use(ButtonPlugin, { BButton: { variant: 'primary' } })
```

**Example 2:**

<!-- eslint-disable import/first, import/no-duplicates -->

```js
import { LayoutPlugin, AlertPlugin, ButtonPlugin } from 'bootstrap-vue'

// Supply complete config to first `Vue.use()`'d plugin
Vue.use(LayoutPlugin, {
  breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'],
  BAlert: { variant: 'danger' },
  BButton: { variant: 'primary' }
})
Vue.use(AlertPlugin)
Vue.use(ButtonPlugin)
```

**Example 3 (most preferred method):**

<!-- eslint-disable import/first, import/no-duplicates -->

```js
import { BVConfigPlugin, LayoutPlugin, AlertPlugin, ButtonPlugin } from 'bootstrap-vue'

// Supply complete config to the BVConfigPlugin helper plugin
Vue.use(BVConfigPlugin, {
  breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'],
  BAlert: { variant: 'danger' },
  BButton: { variant: 'primary' }
})

// Then use component plugins
Vue.use(LayoutPlugin)
Vue.use(AlertPlugin)
Vue.use(ButtonPlugin)
```

**Example 4 when importing individual components (preferred method):**

<!-- eslint-disable import/first, import/no-duplicates -->

```js
import { BVConfigPlugin, BAlert, BButton, BRow, BCol } from 'bootstrap-vue'

// Supply complete config to the BVConfig helper plugin
Vue.use(BVConfigPlugin, {
  breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'],
  BAlert: { variant: 'danger' },
  BButton: { variant: 'primary' }
})

// Then install components globally
Vue.component('BAlert', BAlert)
Vue.component('BButton', BButton)
Vue.component('BRow', BRow)
Vue.component('BCol', BCol)

// Or register components as local to your custom component
export default {
  name: 'MyComponent',
  components: {
    BAlert,
    BButton,
    BRow,
    BCol
  }
  // ...
}
```

**Caveat:** Vue only installs plugins _once_. If you import a plugin that has already been imported
by another component plugin, the configuration passed to the component plugin will **not** be merged
in. It is best to set the complete configuration using the `BVConfigPlugin` helper plugin as shown
in **Example 3** and **Example 4** above. The `BVConfigPlugin` plugin should be used in the main
entry point of your app, and **before** any `Vue.use()` of component plugins or `Vue.component()` or
individual components.

### Setting the config via Nuxt.js module

Refer to the [Getting Started](/docs/#nuxtjs-module) documentation for information on passing the
config object to the BootstrapVue Nuxt.js module.

## Disabling console warnings

BootstrapVue will warn (via `console.warn()`) when you try and use a deprecated prop, or pass an
invalid value to certain props. These warnings are provided to help you ensure that your application
is using the correct props and values.

BootstrapVue automatically disables warnings in production mode (`NODE_ENV=production`). If you want
to disable the warnings in other scenarios (not recommended), you can do so by setting the following
process environment variable:

<!-- eslint-disable no-unused-vars -->

```js
process.env.BOOTSTRAP_VUE_NO_WARN = true
```

By ignoring warnings, you may find that your project fails/breaks when using future releases of
BootstrapVue where deprecated props have been removed.

**Warnings should be corrected before moving your project into production!**
