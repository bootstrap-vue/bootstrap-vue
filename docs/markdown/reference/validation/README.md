# Form Validation

> BootstrapVue does not include form validation by default; we leave that up to the many existing
> form validation plugins. Below are some examples of plugins and how they may be integrated.

## Vuelidate

[Vuelidate](https://github.com/vuelidate/vuelidate/) provides "Simple, lightweight model-based
validation for Vue.js". Installation instructions and other documentation can be found at their
[website](https://vuelidate.js.org/).

### Vuelidate example

This example shows how to add different validation and feedback to two form fields, as well as
dynamically disable the submit button based on the form validity.

This is a verbose example designed to show how BootstrapVue and Vuelidate interact; in larger
applications, you'd likely want to abstract some of the functionality, such as creating a standard
error message component.

<iframe
  src="https://codesandbox.io/embed/inspiring-haslett-lzq6p?fontsize=14&hidenavigation=1&module=%2FApp.vue&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="BootstrapVue Vuelidate example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## VeeValidate v2

[VeeValidate](http://vee-validate.logaretm.com/v2/) is a plugin for Vue.js that allows you to
validate input fields and display errors. It has full support for
[Vue I18n](https://kazupon.github.io/vue-i18n/) and provides fairly good out of the box error
messages.

**Important**

You **must** configure `vee-validate`'s `fields` property or it will conflict with the `:fields`
property of `<b-table>` (and possibly other components) when it injects itself.

```js
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
})
```

### VeeValidate v2 example

<iframe
  src="https://codesandbox.io/embed/vigilant-kirch-8lpns?fontsize=14&hidenavigation=1&module=%2FApp.vue"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="BoostrapVue VeeValidate v2 example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## VeeValidate v3

[VeeValidate](http://vee-validate.logaretm.com/) is a plugin for Vue.js that allows you to validate
input fields and display errors. It has full support for
[Vue I18n](https://kazupon.github.io/vue-i18n/) and provides fairly good out of the box error
messages.

### VeeValidate v3 example

<iframe
  src="https://codesandbox.io/embed/boostrapvue-veevalidate-v3-example-xm3et?fontsize=14&hidenavigation=1&module=%2FApp.vue&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="BoostrapVue VeeValidate v3 example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
