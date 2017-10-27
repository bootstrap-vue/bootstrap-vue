<template>
    <div class="container">
        <div class="bd-content" v-html="readme" v-play></div>
    </div>
</template>

<script>
import { directives as _meta } from "~/content";
import docsMixin from "~/plugins/docs-mixin";

export default {
  mixins: [docsMixin],
  layout: "docs",

  validate({ params }) {
      return Boolean(_meta[params.slug])
  },

  async asyncData({ params }) {
      const readme = await import('~/../src/directives/' + params.slug + '/README.md')
      const meta = _meta[params.slug]

      return {
          readme,
          meta
      }
  }
};
</script>
