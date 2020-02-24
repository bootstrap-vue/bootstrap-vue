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

If no time is selected, then `<b-form-timepicker>` returns an empty string ('').

## Disabled and readonly states

TBD

## Validation states

TBD

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

TBD

### Placeholder

TBD

### Optional controls

TBD

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

TBD

## Implementation notes

TBD

## See also

- [`<b-time>` Time selection widget](/docs/components/time)
- [`<b-form-datepicker>` Date picker custom form input](/docs/components/form-datepicker)
- [`<b-calendar>` Calendar date selection widget](/docs/components/calendar)
- [`<b-dropdown>` Dropdown component](/docs/components/dropdown)
