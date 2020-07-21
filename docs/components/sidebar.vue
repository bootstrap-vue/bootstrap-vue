<template>
  <nav id="bd-docs-nav" class="bd-links d-none d-md-block" aria-label="Main navigation">
    <b-link to="/" exact router-tag="div" active-class="active">
      <b-link to="/" exact class="bd-toc-link" active-class="">Home</b-link>
    </b-link>

    <b-link
      v-for="group in nav"
      :key="group.base"
      :to="buildUrl('/docs', [group.base])"
      :exact="group.exact"
      router-tag="div"
      class="bd-toc-item"
      active-class="active"
    >
      <b-link
        :to="buildUrl('/docs', [group.base])"
        :exact="group.exact"
        class="bd-toc-link"
        active-class=""
        no-prefetch
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
          :to="buildUrl('/docs', [group.base, page.slug])"
          router-tag="li"
          class="nav-item"
          active-class="active bd-sidenav-active"
        >
          <b-link
            :to="buildUrl('/docs', [group.base, page.slug])"
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

    <b-link
      to="/themes"
      router-tag="div"
      active-class="active"
      no-prefetch
      exact
    >
      <b-link
        to="/themes"
        active-class=""
        exact
        no-prefetch
        class="bd-toc-link"
      >
        Themes
      </b-link>
    </b-link>

    <b-link
      to="/play"
      router-tag="div"
      active-class="active"
      exact
      no-prefetch
    >
      <b-link
        to="/play"
        active-class=""
        exact
        no-prefetch
        class="bd-toc-link"
      >
        Playground
      </b-link>
    </b-link>
  </nav>
</template>

<script>
import { nav } from '~/content'

export default {
  name: 'BVSidebar',
  data() {
    return { nav }
  },
  methods: {
    buildUrl(basePath, parts = []) {
      parts = parts
        .filter(Boolean)
        .join('/')
        .replace(/\/$/, '')
      const path = [basePath, parts].filter(Boolean).join('/')
      return path.replace(/(https?:\/\/)|(\/)+/g, '$1$2')
    }
  }
}
</script>
