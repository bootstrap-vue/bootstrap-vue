# Miscellaneous Settings

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
