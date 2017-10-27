<template>
    <div class="container">
        <div class="bd-content" v-html="readme"></div>
    </div>
</template>

<script>
import { reference as _meta } from "~/content";
import docsMixin from "~/plugins/docs-mixin";

export default {
  mixins: [docsMixin],
  layout: "docs",

  validate({ params }) {
      return Boolean(_meta[params.slug])
  },

  async asyncData({ params }) {
      const readme = await import('~/markdown/reference/' + params.slug + '/README.md')
      const meta = _meta[params.slug]

      return {
          readme,
          meta
      }
  }
};
</script>
