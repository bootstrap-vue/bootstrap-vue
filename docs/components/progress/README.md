# Progress

> Use our custom progress component for displaying simple or complex progress bars.
We don’t use the HTML5 `<progress>` element, ensuring you can animate them, and place text labels over them.

```html
<template>
<div>
    <b-progress :value="counter" show-progress animated></b-progress>
    <b-btn class="mt-4" @click="clicked">Click me</b-btn>
</div>    
</template>

<script>
export default {
  data: {
    counter: 45,
  },
  methods: {
    clicked() {
      this.counter = Math.random() * 100;
      console.log("Change progress to " +
        Math.round(this.counter * 100) / 100);
    }
  }
}
</script>

<!-- progress-1.vue -->
```
## Value
Set the maximum value with the `max` prop (default is `100`), and the current value via the
`value` prop (default `0`). 

## Labels
Add labels to your progress bars by either enabling `show-progress` (as a percentage) or
`show-value`for the currnt absolute value. For `show-progress`, you may also set the
percentage precision (number of digits after the decimal) via the `precision` prop (default
is `0`digits after the dcimal).

Fancy more control over hte label? Provide your own label by using the default slot.

```html
<template>
  <div>
    <h5>No label</h5>
    <b-progress :value="value" :max="max" class="mb-3"></b-progress>
    <h5>Value label</h5>
    <b-progress :value="value" :max="max" show-value class="mb-3"></b-progress>
    <h5>Progress label</h5>
    <b-progress :value="value" :max="max" show-progress class="mb-3"></b-progress>
    <h5>Progress label with precision</h5>
    <b-progress :value="value" :max="max" :precision="2" show-progress class="mb-3></b-progress>
    <h5>Custom Label</h5>
    <b-progress :value="value" :max="max">
      Progress: {{ value.toFixed(3) }}
    </b-progress>
  </div>    
</template>

<script>
export default {
  data: {
    max: 50,
    value: 33.333333333
  }
}
</script>

<!-- progress-labels.vue -->
```

## Width and Height
`<b-progress>` will always expand to the maximum with of it's parent container. To
change the width, place the progress bar in a standard Bootstrap column or apply
one of the standard Bootstrap width classes.

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
  data: {
    value: 75
  }
}
</script>

<!-- progress-width.vue -->
```

The height of the prograss bar can be controled with the `height` prop. The height
value should be a standard CSS dimension (`px`, `rem`, `em`, etc). the default
is `1rem`.

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
  data: {
    value: 75
  }
}
</script>

<!-- progress-height.vue -->
```

## Backgrounds
Use background variants to change the appearance of individual progress bars.
The default variant is `primary`.

```html
<template>
  <div>
    <b-progress :value="25" variant="success" class="mb-2"></b-progress>
    <b-progress :value="50" variant="info" class="mb-2"></b-progress>
    <b-progress :value="75" variant="warning" class="mb-2"></b-progress>
    <b-progress :value="100" variant="danger" class="mb-2"></b-progress>
    <b-progress :value="66.6" variant="primary" class="mb-2"></b-progress>
    <b-progress :value="45" variant="secondary" class="mb-2"></b-progress>
    <b-progress :value="33.3" variant="dark" class="mb-2"></b-progress>
  </div>    
</template>

<!-- progress-backgrounds.vue -->
```

### Striped backgrounds
Set `striped` to apply a stripe via CSS gradient over the progress bar’s
background variant.

```html
<template>
  <div>
    <b-progress :value="25" variant="success" striped class="mb-2"></b-progress>
    <b-progress :value="50" variant="info" striped class="mb-2"></b-progress>
    <b-progress :value="75" variant="warning" striped class="mb-2"></b-progress>
    <b-progress :value="100" variant="danger" striped class="mb-2"></b-progress>
  </div>    
</template>

<!-- progress-striped.vue -->
```

### Animated backgrounds
The striped gradient can also be animated by setting the `animated`prop.

```html
<template>
  <div>
    <b-progress :value="25" variant="success" striped :animated="animate" class="mb-2"></b-progress>
    <b-progress :value="50" variant="info" striped :animated="animate" class="mb-2"></b-progress>
    <b-progress :value="75" variant="warning" striped :animated="animate" class="mb-2"></b-progress>
    <b-progress :value="100" variant="danger" striped :animated="animate" class="mb-3"></b-progress>
    <b-button variant="secondary" @click="animate = !animate">
      {{ animate ? 'Stop' : 'Start'}} Animation
    </b-button>
  </div>
</template> 

<script>
export default {
  data: {
    animate: true
  }
}
</script>

<!-- progress-animated.vue -->
```

