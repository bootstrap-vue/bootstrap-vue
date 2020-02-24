# Form Timepicker

> `<b-form-timepicker>` is a BootstrapVue custom time picker input form control, which provides full
> WAI-ARIA compliance and internationalization support.

TBD

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

`<b-form-timepicker>` supports invalid and valid styling via the boolean `state` prop. Setting `state`
to boolean `false` will style the input as invalid, while setting it to boolean `true` will style it
as valid. Setting state to `null` will not show any validation state styling (the default).

```html
<template>
  <div>
    <label for="timepicker-invalid">Choose a time (invalid style)</label>
    <b-form-timepicker id="datepicker-invalid" :state="false" class="mb-2"></b-form-timepicker>
    <label for="timepicker-valid">Choose a time (valid style)</label>
    <b-form-timepicker id="datepicker-valid" :state="true"></b-form-timeepicker>
  </div>
</template>

<!-- b-form-timepicker-validation.vue -->
```

Note that native browser validation is not available with `<b-form-timepicker>`.

## Styling

### Enabling of seconds spinbutton

By default, the seconds spinbutton is not shown. To enable the section of seconds, set the `show-seconds`
prop to `true` to enable the seconds selection spinbutton. When `show-seconds` is false (or not provided),
the returned value will always have the seconds portion of the time string set to `00`.

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
    <label for="timeepicker-sm">Small time picker</label>
    <b-form-timepicker id="timeepicker-sm" size="sm" local="en" class="mb-2"></b-form-timepicker>
    <label for="timepicker-lg">Large time picker</label>
    <b-form-timepicker id="timepicker-lg" size="lg" local="en"></b-form-timepicker>
  </div>
</template>

<!-- b-form-timepicker-control-size.vue -->
```

### Placeholder

Add custom placeholder text to the control, when no date is selected, via the `placeholder` prop.
If a placeholder is not provided, the value of the `label-no-time-selected` prop is used.

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
    <b-form-timeepicker
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
the `label-close-button` props. Due to the limited width of the footer section, it is recommended
to keep these labels short.

### Dropdown placement

Use the dropdown props `right`, `dropup`, `dropright`, `dropleft`, `no-flip`, and `offset` to
control the positioning of the popup calendar.

Refer to the [`<b-dropdown>` documentation](/docs/components/dropdown) for details on the
effects and usage of these props.

## Internationalization

TBD

### Forcing 12 or 24 hour interface

TBD

## Accessibility

The popup time supports the same keyboard controls as
[`<b-time>`](/docs/components/time#accessibility), along with the following:

- <kbd>ESC</kbd> will close the popup time without selecting a time

When internationalizing the timepicker, it is important to also update the `label-*` props with
appropriate translated strings, so that international screen reader users will hear the correct
prompts and descriptions.

Refer to the [`<b-time>`](/docs/components/time#accessibility) documentation for additional details.

## Implementation notes

`<b-form-timepicker>` is based upon the components [`<b-time>`](/docs/components/time) and
[`<b-dropdown>`](/docs/components/dropdown).

`<b-form-timepicker>` uses Bootstrap's margin, padding, border, and flex utility classes, along with
button (`btn-*`) classes, and the `form-control*` (plus validation) classes.

BootstrapVue's Custom SCSS/CSS is also required for proper styling of the time picker and popup.

## See also

- [`<b-time>` Time selection widget](/docs/components/time)
- [`<b-form-datepicker>` Date picker custom form input](/docs/components/form-datepicker)
- [`<b-calendar>` Calendar date selection widget](/docs/components/calendar)
- [`<b-dropdown>` Dropdown component](/docs/components/dropdown)
