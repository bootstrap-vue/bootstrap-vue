<template>
  <section
    v-if="components.length > 0 || directives.length > 0"
    class="bd-content"
  >
    <template v-if="components.length > 0">
      <article class="bd-content">
        <anchored-heading id="importing-individual-components" level="3">
          Importing individual components
        </anchored-heading>

        <p>
          You can import individual components into your project via the following named
          exports:
        </p>

        <b-table
          :items="componentImports"
          table-class="bv-docs-table"
          responsive="sm"
          head-variant="default"
          bordered
          striped
        >
          <template v-slot:cell(component)="{ value }">
            <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          </template>
          <template v-slot:cell(namedExport)="{ value }">
            <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          </template>
          <template v-slot:cell(importPath)="{ value }">
            <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          </template>
        </b-table>

        <p><strong>Example:</strong></p>
        <pre class="hljs language-js text-monospace p-2 notranslate" translate="no">{{ componentImportCode }}</pre>
      </article>
    </template>

    <template v-if="directives.length > 0">
      <article class="bd-content">
        <anchored-heading id="importing-individual-directives" level="3">
          Importing individual directives
        </anchored-heading>

        <p>
          You can import individual directives into your project via the following named
          exports:
        </p>

        <b-table
          :items="directiveImports"
          table-class="bv-docs-table"
          responsive="sm"
          head-variant="default"
          bordered
          striped
        >
          <template v-slot:cell(directive)="{ value }">
            <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          </template>
          <template v-slot:cell(namedExport)="{ value }">
            <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          </template>
          <template v-slot:cell(importPath)="{ value }">
            <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          </template>
        </b-table>

        <p><strong>Example:</strong></p>
        <pre class="hljs language-js text-monospace p-2 notranslate" translate="no">{{ directiveImportCode }}</pre>
      </article>
    </template>

    <article class="bd-content">
      <anchored-heading id="importing-as-a-plugin" level="3">
        Importing as a Vue.js plugin
      </anchored-heading>

      <p v-if="isComponentRoute">
        This plugin includes all of the above listed individual
        components<span v-if="directives.length"> and directives</span>.
        Plugins also include any component aliases.
      </p>
      <p v-else>
        This plugin includes all of the above listed individual directives.
      </p>

      <b-table
        :items="pluginImports"
        :fileds="['namedExport', 'importPath']"
        table-class="bv-docs-table"
        responsive="sm"
        head-variant="default"
        caption-top
        bordered
        striped
      >
        <template v-slot:cell(namedExport)="{ value }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
        </template>
        <template v-slot:cell(importPath)="{ value }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
        </template>
      </b-table>

      <template v-if="meta.plugins && meta.plugins.length > 0">
        <p>This plugin also automatically includes the following plugins:</p>
        <ul>
          <li v-for="plugin in meta.plugins" :key="plugin">
            <code class="notranslate" translate="no">{{ plugin }}</code>
          </li>
        </ul>
      </template>

      <p><strong>Example:</strong></p>
      <pre class="hljs language-js text-monospace p-2 notranslate" translate="no">{{ pluginImportCode }}</pre>
    </article>
  </section>
</template>

<script>
import startCase from 'lodash/startCase'
import hljs from '../utils/hljs'
import { kebabCase } from '../utils'
import AnchoredHeading from './anchored-heading'

const importPath = 'bootstrap-vue'

export default {
  name: 'BVImportdoc',
  components: { AnchoredHeading },
  props: {
    meta: {}
  },
  computed: {
    importPath() {
      return 'bootstrap-vue'
    },
    isComponentRoute() {
      const name = this.$route.name
      return name === 'docs-components-slug' || name === 'docs-icons'
    },
    pluginDir() {
      return this.$route.params.slug || this.meta.slug
    },
    pluginName() {
      // Directive plugin names are prefixed with `VB`
      const prefix = this.isComponentRoute ? '' : 'VB'
      return `${prefix}${startCase(this.pluginDir).replace(/\s+/g, '')}Plugin`
    },
    componentImports() {
      return this.components.map(c => {
        return {
          component: this.componentTag(c),
          namedExport: c,
          importPath: this.importPath
        }
      })
    },
    directiveImports() {
      return this.directives.map(d => {
        return {
          directive: this.directiveAttr(d),
          namedExport: d,
          importPath: this.importPath
        }
      })
    },
    pluginImports() {
      return [
        {
          namedExport: this.pluginName,
          importPath: this.importPath
        }
      ]
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
      // We just need the directive name
      return []
        .concat(this.meta.directive, this.meta.directives)
        .filter(d => d)
        .map(d => (typeof d === 'string' ? d : d.directive))
    },
    componentImportCode() {
      const firstComponent = this.components[0]
      const firstComponentImport = this.componentImports[0]
      return [
        `import { ${firstComponent} } from '${firstComponentImport.importPath}'`,
        `Vue.component('${this.componentName(firstComponent)}', ${firstComponent})`
      ].join('\n')
    },
    directiveImportCode() {
      const firstDirective = this.directives[0]
      return [
        `import { ${firstDirective} } from '${importPath}'`,
        "// Note: Vue automatically prefixes the directive name with 'v-'",
        `Vue.directive('${this.directiveName(firstDirective)}', ${firstDirective})`
      ].join('\n')
    },
    pluginImportCode() {
      return [
        `import { ${this.pluginName} } from 'bootstrap-vue'`,
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
      return kebabCase(component).replace('{', '-{')
    },
    componentTag(component) {
      return `<${this.componentName(component)}>`
    },
    directiveName(directive) {
      return kebabCase(directive)
        .replace(/^v-/, '')
        .replace(/^vb-/, 'b-')
    },
    directiveAttr(directive) {
      return kebabCase(directive).replace(/^vb-/, 'v-b-')
    }
  }
}
</script>
