<template>
  <b-collapse id="bd-docs-nav" tag="nav" is-nav class="bd-links">
    <router-link
      v-for="group in nav"
      :key="group.base"
      tag="div"
      class="bd-toc-item"
      :to="`/docs/${group.base}`"
      active-class="active"
      :exact="group.exact"
    >
      <router-link
        class="bd-toc-link"
        :to="`/docs/${group.base}`"
        :exact="group.exact"
      >
        {{ group.title }}
        <b-badge v-if="group.new" tag="small" variant="success" class="text-uppercase">New</b-badge>
        <b-badge v-if="group.beta" tag="small" variant="warning" class="text-uppercase">Beta</b-badge>
        <b-badge v-if="group.breaking" tag="small" variant="danger" class="text-uppercase">Breaking change</b-badge>
      </router-link>

      <b-nav class="bd-sidenav">
        <b-nav-item
          v-for="page in group.pages"
          :key="page.title"
          :to="`/docs/${group.base}${page.slug}`.replace(/\/\//g, '/')"
          active-class="active"
        >
          {{ page.title }}
          <b-badge v-if="page.new" tag="small" variant="success" class="text-uppercase">New</b-badge>
          <b-badge v-if="page.beta" tag="small" variant="warning" class="text-uppercase">Beta</b-badge>
          <b-badge v-if="page.breaking" tag="small" variant="danger" class="text-uppercase">Breaking change</b-badge>
          <b-badge v-if="page.enhanced" tag="small" variant="info" class="text-uppercase">Enhanced</b-badge>
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
