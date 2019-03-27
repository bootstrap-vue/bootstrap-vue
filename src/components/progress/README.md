# Progress

> Use our custom progress component for displaying simple or complex progress bars, featuring
> support for horizontally stacked bars, animated backgrounds, and text labels.

```html
<template>
  <div>
    <b-progress :value="counter" :max="max" show-progress animated></b-progress>
    <b-progress class="mt-2" :max="max" show-value>
      <b-progress-bar :value="counter*(6/10)" variant="success"></b-progress-bar>
      <b-progress-bar :value="counter*(2.5/10)" variant="warning"></b-progress-bar>
      <b-progress-bar :value="counter*(1.5/10)" variant="danger"></b-progress-bar>
    </b-progress>

    <b-button class="mt-3" @click="clicked">Click me</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 45,
        max: 100
      }
    },
    methods: {
      clicked() {
        this.counter = Math.random() * this.max
        console.log('Change progress to ' + Math.round(this.counter * 100) / 100)
      }
    }
  }
</script>

<!-- b-progress.vue -->
```

## Value

Set the maximum value with the `max` prop (default is `100`), and the current value via the `value`
prop (default `0`).

When creating multiple bars in a single process, place the value prop on the individual
`<b-progress-bar>` sub components (see the **Multiple Bars** section below for more details)

## Labels

Add labels to your progress bars by either enabling `show-progress` (percentage of max) or
`show-value`for the current absolute value. You may also set the precision (number of digits after
the decimal) via the `precision` prop (default is `0`digits after the decimal).

```html
<template>
  <div>
    <h5>No label</h5>
    <b-progress :value="value" :max="max" class="mb-3"></b-progress>

    <h5>Value label</h5>
    <b-progress :value="value" :max="max" show-value class="mb-3"></b-progress>

    <h5>Progress label</h5>
    <b-progress :value="value" :max="max" show-progress class="mb-3"></b-progress>

    <h5>Value label with precision</h5>
    <b-progress :value="value" :max="max" :precision="2" show-value class="mb-3"></b-progress>

    <h5>Progress label with precision</h5>
    <b-progress :value="value" :max="max" :precision="2" show-progress class="mb-3"></b-progress>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        max: 50,
        value: 33.333333333
      }
    }
  }
</script>

<!-- b-progress-labels.vue -->
```

### Custom progress label

Need more control over the label? Provide your own label by using the default slot within a
`<b-progress-bar>` sub-component, or by using the `label` prop on `<b-progress-bar>` (HTML
supported):

```html
<template>
  <div>
    <h5>Custom Label via Default Slot</h5>
    <b-progress :max="max" height="2rem">
      <b-progress-bar :value="value">
        Progress: <strong>{{ value.toFixed(3) }} / {{ max }}</strong>
      </b-progress-bar>
    </b-progress>

    <h5 class="mt-3">Custom Label via Prop</h5>
    <b-progress :max="max">
      <b-progress-bar :value="value" :label="`&lt;${value.toFixed(0)}&gt;`"></b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        max: 50,
        value: 33.333333333
      }
    }
  }
</script>

<!-- b-progress-custom-labels.vue -->
```

Precedence order for label methods (top-most has precedence):

- default slot of `<b-progress-bar>`
- `label` prop of `<b-progress-bar>`
- `show-progress` prop of `<b-progress-bar>`
- `show-value` prop of `<b-progress-bar>`
- `show-progress` prop of `<b-progress>`
- `show-value` prop of `<b-progress>`
- no label

## Width and Height

`<b-progress>` will always expand to the maximum with of it's parent container. To change the width,
place `<b-progress>` in a standard Bootstrap column or apply one of the standard Bootstrap width
classes.

```html
<template>
  <div>
    <h5>Default width</h5>
    <b-progress :value="value" class="mb-3"></b-progress>

    <h5>Custom widths</h5>
    <b-progress :value="value" class="w-75 mb-2"></b-progress>
    <b-progress :value="value" class="w-50 mb-2"></b-progress>
    <b-progress :value="value" class="w-25"></b-progress>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 75
      }
    }
  }
</script>

<!-- b-progress-width.vue -->
```

The height of the progress bar can be controlled with the `height` prop. The height value should be
a standard CSS dimension (`px`, `rem`, `em`, etc). The default height is `1rem`.

```html
<template>
  <div>
    <h5>Default height</h5>
    <b-progress :value="value" show-progress class="mb-3"></b-progress>

    <h5>Custom heights</h5>
    <b-progress height="2rem" :value="value" show-progress class="mb-2"></b-progress>
    <b-progress height="20px" :value="value" show-progress class="mb-2"></b-progress>
    <b-progress height="2px" :value="value"></b-progress>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 75
      }
    }
  }
</script>

<!-- b-progress-height.vue -->
```

## Backgrounds

Use background variants to change the appearance of individual progress bars. The default variant is
`primary`.

### Solid background variants

```html
<template>
  <div>
    <div v-for="bar in bars" class="row mb-1">
      <div class="col-sm-2">{{ bar.variant }}:</div>
      <div class="col-sm-10 pt-1">
        <b-progress :value="bar.value" :variant="bar.variant" :key="bar.variant"></b-progress>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bars: [
          { variant: 'success', value: 75 },
          { variant: 'info', value: 75 },
          { variant: 'warning', value: 75 },
          { variant: 'danger', value: 75 },
          { variant: 'primary', value: 75 },
          { variant: 'secondary', value: 75 },
          { variant: 'dark', value: 75 }
        ],
        timer: null
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.bars.forEach(bar => (bar.value = 25 + Math.random() * 75))
      }, 2000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    }
  }
</script>

<!-- b-progress-backgrounds.vue -->
```

### Striped backgrounds

Set `striped` to apply a stripe via CSS gradient over the progress bar’s background variant.

```html
<template>
  <div>
    <b-progress :value="25" variant="success" :striped="striped"></b-progress>
    <b-progress :value="50" variant="info" :striped="striped" class="mt-2"></b-progress>
    <b-progress :value="75" variant="warning" :striped="striped" class="mt-2"></b-progress>
    <b-progress :value="100" variant="danger" :striped="striped" class="mt-2"></b-progress>

    <b-button variant="secondary" @click="striped = !striped" class="mt-3">
      {{ striped ? 'Remove' : 'Add' }} Striped
    </b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        striped: true
      }
    }
  }
</script>

<!-- b-progress-striped.vue -->
```

### Animated backgrounds

The striped gradient can also be animated by setting the `animated`prop.

```html
<template>
  <div>
    <b-progress :value="25" variant="success" striped :animated="animate"></b-progress>
    <b-progress :value="50" variant="info" striped :animated="animate" class="mt-2"></b-progress>
    <b-progress :value="75" variant="warning" striped :animated="animate" class="mt-2"></b-progress>
    <b-progress :value="100" variant="danger" :animated="animate" class="mt-3"></b-progress>

    <b-button variant="secondary" @click="animate = !animate" class="mt-3">
      {{ animate ? 'Stop' : 'Start' }} Animation
    </b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        animate: true
      }
    }
  }
</script>

<!-- b-progress-animated.vue -->
```

Notes:

- if `animated` is true, `striped` will automatically be enabled.
- Animated progress bars don’t work in Opera 12 — as they don’t support CSS3 animations.

## Multiple bars

Include multiple `<b-progress-bar>` sub-components in a `<b-progress>` component to build a
horizontally stacked set of progress bars.

```html
<template>
  <div>
    <b-progress :max="max" class="mb-3">
      <b-progress-bar variant="primary" :value="values[0]"></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]"></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]"></b-progress-bar>
    </b-progress>

    <b-progress show-progress :max="max" class="mb-3">
      <b-progress-bar variant="primary" :value="values[0]"></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]"></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]"></b-progress-bar>
    </b-progress>

    <b-progress show-value striped :max="max" class="mb-3">
      <b-progress-bar variant="primary" :value="values[0]"></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]"></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]"></b-progress-bar>
    </b-progress>

    <b-progress :max="max">
      <b-progress-bar variant="primary" :value="values[0]" show-progress></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]" animated show-progress></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]" striped show-progress></b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        max: 100,
        values: [15, 30, 20]
      }
    }
  }
</script>

<!-- b-progress-multiple.vue -->
```

`<b-progress-bar>` will inherit most of the props from the `<b-progress>` parent component, but you
can override any of the props by setting them on the `<b-progress-bar>`

Notes:

- `height`, if specified, should always set on the `<b-progress>` component.
- `<b-progress-bar>` will not inherit `value` from `<b-progress>`.

<!-- Component reference added automatically from component package.json -->
