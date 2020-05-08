# Form Timepicker

> `<b-form-timepicker>` is a BootstrapVue custom time picker input form control, which provides full
> WAI-ARIA compliance and internationalization support.

## Overview

As a form control wrapper component for the [`<b-time>`](/docs/components/time) component, it
provides additional validation state presentation and a compact interface. Native HTML5 time inputs
vary in presentation, accessibility, and in some instances are not supported by all browsers.
`<b-form-timepicker>` provides a consistent and accessible interface across all browser platforms
and devices.

```html
<template>
  <div>
    <b-form-timepicker v-model="value" locale="en"></b-form-timepicker>
    <div class="mt-2">Value: '{{ value }}'</div>
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

<!-- b-form-timepicker.vue -->
```

## `v-model` return value

`<b-form-timepicker>` always returns a string in the format of `'HH:mm:ss'` which is the same format
returned by native browser `<input type="time">` controls. The value will be in the range of
`'00:00:00'` up to `'23:59:59'` (24-hour clock using the `'h23'` hour cycle syntax).

If no time is selected, then `<b-form-timepicker>` returns an empty string (`''`).

## Disabled and readonly states

Setting the `disabled` prop will remove all interactivity of the `<b-form-timepicker>` component.

Setting the `readonly` prop will disable selecting a time, but will keep the component interactive,
allowing for tabbing between spinbuttons. The `v-model` will not be updated in the readonly state.

```html
<template>
  <div>
    <b-form-group label="Select time picker interactive state">
      <b-form-radio-group v-model="state" aria-controls="ex-disabled-readonly">
        <b-form-radio value="disabled">Disabled</b-form-radio>
        <b-form-radio value="readonly">Readonly</b-form-radio>
        <b-form-radio value="normal">Normal</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-form-timepicker id="ex-disabled-readonly" :disabled="disabled" :readonly="readonly"></b-form-timepicker>
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

<!-- b-form-timepicker-disabled-readonly.vue -->
```

## Validation states

`<b-form-timepicker>` supports invalid and valid styling via the boolean `state` prop. Setting
`state` to boolean `false` will style the input as invalid, while setting it to boolean `true` will
style it as valid. Setting state to `null` will not show any validation state styling (the default).

```html
<template>
  <div>
    <label for="timepicker-invalid">Choose a time (invalid style)</label>
    <b-form-timepicker id="datepicker-invalid" :state="false" class="mb-2"></b-form-timepicker>

    <label for="timepicker-valid">Choose a time (valid style)</label>
    <b-form-timepicker id="datepicker-valid" :state="true"></b-form-timepicker>
  </div>
</template>

<!-- b-form-timepicker-validation.vue -->
```

Note that native browser validation is not available with `<b-form-timepicker>`.

## Styling

### Enabling of seconds spinbutton

By default, the seconds spinbutton is not shown. To enable the section of seconds, set the
`show-seconds` prop to `true` to enable the seconds selection spinbutton. When `show-seconds` is
false (or not provided), the returned value will always have the seconds portion of the time string
set to `00`.

```html
<template>
  <div>
    <b-form-timepicker v-model="value" show-seconds locale="en"></b-form-timepicker>
    <div class="mt-2">Value: '{{ value }}'</div>
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

<!-- b-form-timepicker-show-seconds.vue -->
```

### Control sizing

Fancy a smaller or larger `<b-form-timepicker>` control? Set the `size` prop to `'sm'` for a smaller
form control, or `'lg'` for a larger form form control. Note this does not affect the size of the
popup time selection dialog.

```html
<template>
  <div>
    <label for="timepicker-sm">Small time picker</label>
    <b-form-timepicker id="timepicker-sm" size="sm" local="en" class="mb-2"></b-form-timepicker>

    <label for="timepicker-lg">Large time picker</label>
    <b-form-timepicker id="timepicker-lg" size="lg" local="en"></b-form-timepicker>
  </div>
</template>

<!-- b-form-timepicker-control-size.vue -->
```

### Placeholder

Add custom placeholder text to the control, when no date is selected, via the `placeholder` prop. If
a placeholder is not provided, the value of the `label-no-time-selected` prop is used.

```html
<template>
  <div>
    <label for="timepicker-placeholder">Time picker with placeholder</label>
    <b-form-timepicker id="timepicker-placeholder" placeholder="Choose a time" local="en"></b-form-timepicker>
  </div>
</template>

<!-- b-form-timepicker-placeholder.vue -->
```

### Optional controls

Add optional control buttons to the bottom of the calendar popup via the props `now-button` or
`reset-button`. The default close button can be removed via the `no-close-button` prop.

- The now button selects the current time
- The reset button either clears the selected time, or sets the time to the value of the prop
  `reset-value` (if provided)
- The close button closes the time popup

```html
<template>
  <div>
    <label for="timepicker-buttons">Time picker with optional footer buttons</label>
    <b-form-timepicker
      id="timepicker-buttons"
      now-button
      reset-button
      locale="en"
    ></b-form-timepicker>
  </div>
</template>

<!-- b-form-timepicker-footer-buttons.vue -->
```

The text for the optional buttons can be set via the `label-now-button`, `label-reset-button`, and
the `label-close-button` props. Due to the limited width of the footer section, it is recommended to
keep these labels short.

### Dropdown placement

Use the dropdown props `right`, `dropup`, `dropright`, `dropleft`, `no-flip`, and `offset` to
control the positioning of the popup calendar.

Refer to the [`<b-dropdown>` documentation](/docs/components/dropdown) for details on the effects
and usage of these props.

### Button only mode

<span class="badge badge-info small">v2.7.0+</span>

Fancy just a button that launches the timepicker dialog, or want to provide your own optional text
input field? Use the `button-only` prop to render the timepicker as a dropdown button. The formatted
time label will be rendered with the class `sr-only` (available only to screen readers).

In the following simple example, we are placing the timepicker (button only mode) as an append to a
`<b-input-group>`:

```html
<template>
  <div>
    <label for="example-input">Choose a time</label>
    <b-input-group class="mb-3">
      <b-form-input
        id="example-input"
        v-model="value"
        type="text"
        placeholder="HH:mm:ss"
      ></b-form-input>
      <b-input-group-append>
        <b-form-timepicker
          v-model="value"
          button-only
          right
          show-seconds
          locale="en"
          aria-controls="example-input"
        ></b-form-timepicker>
      </b-input-group-append">
    </b-input-group>
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

<!-- b-form-timepicker-button-only.vue -->
```

Control the size of the button via the `size` prop, and the button variant via the `button-variant`
prop.

## Internationalization

Internationalization of the time interface is provided via
[`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)
and
[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat),
except for the labels applied to elements of the time control (aria-labels, selected status, etc).
You must provide your own translations for these labels. The available locales will be browser
dependent (not all browsers support all locales).

By default `<b-form-timepicker>` will use the browser's default locale, but you can specify the
locale (or locales) to use via the `locale` prop. The prop accepts either a single locale string, or
an array of locale strings (listed in order of most preferred locale to least preferred).

The emitted `'context'` event will include which locale the time control has resolved to (which may
not be the same locale as requested, depending on the supported locales of `Intl`).

For server side rendering (SSR) when using Node.js, ensure that the Node.js runtime you are using
supports `Intl` and the locales you will be using. Refer to the
[Node Intl support documentation](https://nodejs.org/api/intl.html) for details.

```html
<template>
  <b-row>
    <b-col cols="12" class="mb-3">
      <label for="example-locales">Locale:</label>
      <b-form-select id="example-locales" v-model="locale" :options="locales"></b-form-select>
    </b-col>
    <b-col md="6">
      <b-form-timepicker
        v-model="value"
        v-bind="labels[locale] || {}"
        :locale="locale"
        show-seconds
        @context="onContext"
      ></b-form-timepicker>
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
            labelHours: 'Stunden',
            labelMinutes: 'Minuten',
            labelSeconds: 'Sekunden',
            labelIncrement: 'Erhöhen',
            labelDecrement: 'Verringern',
            labelSelected: 'Ausgewählte Zeit',
            labelNoTimeSelected: 'Keine Zeit ausgewählt',
            labelCloseButton: 'Schließen'
          },
          'ar-EG': {
            labelHours: 'ساعات',
            labelMinutes: 'الدقائق',
            labelSeconds: 'ثواني',
            labelAmpm: 'صباحا مساء',
            labelAm: 'ص',
            labelPm: 'م',
            labelIncrement: 'زيادة',
            labelDecrement: 'إنقاص',
            labelSelected: 'الوقت المحدد',
            labelNoTimeSelected: 'لا وقت المختار',
            labelCloseButton: 'قريب'
          },
          zh: {
            labelHours: '小时',
            labelMinutes: '分钟',
            labelSeconds: '秒',
            labelAmpm: '上午下午',
            labelAm: '上午',
            labelPm: '下午',
            labelIncrement: '增量',
            labelDecrement: '减量',
            labelSelected: '选定时间',
            labelNoTimeSelected: '没有选择时间',
            labelCloseButton: '关'
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

<!-- b-form-time-i18n.vue -->
```

### Understanding the `hourCycle`

There are 2 main types of time keeping conventions (clocks) used around the world: the 12-hour clock
and the 24-hour clock. The `hourCycle` property allows you to access the clock type used by a
particular locale. The hour cycle type can have several different values, which are listed in the
table below. The `hourCycle` signals how the time `'00:00:00'` (the start of the day) should be
presented/formatted to a user of a particular locale. The `'context'` event includes the resolved
`hourCycle` value.

| `hourCycle` | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `'h12'`     | Hour system using `1`–`12`. The 12 hour clock, with midnight starting at 12:00 am |
| `'h23'`     | Hour system using `0`–`23`. The 24 hour clock, with midnight starting at 0:00     |
| `'h11'`     | Hour system using `0`–`11`. The 12 hour clock, with midnight starting at 0:00 am  |
| `'h24'`     | Hour system using `1`–`24`. The 24 hour clock, with midnight starting at 24:00    |

Native HTML5 `<input type="date">` returns the time value in the `'h23'` format, and
`<b-form-timepicker>` also returns the v-model in the `'h23'` format. This value may differ from
what is presented to the user via the GUI (spin buttons) of the `<b-form-timepicker>` component,
dependent upon the [locale selected](#internationalization).

**Note:** IE 11 _does not support_ resolving the `hourCycle` value of a locale, so we assume either
`h12` or `h23` based on the resolved `hour12` value.

### Forcing 12 or 24 hour interface

12-hour versus 24-hour input is determined by the client browsers default locale (or the locale
resolved from the `locale` prop). To force a 12-hour user interface, set the prop `hour12` to
`true`. To force a 24-hour user interface, set the prop `hour12` to `false`. The default for prop
`hour12` is `null` which uses the resolved locale to determine which interface to use.

The setting of the `hour12` prop will affect which [`hourCycle`](#understanding-the-hourcycle) is
resolved for formatting the hours spinbutton. Note that while this may affect the format of the hour
spinbutton, but the formatted time string result _may_ show the `'h12` or `'h23'` format due to
limitations in the client `Intl.DateTimeFormat` support for a particular locale. It is therefore
**recommended to leave the `hour12` prop set to `null` (default)**, so show the locale default
time/hour formatting.

## Accessibility

The popup time supports the same keyboard controls as
[`<b-time>`](/docs/components/time#accessibility), along with the following:

- <kbd>Esc</kbd> will close the popup time without selecting a time

When internationalizing the timepicker, it is important to also update the `label-*` props with
appropriate translated strings, so that international screen reader users will hear the correct
prompts and descriptions.

Refer to the [`<b-time>`](/docs/components/time#accessibility) documentation for additional details.

## Implementation notes

`<b-form-timepicker>` is based upon the components [`<b-time>`](/docs/components/time) and
[`<b-dropdown>`](/docs/components/dropdown).

`<b-form-timepicker>` uses Bootstrap's border and flex utility classes, along with button (`btn-*`)
classes, dropdown (`dropdown*`) classes, and the `form-control*` (plus validation) classes.
BootstrapVue's Custom SCSS/CSS is also required for proper styling of the time picker and popup.

## See also

- [`<b-time>` Time selection widget](/docs/components/time)
- [`<b-form-datepicker>` Date picker custom form input](/docs/components/form-datepicker)
- [`<b-calendar>` Calendar date selection widget](/docs/components/calendar)
- [`<b-dropdown>` Dropdown component](/docs/components/dropdown)
