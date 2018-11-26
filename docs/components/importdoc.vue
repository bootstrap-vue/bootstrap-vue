<template>
  <section
    class="bd-content"
    v-if="components.length > 0 || directives.length > 0">

    <article v-if="components.length > 0">
      <h3 id="importing-individual-components">Importing Individual  {{ pluginTitle }} Components</h3>
      <b-table
        :items="componentImports"
        small
        head-variant="default"
        striped>
        <template
          slot="component"
          slot-scope="field">
          <code>{{ field.value }}</code>
        </template>
        <template
          slot="import_path"
          slot-scope="field">
          <code>{{ field.value }}</code>
        </template>
      </b-table>
      <p><strong>Example:</strong></p>
      <div class="bd-example">
        <code>import {{ components[0] }} from '{{ componentImports[0].import_path }}';</code>
        <br>
        <code>Vue.component('{{ componentName(components[0]) }}', {{ components[0] }});</code>
      </div>
    </article>

    <article v-if="directives.length > 0">
      <h3 id="importing-individual-directives">Importing Individual  {{ pluginTitle }} Directives</h3>
      <b-table
        :items="directiveImports"
        small
        head-variant="default"
        striped>
        <template
          slot="directive"
          slot-scope="field">
          <code>{{ field.value }}</code>
        </template>
        <template
          slot="import_path"
          slot-scope="field">
          <code>{{ field.value }}</code>
        </template>
      </b-table>
      <p><strong>Example:</strong></p>
      <div class="bd-example">
        <code>import {{ directives[0] }} from '{{ directiveImports[0].import_path }}';</code>
        <br>
        <code>Vue.directive('{{ directiveName(directives[0]) }}', {{ directives[0] }});</code>
        <br>
        <code>// <b>Note:</b> Vue automatically prefixes the directive name with 'v-'</code>
      </div>
    </article>

    <article class="pb-5">
      <h3 id="importing-as-a-plugin">Importing {{ pluginTitle }} as a Vue plugin</h3>
      <p v-if="$route.name === 'docs-components-slug'">
        This plugin includes all of the above listed individual
        components<span v-if="directives.length"> and directives</span>.
        Plugins also include any component aliases.
      </p>
      <p v-else>
        This plugin includes all of the above listed individual directives.
      </p>
      <div class="bd-example">
        <code v-if="$route.name === 'docs-components-slug'">
          import { {{ pluginName }} } from 'bootstrap-vue/es/components';
        </code>
        <code v-else>
          import { {{ pluginName }} } from 'bootstrap-vue/es/directives';
        </code>
        <br>
        <code>Vue.use({{ pluginName }});</code>
      </div>
      <template v-if="meta.plugins && meta.plugins.length > 0">
        <p>This plugin also automatically includes the following plugins:</p>
        <ul>
          <li
            v-for="plugin in meta.plugins"
            :key="plugin"><code>{{ plugin }}</code></li>
        </ul>
      </template>
    </article>

  </section>
</template>

<style scoped>
    h3 {
        padding: 20px 0;
    }
</style>

<script>
import kebabCase from 'lodash/kebabCase'
import startCase from 'lodash/startCase'

export default {
  props: {
    meta: {}
  },
  computed: {
    pluginName () {
      return startCase(this.$route.params.slug).replace(/\s+/g, '')
    },
    pluginTitle () {
      return startCase(this.meta.title)
    },
    componentImports () {
      return this.components.map(c => {
        return {
          component: this.componentTag(c),
          import_path: this.componentPath(c)
        }
      })
    },
    directiveImports () {
      return this.directives.map(d => {
        return {
          directive: this.directiveAttr(d),
          import_path: this.directivePath(d)
        }
      })
    },
    components () {
      let subcomponents = []
      if (this.meta.components) {
        // We just want the sub-component name
        subcomponents = this.meta.components.map(m => m.component)
      }
      return [].concat(this.meta.component, subcomponents).filter(c => c)
    },
    directives () {
      return [].concat(this.meta.directive, this.meta.directives).filter(d => d)
    }
  },
  methods: {
    componentName (component) {
      return kebabCase(component)
    },
    componentTag (component) {
      return `<${kebabCase(component)}>`
    },
    componentPath (component) {
      return `bootstrap-vue/es/components/${this.$route.params.slug}/${kebabCase(component).replace(/^b-/, '')}`
    },
    directiveName (directive) {
      return kebabCase(directive).replace(/^v-/, '')
    },
    directiveAttr (directive) {
      return kebabCase(directive)
    },
    directivePath (directive) {
      const slug = kebabCase(directive).replace(/^v-b-/, '')
      return `bootstrap-vue/es/directives/${slug}/${slug}`
    }
  }
}
</script>
