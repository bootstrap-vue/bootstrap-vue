# Alerts

> Provide contextual feedback messages for typical user actions with the handful of available and
> flexible alert messages.

Alerts are available for any length of text, as well as an optional dismiss button (and optional
auto-dismissing).

```html
<template>
  <div>
    <b-alert show>Default Alert</b-alert>

    <b-alert variant="success" show>Success Alert</b-alert>

    <b-alert variant="danger" dismissible v-model="showDismissibleAlert">
      Dismissible Alert!
    </b-alert>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px" />
    </b-alert>

    <b-button @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-button>
    <b-button @click="showDismissibleAlert=true" variant="info" class="m-1">
      Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})
    </b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dismissSecs: 10,
        dismissCountDown: 0,
        showDismissibleAlert: false
      }
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>

<!-- b-alert.vue -->
```

## Visible state

Use the `show` prop to control the visibility state of the alert. By default alerts are **not**
shown. Set the prop `show` to explicitly display them.

The `show` prop accepts boolean `true` or `false` to show and hide the alert respectively. It can
also be set to a positive integer (representing seconds) to create a self dismissing alert. See the
[Auto Dismissing Alerts](#auto-dismissing-alerts) section below for details.

### Alert `v-model` support

You can use the `v-model` directive to create two-way data bindings on the `show` prop as in
`v-model="showDismissibleAlert"` above. Useful when you use dismissible because when user closes the
alert, your variable will be updated. Do not use the `show` prop when using `v-model`.

## Alert contextual variants

For proper styling of `<b-alert>`, use one of the four required contextual variants by setting the
`variant` prop to one of the following: `info`, `success`, `warning` or `danger`. The default is
`info`.

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

<!-- b-alert-variants.vue -->
```

### Conveying meaning to assistive technologies:

Using color variants to add meaning only provides a visual indication, which will not be conveyed to
users of assistive technologies – such as screen readers. Ensure that information denoted by the
color is either obvious from the content itself (e.g. the visible text), or is included through
alternative means, such as additional text hidden with the `.sr-only` class.

## Additional content inside alerts

`<b-alerts>` can also contain additional HTML elements like headings and paragraphs, which will be
styled with the appropriate color matching the variant.

```html
<div>
  <b-alert show variant="success">
    <h4 class="alert-heading">Well done!</h4>
    <p>
      Aww yeah, you successfully read this important alert message. This example text is going to
      run a bit longer so that you can see how spacing within an alert works with this kind of
      content.
    </p>
    <hr />
    <p class="mb-0">
      Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
    </p>
  </b-alert>
</div>

<!-- b-alert-content.vue -->
```

### Color of links within alerts

Use the `.alert-link` utility CSS class to quickly provide matching colored links within any alert.
Use on `<a>` or `<b-link>`.

```html
<div>
  <b-alert show variant="primary"><a href="#" class="alert-link">Primary Alert</a></b-alert>
  <b-alert show variant="secondary"><a href="#" class="alert-link">Secondary Alert</a></b-alert>
  <b-alert show variant="success"><a href="#" class="alert-link">Success Alert</a></b-alert>
  <b-alert show variant="danger"><a href="#" class="alert-link">Danger Alert</a></b-alert>
  <b-alert show variant="warning"><a href="#" class="alert-link">Warning Alert</a></b-alert>
  <b-alert show variant="info"><a href="#" class="alert-link">Info Alert</a></b-alert>
  <b-alert show variant="light"><a href="#" class="alert-link">Light Alert</a></b-alert>
  <b-alert show variant="dark"><a href="#" class="alert-link">Dark Alert</a></b-alert>
</div>

<!-- b-alert-links.vue -->
```

## Dismissible alerts

Using the `dismissible` prop it’s possible to dismiss any `<b-alert>` inline. This will add a close
`X` button. Use the `dismiss-label` prop to change the hidden label text associated with the dismiss
button.

```html
<div>
  <b-alert show dismissible>
    Dismissible Alert! Click the close button over there <b>&rArr;</b>
  </b-alert>
</div>

<!-- b-alert-dismiss.vue -->
```

### Auto dismissing alerts

To create a `<b-alert>` that dismisses automatically after a period of time, set the `show` prop (or
the `v-model`) to the number of seconds you would like the `<b-alert>` to remain visible for. Only
integer number of seconds are supported.

```html
<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      This alert will dismiss after {{ dismissCountDown }} seconds...
    </b-alert>
    <b-button @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dismissSecs: 5,
        dismissCountDown: 0
      }
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>

<!-- b-alert-auto-dismissing.vue -->
```

## Fading alerts

Use the `fade` prop to enable animation. By default alerts are not animated.

```html
<template>
  <div>
    <b-alert show dismissible fade>Dismissible Alert!</b-alert>

    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showDismissibleAlert"
      @dismissed="showDismissibleAlert=false"
    >
      Dismissible Alert!
    </b-alert>

    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      This alert will dismiss after {{ dismissCountDown }} seconds...
    </b-alert>

    <b-button @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-button>
    <b-button @click="showDismissibleAlert=true" variant="info" class="m-1">
      Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})
    </b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false
      }
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>

<!-- b-alert-fade.vue -->
```

<!-- Component reference added automatically from component package.json -->
