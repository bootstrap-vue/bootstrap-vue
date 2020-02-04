# Form Date

> `<b-form-date>` is a BootstrapVue custom date picker input form control, which provides full
> WAI-ARIA compliance and also supports internationalization.

`<b-form-date>` is a form control wrapper component for the
[`<b-calendar>`](/docs/components/calendar) component, and provides additional validation state
presentation.

The `<b-form-date>` component was introduced in BootstrapVue `v2.5.0`

```html
<template>
  <div>
    <label for="example-datepicker">Choose a date</label>
    <b-form-date id="example-datepicker" v-model="value" class="mb-2"></b-form-date>
    <p>Value: '{{ value }}'</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>

<!-- b-form-date.vue -->
```

`<b-form-date>` supports many of the props available on [`<b-calendar>`](/docs/components/calendar)
as well as some of the props available on [`<b-dropdown>`](/docs/components/dropdown).

## `v-model` return value

By default, `<b-form-date>` returns dates as a string in the format of `YYYY-MM-DD`. You can have
`<b-form-date>` return the `v-model` value as a `Date` object (with no time portion) by setting the
prop `value-as-date`.

If no date is selected, `<b-form-date>` returns an empty string `''`, or returns `null` if the
`value-as-date` prop is set.

Note that when `value-as-date` prop is set, the returned `Date` object will be in the browser's
default timezone.

If `<b-form-date>` has a value set for the `name` prop, a hidden input will be created which will
have its name attribute set to the value of the `name` prop, and the value attribute will be set to
the selected date as a `YYYY-MM-DD` string. This will allow the `<b-form-date>` selected value to
be submitted via native browser form submission.

## Disabled and readonly states

Setting the `disabled` prop will remove all interactivity of the `<b-form-date>` component.

Setting the `readonly` prop will disable selecting a date, but will keep the component interactive,
allowing for date navigation. The `v-model` will not be updated in the readonly state.

For disabling specific dates or setting minimum and maximum date limits, refer to the
[Date constraints](#date-constraints) section.

## Date constraints

### Minimum and maximum dates

Restrict the calendar range via the `min` and `max` props. The props accept a date string in the
format of `YYYY-MM-DD` or a `Date` object.

```html
<template>
  <div>
    <b-form-date v-model="value" :min="min" :max="max" locale="en"></b-form-date>
  </div>
</template>

<script>
  export default {
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth() - 2)
      minDate.setDate(15)
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 2)
      maxDate.setDate(15)

      return {
        value: '',
        min: minDate,
        max: maxDate
      }
    }
  }
</script>

<!-- b-form-date-min-max.vue -->
```

### Disabling dates

If you need to disabled specific dates within the date picker, specify a function reference to the
`date-disabled-fn` prop. The function is passed two arguments:

- `ymd` The date as a `YYYY-MM-DD` string
- `date` The date as a `Date` object

The function should either return `true` if the date _cannot_ be selected (disabled), or `false` if
the date _can_ be selected (enabled). Note that the function **cannot** be asynchronous, and should
return a value as quickly as possible.

```html
<template>
  <div>
    <b-form-date v-model="value" :date-disabled-fn="dateDisabled" locale="en"></b-form-date>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    },
    methods: {
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        // return `true` if the date should be disabled
        return weekday === 0 || weekday === 6 || day === 13
      }
    }
  }
</script>

<!-- b-form-date-disabled-dates.vue -->
```

Note the `min` and `max` date constraints are evaluated first, before `date-disabled-fn`.

## Validation states

TBD

## Styling

TBD

## Events

TBD

## Internationalization

TBD

Refer to the [`<b-calendar>`](/docs/components/calendar#internationalization) documentation for
additional details.

## Accessibility

TBD

Refer to the [`<b-calendar>`](/docs/components/calendar#accessibility) documentation for additional
details.

## Implementation notes

`<b-form-date>` is based upon `<b-calendar>` and `<b-dropdown>`.

## See also

- `<b-calendar>` Calendar date selection widget
- `<b-dropdown>` Dropdown component
