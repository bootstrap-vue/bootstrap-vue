# Third party libraries

> There are several 3rd party modules that you can use to add additional functionality and features
> to your BootstrapVue project.

Notes:

- The components and libraries listed here are not directly endorsed by BootstrapVue, and are listed
  here only for convenience, and is by no means a complete list.
- These libraries may have additional dependencies.

## Components

Note: Many of the 3rd party components listed are lacking accessibility features and may not be
fully WAI-ARIA compliant, nor accessible to keyboard-only and/or screen-reader users. These
libraries may also not be tailored for mobile devices.

### Icons

Alternatives to BootstrapVue's [`b-icon-*`](/docs/icons) components:

- [Vue Font Awesome](https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs)
- [Vue Icon](https://github.com/qinshenxue/vue-icon)
- [Vue Ionicons](https://mazipan.github.io/vue-ionicons/)
- [Vue Unicons](https://antonreshetov.github.io/vue-unicons/)

### Date and Time Pickers

Alternatives to BootstrapVue's [`<b-form-datepicker>`](/docs/components/form-datepicker),
[`<b-calendar>`](/docs/components/calendar),
[`<b-form-timepicker>`](/docs/components/form-timepicker), and [`<b-time>`](/docs/components/time)
components:

- [Vue AirBnB Style Datepicker](https://mikaeledebro.gitbooks.io/vue-airbnb-style-datepicker/)
- [Vue Datepicker](https://livelybone.github.io/vue/vue-datepicker/) _Note: Not WAI-ARIA compliant_
- [Vue date pick](https://dbrekalo.github.io/vue-date-pick/) _Note: Not WAI-ARIA compliant_
- [Vue2 date range picker](https://innologica.github.io/vue2-daterange-picker/) _Note: Not WAI-ARIA
  compliant_

### Color pickers

Alternatives to using [`<b-form-input type="color">`](/docs/components/form-input#input-type) (which
is not natively supported by all browsers, nor supports alpha channels)

- [vue-colorpicker](https://github.com/caohenghu/vue-colorpicker) _Note: Not WAI-ARIA compliant_
- [v-color](https://github.com/v-comp/v-color) _Note: Not WAI-ARIA compliant_
- [Verte](https://baianat.github.io/verte/) _Note: Not WAI-ARIA compliant_

### Type Ahead

- [Vue Bootstrap TypeAhead](https://github.com/alexurquhart/vue-bootstrap-typeahead) _Note: This
  component is keyboard accessible, but is not fully WAI-ARIA compliant_ (specifically for screen
  reader users)

### Commenting and discussion

- [Vue Disqus](https://github.com/ktquez/vue-disqus)

### Charting

- [Vue Chart.js](https://vue-chartjs.org/)
- [Vue Highcharts](https://github.com/weizhenye/vue-highcharts)
- [Vue Graph](https://github.com/juijs/vue-graph)

## Form validation

- [VeeValidate](https://logaretm.github.io/vee-validate/)
- [Vuelidate](https://github.com/vuelidate/vuelidate/)

For examples of using these validation libraries, refer to our
[Validation reference section](/docs/reference/validation).

## Site generation

- [NuxtJS](https://nuxtjs.org) - Static + SPA + PWA + SSR
- [Gridsome](https://gridsome.org) - Static + SPA + PWA
