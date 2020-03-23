# Calendar

> BootstrapVue's custom `<b-calendar>` component generates a WAI-ARIA compliant calendar style date
> selection widget, which can be used to control other components, or can be used to create
> customized date picker inputs.

`<b-calendar>` is WAI-ARIA accessibility compliant, optimized for keyboard control (arrow, page
up/down, home, and end keys). Internationalization is also supported, and default's to the browser's
or page's locale, if no locale(s) are specified.

If you need a date picker as a custom form control input, use the
[`<b-form-datepicker>`](/docs/components/form-datepicker) component instead.

`<b-calendar>` was introduced in BootstrapVue `v2.5.0`.

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

## `v-model` return value

By default, `<b-calendar>` returns dates as a string in the `YYYY-MM-DD` format, which is the same
format returned by native browser `<input type="date">` controls. You can have `<b-calendar>` return
a `Date` object (with no time portion) as the `v-model` value instead by setting the `value-as-date`
prop.

If no date is selected, `<b-calendar>` returns an empty string `''`, or returns `null` if the
`value-as-date` prop is set.

Note that when `value-as-date` prop is set, the returned `Date` object will be in the browser's
default timezone.

## Disabled and readonly states

Setting the `disabled` prop will remove all interactivity of the `<b-calendar>` component.

Setting the `readonly` prop will disable selecting a date, but will keep the component interactive,
allowing for date navigation. The `v-model` will not be updated in the readonly state.

For disabling specific dates or setting minimum and maximum date limits, refer to the
[Date constraints](#date-constraints) section.

```html
<template>
  <div>
    <b-form-group label="Select calendar interactive state">
      <b-form-radio-group v-model="state" aria-controls="ex-disabled-readonly">
        <b-form-radio value="disabled">Disabled</b-form-radio>
        <b-form-radio value="readonly">Readonly</b-form-radio>
        <b-form-radio value="normal">Normal</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-calendar id="ex-disabled-readonly" :disabled="disabled" :readonly="readonly"></b-calendar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        state: 'disabled'
      }
    },
    computed: {
      disabled() {
        return this.state === 'disabled'
      },
      readonly() {
        return this.state === 'readonly'
      }
    }
  }
</script>

<!-- b-form-calendar-disabled-readonly.vue -->
```

## Date constraints

### Minimum and maximum dates

Restrict the calendar range via the `min` and `max` props. The props accept a date string in the
format of `YYYY-MM-DD` or a `Date` object.

```html
<template>
  <div>
    <b-calendar v-model="value" :min="min" :max="max" locale="en"></b-calendar>
  </div>
</template>

<script>
  export default {
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth() - 2)
      minDate.setDate(15)
      // 15th in two months
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

<!-- b-calendar-min-max.vue -->
```

### Disabling dates

If you need to disable specific dates within the calendar, specify a function reference to the
`date-disabled-fn` prop. The function is passed two arguments:

- `ymd` The date as a `YYYY-MM-DD` string
- `date` The date as a `Date` object

The function should either return `true` if the date _cannot_ be selected (disabled), or `false` if
the date _can_ be selected (enabled). Note that the function **cannot** be asynchronous, and should
return a value as quickly as possible.

```html
<template>
  <div>
    <b-calendar v-model="value" :date-disabled-fn="dateDisabled" locale="en"></b-calendar>
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
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6 || day === 13
      }
    }
  }
</script>

<!-- b-calendar-disabled-dates.vue -->
```

Note the `min` and `max` date constraints are evaluated first, before `date-disabled-fn`.

## Styling

### Variants

The selected date button (background color) defaults to the `'primary'` theme variant. You can
change this to any of the Bootstrap v4 theme variant colors: `'secondary'`, `'success'`, `'danger'`,
`'warning'`, `'info'`, etc, via the `selected-variant` prop.

Today's date will also be highlighted (text color) using the same variant as the selected date by
default. To specify a different theme color to use for today's date, use the `today-variant` prop.

To disable highlighting of today's date altogether, set the `no-highlight-today` prop.

```html
<template>
  <b-calendar selected-variant="success" today-variant="info"></b-calendar>
</template>

<!-- b-calendar-variants.vue -->
```

### Width

The `<b-calendar>` renders as an inline-block element with a default width of `270px` (excluding any
padding or border that may be added to it). This width is optimized to fit the width of smaller
mobile devices.

To change the width, set the `width` prop to any valid CSS width (including units).

Optionally, make the calendar full width by setting the prop `block`, which will make it expand to
fit the width of the parent element. The `width` prop has no effect when `block` is set.

```html
<template>
  <b-calendar block locale="en-US"></b-calendar>
</template>

<!-- b-calendar-block.vue -->
```

Note it is _not recommended_ to set a width below `260px`, otherwise truncation and layout issues
with the component may occur.

### Initial open calendar date

By default, when no date is selected, the calendar view will be set to the current month (or the
`min` or `max` date if today's date is out of range of `min` or `max`). You can change this
behaviour by specifying a date via the `initial-date` prop. The initial date prop will be used to
determine the calendar month to be initially presented to the user. It does not set the component's
value.

### Date string format

<span class="badge badge-info small">v2.6.0+</span>

To change format options of the displayed date text inside the component, e.g. in the header, set
the `date-format-options` prop to an object containing the requested format properties for the
`Intl.DateTimeFormat` object (see also [Internationalization](#internationalization)).

```html
<template>
  <div>
    <p>Custom date format:</p>
    <b-calendar
      :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
      locale="en"
    ></b-calendar>
    <p class="mt-3">Short date format:</p>
    <b-calendar
      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      locale="en"
    ></b-calendar>
  </div>
</template>

<!-- b-calendar-dateformat.vue -->
```

The following table summarizes the valid options for each format property:

| Property  | Possible values                                              |
| --------- | ------------------------------------------------------------ |
| `year`    | `'numeric'`, or `'2-digit'`                                  |
| `month`   | `'numeric'`, `'2-digit'`, `'long'`, `'short'`, or `'narrow'` |
| `day`     | `'numeric'`, or `'2-digit'`                                  |
| `weekday` | `'long'`, `'short'`, or `'narrow'`                           |

Notes:

- Leaving out certain options may affect the formatted text string, e.g. the `weekday`
- The formatted value will vary according to the resolved locale. Some locales may not support the
  `'narrow'` format and will fall back to `'short'` or `long'` (if `'short'` is not available)
- `year`, `month` and `day` will always be shown. If you need to leave out a value, set the property
  to `undefined`, although this is highly discouraged for accessibility reasons

### Hiding the top selected date header

By default, the current selected date will be displayed at the top of the calendar component,
formatted in the locale's language.

You can hide this header via the `hide-header` prop. Note this only _visually hides_ the selected
date, while keeping it available to screen reader users as an `aria-live` region.

### Border and padding

Fancy a calendar with a border with padding? Use Bootstrap's
[border and padding utility classes](/docs/reference/utility-classes) to add borders and padding:

```html
<template>
  <b-calendar class="border rounded p-2" locale="en"></b-calendar>
</template>

<!-- b-calendar-border-padding.vue -->
```

### Default slot

Provide optional content at the bottom of the calendar interface via the use of default slot. The
slot can be used to add buttons such as `Select Today` or `Reset`, etc.

```html
<template>
  <b-calendar v-model="value" value-as-date locale="en">
    <div class="d-flex" dir="ltr">
      <b-button
        size="sm"
        variant="outline-danger"
        v-if="value"
        @click="clearDate"
      >
        Clear date
      </b-button>
      <b-button
        size="sm"
        variant="outline-primary"
        class="ml-auto"
        @click="setToday"
      >
        Set Today
      </b-button>
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
      clearDate() {
        this.value = ''
      }
    }
  }
</script>

<!-- b-calendar-default-slot.vue -->
```

### Adding CSS classes to specific dates

If you need to highlight a specific date or dates, set the `date-info-fn` prop to a reference to a
function that returns a CSS class string (or array of strings) to apply to the date's cell. The
function is passed two arguments:

- `ymd` The date as a `YYYY-MM-DD` string
- `date` The date as a `Date` object

The function can return a string, or an array of strings. If setting no classes, you can return an
empty string (`''`), empty array (`[]`), or `null`.

In this example we are using the `table-{variant}` color classes to set a background color on the
date cell. The `table-{variant}` color classes work well as they are muted versions of the theme
colors.

```html
<template>
  <div>
    <b-calendar v-model="value" :date-info-fn="dateClass" locale="en"></b-calendar>
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
      dateClass(ymd, date) {
        const day = date.getDate()
        return day >= 10 && day <= 20 ? 'table-info' : ''
      }
    }
  }
</script>

<!-- b-calendar-date-classes.vue -->
```

Note the function will _not_ be called for [disabled dates](#date-constraints).

**Accessibility note:**

When using classes to convey specific meaning to a date, you should include additional context
outside of the calendar (or via the default slot) as to the dates being highlighted (such as in an
`aria-live` region), specifically for screen reader users.

BootstrapVue may, in the future, add in a feature to add in screen-reader friendly text note on the
highlighted date via this function.

## Events

### `input` event

The `'input'` event is emitted when updating the `v-model`. The event has a single argument which is
the selected date. By default the value is a string in the format of `YYYY-MM-DD` (or an empty
string if no date is selected). If the prop `value-as-date` is set, then the first argument will
instead be a `Date` object (or `null` if no date selected).

If the `disabled` or `readonly` props are set, the `'input'` event will **not** be emitted.

### `selected` event

The `'selected'` event is emitted when the user clicks a non-disabled date. The event passes two
arguments:

- `ymd` The selected date as a `YYYY-MM-DD` string
- `date` The selected date as a `Date` object

If the user clicks the already selected date, the `selected` event will still be emitted, contrary
to the `'input'` event which will _not_ re-emit the already selected date.

If the `disabled` or `readonly` props are set, the `'selected'` event will **not** be emitted.

### `context` event

The `'context'` event is emitted whenever a user selects a date, or the user navigates the calendar
(either via cursor keys, page up/down keys, home or end keys, or uses the calendar navigation
buttons). It will also be emitted when the component is created (just before insertion into the
DOM), or when the resolved locale has changed.

When the `readonly` prop is set, the event will still be emitted when the user navigates the
calendar. It will not be emitted when the `disabled` prop is set (except for the initial emit when
the calendar is created).

The `'context'` event is passed a context object as it's only argument, with the following
properties:

| Property            | Description                                                                                                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectedYMD`       | The selected date value (`YYYY-MM-DD` format) or an empty string if no date selected                                                                                                                                                                       |
| `selectedDate`      | The selected date value as a `Date` object or `null` if no date selected                                                                                                                                                                                   |
| `selectedFormatted` | The selected date formatted in the current locale. If no date is selected, this will be the value of the `label-no-date-selected` prop                                                                                                                     |
| `activeYMD`         | The current date of the calendar day button that can receive focus as a string (`YYYY-MM-DD` format)                                                                                                                                                       |
| `activeDate`        | The current date of the calendar day button that can receive focus as a `Date` object                                                                                                                                                                      |
| `activeFormatted`   | The active date formatted in the current locale                                                                                                                                                                                                            |
| `disabled`          | Will be `true` if active date is disabled, `false` otherwise                                                                                                                                                                                               |
| `locale`            | The resolved locale (may not be the same as the requested locale)                                                                                                                                                                                          |
| `calendarLocale`    | The resolved locale used by the calendar, optionally including the calendar type (i.e. 'gregory'). Usually this will be the same as `locale`, but may include the calendar type used, such as `fa-u-ca-gregory` when selecting the Persian locale (`'fa'`) |
| `isRTL`             | Will be `true` if the calendar is in a RTL (Right-To-Left) orientation. It will be `false` if LTR (Left-To-Right)                                                                                                                                          |

If formatting dates manually via `Intl.DateTimeFormat`, use the `calendarLocale` property value
instead of the `locale` property value to ensure you are using the same calendaring convention that
`<b-calendar>` uses. This is especially true for the IE 11 browser which does not fully implement
all features of `Intl.DateTimeFormat`. Refer to the
[Internationalization section](#internationalization) section below for additional details.

## Internationalization

Internationalization of the calendar is provided via
[`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat),
except for labels applied to elements of the calendar control (aria-labels, selected status, and
help text). You must provide your own translations for these labels. The available locales will be
browser dependant (not all browsers support all locales)

By default `<b-calendar>` will use the browser's default locale, but you can specify the locale (or
locales) to use via the `locale` prop. The prop accepts either a single locale string, or an array
of locale strings (listed in order of preferred locale).

The calendar starts the week on Sunday. This can be changed by setting the `start-weekday` prop to a
number in the range of `0` to `6` where `0` represents Sunday, `1` for Monday, up to `6` for
Saturday.

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
            labelPrevYear: 'Vorheriges Jahr',
            labelPrevMonth: 'Vorheriger Monat',
            labelCurrentMonth: 'Aktueller Monat',
            labelNextMonth: 'Nächster Monat',
            labelNextYear: 'Nächstes Jahr',
            labelToday: 'Heute',
            labelSelected: 'Ausgewähltes Datum',
            labelNoDateSelected: 'Kein Datum gewählt',
            labelCalendar: 'Kalender',
            labelNav: 'Kalendernavigation',
            labelHelp: 'Mit den Pfeiltasten durch den Kalender navigieren'
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

Currently `<b-calendar>` only supports the Gregorian (`'gregory'`) calendar.

By default, `<b-calendar>` automatically detects RTL vs LTR via the resolved locale. You can force
the calendar to render right-to-left by setting the `direction` prop to the string `rtl`, or set the
`direction` prop to `'ltr'` to always render left-to-right.

You can listen to the `context` event to determine the locale and directionality that the calendar
has resolved to.

For server side rendering (SSR) when using Node.js, ensure that the Node.js runtime you are using
supports `Intl` and the locales you will be using. Refer to the
[Node `Intl` support documentation](https://nodejs.org/api/intl.html) for details.

## Accessibility

`<b-calendar>` provides many accessibility features, such as `aria-live` regions, roles, aria
labeling, shortcut keys and full keyboard navigation to work with most screen readers.

Keyboard navigation:

- <kbd>ArrowLeft</kbd> moves to the previous day (or next day in RTL mode)
- <kbd>ArrowRight</kbd> moves to the next day (or previous day in RTL mode)
- <kbd>ArrowUp</kbd> moves to the same day in the previous week
- <kbd>ArrowDown</kbd> moves to the same day in the next week
- <kbd>PageUp</kbd> moves to the same day in the previous month
- <kbd>PageDown</kbd> moves to the same day in the next month
- <kbd>Alt</kbd>+<kbd>PageUp</kbd> moves to the same day and month in the previous year
- <kbd>Alt</kbd>+<kbd>PageDown</kbd> moves to the same day and month in the next year
- <kbd>Home</kbd> moves to today's date
- <kbd>End</kbd> moves to the current selected date, or today if no selected date
- <kbd>Enter</kbd> or <kbd>Space</kbd> selects the currently highlighted (focused) day

Several of the `label-*` props are not visible on screen, but are used to label various elements
within the calendar for screen reader users. e.g. the `label-today` prop is added to the cell that
contains todays date: `'January 28, 2020 (Today)'`, while the `label-selected` prop is added to the
cell that contains the selected date `'January 28, 2020 (Selected date)'` as well as added to the
selected date header as `sr-only` text.

When internationalizing the datepicker, it is important to also update the `label-*` props with
appropriate translated strings, so that international screen reader users will hear the correct
prompts and descriptions.

The features and styling of `<b-calendar>` are intentionally kept minimalistic in order to provide
the best possible accessibility to _all_ users.

## Implementation notes

`<b-calendar>` uses Bootstrap's margin, padding, border, and flex utility classes, along with button
(`btn-*`) classes and the `form-control` class. BootstrapVue's custom SCSS/CSS is also required for
proper styling.

Accessibility-wise, we chose _not_ to use the ARIA role `grid` for the calendar to minimize
verbosity and to provide consistency across various screen readers (NVDA, when encountering role
`grid`, reads the focused cell as being "selected" which can be misleading to the user).

## See also

- [`<b-form-datepicker>` Date picker custom form input](/docs/components/form-datepicker)
- [`<b-form-timepicker>` Time picker custom form input](/docs/components/form-timepicker)
- [`<b-time>` Time date selection widget](/docs/components/calendar)
