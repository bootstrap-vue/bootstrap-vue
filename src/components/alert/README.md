# Alerts

> Provide contextual feedback messages for typical user actions with the handful of
available and flexible alert messages.

Alerts are available for any length of text, as well as an optional dismiss button
(and optional auto-dismissing).

```html
<template>
  <div>
    <b-alert show>Default Alert</b-alert>

    <b-alert variant="success" show>Success Alert</b-alert>

    <b-alert variant="danger"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
      Dismissible Alert!
    </b-alert>

    <b-alert :show="dismissCountDown"
             dismissible
             variant="warning"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      <p>This alert will dismiss after {{dismissCountDown}} seconds...</p>
      <b-progress variant="warning"
                  :max="dismissSecs"
                  :value="dismissCountDown"
                  height="4px">
      </b-progress>
    </b-alert>

    <b-btn @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-btn>
    <b-btn @click="showDismissibleAlert=true" variant="info" class="m-1">
      Show dismissible alert ({{showDismissibleAlert?'visible':'hidden'}})
    </b-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<!-- alert-1.vue -->
```

## Visible state
Use the `show` prop to control the visibility state of the alert. By
default alerts are **not** shown. Set the prop `show` to explicity display them.


## Alert contextual variants
For proper styling of `<b-alert>`, use one of the four required contextual variants by setting the
`variant` prop to one of the following: `info`, `success`, `warning` or `danger`.
The default is `info`.

```html
<div>
  <b-alert show variant="primary">Primary Alert</b-alert>
  <b-alert show variant="secondary">Secondary Alert</b-alert>
  <b-alert show variant="success">Success Alert</b-alert>
  <b-alert show variant="danger">Danger Alert</b-alert>
  <b-alert show variant="warning">Warning Alert</b-alert>
  <b-alert show variant="info">Info Alert</b-alert>
  <b-alert show variant="light">Light Alert</b-alert>
  <b-alert show variant="dark">Dark Alert</b-alert>
</div>

<!-- alert-variants-1.vue -->
```

### Conveying meaning to assistive technologies:
Using color variants to add meaning only provides a visual indication, which will not
be conveyed to users of assistive technologies – such as screen readers. Ensure that
information denoted by the color is either obvious from the content itself (e.g. the
visible text), or is included through alternative means, such as additional text hidden
with the `.sr-only` class.

## Additional content inside alerts
`<b-alerts>` can also contain additional HTML elements like headings and paragraphs,
which will be styled with the appropriate color matching the variant.

```html
<b-alert show variant="success">
  <h4 class="alert-heading">Well done!</h4>
  <p>
    Aww yeah, you successfully read this important alert message.
    This example text is going to run a bit longer so that you can see
    how spacing within an alert works with this kind of content.
  </p>
  <hr>
  <p class="mb-0">
    Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
  </p>
</b-alert>

<!-- alert-content-1.vue -->
```

### Color of links within alerts
Use the `.alert-link` utility CSS class to quickly provide matching colored links
within any alert. Use on `<a>` or `<b-link>`.

```html
<div>
  <b-alert show variant="primary">
    Primary Alert with <a href="#" class="alert-link">an example link</a>.
  </b-alert>
  <b-alert show variant="secondary">
    Secondary Alert with <a href="#" class="alert-link">an example link</a>.
  </b-alert>
  <b-alert show variant="success">
    Success Alert with <a href="#" class="alert-link">an example link</a>.
  </b-alert>
  <b-alert show variant="danger">
    Danger Alert with <a href="#" class="alert-link">an example link</a>.
  </b-alert>
  <b-alert show variant="warning">
    Warning Alert with <a href="#" class="alert-link">an example link</a>.
  </b-alert>
  <b-alert show variant="info">
    Info Alert with <a href="#" class="alert-link">an example link</a>.
  </b-alert>
  <b-alert show variant="light">
    Light Alert with <a href="#" class="alert-link">an example link</a>.
  </b-alert>
  <b-alert show variant="dark">
    Dark Alert with <b-link href="#" class="alert-link">an example link</b-link>.
  </b-alert>
</div>

<!-- alert-links-1.vue -->
```

## Dismissible alerts
Using the `dismissible` prop it’s possible to dismiss any `<b-alert>` inline. This will add
a close `X` button. Use the `dismiss-label` prop to change the hidden label text associated
with the dismiss button.

```html
<div>
  <b-alert show dismissible>
    Dismissible Alert!  Click the close button over there <b>&rArr;</b>
  </b-alert>
</div>

<!-- alert-dismis-1.vue -->
```

### Auto dismissing alerts
To create a `<b-alert>` that dismisses automatically after a period of time, set
the `show` prop to the number of seconds you would like the `<b-alert>` to remain visible for.

```html
<template>
  <div>
    <b-alert :show="dismissCountDown"
             dismissible
             variant="warning"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      This alert will dismiss after {{dismissCountDown}} seconds...
    </b-alert>
    <b-btn @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<!-- alert-auto-dismiss-1.vue -->
```

## Fading alerts
Use the `fade` prop to enable animation. By default alerts are not animated.

```html
<template>
  <div>
    <b-alert show dismissible fade>
      Dismissible Alert!
    </b-alert>
  
    <b-alert variant="danger"
             dismissible
             fade
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
      Dismissible Alert!
    </b-alert>
  
    <b-alert :show="dismissCountDown"
             dismissible
             fade
             variant="warning"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      This alert will dismiss after {{dismissCountDown}} seconds...
    </b-alert>
      
    <b-btn @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-btn>
    <b-btn @click="showDismissibleAlert=true" variant="info" class="m-1">
      Show dismissible alert ({{showDismissibleAlert?'visible':'hidden'}})
    </b-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<!-- alert-fade-1.vue -->
```

## Component Reference
