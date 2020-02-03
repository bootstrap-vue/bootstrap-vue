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

The selected date button (background color) defaults to the 'primary' theme variant. You can change
this to any of the Bootstrap v4 theme variant colors: 'secondary', 'success', 'danger', 'warning',
'info', etc.

Today's date will also be highligted (text color) using the same variant as the selected date by
default. To speficy a differet theme color to use for today's date, use the `today-variant` prop.

To disable highligting of today's date altogether, set the `no-hightlight-today` prop.

### Disabled and readonly

Setting the `disabled` prop will remove all interactivity of the `<b-calendar>` component, and will
hide the date navigation buttons.

Setting the `redonly` prop will disable selecting a date, but will keep the component interactive,
allowing for date navigation.

### Width

TBD

### Hiding the top selected date header

By default, the current selected date will be displayed at the top of the calendar component,
formatted in the locale's language.

You can hide this header via the `hide-header` prop.  Note this only visually hides the selected
date, while keeping it available to screen reader users as an aria live region.

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

Restrict the calendar range via the `min` and `max` props.  The props accept a date string in the
format of `YYYY-MM-DD` or a date object.

### Disabled dates

IF you need to disabled specific dates within the calendar, specify a function reference to the
`allowed-dates` prop.  The function is passed two arguments:

- `ymd` The date as a `YYYY-MM-DD` string
- `date` The date as a date object

the function should eitehr return `true` if the date is selectable (enabled), or `false` if the date
cannot be selected (disabled). Note that the function **cannot** be asynchronous, and should return a
value as quickly as possible.

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

Internationalization of hte calendar is provided via
[`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat),
except for labels applied to elements of the calendar control (aria-labels, selected status, and
help text). You must provide your own translations for these labels. The available locales will be
browser dependant (not all browsers support all locales)

By default `<b-calendar>` will use the browser's default locale, but you can specify the locale (or
locales) to use via the `locale` prop. The prop accepts either a single locale string, or an array of
locale strings (listed in order of prefered locale).

The emitted `context` event will include which locale the calendar has resolved to (which may not be
the same locale as requested, depending on the supported locales of `Intl`).

```html
<template>
  <b-row>
    <b-col cols="12" class="mb-3">
      <b-form-select v-model="locale" :options="locales"></b-form-select>
    </b-col>
    <b-col md="auto">
      <b-calendar
        v-model="value"
        v-bind="labels[locale] || {}"
        :locale="locale"
        @context="onContext"
      ></b-calendar>
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
        context: null,
        locale: 'en-US',
        locales: [
          { value: 'en-US', text: 'English US (en-US)' },
          { value: 'de', text: 'German (de)' },
          { value: 'ar-EG', text: 'Arabic Egyptian (ar-EG)' },
          { value: 'zh', text: 'Chinese (zh)' }
        ],
        labels: {
          de: {
            labelPrevYear: 'vorjahr',
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
    },
    methods: {
      onContext(ctx) {
        this.context = ctx
      }
    }
  }
</script>

<!-- b-calendar-i18n.vue -->
```

## Accessibility

TBD

## See also

- `<b-form-date>` date picker custom form input
- `<b-form-time>` time picker custom form input
