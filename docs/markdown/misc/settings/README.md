# Settings

## Configuring BootstrapVue defaults

BootstrapVue is pre-configured for the default Bootstrap V4.x configuration. It assumes the breakpoints
are the standard breakpoint names of `xs`, `sm`, `md`, `lg`, and `xl`.

Also various BootstrapVue components have props with default variants and text content.

### Default BootstrapVue configuration

Default breakpoint names are stored in the `breakpoints` property, while component defaults are keyed
by their <samp>PascaleCase</samp> name with the props as <samp>camelCase</samp> properties. Only
properties defined in the default configuration can be overridden.

<pre class="hljs json text-monospace p-2">
{{ defaultConfig }}
</pre>

### Supplying new configuration values

When you `Vue.use(BootstrapVue)`, you can optionally pass a configuration object which specifies
new values to replace teh default values.  For example if you wish to define new breakpoint names
(which will generate appropriate properties on components such as `<b-col>` and `<b-form-group>`):

```js
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue, {
  breakpoints: [`xs`, 'sm', 'md', 'lg', 'xl', 'xxl']
})
```

Or if changin the default variants for `<b-button>` and `<b-alert>`:

```js
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue, {
  BAlert: { variant: 'danger' },
  BButton: { variant: 'primary' }
})
```

The values provided as the config option to `Vue.use` will be merged with the default values.

### Supplying config for individual component plugin imports

WHen importing individual component plugins, you can specify a config as well (using the same
config structure as above.  YOu only need to provide configuration to the first component you
import, but each successive config will be merged with the previous config provided.

Note breakpoint names should be defined before using any compoponents as they are required
to generate component breakpoint specific props. Once the component that has breakpoint specific
props is used, andy subsequent changes to the breakpoints will not be reflected.

```js
import Layout from 'bootstrap-vue/es/components/layout'
import Alert from 'bootstrap-vue/es/components/alert'
import Button from 'bootstrap-vue/es/components/button'

Vue.use(Layout, { breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'] })
Vue.use(Alert, { BAlert: { variant: 'danger' } })
Vue.use(Button, { BButton: { variant: 'primary' } })

// OR
Vue.use(Layout, {
  breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'],
  { BAlert: { variant: 'danger' } },
  { BButton: { variant: 'primary' } }
})
Vue.use(Alert)
Vue.use(Button)
```

## Disabling BootstrapVue console warnings

BootstrapVue will warn (via `console.warn`) when you try and use a depreated prop, or pass
an invalid value to certain props. These warnings are provided to help you ensure that your
application is using the correct props and values.

In some cases, you may want to disable these warnings (not recommended). You can do so by
setting the following process envinronment variable:

<!-- eslint-disable no-unused-vars -->

```js
process.env.BOOTSTRAP_VUE_NO_WARN = true
```

By ignoring warnings, you may find that your project fails/breaks when using future releases
of bootstrapVue where deprecated props have been removed.

Warnings should be corrected before moving your project into production!
