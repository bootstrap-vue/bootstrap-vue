# Miscelaneous settings

## Disabling BootstrapVue console warnings

BootstrapVue will warn (via `console.warn`) when you try and use a depreated prop, or pass
an invalid value to certain props.  THese warnings are provided to help you ensure your
application is using the correct props and values.

Warnings should be corrected before moving your project into production.

In some cases, you may want to disable these warnings (not recommended). You can do so by
setting the following process envinroment variable:

<!-- eslint-disable no-unused-vars -->

```js
process.env.BOOTSTRAP_VUE_NO_WARN = true
```

