# Time

> BootstrapVue's custom `<b-time>` component generates a WAI-ARIA compliant time selection widget,
> which can be used to control other components, or can be used to create customized time picker
> inputs.

## Overview

`<b-time>` is WAI-ARIA accessibility compliant, optimized for keyboard control (arrow, page up/down,
home, and end keys). Internationalization is also supported, and default's to the browser's or
page's locale, if no locale(s) are specified.

If you need a time picker as a custom form control input, use the
[`<b-form-timepicker>`](/docs/components/form-timepicker) component instead.

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
native browser `<input type="time">` controls. The value will be in the range of `'00:00:00'` up to
`'23:59:59'` (24-hour clock using the `'h23'` hour cycle syntax)

If no time is selected, then `<b-time>` returns an empty string (`''`).

## Disabled and readonly states

Setting the `disabled` prop will remove all interactivity of the `<b-time>` component. Setting the
`readonly` prop will disable selecting a time, but will keep the spinbuttons focusable.

```html
<template>
  <div>
    <b-form-group label="Select time interactive state">
      <b-form-radio-group v-model="state" aria-controls="ex-disabled-readonly">
        <b-form-radio value="disabled">Disabled</b-form-radio>
        <b-form-radio value="readonly">Readonly</b-form-radio>
        <b-form-radio value="normal">Normal</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-time id="ex-disabled-readonly" :disabled="disabled" :readonly="readonly"></b-time>
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

<!-- b-time-disabled-readonly.vue -->
```

## Styling

### Enabling of seconds spinbutton

By default, the seconds spinbutton is not shown. To enable the section of seconds, set the
`show-seconds` prop to `true` to enable the seconds selection spinbutton. When `show-seconds` is
`false` (or not provided), the returned value will always have the seconds portion of the time
string set to `00`.

```html
<template>
  <b-time v-model="value" show-seconds locale="en"></b-time>
  <div class="mt-2">Value: '{{ value }}'</div>
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

<!-- b-time-show-seconds.vue -->
```

### Hiding the top selected time header

By default, the current selected time will be displayed at the top of the time component, formatted
in the locale's language.

You can hide this header via the `hide-header` prop. Note this only visually hides the selected
time, while keeping it available to screen reader users as an `aria-live` region.

### Border and padding

Fancy a time control with a border with padding? Use Bootstrap's border and padding utility classes
to add borders and padding:

```html
<template>
  <b-time class="border rounded p-2" locale="en"></b-time>
</template>

<!-- b-time-border-padding.vue -->
```

### Default slot

Provide optional content at the bottom of the time interface via the use of `default` slot. The slot
can be used to add buttons such as Now or Reset, etc.

```html
<template>
  <b-time v-model="value" show-seconds locale="en">
    <div class="d-flex" dir="ltr">
      <b-button
        size="sm"
        variant="outline-danger"
        v-if="value"
        @click="clearTime"
      >
        Clear time
      </b-button>
      <b-button
        size="sm"
        variant="outline-primary"
        class="ml-auto"
        @click="setNow"
      >
        Set Now
      </b-button>
    </div>
  </b-time>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    },
    methods: {
      setNow() {
        const now = new Date()
        // Grab the HH:mm:ss part of the time string
        this.value = now.toTimeString().slice(0, 8)
      },
      clearTime() {
        this.value = ''
      }
    }
  }
</script>

<!-- b-time-default-slot.vue -->
```

## Events

### `input` event

The `'input'` event is emitted when updating the `v-model`. The event has a single argument which is
the selected time as a string. The value is a string in the format of `'HH:mm:ss'` (or an empty
string if no time is selected). Valid values are in the range of `'00:00:00'` through `23:59:59'`.

If fhe `show-seconds` prop is not set, the seconds portion of the time value will always be `'00'`.

If the `disabled` or `readonly` props are set, the `'input'` event will **not** be emitted.

### `context` event

The `'context'` event is emitted whenever a user selects a time, or the user changes a value of one
of the spinbuttons. It will also be emitted when the component is created (just before insertion
into the DOM), or when the resolved locale has changed.

The event will not be emitted when the `disabled` or `readonly` props are set (except for the
initial emit when the time component is created).

The `'context'` event is passed a context object as it's only argument, with the following
properties:

| Property    | Description                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| `value`     | The current value as an `HH:mm:ss` string or an empty string `''` if no time selected                       |
| `formatted` | The current value formatted in the resolved locale, or the `label-no-time` prop value if no time selected   |
| `hours`     | The currently selected hour (always 24 hour, `h23'` format) as a number or `null` if no hour                |
| `minutes`   | The currently selected minute value as a number or `null` if no minute                                      |
| `seconds`   | The currently selected seconds value as a number or `null` if no seconds                                    |
| `locale`    | The locale resolved by the time picker, this _may_ be different than the requested locale                   |
| `isRTL`     | Will be `true` is the locale is RTL (right-to-left)                                                         |
| `hour12`    | Boolean value indicating if the interface is using 12 hour format                                           |
| `hourCycle` | A string representing the type of hour cycle used for the spinbuttons: `'h11'`, `'h12'`, `'h23'` or `'h24'` |

Refer to the [Internationalization section](#internationalization) for information on the context
properties `locale`, `hour12` and `hourCycle`.

## Internationalization

Internationalization of the time interface is provided via
[`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)
and
[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat),
except for the labels applied to elements of the time control (aria-labels, selected status, etc.).
You must provide your own translations for these labels. The available locales will be browser
dependent (not all browsers support all locales).

By default `<b-time>` will use the browser's default locale, but you can specify the locale (or
locales) to use via the `locale` prop. The prop accepts either a single locale string, or an array
of locale strings (listed in order of most preferred locale to least preferred).

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
    <b-col md="auto">
      <b-time
        v-model="value"
        v-bind="labels[locale] || {}"
        :locale="locale"
        show-seconds
        @context="onContext"
      ></b-time>
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
            labelNoTimeSelected: 'Keine Zeit ausgewählt'
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
            labelNoTimeSelected: 'لا وقت المختار'
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
            labelNoTimeSelected: '没有选择时间'
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

<!-- b-time-i18n.vue -->
```

### Understanding the `hourCycle`

There are 2 main types of time keeping conventions (clocks) used around the world: the 12-hour clock
and the 24-hour clock. The `hourCycle` property allows you to access the clock type used by a
particular locale. The hour cycle type can have several different values, which are listed in the
table below. The `hourCycle` signals how the time `'00:00:00'` (the start of the day) should be
presented/formatted to a user of a particular locale. The [`'context'` event](#context-event)
includes the resolved `hourCycle` value.

| `hourCycle` | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `'h12'`     | Hour system using `1`–`12`. The 12 hour clock, with midnight starting at 12:00 am |
| `'h23'`     | Hour system using `0`–`23`. The 24 hour clock, with midnight starting at 0:00     |
| `'h11'`     | Hour system using `0`–`11`. The 12 hour clock, with midnight starting at 0:00 am  |
| `'h24'`     | Hour system using `1`–`24`. The 24 hour clock, with midnight starting at 24:00    |

Native HTML5 `<input type="date">` returns the time value in the `'h23'` format, and `<b-time>` also
returns the v-model in the `'h23'` format. This value may differ from what is presented to the user
via the GUI (spin buttons) of the `<b-time>` component, dependent upon the
[locale selected](#internationalization).

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

`<b-time>` provides many accessibility features, such as `aria-live` regions, roles, aria labeling,
shortcut keys and full keyboard navigation to work with most screen readers.

Keyboard navigation:

- <kbd>ArrowUp</kbd> Increments the currently selected spinbutton value
- <kbd>ArrowDown</kbd> Decrements the currently selected spinbutton value
- <kbd>Home</kbd> Sets the selected spinbutton to the minimum value
- <kbd>End</kbd> Sets the selected spinbutton to the maximum value
- <kbd>PageUp</kbd> Increases the selected spinbutton value by the spinbutton's step by a larger
  value
- <kbd>PageDown</kbd> Decreases the selected spinbutton value by the spinbutton's step by a larger
  value
- <kbd>ArrowRight</kbd> Moves focus to the next spin button in the component
- <kbd>ArrowLeft</kbd> Moves focus to the previous spin button in the component

Several of the `label-*` props are not visible on screen, but are used to label various elements
within the calendar for screen reader users. e.g. the `label-selected` prop is added to the element
that displays the selected value.

When internationalizing the datepicker, it is important to also update the `label-*` props with
appropriate translated strings, so that international screen reader users will hear the correct
prompts and descriptions.

## Implementation notes

The `<b-time>` component is based upon the custom BootstrapVue component
[`<b-form-spinbutton>`](/docs/components/form-spinbutton).

`<b-time>` uses Bootstrap's border and flex utility classes, along with button (`btn-*`) classes and
the `form-control` class. BootstrapVue's custom SCSS/CSS is also required for proper styling.

## See also

- [`<b-form-timepicker>` Time picker custom form input](/docs/components/form-timepicker)
- [`<b-calendar>` Calendar date selection widget](/docs/components/calendar)
- [`<b-form-datepicker>` Date picker custom form input](/docs/components/form-datepicker)
