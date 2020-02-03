# Form Date

> `<b-form-date>` is a BootstrapVue custom date picker input form control, which provides full
> WAI-ARIA compliance and supports internationaliation (i18n).

`<b-form-date>` was introduced in BootstrapVue `v2.5.0`

`<b-form-date>` is a form control wrapper component for the [`<b-calendar>`](/docs/components/calendar)
component, and provides additional validation state presentation.

TBD

## Styling

TBD

## `v-model` return value

By default, `<b-form-date>` returns a date vale as a string in the format of `YYYY-MM-DD`. You can
have `<b-form-date>` return the `v-model` value as a `Date` object (with no time portion) by setting
the prop `value-as-date`.

If no date is selected, `<b-form-date>` returns an empty string `''`, or returns `null` if the
`value-as-date` prop is set.

Note that when `value-as-date` prop is set, the returned `Date` object will be in the browser's
default timezone.

## Date constraints

### Minimum and maximum dates

Restrict the calendar range via the `min` and `max` props.  The props accept a date string in the
format of `YYYY-MM-DD` or a date object.

### Disabled dates

If you need to disabled specific dates within the calendar, specify a function reference to the
`allowed-dates` prop.  The function is passed two arguments:

- `ymd` The date as a `YYYY-MM-DD` string
- `date` The date as a date object

The function should either return `true` if the date is selectable (enabled), or `false` if the date
cannot be selected (disabled). Note that the function **cannot** be asynchronous, and should return a
value as quickly as possible.

## Validation states

TBD

## Events

TBD

## Internationalization

TBD

Refer to the [`<b-calendar>`](/docs/components/calendar#internationalization) documentation for
additional details.

## Accesibility

TBD

Refer to the [`<b-calendar>`](/docs/components/calendar#accessibility) documentation for additional
details.

## Implementation notes

`<b-form-date>` is based upon `<b-calendar>` and `<b-dropdown>`.

## See also

- `<b-calendar>` Calendar date selection widget
- `<b-dropdown>` Dropdown component
