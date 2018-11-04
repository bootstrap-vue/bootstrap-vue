<template>
    <div class="container">
        <div class="bd-content" v-html="readme" v-play></div>

        <componentdoc :component="meta.component" :events="meta.events" :slots="meta.slots"></componentdoc>

        <template v-for="component in meta.components">
            <!-- if component is just a string component name -->
            <componentdoc v-if="typeof component === 'string'" :component="component" :key="component"></componentdoc>
            <!-- else component is an object containing slots and events -->
            <componentdoc v-else :component="component.component" :events="component.events" :slots="component.slots" :key="component.component"></componentdoc>
        </template>

        <b-card class="my-4">
            <p class="card-text small font-italic mb-0">
                Trying to get native browser events working on your component? Use the
                <code>.native</code>
                modifier to capture browser native events such as:
                <code>@click.native="..."</code>,
                <code>@mouseover.native="..."</code>, etc. See the the official
                <a href="https://vuejs.org/v2/guide/components.html#Binding-Native-Events-to-Components">Vue.js documentation</a>
                for more information.
            </p>
        </b-card>

        <importdoc :meta="meta"></importdoc>
    </div>
</template>


<script>
import componentdoc from "~/components/componentdoc.vue";
import importdoc from "~/components/importdoc.vue";
import { components as _meta } from "~/content";
import docsMixin from "~/plugins/docs-mixin";

const getReadMe = name => import('~/../src/components/' + name + '/README.md' /* webpackChunkName: "docs/components" */)

export default {
  components: { componentdoc, importdoc },
  mixins: [docsMixin],
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
