> Form Timepicker

TBD

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

<!-- b-form-timepicker.vue -->
```

## `v-model` return value

TBD

## Disabled and readonly states

TBD

## Validation states

TBD

## Styling

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

## Accessibility

TBD

## Implementation notes

TBD

## See also

- [`<b-time>` Time selection widget](/docs/components/time)
- [`<b-form-datepicker>` Date picker custom form input](/docs/components/form-datepicker)
- [`<b-calendar>` Calendar date selection widget](/docs/components/calendar)
- [`<b-dropdown>` Dropdown component](/docs/components/dropdown)
