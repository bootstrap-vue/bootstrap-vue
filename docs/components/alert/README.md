# Alerts

> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

```html
<template>
  <div>
   <b-alert show>
        Default Alert
    </b-alert>

    <b-alert variant="success" show>
        Success Alert
    </b-alert>

    <b-alert variant="danger" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
        Dismissible Alert!
    </b-alert>

    <b-alert :show="dismissCountDown" variant="warning" @dismiss-count-down="countDownChanged">
        This alert will dismiss after {{dismissCountDown}} seconds...
    </b-alert>

    <b-btn @click="showAlert" variant="info" class="m-1">Show alert with count-down timer</b-btn>
    <b-btn @click="showDismissibleAlert=true" variant="info" class="m-1">
        Show dismissible alert ({{showDismissibleAlert?'visible':'hidden'}})
    </b-btn>
  </div>
</template>

<script>
export default {
  data: {
    dismissCountDown: null,
    showDismissibleAlert: false
  },
  methods: {
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = 5
      }
  }
}
</script>

<!-- alert.vue -->
```

### Alert contextual variants
For proper styling of `<b-alert>`, use one of the four required contextual variants by setting the
`variant` prop to one of the following: `info`, `success`, `warning` or `danger`.
The default is `info`.

#### Conveying meaning to assistive technologies:
Using color variants to add meaning only provides a visual indication, which will not
be conveyed to users of assistive technologies – such as screen readers. Ensure that
information denoted by the color is either obvious from the content itself (e.g. the
visible text), or is included through alternative means, such as additional text hidden
with the .sr-only class.

### Additional content inside alerts
`<b-alerts>` can also contain additional HTML elements like headings and paragraphs,
which will be styled with the appropriate color matching the variant.

#### Color of links within alerts:
Use the `.alert-link` utility CSS class to quickly provide matching colored links
within any alert.

### Dismissing
Using the `dismissible` prop it’s possible to dismiss any `<b-alert>` inline. This will add 
a close `X` button.  use the `dismiss-label` to change the hidden label text associated
with the dismiss button.

#### Auto dismissing alerts:
To create a `<b-alert>` that dismisses automatically after a period of time, set 
the `show` prop to the number of seconds you would like the `<b-alert>` to remain visible for.

Note that the dismiss button will not be shown for auto-dismissing alerts.
