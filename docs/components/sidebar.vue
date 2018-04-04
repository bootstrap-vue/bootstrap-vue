<template>
  <b-collapse
    tag="nav"
    is-nav
    class="bd-links"
    id="bd-docs-nav">
    <router-link
      tag="div"
      class="bd-toc-item"
      v-for="group in nav"
      :key="group.base"
      :to="'/docs/' + group.base"
      active-class="active"
      :exact="group.exact">

      <router-link
        class="bd-toc-link"
        :to="'/docs/' + group.base"
        :exact="group.exact">
        {{ group.title }}
        <small
          class="badge badge-success"
          v-if="group.new">NEW</small>
        <small
          class="badge badge-warning"
          v-if="group.experimental">BETA</small>
        <small
          class="badge badge-danger"
          v-if="group.breaking">BREAKING CHANGE</small>
      </router-link>

      <b-nav class="bd-sidenav">
        <b-nav-item
          v-for="page in group.pages"
          :to="('/docs/' + group.base + page.slug).replace(/\/\//g,'/')"
          :key="page.title
          ">
          {{ page.title }}
          <b-badge
            tag="small"
            variant="success"
            v-if="page.new">NEW</b-badge>
          <b-badge
            tag="small"
            variant="warning"
            v-if="page.experimental">BETA</b-badge>
          <b-badge
            tag="small"
            variant="danger"
            v-if="page.breaking">CHANGE</b-badge>
          <b-badge
            tag="small"
            variant="info"
            v-if="page.features">ENHANCED</b-badge>
        </b-nav-item>
      </b-nav>

    </router-link>
  </b-collapse>
</template>

<style>
.bd-sidebar .nav > li > a.active {
  /*color: #0275d8;*/
  color: black;
  font-weight: bold;
}
</style>

<script>
import { nav } from '~/content'

export default {
  computed: {
    nav: () => nav
  }
}
</script>
