# Calendar

> BootstrapVue's custom `<b-calendar>` component generates a WAI-ARIA compliant calendar style date
> selection widget, which can be used to control other components, or can be used to create customized
> date picker inputs.

`<b-calendar>` is WAI-ARIA accessibility compliant, optimized for keyboard control (arrow, page
up/down, home, and end keys). Internationalization is also supported, and default's to the browser's or
page's locale, if no locale(s) are specified.

If you need a date picker as a custom form control input, use the `<b-form-date>` component instead.

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

Setting the `disabled` prop will remove all interactivity of the `<b-calendar>` component.

Setting the `redonly` prop will disable selecting a date, but will keep the component interactive,
allowing for date navigation.

### Width

The `<b-calendar>` renders as an inline-block element with a default width of `270px` (excluding
any padding or border that may be added to it). This width is optimized to fit the width of smaller
mobile devices.

To change the width, set the `width` prop to any valid CSS width (including units).

Optionally, make the calendar full width by setting the prop `block`, which will make it expand to
fit the width of the parent element. The `width` prop has no effect when `block` is set.

```html
<template>
  <b-calendar block local="en-US"></b-calendar>
</template>

<!-- b-calendar-block.vue -->
```

### Hiding the top selected date header

By default, the current selected date will be displayed at the top of the calendar component,
formatted in the locale's language.

You can hide this header via the `hide-header` prop.  Note this only visually hides the selected
date, while keeping it available to screen reader users as an aria live region.

### Default slot

Provide optional content at the bottom of the calendar interface vis the use of default slot.
the slot can be used to add buttons such as `Select Today` or `Reset`, etc.

```html
<template>
  <b-calendar v-model="value" value-as-date locale="en">
    <div class="d-flex justify-content-between">
      <b-button size="sm" variant="outline-danger" @click="reset">Clear date</b-button>
      <b-button size="sm" variant="outline-primary" @click="setToday">Set Today</b-button>
    </div>
  </b-calendar>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    },
    methods: {
      setToday() {
        const now = new Date()
        this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      },
      reset() {
        this.value = null
      }
    }
  }
</script>

<!-- b-calendar-default-slot.vue -->
```

### Border and padding

Fancy a calendar with a border with padding? Use Bootstrap's
[border and padding untility classes](/docs/reference/utility-classes) to add borders and padding:

```html
<template>
  <b-calendar class="border rounded p-2" locale="en"></b-calendar>
</template>

<!-- b-calendar-border-padding.vue -->
```

## `v-model`

By default, `<b-calendar>`returns dates as a string in the format of `YYYY-MM-DD`. You can have
`<b-calendar>` return the `v-model` value as a date object (with no time portion) by setting the prop
`value-as-date`.

If no date is selected, `<b-calendar>` returns an empty string `''`, or returns `null` if the
`value-as-date` prop is set.

Note that when `value-as-date` prop is set, the returned Date objects will be in the browser's
default timezone.

## Constraints

### Minimum and maximum dates

Restrict the calendar range via the `min` and `max` props.  The props accept a date string in the
format of `YYYY-MM-DD` or a date object.

### Disabled dates

IF you need to disabled specific dates within the calendar, specify a function reference to the
`allowed-dates` prop.  The function is passed two arguments:

- `ymd` The date as a `YYYY-MM-DD` string
- `date` The date as a date object

the function should either return `true` if the date is selectable (enabled), or `false` if the date
cannot be selected (disabled). Note that the function **cannot** be asynchronous, and should return a
value as quickly as possible.

## Events

### `input` event

The `'input'` event is emitted when updating the `v-model`. The event has a single argument which is
the selected date. By default the value is a string in the format of `YYYY-MM-DD` (or an empty string
if no date is selected). If the prop `value-as-date` is set, then the first argument will instead be a
`Date` object (or `null` if no date selected).

If the `disabled` or `readonly` props are set, the `'input'` event will **not** be emitted.

### `context` event

The `'context'` event is emited whenever a user selects a date, or the user navigates the calendar
(either via cursor keys, page up/down keys, home or end keys, or uses the calendar navigation
buttons). It will also be emitted when the component is created (just before insertion into the DOM),
or when the resolved locale is changed.

When the `readonly` prop is set, the event will still be emitted when the user navigates the calendar.
It will not be emitted when the `disabled` prop is set (except for the initial emit when the calendar
is created).

The `'context'` event is passed a context object as it's only argument, with the following properties:

| Property            | description                                                                                                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectedYMD`       | The selected date value (`YYYY-MM-DD` format) or an empty string if no date selected                                                                                                                                                                       |
| `selectedDate`      | The selected date value as a `Date` object or `null` if no date selected                                                                                                                                                                                   |
| `selectedFormatted` | The selected date formatted in the current locale                                                                                                                                                                                                          |
| `activeYMD`         | The current date of the calendar day button that can receive focus as a string (`YYYY-MM-DD` format)                                                                                                                                                       |
| `activeDate`        | The current date of the calendar day button that can receive focus as a `Date` object                                                                                                                                                                      |
| `activeFormated`    | The active date formatted in the current locale                                                                                                                                                                                                            |
| `locale`            | The resolved locale (may not be the same as the requested locale)                                                                                                                                                                                          |
| `calendarLocale`    | The resolved locale used by the calendar, optionally including the calendar type (i.e. 'gregory'). Usually this will be the same as `locale`, but may include the calendar type used, such as `fa-u-ca-gregory` when selecting the Persian locale (`'fa'`) |
| `isRTL`             | Will be `true` if the calendar is in a RTL (Right-To-Left) orientation. It will be `false` if LTR (Left-To-Right).                                                                                                                                         |

If formatting dates manually via `Intl.DateTimeFormat`, use the `calendarLocale` property value
instead of the `locale` property value to ensure you are using the same calendaring convention that
`<b-calendar>` uses. This is especially true for the IE11 browser which does not fully implement
all features of `Intl.DateTimeFormat`.

## Internationalization

Internationalization of hte calendar is provided via
[`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat),
except for labels applied to elements of the calendar control (aria-labels, selected status, and
help text). You must provide your own translations for these labels. The available locales will be
browser dependant (not all browsers support all locales)

By default `<b-calendar>` will use the browser's default locale, but you can specify the locale (or
locales) to use via the `locale` prop. The prop accepts either a single locale string, or an array of
locale strings (listed in order of prefered locale).

The calendar starts the week on Sunday. This can be changed by setting the `start-weekday` prop to a
number in the range of `0` to `6` where `0` represents Sunday, `1` for Monday, up to `6` for Saturday.

The emitted `context` event will include which locale the calendar has resolved to (which may not be
the same locale as requested, depending on the supported locales of `Intl`).

```html
<template>
  <b-row>
    <b-col cols="12" class="mb-3">
      <label for="example-locales">Locale:</label>
      <b-form-select id="example-locales" v-model="locale" :options="locales"></b-form-select>
      <label for="example-weekdays">Start weekday:</label>
      <b-form-select id="example-weekdays" v-model="weekday" :options="weekdays"></b-form-select>
    </b-col>
    <b-col md="auto">
      <b-calendar
        v-model="value"
        v-bind="labels[locale] || {}"
        :locale="locale"
        :start-weekday="weekday"
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

Currently `<b-calendar>` only supports the Gergorian (`'gregory'`) calendar.

By default, `<b-calendar>` automatically detects RTL vs LTR via the resolved locale. You can
force the calendar to render right-to-left by setting the `direction` prop to the string `rtl`, or
set the `direction` prop to `'ltr'` to always render left-to-right.

For server side rendering (SSR) when using Node.js, ensure that the Node.js runtime you are using
supports `Intl` and the locales you will be using. Refer to the
[Node `Intl` support documentation](https://nodejs.org/api/intl.html) for details.

## Accessibility

`<b-calendar>` provides many accessibility features, such as `aria-live` regions, labeling, and
full keyboard navigation.

Keyboard navigation:

- <kbd>ArrowLeft</kbd> moves to the previous day (or next day in RTL mode)
- <kbd>ArrowRight</kbd> moves to the next day (or previous day in RTL mode)
- <kbd>ArrowUp</kbd> moves to the same day in the previous week
- <kbd>ArrowDown</kbd> moves to the same day in the next week
- <kbd>PageUp</kbd> moves to the same day in the previous month
- <kbd>PageDwn</kbd> moves to the same day in the next month
- <kbd>Alt</kbd>+<kbd>PageUp</kbd> moves to the same day and month in the previous year
- <kbd>Alt</kbd>+<kbd>PageDown</kbd> moves to the same day and month in the next year
- <kbd>Home</kbd> moves to the current selected date, or today if no selected date
- <kbd>End</kbd> moves to today
- <kbd>Enter</kbd> or <kbd>Space</kbd> Selectes the currently highligted (focused) day

When internationalizing the datepicker, it is important to also update the `label-*` props with
apropriate translated strings, so that international screen reader users will hear the correct
prompts.

The features and styling of `<b-calendar>` are intentianally kept minimalistic in order to provide
the best possible accessibility to _all_ users.

## See also

- `<b-form-date>` date picker custom form input

