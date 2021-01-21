# Overlay

> BootstrapVue's custom `b-overlay` component is used to _visually obscure_ a particular element or
> component and its content. It signals to the user of a state change within the element or
> component and can be used for creating loaders, warnings/alerts, prompts, and more.

## Overview

`<b-overlay>` can be used to obscure almost anything. [Example use cases](#use-case-examples) would
be forms, tables, delete confirmation dialogs, or anywhere you need to signal that the application
is busy performing a background task, to signal that a certain component is unavailable, or to
provide additional context to the end user.

`<b-overlay>` can be used to overlay (wrap) an element or component (the default behaviour), or can
be placed as a descendant of a `position: relative` element
([non-wrapping mode](#non-wrapping-mode)).

The overlay visibility is controlled via the `show` prop. By default the overlay is _not_ shown.

<div class="alert alert-info">
  <p class="mb-0">
    Note that this component only <em>visually obscures</em> its content (or the page). Refer to the
    <a href="#accessibility" class="alert-link">Accessibility section</a> below for additional
    accessibility details and concerns.
  </p>
</div>

**Default wrapping mode example:**

```html
<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <b-card title="Card with overlay" :aria-hidden="show ? 'true' : null">
        <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
    </b-overlay>
    <b-button class="mt-3" @click="show = !show">Toggle overlay</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>

<!-- b-overlay.vue -->
```

## Options

There are many options available for styling the overlay, and for providing custom content within
the overlay.

### Overlay backdrop color

You can control the backdrop background color via the `variant` prop. The variant is translated into
one of Bootstrap's
[background variant utility classes](/docs/reference/color-variants#background-and-border-variants).
Control the opacity of the backdrop via the `opacity` prop (opacity values can range from `0` to
`1`). And background blurring can be controlled via the `blur` prop.

```html
<template>
  <div>
    <b-row>
      <b-col lg="6" aria-controls="overlay-background">
        <b-form-group label="Variant" label-for="bg-variant" label-cols-sm="4" label-cols-lg="12">
          <b-form-select id="bg-variant" v-model="variant" :options="variants"></b-form-select>
        </b-form-group>

        <b-form-group label="Opacity" label-for="bg-opacity" label-cols-sm="4" label-cols-lg="12">
          <b-input-group>
            <b-form-input
              id="bg-opacity"
              v-model="opacity"
              type="range"
              number
              min="0"
              max="1"
              step="0.01"
            ></b-form-input>
            <b-input-group-append is-text class="text-monospace">
              {{ opacity.toFixed(2) }}
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Blur" label-for="bg-blur" label-cols-sm="4" label-cols-lg="12">
          <b-form-select id="bg-blur" v-model="blur" :options="blurs"></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-overlay
          id="overlay-background"
          show
          :variant="variant"
          :opacity="opacity"
          :blur="blur"
          rounded="sm"
        >
          <b-card title="Card with overlay" aria-hidden="true">
            <b-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </b-card-text>

            <b-button disabled variant="primary">Button</b-button>
          </b-card>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        variant: 'light',
        opacity: 0.85,
        blur: '2px',
        variants: [
          'transparent',
          'white',
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ],
        blurs: [
          { text: 'None', value: '' },
          '1px',
          '2px',
          '5px',
          '0.5em',
          '1rem'
        ]
      }
    }
  }
</script>

<!-- b-overlay-background.vue -->
```

As an alternative to the `variant` prop, you can specify a CSS color string value via the `bg-color`
prop. When a value is provided for `bg-color`, the `variant` prop value is ignored.

**Notes:**

- Background blurring is not available on some browsers (e.g. IE 11).
- Blurring requires that the opacity level be relatively high for the effect to be visible.

### Fade transition

By default, the overlay uses Bootstrap's fade transition when showing or hiding. You can disable the
fade transition via adding the `no-fade` prop to `<b-overlay>`.

### Default spinner styling

The default overlay content is a [`<b-spinner>`](/docs/components/spinner) of type `'border'`. You
can control the appearance of the spinner via the following props:

- `spinner-type`: Currently supported values are `'border'` (the default) or `'grow'`.
- `spinner-variant`: Variant theme color for the spinner. Default is `null` which inherits the
  current font color.
- `spinner-small`: Set to `true` to render a small size spinner.

```html
<template>
  <div>
    <b-overlay
      show
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
      style="max-width: 320px;"
    >
      <b-card title="Card with spinner style" aria-hidden="true">
        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </b-card-text>
        <b-button disabled variant="primary">Button</b-button>
      </b-card>
    </b-overlay>
  </div>
</template>

<!-- b-overlay-spinner-style.vue -->
```

### Overlay corner rounding

By default, the overlay backdrop has square corners. If the content you are wrapping has rounded
corners, you can use the `rounded` prop to apply rounding to the overlay's corners to match the
obscured content's rounded corners.

Possible values are:

- `true` (or the empty string `''`) to apply default (medium) rounding
- `false` (the default) applies no rounding to the backdrop overlay
- `'sm'` for small rounded corners
- `'lg'` for large rounded corners
- `'pill'` for pill style rounded corners
- `'circle'` for circular (or oval) rounding
- `'top'` for rounding only the top two corners
- `'bottom'` for rounding only the bottom two corners
- `'left'` for rounding only the two left corners
- `'right'` for rounding only the two right corners

```html
<template>
  <div>
    <b-button @click="show = !show">Toggle overlay</b-button>
    <b-row class="text-center mt-3">
      <b-col md="6">
        <p>With rounding</p>
        <b-overlay :show="show" class="d-inline-block" rounded="circle">
          <b-img thumbnail rounded="circle" fluid src="https://picsum.photos/200/200/?image=54" alt="Image 1"></b-img>
        </b-overlay>
      </b-col>
      <b-col md="6">
        <p>Without rounding</p>
        <b-overlay :show="show" class="d-inline-block">
          <b-img thumbnail rounded="circle" fluid src="https://picsum.photos/200/200/?image=54" alt="Image 1"></b-img>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true
      }
    }
  }
</script>

<!-- b-overlay-rounded.vue -->
```

### Custom overlay content

Place custom content in the overlay (replacing the default spinner) via the optionally scoped slot
`overlay`.

```html
<template>
  <div>
    <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
      <b-card title="Card with custom overlay content" :aria-hidden="show ? 'true' : null">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button ref="show" :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
      <template #overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
          <b-button
            ref="cancel"
            variant="outline-danger"
            size="sm"
            aria-describedby="cancel-label"
            @click="show = false"
          >
            Cancel
          </b-button>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      onShown() {
        // Focus the cancel button when the overlay is showing
        this.$refs.cancel.focus()
      },
      onHidden() {
        // Focus the show button when the overlay is removed
        this.$refs.show.focus()
      }
    }
  }
</script>

<!-- b-overlay-overlay-slot.vue -->
```

The following scope properties are available to the `overlay` slot:

| Property         | Description                         |
| ---------------- | ----------------------------------- |
| `spinnerVariant` | Value of the `spinner-variant` prop |
| `spinnerType`    | Value of the `spinner-type` prop    |
| `spinnerSmall`   | Value of the `spinner-small` prop   |

When placing interactive content in the overlay, you should focus the container of the custom
content or one of the focusable controls in the overlay content for accessibility reasons. You can
listen for the `<b-overlay>` `'shown'` event to know when the overlay content is available in the
document.

### Overlay content centering

By default the overlay content will be horizontally and vertically centered within the overlay
region. To disable centering, set the `no-center` prop to `true`.

In the following example, we have set the `no-center` prop, and absolutely positioned the custom
overlay slot content at the top right.

```html
<template>
  <div>
    <b-overlay no-center show rounded="sm">
      <template #overlay>
        <b-icon
          icon="stopwatch"
          variant="info"
          scale="2"
          shift-v="8"
          shift-h="8"
          class="position-absolute"
          style="top: 0; right: 0"
        ></b-icon>
      </template>
      <b-card title="Card with no-center overlay" aria-hidden="true">
        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </b-card-text>
        <b-button disabled variant="primary">Button</b-button>
      </b-card>
    </b-overlay>
  </div>
</template>

<!-- b-overlay-no-center.vue -->
```

### Width

`<b-overlay>` defaults to a width of `100%`. When wrapping an inline or inline-block element, you
will need to add the class `d-inline-block` (e.g. `<b-overlay class="d-inline-block">`).

You can also use the width [utility classes](/docs/reference/utility-classes) or CSS styles to
control the width of the overlay's wrapping container element.

### Non-wrapping mode

By default, `<b-overlay>` wraps the content of the default slot. In some cases you may want to
obscure a parent container. Use the `no-wrap` prop to disable rendering of the wrapping (and ignore
the default slot). Note that this requires that the ancestor element that is to be obscured to have
relative positioning (either via the utility class `'position-relative'`, or CSS style
`'position: relative;'`).

```html
<template>
  <div>
    <div class="position-relative p-4 bg-info">
      <p class="text-light font-weight-bold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <b-card title="Card with parent overlay">
        <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
      <p class="text-light font-weight-bold mb-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <b-overlay :show="show" no-wrap>
      </b-overlay>
    </div>
    <b-button class="mt-3" @click="show = !show">Toggle overlay</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>

<!-- b-overlay-nowrap.vue -->
```

Note that some of Bootstrap v4's component styles have relative positioning defined (e.g. cards,
cols, etc.). You may need to adjust the placement of `<b-overlay>` in your markup.

For example, `<b-card>` has relative positioning, so you can place the `<b-overlay no-wrap>` as a
descendant of `<b-card>`:

```html
<template>
  <div>
    <b-card header="Card header" footer="Card footer">
      <b-media>
        <template #aside>
          <b-img
            thumbnail
            rounded="circle"
            src="https://picsum.photos/72/72/?image=58"
            alt="Image"
          ></b-img>
        </template>
        <p class="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </b-media>
      <b-overlay :show="show" no-wrap></b-overlay>
    </b-card>
    <b-button @click="show = !show" class="mt-3">Toggle overlay</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true
      }
    }
  }
</script>

<!-- b-overlay-card-relative.vue -->
```

When in `no-wrap` mode, `<b-overlay>` will not set the `aria-busy` attribute on the obscured
element. You may also want to use an `aria-live` region in your app that announces to screen reader
users that the page is busy.

Refer to the [Accessibility section](#accessibility) below for additional details and concerns.

#### Absolute vs fixed positioning for `no-wrap`

In cases where you want to obscure the entire app or page, when using the `no-wrap` prop, you can
switch to viewport fixed positioning via setting the prop `fixed` on `<b-overlay>`. Note that this
does not disable scrolling of the page, and note that any interactive elements on the page will
still be in the document tab sequence.

You may also need to adjust the [z-index of the overlay](#overlay-z-index) to ensure that the
backdrop appears above all other page elements. Use the `z-index` property to override the default
`z-index` value.

Refer to the [Accessibility section](#accessibility) below for additional details and concerns.

### Overlay z-index

In some circumstances, you may need to adjust the `z-index` used by the overlay (depending on
positioning in the DOM or the content being obscured). Simply set the `z-index` prop with a value
suitable for your application or use case. The default `z-index` is `10`.

## Accessibility

Note that the overlay is visual only. You **must** disable any interactive elements (buttons, links,
etc.) when the overlay is showing, otherwise the obscured elements will still be reachable via
keyboard navigation (i.e. still in the document tab sequence).

If you have any links in the obscured content, we recommend using the
[`<b-link>` component](/docs/components/link), as it supports the `disabled` state, as native links
(`<a href="...">`) and `<router-link>` components do not support the disabled state.

It is also recommended to add either the `aria-hidden="true"` or `aria-busy="true"` attribute to
your obscured content when the overlay is visible. Just be careful not to add `aria-hidden="true"`
to the wrapper that contains the `<b-overlay>` component (when using `no-wrap`), as that would hide
any interactive content in the `overlay` slot for screen reader users.

If you are placing interactive content in the `overlay` slot, you should focus the content once the
`'shown'` event has been emitted. You can use the `hidden` event to trigger returning focus to an
element as needed when the overlay is no longer visible.

When using the wrapping mode (prop `no-wrap` is not set), the wrapper will have the attribute
`aria-busy="true"` set, to allow screen reader users to know that the wrapped content is in a busy
or loading state. When prop `no-wrap` is set, the attribute will _not_ be applied.

When using the `no-wrap` prop, and potentially the `fixed` prop, to obscure the entire application
or page, you must ensure that all internative page elements (other than the content of the overlay)
have been disabled and are _not_ in the document tab sequence.

## Use case examples

Here are just a few examples of common use cases of `<b-overlay>`. In all cases, we disable any
interactive elements in the obscured area to prevent reachability via keyboard navigation (i.e.
<kbd>Tab</kbd> key) or screen reader access.

Please refer to the [Accessibility section](#accessibility) for additional details and concerns.

### Loading button

Easily create a loading button:

```html
<template>
  <div>
    <b-overlay
      :show="busy"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
      class="d-inline-block"
      @hidden="onHidden"
    >
      <b-button
        ref="button"
        :disabled="busy"
        variant="primary"
        @click="onClick"
      >
        Do something
      </b-button>
    </b-overlay>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        busy: false,
        timeout: null
      }
    },
    beforeDestroy() {
      this.clearTimeout()
    },
    methods: {
      clearTimeout() {
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
        }
      },
      setTimeout(callback) {
        this.clearTimeout()
        this.timeout = setTimeout(() => {
          this.clearTimeout()
          callback()
        }, 5000)
      },
      onHidden() {
        // Return focus to the button once hidden
        this.$refs.button.focus()
      },
      onClick() {
        this.busy = true
        // Simulate an async request
        this.setTimeout(() => {
          this.busy = false
        })
      }
    }
  }
</script>

<!-- b-overlay-example-loading-button.vue -->
```

### Busy state input group

In this example, we obscure the input and button:

```html
<template>
  <div>
    <b-overlay :show="busy" rounded="lg" opacity="0.6" @hidden="onHidden">
      <template #overlay>
        <div class="d-flex align-items-center">
          <b-spinner small type="grow" variant="secondary"></b-spinner>
          <b-spinner type="grow" variant="dark"></b-spinner>
          <b-spinner small type="grow" variant="secondary"></b-spinner>
          <!-- We add an SR only text for screen readers -->
          <span class="sr-only">Please wait...</span>
        </div>
      </template>
      <b-input-group size="lg" :aria-hidden="busy ? 'true' : null">
        <b-form-input v-model="value" :disabled="busy"></b-form-input>
        <b-input-group-append>
          <b-button ref="button" :disabled="busy" variant="primary"  @click="onClick">
            Do something
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-overlay>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 'Some value',
        busy: false,
        timeout: null
      }
    },
    beforeDestroy() {
      this.clearTimeout()
    },
    methods: {
      clearTimeout() {
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
        }
      },
      setTimeout(callback) {
        this.clearTimeout()
        this.timeout = setTimeout(() => {
          this.clearTimeout()
          callback()
        }, 5000)
      },
      onHidden() {
        // Return focus to the button
        this.$refs.button.focus()
      },
      onClick() {
        this.busy = true
        // Simulate an async request
        this.setTimeout(() => {
          this.busy = false
        })
      }
    }
  }
</script>

<!-- b-overlay-example-input-group.vue -->
```

### Form confirmation prompt and upload status

This example is a bit more complex, but shows the use of `no-wrap`, and using the `overlay` slot to
present the user with a prompt dialog, and once confirmed it shows a uploading status indicator.
This example also demonstrates additional accessibility markup.

```html
<template>
  <div>
    <b-form class="position-relative p-3" @submit.prevent="onSubmit">
      <b-form-group label="Name" label-for="form-name" label-cols-lg="2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input id="form-name" :disabled="busy"></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group label="Email" label-for="form-mail" label-cols-lg="2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="envelope-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input id="form-email" type="email" :disabled="busy"></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group label="Image" label-for="form-image" label-cols-lg="2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="image-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-file id="form-image" :disabled="busy" accept="image/*"></b-form-file>
        </b-input-group>
      </b-form-group>

      <div class="d-flex justify-content-center">
         <b-button ref="submit" type="submit" :disabled="busy">Submit</b-button>
      </div>

      <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
        <template #overlay>
          <div v-if="processing" class="text-center p-4 bg-primary text-light rounded">
            <b-icon icon="cloud-upload" font-scale="4"></b-icon>
            <div class="mb-3">Processing...</div>
            <b-progress
              min="1"
              max="20"
              :value="counter"
              variant="success"
              height="3px"
              class="mx-n4 rounded-0"
            ></b-progress>
          </div>
          <div
            v-else
            ref="dialog"
            tabindex="-1"
            role="dialog"
            aria-modal="false"
            aria-labelledby="form-confirm-label"
            class="text-center p-3"
          >
            <p><strong id="form-confirm-label">Are you sure?</strong></p>
            <div class="d-flex">
              <b-button variant="outline-danger" class="mr-3" @click="onCancel">
                Cancel
              </b-button>
              <b-button variant="outline-success" @click="onOK">OK</b-button>
            </div>
          </div>
        </template>
      </b-overlay>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        busy: false,
        processing: false,
        counter: 1,
        interval: null
      }
    },
    beforeDestroy() {
      this.clearInterval()
    },
    methods: {
      clearInterval() {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      },
      onShown() {
        // Focus the dialog prompt
        this.$refs.dialog.focus()
      },
      onHidden() {
        // In this case, we return focus to the submit button
        // You may need to alter this based on your application requirements
        this.$refs.submit.focus()
      },
      onSubmit() {
        this.processing = false
        this.busy = true
      },
      onCancel() {
        this.busy = false
      },
      onOK() {
        this.counter = 1
        this.processing = true
        // Simulate an async request
        this.clearInterval()
        this.interval = setInterval(() => {
          if (this.counter < 20) {
            this.counter = this.counter + 1
          } else {
            this.clearInterval()
            this.$nextTick(() => {
              this.busy = this.processing = false
            })
          }
        }, 350)
      }
    }
  }
</script>

<!-- b-overlay-example-form.vue -->
```

### Using in `<b-modal>`

The modal body has `position: relative;` set, so when using `<b-overlay no-wrap ...>` in the modal
body only the modal body will be obscured. If you wish to obscure the entire modal (including the
header and footer), you will need to set the `<b-modal>` prop `body-class` to `position-static`, and
also set the `rounded` prop on `<b-overlay>`.
