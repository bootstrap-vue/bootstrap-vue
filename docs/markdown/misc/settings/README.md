# Settings

<span class="badge badge-info small">NEW in 2.0.0-rc.16</span>

> BootstrapVue provides a few options for customizing component default values, and more.

## Configuring defaults

BootstrapVue is pre-configured for the default Bootstrap V4.x configuration. It assumes the
breakpoints are the standard breakpoint names of `xs`, `sm`, `md`, `lg`, and `xl`. Also various
BootstrapVue components have props with default variants and text content.

BootstrapVue provides several methods for changing the default configuration.

Note that it is not possible to change the defaults when using BootstrapVue via a `<script>` tag.

### Default configuration

Default breakpoint names are stored in the `breakpoints` property, while component defaults are
keyed by their <samp>PascalCase</samp> name with the props as <samp>camelCase</samp> properties.
Only properties defined in the default configuration can be overridden. Attempting to set a config
property that is not defined in the default will generate a console warning.

```json
{{ defaultConfig }}
```

### Setting new configuration values

When you `Vue.use(BootstrapVue)`, you can optionally pass a configuration object which specifies new
values to replace the default values. For example if you wish to define new breakpoint names (which
will generate appropriate properties on components such as `<b-col>` and `<b-form-group>`), so that
the new breakpoints are `['aa', 'bb', 'cc', 'dd']` then `<b-col>` will now have `bb`, `cc`, and `dd`
props instead of `sm`, `md`, `lg` and `xl` props (Similar for the `label-cols-{breakpoint}` and
`label-align-{breakpoint}`props on `<b-form-group>`):

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
in your custom Bootstrap SCSS.

### Setting config via individual component plugin imports

When importing individual component plugins, you can specify a config as well (using the same config
structure as above. You only need to provide configuration to the first component you import, but
each successive config will be merged with the previous config provided.

Note breakpoint names should be defined before using any components as they are required to generate
component breakpoint specific props. Once the component that has breakpoint specific props is used,
and subsequent changes to the breakpoints will **not** be reflected.

**Example 1 (least preferred method):**

<!-- eslint-disable import/first, import/no-duplicates -->

```js
import Layout from 'bootstrap-vue/es/components/layout'
import Alert from 'bootstrap-vue/es/components/alert'
import Button from 'bootstrap-vue/es/components/button'

// Supply configs via each plugin as it is `Vue.use()`'d
Vue.use(Layout, { breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'] })
Vue.use(Alert, { BAlert: { variant: 'danger' } })
Vue.use(Button, { BButton: { variant: 'primary' } })
```

**Example 2:**

<!-- eslint-disable import/first, import/no-duplicates -->

```js
import Layout from 'bootstrap-vue/es/components/layout'
import Alert from 'bootstrap-vue/es/components/alert'
import Button from 'bootstrap-vue/es/components/button'

// Supply complete config to first `Vue.use()`'d plugin
Vue.use(Layout, {
  breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'],
  BAlert: { variant: 'danger' },
  BButton: { variant: 'primary' }
})
Vue.use(Alert)
Vue.use(Button)
```

**Example 3 (most preferred method):**

<!-- eslint-disable import/first, import/no-duplicates -->

```js
// BootstrapVue configuration helper plugin
import BVConfig from 'bootstrap-vue/es/bv-config'
// Component plugins
import Layout from 'bootstrap-vue/es/components/layout'
import Alert from 'bootstrap-vue/es/components/alert'
import Button from 'bootstrap-vue/es/components/button'

// Supply complete config to the BVConfig helper plugin
Vue.use(BVConfig, {
  breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'],
  BAlert: { variant: 'danger' },
  BButton: { variant: 'primary' }
})

// Then use component plugins
Vue.use(Layout)
Vue.use(Alert)
Vue.use(Button)
```

**Caveat:** Vue only installs plugins _once_. If you import a plugin that has already been imported
by another component plugin, the configuration passed to the component plugin will **not** be merged
in. It is best to set the complete configuration using the `BVConfig` helper plugin as shown in
**Example 3** above. The `BVConfig` plugin should be used in the main entry point of your app, and
before any `Vue.use()` of component plugins.

### Setting the config via Nuxt.js BootstrapVue plugin

Refer to the [Getting Started](/docs/#nuxtjs-plugin-module) documentation for information on passing
the config object to the Nuxt.js plugin module.

## Disabling BootstrapVue console warnings

BootstrapVue will warn (via `console.warn`) when you try and use a deprecated prop, or pass an
invalid value to certain props. These warnings are provided to help you ensure that your application
is using the correct props and values.

In some cases, you may want to disable these warnings (not recommended). You can do so by setting
the following process environment variable:

<!-- eslint-disable no-unused-vars -->

```js
process.env.BOOTSTRAP_VUE_NO_WARN = true
```

By ignoring warnings, you may find that your project fails/breaks when using future releases of
bootstrapVue where deprecated props have been removed.

**Warnings should be corrected before moving your project into production!**
