<template>
  <b-collapse id="bd-docs-nav" class="bd-links" tag="nav" is-nav>
    <b-link
      v-for="group in nav"
      :key="group.base"
      :to="buildUrl('/docs/', [group.base])"
      :exact="group.exact"
      router-tag="div"
      class="bd-toc-item"
      active-class="active"
    >
      <b-link
        :to="buildUrl('/docs/', [group.base])"
        :exact="group.exact"
        class="bd-toc-link"
        active-class=""
      >
        {{ group.title }}
        <b-badge v-if="group.new" tag="small" variant="success" class="text-uppercase">New</b-badge>
        <b-badge v-if="group.breaking" tag="small" variant="danger" class="text-uppercase">Breaking change</b-badge>
        <b-badge v-if="group.beta" tag="small" variant="warning" class="text-uppercase">Beta</b-badge>
      </b-link>

      <b-nav class="bd-sidenav">
        <b-link
          v-for="page in group.pages"
          :key="page.title"
          :to="buildUrl('/docs/', [group.base, page.slug])"
          router-tag="li"
          class="nav-item"
          active-class="active bd-sidenav-active"
        >
          <b-link
            :to="buildUrl('/docs/', [group.base, page.slug])"
            :exact="group.exact"
            class="nav-link"
            active-class=""
          >
            {{ page.title }}
            <b-badge v-if="page.new" tag="small" variant="success" class="text-uppercase">New</b-badge>
            <b-badge v-if="page.enhanced" tag="small" variant="info" class="text-uppercase">Enhanced</b-badge>
            <b-badge v-if="page.breaking" tag="small" variant="danger" class="text-uppercase">Breaking change</b-badge>
            <b-badge v-if="page.beta" tag="small" variant="warning" class="text-uppercase">Beta</b-badge>
          </b-link>
        </b-link>
      </b-nav>
    </b-link>
  </b-collapse>
</template>

<script>
import { nav } from '~/content'

export default {
  name: 'BDVSidebar',
  data() {
    return { nav }
  },
  methods: {
    buildUrl(basePath, parts = []) {
      return `${basePath}/${parts.join('/')}`.replace(/(https?:\/\/)|(\/)+/g, '$1$2')
    }
  }
}
</script>
