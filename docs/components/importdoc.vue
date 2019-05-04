<template>
  <section
    v-if="components.length > 0 || directives.length > 0"
    class="bd-content"
  >
    <template v-if="components.length > 0">
      <article>
        <anchored-heading id="importing-individual-components" level="3">
          Importing individual components
        </anchored-heading>

        <p>
          <b-badge variant="info" class="small">ENHANCED in 2.0.0-rc.20</b-badge> You can
          import individual components into your project via the following named exports:
        </p>

        <b-table
          :items="componentImports"
          class="bv-docs-table"
          responsive="sm"
          head-variant="default"
          bordered
          striped
        >
          <template slot="component" slot-scope="{ value }">
            <code class="text-nowrap">{{ value }}</code>
          </template>
          <template slot="namedExport" slot-scope="{ value }">
            <code class="text-nowrap">{{ value }}</code>
          </template>
          <template slot="importPath" slot-scope="{ value }">
            <code class="text-nowrap">{{ value }}</code>
          </template>
        </b-table>

        <p><strong>Example:</strong></p>
        <pre class="hljs js text-monospace p-2">{{ componentImportCode }}</pre>
      </article>
    </template>

    <template v-if="directives.length > 0">
      <article>
        <anchored-heading id="importing-individual-directives" level="3">
          Importing individual directives
        </anchored-heading>

        <p>
          <b-badge variant="info" class="small">ENHANCED in 2.0.0-rc.20 </b-badge> You can
          import individual directives into your project via the following named exports:
        </p>

        <b-table
          :items="directiveImports"
          class="bv-docs-table"
          responsive="sm"
          head-variant="default"
          bordered
          striped
        >
          <template slot="directive" slot-scope="{ value }">
            <code class="text-nowrap">{{ value }}</code>
          </template>
          <template slot="namedExport" slot-scope="{ value }">
            <code class="text-nowrap">{{ value }}</code>
          </template>
          <template slot="importPath" slot-scope="{ value }">
            <code class="text-nowrap">{{ value }}</code>
          </template>
        </b-table>

        <p><strong>Example:</strong></p>
        <pre class="hljs js text-monospace p-2">{{ directiveImportCode }}</pre>
      </article>
    </template>

    <article>
      <anchored-heading id="importing-as-a-plugin" level="3">
        Importing as a Vue.js plugin
      </anchored-heading>

      <p>
        <b-badge variant="info" class="small">ENHANCED in 2.0.0-rc.20</b-badge> Importing plugins
        has been simplified.
      </p>

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
        class="bv-docs-table"
        caption="The plugin can be imported via several methods"
        responsive="sm"
        head-variant="default"
        caption-top
        bordered
        striped
      >
        <template slot="namedExport" slot-scope="{ value, item }">
          <code class="text-nowrap">{{ value }}</code>
          <b-badge v-if="item.legacy" variant="warning" class="small">DEPRECATED</b-badge>
          <b-badge v-else variant="success" class="small">PREFERRED</b-badge>
        </template>
        <template slot="importPath" slot-scope="{ value }">
          <code class="text-nowrap">{{ value }}</code>
        </template>
      </b-table>

      <template v-if="meta.plugins && meta.plugins.length > 0">
        <p>This plugin also automatically includes the following plugins:</p>
        <ul>
          <li v-for="plugin in meta.plugins" :key="plugin"><code>{{ plugin }}</code></li>
        </ul>
      </template>

      <p><strong>Example:</strong></p>
      <pre class="hljs js text-monospace p-2">{{ pluginImportCode }}</pre>
    </article>
  </section>
</template>

<script>
import hljs from 'highlight.js'
import kebabCase from 'lodash/kebabCase'
import startCase from 'lodash/startCase'
import AnchoredHeading from './anchored-heading'

export default {
  name: 'BDVImportdoc',
  components: { AnchoredHeading },
  props: {
    meta: {}
  },
  computed: {
    isComponentRoute() {
      return this.$route.name === 'docs-components-slug'
    },
    pluginDir() {
      return this.$route.params.slug
    },
    pluginName() {
      const prefix = this.isComponentRoute ? '' : 'VB'
      return `${prefix}${startCase(this.pluginDir).replace(/\s+/g, '')}Plugin`
    },
    componentImports() {
      return this.components.map(c => {
        return {
          component: this.componentTag(c),
          namedExport: c,
          importPath: this.componentPath(c)
        }
      })
    },
    directiveImports() {
      return this.directives.map(d => {
        return {
          directive: this.directiveAttr(d),
          namedExport: d,
          importPath: this.directivePath(d)
        }
      })
    },
    pluginImports() {
      const pluginLocation = this.isComponentRoute ? 'components' : 'directives'
      const legacyName = this.pluginName.replace(/^VB|Plugin$/g, '')
      return [
        {
          namedExport: this.pluginName,
          importPath: `bootstrap-vue/es/${pluginLocation}`
        },
        {
          namedExport: legacyName,
          importPath: `bootstrap-vue/es/${pluginLocation}`,
          legacy: true
        },
        {
          namedExport: 'default',
          importPath: `bootstrap-vue/es/${pluginLocation}/${this.pluginDir}`,
          legacy: true
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
      return [].concat(this.meta.directive, this.meta.directives).filter(d => d)
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
      const firstDirectiveImport = this.directiveImports[0]
      return [
        `import { ${firstDirective} } from '${firstDirectiveImport.importPath}'`,
        "// Note: Vue automatically prefixes the directive name with 'v-'",
        `Vue.directive('${this.directiveName(firstDirective)}', ${firstDirective})`
      ].join('\n')
    },
    pluginImportCode() {
      const pluginLocation = this.isComponentRoute ? 'components' : 'directives'
      const legacyName = this.pluginName.replace(/^VB|Plugin$/g, '')
      return [
        '// Importing the named export',
        `import { ${this.pluginName} } from 'bootstrap-vue/es/${pluginLocation}'`,
        `Vue.use(${this.pluginName})`,
        '',
        '// Or importing the default export (deprecated)',
        `import ${legacyName} from 'bootstrap-vue/es/${pluginLocation}/${this.pluginDir}'`,
        `Vue.use(${legacyName})`
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
      // const componentName = this.componentName(component).replace(/^b-/, '')
      // return `bootstrap-vue/es/components/${this.pluginDir}/${componentName}`
      return `bootstrap-vue/es/components`
    },
    directiveName(directive) {
      return kebabCase(directive)
        .replace(/^v-/, '')
        .replace(/^vb-/, 'b-')
    },
    directiveAttr(directive) {
      return kebabCase(directive).replace(/^vb-/, 'v-b-')
    },
    directivePath(directive) {
      // const directiveName = this.directiveName(directive).replace(/^b-/, '')
      // return `bootstrap-vue/es/directives/${directiveName}/${directiveName}`
      return `bootstrap-vue/es/directives`
    }
  }
}
</script>
