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

`<b-time>` always returns a string in the format of `HH:mm:ss` which is the same format returned by
native browser `<input type="time">` controls.

If no time is selected, then `<b- time>` returns an empty string (`''`).

## Disabled and readonly states

TBD

## Styling

### Enabling of seconds input

By default, the seconds spinbutton is not shown. To enable the section of seconds, set the `show-seconds`
prop to `true` to enable the secondsselection spin button. When `show-seconds` is `false` (or not
provided), the returned value will always have the secondsportion fo the time string set to `00`.

TBD

### Forcing 12 or 24 hour interface

12 hour version 24 hour input is determined by the client browsers default locale. To force a 12-hour
user interface, set the prop `hour12` to `true`. To force a 24-hour user inteface, set the prop
`hour12` to `false`. The default form prop `hour12` is `null` which uses the browser locale (or the
`locale` prop) to determine which interface to use.

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

`<b-time>` provides many accessibility features, such as `aria-live` regions, roles, aria labeling,
shortcut keys and full keyboard navigation to work with most screen readers.

Keyboard navigation:

- <kbd>ArrowUp</kbd> Increments the currently selected spinbutton value
- <kbd>ArrowDown</kbd> Deccrements the currently selected spinbutton value
- <kbd>Home</kbd> Sets the selected spinbutton to the minimum value
- <kbd>End</kbd> Sets the selected spinbutton to the maximum value
- <kbd>PageUp</kbd> Increases the selected spinbutton value by the spinbutton's step amount times the
  `repeat-step-multiplier` amount
- <kbd>PageDown</kbd> Decreases the selected spinbutton value by the spinbutton's step amount times
  the `repeat-step-multiplier` amount
- <kbd>ArrowRight</kbd> Moves focus to the next spin button in the component
- <kbd>ArrowLeft</kbd> Moves focus to the previous spin button in the component

Several of the `label-*` props are not visible on screen, but are used to label various
elements within the calendar for screen reader users. e.g. the `label-selected` prop is added
to the elemnt that disaplays the seleted value.

When internationalizing the datepicker, it is important to also update the `label-*` props with
appropriate translated strings, so that international screen reader users will hear the correct
prompts and descriptions.

## Implementation notes

The `<b-time>` component is based upon the custom BootstrapVue component `<b-form-spinbutton>`.

TBD

## See also

- [`<b-form-timepicker>` Time picker custom input](/docs/comonents/form-timepicker)
- [`<b-calendar>` Calendar date selection widget](/docs/components/calendar)
- [`<b-form-datepicker>` Date picker custom form input](/docs/components/form-datepicker)

