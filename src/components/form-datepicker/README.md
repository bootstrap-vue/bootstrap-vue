# Form Datepicker

> `<b-form-datepicker>` is a BootstrapVue custom date picker input form control, which provides full
> WAI-ARIA compliance and internationalization support.

## Overview

As a form control wrapper component for the [`<b-calendar>`](/docs/components/calendar) component,
it provides additional validation state presentation and a compact interface. Native HTML5 date
inputs vary in presentation, accessibility, and in some instances are not supported by all browsers.
`<b-form-datepicker>` provides a consistent and accessible interface across all browser platforms
and devices.

```html
<template>
  <div>
    <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
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

<!-- b-form-datepicker.vue -->
```

`<b-form-datepicker>` supports many of the props available on
[`<b-calendar>`](/docs/components/calendar) as well as some of the props available on
[`<b-dropdown>`](/docs/components/dropdown).

## `v-model` return value

By default, `<b-form-datepicker>` returns dates as a string in the `YYYY-MM-DD` format, which is the
same format returned by native browser `<input type="date">` controls. You can have
`<b-form-datepicker>` return a `Date` object (with no time portion) as the `v-model` value instead
by setting the `value-as-date` prop.

If no date is selected, `<b-form-datepicker>` returns an empty string `''`, or returns `null` if the
`value-as-date` prop is set.

Note that when `value-as-date` prop is set, the returned `Date` object will be in the browser's
default timezone.

If `<b-form-datepicker>` has a value set for the `name` prop, a hidden input will be created which
will have its name attribute set to the value of the `name` prop, and the value attribute will be
set to the selected date as a `YYYY-MM-DD` string. This will allow the `<b-form-datepicker>`
selected value to be submitted via native browser form submission.

## Disabled and readonly states

Setting the `disabled` prop will remove all interactivity of the `<b-form-datepicker>` component.

Setting the `readonly` prop will disable selecting a date, but will keep the component interactive,
allowing for date navigation. The `v-model` will not be updated in the readonly state.

For disabling specific dates or setting minimum and maximum date limits, refer to the
[Date constraints](#date-constraints) section.

```html
<template>
  <div>
    <b-form-group label="Select date picker interactive state">
      <b-form-radio-group v-model="state" aria-controls="ex-disabled-readonly">
        <b-form-radio value="disabled">Disabled</b-form-radio>
        <b-form-radio value="readonly">Readonly</b-form-radio>
        <b-form-radio value="normal">Normal</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-form-datepicker id="ex-disabled-readonly" :disabled="disabled" :readonly="readonly"></b-form-datepicker>
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

<!-- b-form-datepicker-disabled-readonly.vue -->
```

## Date constraints

### Minimum and maximum dates

Restrict the calendar range via the `min` and `max` props. The props accept a date string in the
format of `YYYY-MM-DD` or a `Date` object.

```html
<template>
  <div>
    <b-form-datepicker v-model="value" :min="min" :max="max" locale="en"></b-form-datepicker>
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

<!-- b-form-datepicker-min-max.vue -->
```

### Disabling dates

If you need to disable specific dates within the date picker, specify a function reference to the
`date-disabled-fn` prop. The function is passed two arguments:

- `ymd` The date as a `YYYY-MM-DD` string
- `date` The date as a `Date` object

The function should either return `true` if the date _cannot_ be selected (disabled), or `false` if
the date _can_ be selected (enabled). Note that the function **cannot** be asynchronous, and should
return a value as quickly as possible.

```html
<template>
  <div>
    <b-form-datepicker v-model="value" :date-disabled-fn="dateDisabled" locale="en"></b-form-datepicker>
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

<!-- b-form-datepicker-disabled-dates.vue -->
```

Note the `min` and `max` date constraints are evaluated first, before `date-disabled-fn`.

## Validation states

`<b-form-datepicker>` supports invalid and valid styling via the boolean `state` prop. Setting
`state` to boolean `false` will style the input as invalid, while setting it to boolean `true` will
style it as valid. Setting `state` to `null` will not show any validation state styling (the
default).

```html
<template>
  <div>
    <label for="datepicker-invalid">Choose a date (invalid style)</label>
    <b-form-datepicker id="datepicker-invalid" :state="false" class="mb-2"></b-form-datepicker>
    <label for="datepicker-valid">Choose a date (valid style)</label>
    <b-form-datepicker id="datepicker-valid" :state="true"></b-form-datepicker>
  </div>
</template>

<!-- b-form-datepicker-invalid-valid.vue -->
```

Note that native browser validation is _not_ available with `<b-form-datepicker>`.

## Styling

### Variants

The selected date button (background color) defaults to the `'primary'` theme variant. You can
change this to any of the Bootstrap v4 theme variant colors: `'secondary'`, `'success'`, `'danger'`,
`'warning'`, `'info'`, etc, via the `selected-variant` prop.

Today's date will also be highlighted (text color) using the same variant as the selected date by
default. To specify a different theme color to use for today's date, use the `today-variant` prop.

To disable highlighting of today's date altogether, set the `no-highlight-today` prop.

### Control sizing

Fancy a smaller or larger `<b-form-datepicker>` control? Set the `size` prop to `'sm'` for a smaller
form control, or `'lg'` for a larger form form control. Note this does not affect the size of the
popup calendar dialog.

```html
<template>
  <div>
    <label for="datepicker-sm">Small date picker</label>
    <b-form-datepicker id="datepicker-sm" size="sm" local="en" class="mb-2"></b-form-datepicker>
    <label for="datepicker-lg">Large date picker</label>
    <b-form-datepicker id="datepicker-lg" size="lg" local="en"></b-form-datepicker>
  </div>
</template>

<!-- b-form-datepicker-sizes.vue -->
```

### Placeholder

Add custom placeholder text to the control, when no date is selected, via the `placeholder` prop. If
a placeholder is not provided, the value of the `label-no-date-selected` prop is used.

```html
<template>
  <div>
    <label for="datepicker-placeholder">Date picker with placeholder</label>
    <b-form-datepicker id="datepicker-placeholder" placeholder="Choose a date" local="en"></b-form-datepicker>
  </div>
</template>

<!-- b-form-datepicker-placeholder.vue -->
```

### Optional controls

Add optional control buttons to the bottom of the calendar popup via the props `today-button`,
`reset-button` and `close-button`.

- The today button selects today's date
- The reset button either clears the selected date, or sets the date to the value of the prop
  `reset-value` (if provided)
- The close button closes the calendar popup

By default, clicking on the today or reset button will also close the calendar popup, unless the
prop `no-close-on-select` is set.

```html
<template>
  <div>
    <label for="datepicker-buttons">Date picker with optional footer buttons</label>
    <b-form-datepicker
      id="datepicker-buttons"
      today-button
      reset-button
      close-button
      locale="en"
    ></b-form-datepicker>
  </div>
</template>

<!-- b-form-datepicker-buttons.vue -->
```

The text for the optional buttons can be set via the `label-today-button`, `label-reset-button`, and
the `label-close-button` props. Due to the limited width of the footer section, it is recommended to
keep these labels short.

Note that the `Set Today` button may not set the control today's date, if today's date is outside of
the `min` or `max` date range restrictions. In the case it is outside of the range, it will set to
either `min` or `max` (depending on which is closes to today's date).

### Dropdown placement

Use the dropdown props `right`, `dropup`, `dropright`, `dropleft`, `no-flip`, and `offset` to
control the positioning of the popup calendar.

Refer to the [`<b-dropdown>` documentation](/docs/components/dropdown) for details on the effects
and usage of these props.

### Initial open calendar date

<span class="badge badge-info small">v2.7.0+</span>

By default, when no date is selected, the calendar view will be set to the current month (or the
`min` or `max` date if today's date is out of range of `min` or `max`) when opened. You can change
this behaviour by specifying a date via the `initial-date` prop. The initial date prop will be used
to determine the calendar month to be initially presented to the user. It does not set the
component's value.

### Dark mode

Want a fancy popup with a dark background instead of a light background? Set the `dark` prop to
`true` to enable the dark background.

### Optional decade navigation buttons

Set the prop `show-decade-nav` to enable the previous and next decade buttons in the datepicker's
date navigation toolbar.

The props `label-prev-decade` and `label-next-decade` props can be used to provide custom label text
for the decade buttons.

For example usage, refer to the [Internationalization section](#internationalization) below.

### Button only mode

<span class="badge badge-info small">v2.7.0+</span>

Fancy just a button that launches the date picker dialog, or want to provide your own optional text
input field? Use the `button-only` prop to render the datepicker as a dropdown button. The formatted
date label will be rendered with the class `sr-only` (available only to screen readers).

In the following simple example, we are placing the datepicker (button only mode) as an append to a
`<b-input-group>`, and we are using the `context` event to get the formatted date string and value:

```html
<template>
  <div>
    <label for="example-input">Choose a date</label>
    <b-input-group class="mb-3">
      <b-form-input
        id="example-input"
        v-model="value"
        type="text"
        placeholder="YYYY-MM-DD"
        autocomplete="off"
      ></b-form-input>
      <b-input-group-append>
        <b-form-datepicker
          v-model="value"
          button-only
          right
          locale="en-US"
          aria-controls="example-input"
          @context="onContext"
        ></b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
    <p class="mb-1">Value: '{{ value }}'</p>
    <p class="mb-1">Selected: '{{ selected }}'</p>
    <p>Formatted: '{{ formatted }}'</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        formatted: '',
        selected: ''
      }
    },
    methods: {
      onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted
        // The following will be an empty string until a valid date is entered
        this.selected = ctx.selectedYMD
      }
    }
  }
</script>

<!-- b-form-datepicker-button-only.vue -->
```

Control the size of the button via the `size` prop, and the button variant via the `button-variant`
prop.

### Date string format

<span class="badge badge-info small">v2.6.0+</span>

To change format options of the displayed date text inside the component, e.g. in the header or
placeholder, set the `date-format-options` prop to an object containing the requested format
properties for the `Intl.DateTimeFormat` object (see also
[Internationalization](#internationalization)).

```html
<template>
  <div>
    <label for="datepicker-dateformat1">Custom date format</label>
    <b-form-datepicker
      id="datepicker-dateformat1"
      :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
      locale="en"
    ></b-form-datepicker>

    <label class="mt-3" for="datepicker-dateformat2">Short date format</label>
    <b-form-datepicker
      id="datepicker-dateformat2"
      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      locale="en"
    ></b-form-datepicker>
  </div>
</template>

<!-- b-form-datepicker-dateformat.vue -->
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

### Weekday name header format

<span class="badge badge-info small">2.12.0+</span>

The calendar weekday name header format defaults to `'short'`, which is typically a three-character
abbreviation of the weekday, although some [locales](#internationalization) may override this. The
format can be controlled via the prop `weekday-header-format` and accepts one of three values:

- `'long'` the full weekday name (e.g. <samp>Tuesday</samp>). Handy when using a full width
  calendar. Avoid using with the default calendar width.
- `'short'` typically is a 2 or 3 letter abbreviation of the weekday name, depending on the selected
  locale (e.g. "Tue").
- `'narrow'` is typically a single character abbreviation (e.g., <samp>T</samp>). Two weekdays may
  have the same narrow style for some locales (e.g. Tuesday and Thursday's narrow style are both
  <samp>T</samp>). This can be handy for those locales that do not support the `'short'` format,
  such as locales `'ar'` and `'fa'`.

### Date navigation button slots

<span class="badge badge-info small">2.12.0+</span>

To change the content of the calendar's date navigation buttons, BootstrapVue provides scoped slots
for each button:

- `'nav-prev-decade'`
- `'nav-prev-year'`
- `'nav-prev-month'`
- `'nav-this-month'` (the go to selected/today button)
- `'nav-next-month'`
- `'nav-next-year'`
- `'nav-next-decade'`

All seven slots have the same scoped property available:

| Property | Type    | Description                                                           |
| -------- | ------- | --------------------------------------------------------------------- |
| `isRTL`  | Boolean | Will be `true` when the date navigation bar is rendered right-to-left |

You can use the `isRTL` scoped property to "flip" the prev vs next button content to handle the
left-to-right to right-to-left orientation change &mdash; i.e. the previous year button will be on
the right when `isRTL` is `true`, instead of the left.

### Full width calendar dropdown

To create a full width calendar dropdown (where the width matches the input width), simply set the
`menu-class` prop to `'w-100'` and set the `calendar-width` prop to `'100%'`:

```html
<template>
  <div>
    <label for="datepicker-full-width">Choose a date</label>
    <b-form-datepicker
      id="datepicker-full-width"
      v-model="value"
      menu-class="w-100"
      calendar-width="100%"
      class="mb-2"
    ></b-form-datepicker>
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

<!-- b-form-datepicker-full-width.vue -->
```

## Internationalization

Internationalization of the date picker's calendar is provided via
[`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat),
except for labels applied to elements of the calendar control (aria-labels, selected status, and
help text). You must provide your own translations for these labels. The available locales will be
browser dependent (not all browsers support all locales)

By default `<b-form-datepicker>` will use the browser's default locale, but you can specify the
locale (or locales) to use via the `locale` prop. The prop accepts either a single locale string, or
an array of locale strings (listed in order of preferred locale).

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

    <div>
      <b-form-checkbox v-model="showDecadeNav" switch inline class="my-2">
        Show decade navigation buttons
      </b-form-checkbox>

      <b-form-checkbox v-model="hideHeader" switch inline class="my-2">
        Hide calendar header
      </b-form-checkbox>
    </div>

    <label for="example-i18n-picker">Date picker:</label>
    <b-form-datepicker
      id="example-i18n-picker"
      v-model="value"
      v-bind="labels[locale] || {}"
      :locale="locale"
      :start-weekday="weekday"
      :show-decade-nav="showDecadeNav"
      :hide-header="hideHeader"
      class="mb-2"
     ></b-form-datepicker>
     <p>Value: <b>'{{ value }}'</b></p>
   </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        locale: 'en-US',
        showDecadeNav: false,
        hideHeader: false,
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
            labelPrevDecade: 'Vorheriges Jahrzehnt',
            labelPrevYear: 'Vorheriges Jahr',
            labelPrevMonth: 'Vorheriger Monat',
            labelCurrentMonth: 'Aktueller Monat',
            labelNextMonth: 'Nächster Monat',
            labelNextYear: 'Nächstes Jahr',
            labelNextDecade: 'Nächstes Jahrzehnt',
            labelToday: 'Heute',
            labelSelected: 'Ausgewähltes Datum',
            labelNoDateSelected: 'Kein Datum gewählt',
            labelCalendar: 'Kalender',
            labelNav: 'Kalendernavigation',
            labelHelp: 'Mit den Pfeiltasten durch den Kalender navigieren'
          },
          'ar-EG': {
            weekdayHeaderFormat: 'narrow',
            labelPrevDecade: 'العقد السابق',
            labelPrevYear: 'العام السابق',
            labelPrevMonth: 'الشهر السابق',
            labelCurrentMonth: 'الشهر الحالي',
            labelNextMonth: 'الشهر المقبل',
            labelNextYear: 'العام المقبل',
            labelNextDecade: 'العقد القادم',
            labelToday: 'اليوم',
            labelSelected: 'التاريخ المحدد',
            labelNoDateSelected: 'لم يتم اختيار تاريخ',
            labelCalendar: 'التقويم',
            labelNav: 'الملاحة التقويم',
            labelHelp: 'استخدم مفاتيح المؤشر للتنقل في التواريخ'
          },
          zh: {
            weekdayHeaderFormat: 'narrow',
            labelPrevDecade: '过去十年',
            labelPrevYear: '上一年',
            labelPrevMonth: '上个月',
            labelCurrentMonth: '当前月份',
            labelNextMonth: '下个月',
            labelNextYear: '明年',
            labelNextDecade: '下一个十年',
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

<!-- b-form-datepicker-i18n.vue -->
```

You can listen to for the `context` event to determine the locale and directionality that the
calendar has resolved to.

Refer to the [`<b-calendar>`](/docs/components/calendar#internationalization) documentation for
additional details.

## Accessibility

The popup calendar supports the same
[keyboard controls as `<b-calendar>`](/docs/components/calendar#accessibility), along with the
following:

- <kbd>Esc</kbd> will close the popup calendar without selecting a date

When internationalizing the datepicker, it is important to also update the `label-*` props with
appropriate translated strings, so that international screen reader users will hear the correct
prompts and descriptions.

Refer to the [`<b-calendar>`](/docs/components/calendar#accessibility) documentation for additional
details.

## Implementation notes

`<b-form-datepicker>` is based upon the components [`<b-calendar>`](/docs/components/calendar) and
[`<b-dropdown>`](/docs/components/dropdown).

`<b-form-datepicker>` uses Bootstrap's border and flex utility classes, along with button (`btn-*`)
classes, dropdown (`dropdown*`) classes, and the `form-control*` (plus validation) classes.
BootstrapVue's Custom SCSS/CSS is also required for proper styling of the date picker and calendar.

## See also

- [`<b-form-timepicker>` Time picker custom form input](/docs/components/form-timepicker)
- [`<b-calendar>` Calendar date selection widget](/docs/components/calendar)
- [`<b-time>` Time selection widget](/docs/components/time)
- [`<b-dropdown>` Dropdown component](/docs/components/dropdown)
