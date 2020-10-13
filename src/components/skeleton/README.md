# Skeleton

> `<b-skeleton>` is a BootstrapVue custom component, that allows you to display a loading state for
> several component types while your data is being fetched or computed.

**Example: Basic usage**

```html
<template>
  <div>
    <div class="d-flex align-items-center mb-3">
      <b-progress class="w-100" :max="maxLoadingTime" height="1.5rem">
        <b-progress-bar :value="loadingTime" :label="`${((loadingTime / maxLoadingTime) * 100).toFixed(2)}%`"></b-progress-bar>
      </b-progress>

      <b-button class="ml-3" @click="startLoading()">Reload</b-button>
    </div>

    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card>
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
      </template>

      <b-card>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra nunc sapien,
        non rhoncus elit tincidunt vitae. Vestibulum maximus, ligula eu feugiat molestie,
        massa diam imperdiet odio, vitae viverra ligula est id nisi. Aliquam ut molestie est.
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
        turpis egestas. Phasellus at consequat dui. Aenean tristique sagittis quam,
        sit amet sollicitudin neque sodales in.
      </b-card>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        loadingTime: 0,
        maxLoadingTime: 3
      }
    },
    watch: {
      loading(newVal, oldValue) {
        if (newVal !== oldValue) {
          this.clearLoadingTimeInterval()

          if (newVal) {
            this.$_loadingTimeInterval = setInterval(() => {
              this.loadingTime++
            }, 1000)
          }
        }
      },
      loadingTime(newVal, oldValue) {
        if (newVal !== oldValue) {
          if (newVal === this.maxLoadingTime) {
            this.loading = false
          }
        }
      }
    },
    created() {
      this.$_loadingTimeInterval = null
    },
    mounted() {
      this.startLoading()
    },
    methods: {
      clearLoadingTimeInterval() {
        clearInterval(this.$_loadingTimeInterval)
        this.$_loadingTimeInterval = null
      },
      startLoading() {
        this.loading = true
        this.loadingTime = 0
      }
    }
  }
</script>

<!-- b-skeleton.vue -->
```

## Types

`<b-skeleton>` supports various basic types, to represent various components in your project.

```html
<h5>Text (default)</h5>
<b-skeleton></b-skeleton>

<h5 class="mt-3">Avatar</h5>
<b-skeleton type="avatar"></b-skeleton>

<h5 class="mt-3">Input</h5>
<b-skeleton type="input"></b-skeleton>

<h5 class="mt-3">Button</h5>
<b-skeleton type="button"></b-skeleton>

<!-- b-skeleton-types.vue -->
```

## Skeleton animations

`<b-skeleton>` supports different animations. You can set them per component or change it globally
in the [settings](/docs/reference/settings).

```html
<h5>Wave (default)</h5>
<b-card>
  <b-skeleton animation="wave" width="85%"></b-skeleton>
  <b-skeleton animation="wave" width="55%"></b-skeleton>
  <b-skeleton animation="wave" width="70%"></b-skeleton>
</b-card>

<h5 class="mt-3">Fade</h5>
<b-card>
  <b-skeleton animation="fade" width="85%"></b-skeleton>
  <b-skeleton animation="fade" width="55%"></b-skeleton>
  <b-skeleton animation="fade" width="70%"></b-skeleton>
</b-card>

<h5 class="mt-3">Throb</h5>
<b-card>
  <b-skeleton animation="throb" width="85%"></b-skeleton>
  <b-skeleton animation="throb" width="55%"></b-skeleton>
  <b-skeleton animation="throb" width="70%"></b-skeleton>
</b-card>

<h5 class="mt-3">None</h5>
<b-card>
  <b-skeleton animation width="85%"></b-skeleton>
  <b-skeleton animation width="55%"></b-skeleton>
  <b-skeleton animation width="70%"></b-skeleton>
</b-card>

<!-- b-skeleton-animations.vue -->
```

## Helper components

Utilize `<b-skeleton>` helper components to quickly scaffold existing components.

### Table

`<b-skeleton-table>` allows you to scaffold a basic table structure by utilizing the `rows` and
`columns` props to define the size of the table. You can pass props directly to the table via the
`table-props` property, which supports the same props as `<b-table-simple>`. Refer to the
`<b-table-simple>` [documentation](/docs/components/table#comp-ref-b-table-simple) for a complete
list.

```html
<b-skeleton-table
  :rows="5"
  :columns="4"
  :table-props="{ bordered: true, striped: true }"
></b-skeleton-table>

<!-- b-skeleton-helper-table.vue -->
```

### Image

Utilize `<b-skeleton-img>` to represent images. It utilizes a 16:9 aspect ratio by default, for a
responsive sizing. You can overwrite this by applying `no-aspect` and utilize the `height` and
`width` props to set your own sizing.

```html
<b-row>
  <b-col>
    <b-skeleton-img></b-skeleton-img>
  </b-col>
  <b-col>
    <b-skeleton-img></b-skeleton-img>
  </b-col>
  <b-col cols="12" class="mt-3">
    <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
  </b-col>
</b-row>

<!-- b-skeleton-helper-img.vue -->
```

#### Card Image

Use `<b-skeleton-img>` to represent images in `<b-card>`. Remember to set the `card-img` prop to the
position of the image. This will apply the proper border-radius.

```html
<b-row>
  <b-col cols="12" md="6">
    <h5>Image top</h5>
    <b-card no-body img-top>
      <b-skeleton-img card-img="top" aspect="3:1"></b-skeleton-img>
      <b-card-body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra nunc sapien,
        non rhoncus elit tincidunt vitae.
      </b-card-body>
    </b-card>
  </b-col>
  <b-col cols="12" md="6">
    <h5>Image bottom</h5>
    <b-card no-body img-bottom>
      <b-card-body>
        Vestibulum maximus, ligula eu feugiat molestie, massa diam imperdiet odio, vitae viverra
        ligula est id nisi. Aliquam ut molestie est.
      </b-card-body>
      <b-skeleton-img card-img="bottom" aspect="3:1"></b-skeleton-img>
    </b-card>
  </b-col>
</b-row>

<b-row class="mt-md-3">
  <b-col cols="12" md="6">
    <h5>Image left</h5>
    <b-card no-body img-left>
      <b-skeleton-img card-img="left" width="225px"></b-skeleton-img>
      <b-card-body>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Phasellus at consequat dui.
      </b-card-body>
    </b-card>
  </b-col>
  <b-col cols="12" md="6">
    <h5>Image right</h5>
    <b-card no-body img-right>
      <b-skeleton-img card-img="right" width="225px"></b-skeleton-img>
      <b-card-body>
        Aenean tristique sagittis quam, sit amet sollicitudin neque sodales in.
      </b-card-body>
    </b-card>
  </b-col>
</b-row>

<!-- b-skeleton-helper-card-img.vue -->
```

## Icons

`<b-skeleton-icon>` can also be used as placeholder for icons. If you need to use any icon props,
you can pass them via the `icon-props` property.

```html
<b-skeleton-icon
  icon="person"
  :icon-props="{ fontScale: 2 }"
></b-skeleton-icon>

<b-skeleton-icon
  icon="person-fill"
  :icon-props="{ fontScale: 2, variant: 'dark' }"
></b-skeleton-icon>

<!-- b-skeleton-helper-card-icon.vue -->
```

**Note:** The `throb` animation does not work with `b-skeleton-icon`.

## Styling and customization

The `<b-skeleton>` component and helper components utilizes Bootstrap SCSS variables, as much as
possible to best match the styling and sizing of the native components. This means if you've
customized Bootstrap SCSS, the skeleton components should adapt to fit your custom theming.

We've also provided a few custom SCSS variables, that can be used to further customize the styling
of the various `<b-skeleton>` components. You can read more about how to change these variables in
the [theming section](/docs/reference/theming#bootstrapvue-sass-variables).
