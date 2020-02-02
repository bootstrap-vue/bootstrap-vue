# Calendar

> BootstrapVue's custom `<b-calendar>` component generates a calendar style date selection widget
> which can be used to control other components, or can be used to create custom date picker inputs.

```html
<template>
  <b-row>
    <b-col md="6">
      <b-calendar v-model="value" @context="onContext"></b-calendar>
    </b-col>
    <b-col md="6">
      <p>Value: <b>{{ value }}</b></p>
      <pre>{{ context }}</pre>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    data() {
      return {
        value: null,
        context: null
      }
    },
    methods: {
      onContext(ctx) {
        this.context = ctx
      }
    }
  }
</script>
<!-- b-calendar.vue -->
```

## Styling

### Variants

TBD

### Disabled and readonly

TBD

### Width

TBD

## `v-model`

By default, `<b-calendar>`returns dates as a string in the format of `YYYY-MM-DD`. You can have
`<b-calendar>` return the `v-model` value as a date object (with no time portion) by setting the prop
`value-as-date`.

## Constraints

### Minimum and maximum dates

TBD

### Disabled dates

TBD

## Events

TBD

## Internationalization (i18n)

TBD

## See also

- `<b-form-date>` date picker custom form input
- `<b-form-time>` time picker custom form input
