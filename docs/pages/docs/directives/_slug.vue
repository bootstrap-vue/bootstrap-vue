<template>
    <div class="container">
        <div class="bd-content" v-html="readme" v-play></div>

        <importdoc :meta="meta"></importdoc>
    </div>
</template>

<script>
import importdoc from '~/components/importdoc.vue';
import { directives as _meta } from "~/content";
import docsMixin from "~/plugins/docs-mixin";

const getReadMe = name => import('~/../src/directives/' + name + '/README.md' /* webpackChunkName: "docs/directives" */)

export default {
  mixins: [docsMixin],
  components: { importdoc },
  layout: "docs",

  validate({ params }) {
      return Boolean(_meta[params.slug])
  },

  async asyncData({ params }) {
      const readme = await getReadMe(params.slug)
      const meta = _meta[params.slug]

      return {
          readme: readme.default,
          meta
      }
  }
};
</script>
