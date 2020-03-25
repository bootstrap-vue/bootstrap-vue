# Aspect

> The `<b-aspect>` component can be used to maintain a minimum responsive aspect ratio for content.
> When the content is longer than the available height, then the component will expand vertically
> to fit all content.

## Overview

The `<b-aspect>` component was introduced in BootstrapVue `v2.9.0`.

The default aspect ratio is `1:1` (ratio of `1`), which makes the height always be at least the same
as the width. The `aspect` prop can be used to specify an arbitrary aspect ratio (i.e. `1.5`) or a
ratio as a string such as `'16:9'` or `'4:3'`.

The width will always be 100% of the available width in the parent element/component.

```html
<template>
  <div>
    <b-form-group label="Aspect ratio" label-for="ratio" label-cols-md="auto" class="mb-3">
      <b-form-select id="ratio" v-model="aspect" :options="aspects"></b-form-input>
    </b-form-group>
    <b-card>
      <b-aspect :aspect="aspect">
        This will always be an aspect of "{{ aspect }}",
        except when the content is too tall.
      </b-aspect>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aspect: '16:9',
        aspects: [
          { text: '4:3', value: '4:3' },
          { text: '1:1', value: '1:1' },
          { text: '16:9', value: '16:9' },
          { text: '16 / 9', value: 16 / 9 },
          { text: '4', value: 4 },
          { text: '1.5', value: 1.5 }
        ]
      }
    }
  }
</script>

<!-- b-aspect.vue -->
```

## See also

- [`<b-embed>` component](/docs/components/embed) for responsive embeds (videos, iframes, etc)
