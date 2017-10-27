<template>
    <div class="container">
        <div class="bd-content" v-html="readme" v-play></div>

        <componentdoc :component="meta.component" :events="meta.events" :slots="meta.slots"></componentdoc>

        <b-card class="my-4">
            <small class="font-italic">
                Trying to get native browser events working on your component? Use the
                <code>.native</code>
                modifier to capture browser native events such as:
                <code>@click.native="..."</code>,
                <code>@mouseover.native="..."</code>, etc. See the the official
                <a href="https://vuejs.org/v2/guide/components.html#Binding-Native-Events-to-Components">Vue.js documentation</a>
                for more information.
            </small>
        </b-card>

        <componentdoc :component="component" :key="component" v-for="component in meta.components"></componentdoc>
    </div>
</template>


<script>
import componentdoc from "~/components/componentdoc.vue";
import { components as _meta } from "~/content";
import docsMixin from "~/plugins/docs-mixin";

export default {
  components: { componentdoc },
  mixins: [docsMixin],
  layout: "docs",

  validate({ params }) {
      return Boolean(_meta[params.slug])
  },

  async asyncData({ params }) {
      const readme = await import('~/../src/components/' + params.slug + '/README.md')
      const meta = _meta[params.slug]

      return {
          readme,
          meta
      }
  }
};
</script>
