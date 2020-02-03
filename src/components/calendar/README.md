# Calendar

> BootstrapVue's custom `<b-calendar>` component generates a WAI-ARIA compliant calendar style date
> selection widget, which can be used to control other components, or can be used to create customized
> date picker inputs.

`<b-calendar>` is WAI-ARIA accessibility compliant, optimized for keyboard control (arrow, page
up/down, home, and end keys). Internationalization is also supported, and default's to the browser's or
page's locale, if no locale(s) are specified.

Use `<b-form-date>` if you need a date picker as a custom form control input.

```html
<template>
  <b-row>
    <b-col md="auto">
      <b-calendar v-model="value" @context="onContext" locale="en-US"></b-calendar>
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
<!-- b-calendar.vue -->
```

## Styling

### Variants

TBD

### Disable higlighting of today

TBD

### Disabled and readonly

TBD

### Width

TBD

### Hiding the top selected date header

TBD

### Default scoped slot

Provide optional content at the bottom of the calendar inteface vis the use of hte optionally
scoped default slot.

TBD

## `v-model`

By default, `<b-calendar>`returns dates as a string in the format of `YYYY-MM-DD`. You can have
`<b-calendar>` return the `v-model` value as a date object (with no time portion) by setting the prop
`value-as-date`.

If no date is selected, `<b-calendar>` returns an empty string `''`, or returns `null` if the
`value-as-date` prop is set.

## Constraints

### Minimum and maximum dates

TBD

### Disabled dates

TBD

## Events

### `input`

The `'input'` event is emitted when updating the `v-model`. The event has a single argument which is
the selected date. By default the value is a string in the format of `YYYY-MM-DD` (or an empty string
if no date is selected). If the prop `value-as-date` is set, then the first argument will instead be a
`Date` object (or `null` if no date selected).

If the `disabled` or `readonly` props are set, the `'input'` event will **not** be emitted.

### `context`

The `'context'` event is emited whenever a user selects a date, or the user navigates the calendar
(either via the cursor keys, page up/down keys, home or end keys, or uses the calendar navigation
buttons). It will also be emitted when the component is created (before insertion into the DOM).

When the `readonly` prop is set, it will still be emitted when the user navigates the calendar.
It will not be emitted when the `disabled` prop is set (except for the initial emit when the calendar
is created).

The `'context'` event is passed a contet object as it's only argument, with the following properties:

- `selectedYMD` the selected date value (`YYYY-MM-DD` format) or an empty string is no date selected
- `selectedFormatted` the selected date formatted in the current locale
- `activeYMD` the current date of the calendar day button that can receive focus (`YYYY-MM-DD` format)
- `activeFormated` set active date formatted in hte current locale
- `locale` the resolved locale used by the calendar (may not be the same as the requested locale)
- `calendarLocale` the resolved locale used by the calendar, including the calendar type (i.e.
  'gregory'). Usually this will be the same as `locale`, but may include the calendar type used,
  such as `fa-u-ca-gregory` when selecting the Persian locale (`'fa').
- `isRTL` will be `true` if the calendar is in a RTL (Right-To-Left) orientation. It will be `false`
  if LTR (Left-To-Right).

## Internationalization

TBD

## Accessibility

TBD

## See also

- `<b-form-date>` date picker custom form input
- `<b-form-time>` time picker custom form input
