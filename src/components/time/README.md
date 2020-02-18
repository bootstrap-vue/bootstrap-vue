# Time

> BootstrapVue's custom `<b-time>` component generates a WAI-ARIA compliant time selection widget,
> which can be used to control other components, or can be used to create customized time picker
> inputs.

`<b-time>` is WAI-ARIA accessibility compliant, optimized for keyboard control (arrow, page up/down,
home, and end keys). Internationalization is also supported, and default's to the browser's or page's
locale, if no locale(s) are specified.

If you need a time picker as a custom form control input, use the
[`<b-form-timepicker>`](/docs/components/form-timepicker) component instead.

The component `<b-time>` was introduced in BootstrapVue `v2.6.0`.

```html
<template>
  <b-row>
    <b-col md="auto">
      <b-time v-model="value" locale="en" @context="onContext"></b-time>
    </b-col>
    <b-col>
      <p>Value: <b>'{{ value }}'</b></p>
      <p class="mb-0">Context:</p>
      <pre class="small">{{ context }}</pre>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
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

<!-- b-time.vue -->
```

## `v-model` return value

`<b-time>` always returns a string in hte format of `HH:mm:ss` which is the same format returned by
native browser `<input type="time">` controls.

If no time is selected, then `<b- time>` returns an empty string (`''`).

## Disabled and readonly states

TBD

## Styling

## Enabling of seconds input

TBD

## Forcing 12 or 24 hour interface

TBD

### Hiding the top selected date header

TBD

### Border and padding

Fancy a time control with a border with padding? Use Bootstrap's border and padding utility classes
to add borders and padding:

TBD

### Default slot

TBD

## Events

### `input` event

TBD

### `context` event

TBD

## Internationalization

TBD

## Accessibility

TBD

## Implementation notes

The `<b-time>` component is based upon the custom BootstrapVue component `<b-form-spinbutton>`.

TBD

## See also

- [`<b-form-timepicker>` Time picker custom input](/docs/comonents/form-timepicker)
- [`<b-calendar>` Calendar date selection widget](/docs/components/calendar)
- [`<b-form-datepicker>` Date picker custom form input](/docs/components/form-datepicker)

