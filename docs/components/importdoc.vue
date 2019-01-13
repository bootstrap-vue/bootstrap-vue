<template>
  <section
    v-if="components.length > 0 || directives.length > 0"
    class="bd-content"
  >
    <template v-if="components.length > 0">
      <h3 id="importing-individual-components">
        Importing individual {{ pluginTitle }} Components
      </h3>

      <b-table
        :items="componentImports"
        small
        head-variant="default"
        striped
      >
        <template
          slot="component"
          slot-scope="field"
        >
          <code>{{ field.value }}</code>
        </template>

        <template
          slot="importPath"
          slot-scope="field"
        >
          <code>{{ field.value }}</code>
        </template>
      </b-table>

      <p><strong>Example:</strong></p>

      <pre class="hljs js text-monospace p-2"><code v-html="componentImportCode" /></pre>
    </template>

    <template v-if="directives.length > 0">
      <h3 id="importing-individual-directives">
        Importing individual {{ pluginTitle }} Directives
      </h3>

      <b-table
        :items="directiveImports"
        small
        head-variant="default"
        striped
      >
        <template
          slot="directive"
          slot-scope="field"
        >
          <code>{{ field.value }}</code>
        </template>

        <template
          slot="importPath"
          slot-scope="field"
        >
          <code>{{ field.value }}</code>
        </template>
      </b-table>

      <p><strong>Example:</strong></p>

      <pre class="hljs js text-monospace p-2"><code v-html="directiveImportCode" /></pre>
    </template>

    <h3 id="importing-as-a-plugin">
      Importing {{ pluginTitle }} as a Vue plugin
    </h3>

    <p v-if="isComponentRoute">
      This plugin includes all of the above listed individual
      components<span v-if="directives.length"> and directives</span>.
      Plugins also include any component aliases.
    </p>
    <p v-else>
      This plugin includes all of the above listed individual directives.
    </p>

    <pre class="hljs js text-monospace p-2"><code v-html="pluginImportCode" /></pre>

    <template v-if="meta.plugins && meta.plugins.length > 0">
      <p>This plugin also automatically includes the following plugins:</p>
      <ul>
        <li
          v-for="plugin in meta.plugins"
          :key="plugin"
        >
          <code>{{ plugin }}</code>
        </li>
      </ul>
    </template>
  </section>
</template>

<script>
import kebabCase from 'lodash/kebabCase'
import startCase from 'lodash/startCase'
import hljs from 'highlightjs'

export default {
  props: {
    meta: {}
  },
  computed: {
    isComponentRoute() {
      return this.$route.name === 'docs-components-slug'
    },
    pluginName() {
      return startCase(this.$route.params.slug).replace(/\s+/g, '')
    },
    pluginTitle() {
      return startCase(this.meta.title)
    },
    componentImports() {
      return this.components.map(c => {
        return {
          component: this.componentTag(c),
          importPath: this.componentPath(c)
        }
      })
    },
    directiveImports() {
      return this.directives.map(d => {
        return {
          directive: this.directiveAttr(d),
          importPath: this.directivePath(d)
        }
      })
    },
    components() {
      let subcomponents = []
      if (this.meta.components) {
        // We just want the sub-component name
        subcomponents = this.meta.components.map(m => m.component)
      }
      return [].concat(this.meta.component, subcomponents).filter(c => c)
    },
    directives() {
      return [].concat(this.meta.directive, this.meta.directives).filter(d => d)
    },
    componentImportCode() {
      const firstComponent = this.components[0]
      const firstComponentImport = this.componentImports[0]
      return [
        `import ${firstComponent} from '${firstComponentImport.importPath}'`,
        `Vue.component('${this.componentName(firstComponent)}', ${firstComponent})`
      ].join('\n')
    },
    directiveImportCode() {
      const firstDirective = this.directives[0]
      const firstDirectiveImport = this.directiveImports[0]
      return [
        "// <b>Note:</b> Vue automatically prefixes the directive name with 'v-'",
        `import ${firstDirective} from '${firstDirectiveImport.importPath}'`,
        `Vue.directive('${this.directiveName(firstDirective)}', ${firstDirective})`
      ].join('\n')
    },
    pluginImportCode() {
      const pluginLocation = this.isComponentRoute ? 'components' : 'directives'
      return [
        `import { ${this.pluginName} } from 'bootstrap-vue/es/${pluginLocation}'`,
        `Vue.use(${this.pluginName})`
      ].join('\n')
    }
  },
  mounted() {
    // Highlight code blocks
    ;[...this.$el.querySelectorAll('pre.hljs')].forEach(pre => {
      hljs.highlightBlock(pre)
    })
  },
  methods: {
    componentName(component) {
      return kebabCase(component)
    },
    componentTag(component) {
      return `<${this.componentName(component)}>`
    },
    componentPath(component) {
      const componentName = this.componentName(component).replace(/^b-/, '')
      return `bootstrap-vue/es/components/${componentName}/${componentName}`
    },
    directiveName(directive) {
      return kebabCase(directive).replace(/^v-/, '')
    },
    directiveAttr(directive) {
      return this.directiveName(directive)
    },
    directivePath(directive) {
      const directiveName = this.directiveName(directive)
      return `bootstrap-vue/es/directives/${directiveName}/${directiveName}`
    }
  }
}
</script>
