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

`<b-form-date>` supports invalid and valid styling via the boolean `state` prop.  Setting `state`
to boolean `false` will style the input as invalid, while setting it to boolean `true` will style
it as valid. Setting `state` to `null` will not show any validation state styling (the default).

```html
<template>
  <div>
    <label for="datepicker-invalid">Choose a date (invalid style)</label>
    <b-form-date id="datepicker-invalid" :state="false" class="mb-2"></b-form-date>
    <label for="datepicker-valid">Choose a date (valid style)</label>
    <b-form-date id="datepicker-valid" :state="true"></b-form-date>
  </div>
</template>

<!-- b-form-date-invalid-valid.vue -->
```

Note that native browser validation is _not_ available with `<b-form-date>`.

## Styling

### Variants

The selected date button (background color) defaults to the 'primary' theme variant. You can change
this to any of the Bootstrap v4 theme variant colors: `'secondary'`, `'success'`, `'danger'`,
`'warning'`, `'info'`, etc, via the `selected-variant` prop.

Today's date will also be highlighted (text color) using the same variant as the selected date by
default. To specify a different theme color to use for today's date, use the `today-variant` prop.

To disable highlighting of today's date altogether, set the `no-highlight-today` prop.

### Control sizing

TBD

### Placeholder

TBD

### Optional controls

TBD

Optional "Today", "Close", and "Reset" buttons.

By default, when a day is slected, the popup will automatically close. You can disable this
behaviour by setting the the `no-close-on-select` prop.

### Dropdown placement

TBD

### Dark mode

TBD

## Internationalization

Internationalization of the date picker's calendar is provided via
[`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat),
except for labels applied to elements of the calendar control (aria-labels, selected status, and
help text). You must provide your own translations for these labels. The available locales will be
browser dependant (not all browsers support all locales)

By default `<b-form-date>` will use the browser's default locale, but you can specify the locale (or
locales) to use via the `locale` prop. The prop accepts either a single locale string, or an array
of locale strings (listed in order of preferred locale).

The calendar starts the week on Sunday. This can be changed by setting the `start-weekday` prop to a
number in the range of `0` to `6` where `0` represents Sunday, `1` for Monday, up to `6` for
Saturday.

```html
<template>
  <div>
    <label for="example-locales">Locale:</label>
    <b-form-select id="example-locales" v-model="locale" :options="locales" class="mb-2"></b-form-select>

    <label for="example-weekdays">Start weekday:</label>
    <b-form-select id="example-weekdays" v-model="weekday" :options="weekdays" class="mb-2"></b-form-select>

    <label for="example-i18n-picker">Date picker:</label>
    <b-form-date
      id="example-i18n-picker"
      v-model="value"
      v-bind="labels[locale] || {}"
      :locale="locale"
      :start-weekday="weekday"
      class="mb-2"
     ></b-form-date>
     <p>Value: <b>'{{ value }}'</b></p>
   </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        locale: 'en-US',
        locales: [
          { value: 'en-US', text: 'English US (en-US)' },
          { value: 'de', text: 'German (de)' },
          { value: 'ar-EG', text: 'Arabic Egyptian (ar-EG)' },
          { value: 'zh', text: 'Chinese (zh)' }
        ],
        weekday: 0,
        weekdays: [
          { value: 0, text: 'Sunday' },
          { value: 1, text: 'Monday' },
          { value: 6, text: 'Saturday' }
        ],
        labels: {
          de: {
            labelPrevYear: 'vorheriges Jahr',
            labelPrevMonth: 'vorheriger Monat',
            labelCurrentMonth: 'aktueller Monat',
            labelNextMonth: 'nächster Monat',
            labelNextYear: 'nächstes Jahr',
            labelToday: 'heute',
            labelSelected: 'ausgewähltes Datum',
            labelNoDateSelected: 'Kein Datum gewählt',
            labelCalendar: 'Kalender',
            labelNav: 'Kalendernavigation',
            labelHelp: 'Mit den Cursortasten durch die Daten navigieren'
          },
          'ar-EG': {
            labelPrevYear: 'العام السابق',
            labelPrevMonth: 'الشهر السابق',
            labelCurrentMonth: 'الشهر الحالي',
            labelNextMonth: 'الشهر المقبل',
            labelNextYear: 'العام المقبل',
            labelToday: 'اليوم',
            labelSelected: 'التاريخ المحدد',
            labelNoDateSelected: 'لم يتم اختيار تاريخ',
            labelCalendar: 'التقويم',
            labelNav: 'الملاحة التقويم',
            labelHelp: 'استخدم مفاتيح المؤشر للتنقل في التواريخ'
          },
          zh: {
            labelPrevYear: '上一年',
            labelPrevMonth: '上个月',
            labelCurrentMonth: '当前月份',
            labelNextMonth: '下个月',
            labelNextYear: '明年',
            labelToday: '今天',
            labelSelected: '选定日期',
            labelNoDateSelected: '未选择日期',
            labelCalendar: '日历',
            labelNav: '日历导航',
            labelHelp: '使用光标键浏览日期'
          }
        }
      }
    }
  }
</script>

<!-- b-form-date-i18n.vue -->
```

Refer to the [`<b-calendar>`](/docs/components/calendar#internationalization) documentation for
additional details.

## Accessibility

The popup calendar suppprts the same keyboard control as
[`<b-calendar>`](/docs/components/calendar#accessibility), along with the following:

- <kbd>ESC</kbd> will close the popup calendar without selecting a date

When internationalizing the datepicker, it is important to also update the `label-*` props with
appropriate translated strings, so that international screen reader users will hear the correct
prompts and descriptions.

Refer to the [`<b-calendar>`](/docs/components/calendar#accessibility) documentation for additional
details.

## Implementation notes

`<b-form-date>` is based upon [`<b-calendar>`](/docs/components/calendar) and
[`<b-dropdown>`](/docs/components/dropdown).

`<b-form-date>` uses Bootstrap's margin, padding, border, and flex utility classes, along with
button (`btn-*`) classes, `input-group*` classes, and the `form-control` (plus validation) class.

Custom SCSS is also employed to handle disabled and readonly styling.

## See also

- `<b-calendar>` Calendar date selection widget
- `<b-dropdown>` Dropdown component
