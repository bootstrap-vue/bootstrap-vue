# Skeleton

> `<b-skeleton>` is a BootstrapVue custom component, that allows you to display a loading state
> while your data is being fetched.

**Example: Basic usage**

```html
<template>
  <div>
    <b-checkbox v-model="isLoading">Toggle loading</b-checkbox>

    <b-skeleton-wrapper :loading="isLoading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
      </template>

      <b-card>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra nunc sapien, non rhoncus elit tincidunt vitae. Vestibulum maximus, ligula eu feugiat molestie, massa diam imperdiet odio, vitae viverra ligula est id nisi. Aliquam ut molestie est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus at consequat dui. Aenean tristique sagittis quam, sit amet sollicitudin neque sodales in.
      </b-card>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: true
      }
    }
  }
</script>

<!-- b-skeleton.vue -->
```

## Skeleton types

Description..

```html
<h5>Text (default)</h5>
<b-skeleton></b-skeleton>
<h5>Avatar</h5>
<b-skeleton type="avatar"></b-skeleton>
<h5>Input</h5>
<b-skeleton type="input"></b-skeleton>
<h5>Button</h5>
<b-skeleton type="button"></b-skeleton>
<!-- b-skeleton-types.vue -->
```

## Skeleton animations

`<b-skeleton>` supports various animations. You can set them per component or change it globally in
the [settings](/docs/reference/settings).

```html
<h5>Wave (default)</h5>
<b-skeleton animation="wave"></b-skeleton>
<h5>Fade</h5>
<b-skeleton animation="fade"></b-skeleton>
<h5>Throb</h5>
<b-skeleton animation="throb"></b-skeleton>
<h5>None</h5>
<b-skeleton animation></b-skeleton>
<!-- b-skeleton-animations.vue -->
```

## Helper components

Utilize `<b-skeleton>` helper components to quickly scaffold exisiting components like a `table`

### Table

Description...

```html
<b-skeleton-table :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }"}></b-skeleton-table>
<!-- b-skeleton-helper-table.vue -->
```

### Image

Utilize `<b-skeleton-image>` to represent an image. It utilizes a 16:9 by default to have a
responsive size. You can overwrite this by applying `no-aspect` and utilize the `height` and `width`
props to set your own sizing.

```html
<b-row>
  <b-col>
    <b-skeleton-image></b-skeleton-image>
  </b-col>
  <b-col>
    <b-skeleton-image></b-skeleton-image>
  </b-col>
  <b-col cols="12" class="mt-3">
    <b-skeleton-image no-aspect height="150px"></b-skeleton-image>
  </b-col>
</b-row>
<!-- b-skeleton-helper-image.vue -->
```

#### Card Image

You can also utilize `<b-skeleton-image>` to represent images in `<b-card>`. Remember to set the
`card-image` prop to the position of the image. This will apply the proper border-radius.

```html
<b-row>
  <b-col cols="12" md="6">
    <h5>Image top</h5>
    <b-card no-body img-top>
      <b-skeleton-image card-image="top" aspect="3:1"></b-skeleton-image>
      <b-card-body>
        Some quick example text to build on the card and make up the bulk of the card's content.
      </b-card-body>
    </b-card>
  </b-col>
  <b-col cols="12" md="6">
    <h5>Image bottom</h5>
    <b-card no-body img-bottom>
      <b-card-body>
      	Some quick example text to build on the card and make up the bulk of the card's content.
      </b-card-body>
      <b-skeleton-image card-image="bottom" aspect="3:1"></b-skeleton-image>
    </b-card>
  </b-col>
</b-row>

<b-row class="mt-md-3">
  <b-col cols="12" md="6">
    <h5>Image left</h5>
    <b-card no-body img-left>
      <b-skeleton-image card-image="left" width="225px"></b-skeleton-image>
      <b-card-body>
      	Some quick example text to build on the card and make up the bulk of the card's content.
      </b-card-body>
    </b-card>
  </b-col>
	<b-col cols="12" md="6">
    <h5>Image right</h5>
    <b-card no-body img-right>
      <b-skeleton-image card-image="right" width="225px"></b-skeleton-image>
      <b-card-body>
      	Some quick example text to build on the card and make up the bulk of the card's content.
      </b-card-body>
    </b-card>
  </b-col>
</b-row>

<!-- b-skeleton-helper-card-image.vue -->
```
