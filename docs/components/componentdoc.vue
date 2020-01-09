<template>
  <section v-if="component" class="bd-content">
    <b-row tag="header" align-v="center">
      <b-col sm="9">
        <anchored-heading :id="`comp-ref-${componentNameClean}`" level="3">
          <code class="notranslate bigger" translate="no">{{ tag }}</code>
        </anchored-heading>
        <b-badge v-if="version" variant="success">v{{ version }}+</b-badge>
        <b-badge
          v-if="componentFunctional"
          variant="secondary"
          target="_blank"
          href="https://vuejs.org/v2/guide/render-function.html#Functional-Components"
        >
          Functional Component
        </b-badge>
      </b-col>
      <b-col sm="3" class="text-sm-right">
        <b-btn
          v-if="githubURL"
          variant="outline-secondary"
          size="sm"
          :href="githubURL"
          target="_blank"
        >
          View source
        </b-btn>
      </b-col>
    </b-row>

    <ul class="component-ref-mini-toc my-3">
      <li v-if="aliases && aliases.length > 0">
        <a :href="`#comp-ref-${componentName}-aliases`">
          <code class="notranslate" translate="no">{{ tag }}</code> Component aliases
        </a>
      </li>
      <li v-if="propsItems && propsItems.length > 0">
        <a :href="`#comp-ref-${componentName}-props`">
          <code class="notranslate" translate="no">{{ tag }}</code> Properties
        </a>
      </li>
      <li v-if="componentVModel">
        <a :href="`#comp-ref-${componentName}-v-model`">
          <code class="notranslate" translate="no">{{ tag }}</code> v-model
        </a>
      </li>
      <li v-if="slots && slots.length > 0">
        <a :href="`#comp-ref-${componentName}-slots`">
          <code class="notranslate" translate="no">{{ tag }}</code> Slots
        </a>
      </li>
      <li v-if="events && events.length > 0">
        <a :href="`#comp-ref-${componentName}-events`">
          <code class="notranslate" translate="no">{{ tag }}</code> Events
        </a>
      </li>
      <li v-if="rootEventListeners && rootEventListeners.length > 0">
        <a :href="`#comp-ref-${componentName}-rootEventListeners`">
          <code class="notranslate" translate="no">{{ tag }}</code>
          <code class="notranslate" translate="no">$root</code> Event Listeners
        </a>
      </li>
    </ul>

    <article v-if="aliases && aliases.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-aliases`" level="4" class="mb-3">
        Component aliases
      </anchored-heading>
      <p><code class="notranslate" translate="no">{{ tag }}</code> can also be used via the following aliases:</p>
      <ul>
        <li v-for="alias in aliases" :key="alias">
          <code class="notranslate" translate="no">&lt;{{ kebabCase(alias) }}&gt;</code>
        </li>
      </ul>
      <div class="alert alert-info">
        <p class="mb-0 small">
          Note: component aliases are only available when importing all of BootstrapVue or using
          the component group plugin.
        </p>
      </div>
    </article>

    <article v-if="propsItems && propsItems.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-props`" level="4" class="mb-3">
        Properties
      </anchored-heading>
      <b-table
        :items="propsItems"
        :fields="propsFields"
        primary-key="prop"
        table-class="bv-docs-table"
        responsive="sm"
        sort-icon-left
        striped
      >
        <template v-slot:cell(prop)="{ value, item }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          <b-badge v-if="item.required" variant="info">Required</b-badge>
          <b-badge v-if="item.version" variant="secondary">v{{ item.version }}+</b-badge>
          <b-badge v-if="item.isVModel" variant="primary">v-model</b-badge>
          <b-badge v-if="item.xss" variant="warning">Use with caution</b-badge>
          <b-badge v-if="item.deprecated" variant="danger">Deprecated</b-badge>
          <b-badge v-else-if="item.deprecation" variant="warning">Deprecation</b-badge>
        </template>
        <template v-slot:cell(defaultValue)="{ value }">
          <code v-if="value" class="word-wrap-normal notranslate" translate="no">{{ value }}</code>
        </template>
        <template v-slot:row-details="{ item }">
          <p v-if="typeof item.deprecated === 'string'" class="mb-1 small">
            {{ item.deprecated }}
          </p>
          <p v-if="typeof item.deprecation === 'string'" class="mb-1 small">
            {{ item.deprecation }}
          </p>
        </template>
      </b-table>
      <div v-if="hasRouterProps" class="alert alert-info">
        <p class="mb-0 small">
          <code class="notranslate" translate="no">{{ tag }}</code> supports generating
          <code class="notranslate" translate="no">&lt;router-link&gt;</code> or
          <code class="notranslate" translate="no">&lt;nuxt-link&gt;</code> component (if using Nuxt.js).
          For more details on the router link (or nuxt link) specific props, see the
          <b-link to="/docs/reference/router-links" class="alert-link">Router support</b-link>
          reference section.
        </p>
      </div>
      <div v-if="hasHtmlProps" class="alert alert-warning">
        <p class="mb-0 small">
          <strong>Caution:</strong> Props that support HTML strings
          (<code class="notranslate" translate="no">*-html</code>) can be vulnerable to
          <b-link href="https://en.wikipedia.org/wiki/Cross-site_scripting" class="alert-link" target="_blank">
            Cross Site Scripting (XSS) attacks
          </b-link>
          when passed raw user supplied values. You must properly
          <b-link href="https://en.wikipedia.org/wiki/HTML_sanitization" class="alert-link" target="_blank">
            sanitize
          </b-link>
          the user input first!
        </p>
      </div>
    </article>

    <article v-if="componentVModel" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-v-model`" level="4" class="mb-3">
        v-model
      </anchored-heading>
      <b-table-lite
        :items="[componentVModel]"
        :fields="[{ key: 'prop', label: 'Property' }, 'event']"
        table-class="bv-docs-table"
        responsive="sm"
        striped
      >
        <template v-slot:cell(prop)="{ value }">
          <code class="notranslate" translate="no">{{ kebabCase(value) }}</code>
        </template>
        <template v-slot:cell(event)="{ value }">
          <code class="notranslate" translate="no">{{ value }}</code>
        </template>
      </b-table-lite>
    </article>

    <article v-if="slots && slots.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-slots`" level="4" class="mb-3">
        Slots
      </anchored-heading>
      <b-table
        :items="slotsItems"
        :fields="slotsFields"
        primary-key="name"
        table-class="bv-docs-table"
        responsive="sm"
        sort-icon-left
        striped
      >
        <template v-slot:cell(name)="{ value, item }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          <b-badge v-if="item.version" variant="secondary">v{{ item.version }}+</b-badge>
        </template>
        <template v-slot:cell(scope)="{ value, toggleDetails }">
          <b-button
            v-if="value"
            variant="info"
            size="sm"
            class="py-0"
            @click="toggleDetails()"
          >
            Scope
          </b-button>
        </template>
        <template v-slot:row-details="{ item }">
          <b-card>
            <b-table-lite
              v-if="item.scope"
              :items="item.scope"
              :fields="[{ key: 'prop', label: 'Property' }, 'type', 'description']"
              primary-key="prop"
              class="mb-0"
              head-variant="dark"
              striped
              small
              caption-top
            >
              <template v-slot:thead-top>
                <b-tr>
                  <b-th colspan="3" class="text-center">
                    Slot
                    <code class="text-nowrap notranslate text-white" translate="no">
                      {{ item.name }}
                    </code>
                    scoped properties
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(prop)="{ value, item }">
                <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
                <b-badge v-if="item.version" variant="secondary">v{{ item.version }}+</b-badge>
              </template>
              <template v-slot:cell(type)="{ value }">
                <span v-if="value" class="text-nowrap notranslate" translate="no">{{ value }}</span>
                <template v-else>Any</template>
              </template>
            </b-table-lite>
          </b-card>
        </template>
      </b-table>
    </article>

    <article v-if="events && events.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-events`" level="4" class="mb-3">
        Events
      </anchored-heading>
      <b-table
        :items="events"
        :fields="eventsFields"
        primary-key="event"
        table-class="bv-docs-table"
        responsive="sm"
        striped
      >
        <template v-slot:cell(event)="{ value, item }">
          <code class="notranslate" translate="no">{{ value }}</code>
          <b-badge v-if="item.version" variant="secondary">v{{ item.version }}+</b-badge>
        </template>
        <template v-slot:cell(args)="{ value, item }">
          <ol v-if="value && value.length > 0" class="list-unstyled mb-0">
            <li v-for="(arg, idx) in value" :key="`event-${item.event}-${arg.arg || idx}`">
              <template v-if="arg.arg">
                <code class="notranslate" translate="no">{{ arg.arg }}</code> -
              </template>
              <span v-if="arg.description">{{ arg.description }}</span>
            </li>
          </ol>
        </template>
      </b-table>
    </article>

    <article v-if="rootEventListeners && rootEventListeners.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-rootEventListeners`" level="4" class="mb-3">
        <code class="notranslate" translate="no">$root</code> Event Listeners
      </anchored-heading>
      <p>
        You can control <code class="notranslate" translate="no">{{ tag }}</code> by emitting the
        following events on <samp class="notranslate" translate="no">$root</samp>:
      </p>
      <b-table-lite
        :items="rootEventListeners"
        :fields="rootEventListenersFields"
        primary-key="event"
        table-class="bv-docs-table"
        responsive="sm"
        striped
      >
        <template v-slot:cell(event)="{ value, item }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          <b-badge v-if="item.version" variant="secondary">v{{ item.version }}+</b-badge>
        </template>
        <template v-slot:cell(args)="{ value, item }">
          <p
            v-for="arg in value"
            :key="`event-${item.event}-${arg.arg ? arg.arg : 'none'}`"
            class="mb-1"
          >
            <template v-if="arg.arg">
              <code class="text-nowrap notranslate" translate="no">{{ arg.arg }}</code>
              <span v-if="arg.description"> - {{ arg.description }}</span>
            </template>
          </p>
        </template>
      </b-table-lite>
    </article>
  </section>
</template>

<style scoped>
h3::before {
  display: block;
  height: 1.25rem;
  margin-top: -1.25rem;
  content: '';
}

code.bigger {
  font-size: 105%;
}

ul.component-ref-mini-toc:empty {
  display: none;
}

/deep/ .word-wrap-normal {
  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
}
</style>

<script>
import Vue from 'vue'
// Fallback descriptions for common props (mainly router-link props)
import commonProps from '../common-props.json'
import { kebabCase } from '../utils'
import AnchoredHeading from './anchored-heading'

export default {
  name: 'BDVComponentdoc',
  components: { AnchoredHeading },
  props: {
    component: {},
    srcComponent: {
      // This prop is used only when the above `component` is a
      // "fake" component. This prop specifies a "real" component
      // to use when grabbing the component definition options
    },
    propsMeta: {
      // For getting prop descriptions
      type: Array,
      default: () => []
    },
    slots: {
      type: Array,
      default: () => []
    },
    events: {
      type: Array,
      default: () => []
    },
    rootEventListeners: {
      type: Array,
      default: () => []
    },
    aliases: {
      type: Array,
      default: () => []
    },
    version: {
      type: String,
      default: null
    }
  },
  computed: {
    componentOptions() {
      const component = Vue.options.components[this.srcComponent || this.component]
      if (!component) {
        return {}
      }

      let options = {}
      if (!component.options && typeof component === 'function') {
        // Async component that hans't been resolved yet
        component(cmp => {
          if (Object.prototype.toString.call(cmp) === '[object Object]') {
            options = { ...cmp }
          } else if (cmp && cmp.options) {
            options = cmp.options
          }
        })
      } else {
        // Regular component
        options = component.options || {}
      }

      return options
    },
    componentFunctional() {
      return this.componentOptions.functional
    },
    componentVModel() {
      const model = this.componentOptions.model || {}
      return model.prop && model.event ? model : false
    },
    componentProps() {
      return this.componentOptions.props || {}
    },
    hasRouterProps() {
      return this.propsItems.some(p => {
        return p.prop === 'to' || p.prop === 'split-to' || p.prop === 'exact-active-class'
      })
    },
    hasHtmlProps() {
      return this.propsItems.some(p => p.xss)
    },
    componentPropsMetaObj() {
      // Returns the propsMeta array in object format for easy lookups
      return this.propsMeta.reduce((obj, propMeta) => {
        if (propMeta.prop) {
          obj[propMeta.prop] = propMeta
        }
        return obj
      }, {})
    },
    propsFields() {
      const fields = [
        { key: 'prop', label: 'Property', sortable: this.propsItems.length > 9 },
        { key: 'type', label: 'Type' },
        { key: 'defaultValue', label: 'Default' }
      ]
      if (this.propsItems.some(p => p.description)) {
        // If any of the props have a description, then
        // add the description column
        fields.push({ key: 'description', label: 'Description' })
      }
      return fields
    },
    eventsFields() {
      return [
        { key: 'event', label: 'Event' },
        { key: 'args', label: 'Arguments' },
        { key: 'description', label: 'Description' }
      ]
    },
    rootEventListenersFields() {
      return [
        { key: 'event', label: 'Event' },
        { key: 'args', label: 'Arguments' },
        { key: 'description', label: 'Description' }
      ]
    },
    slotsFields() {
      const fields = [
        { key: 'name', label: 'Slot Name', sortable: this.slotsItems.length > 9 },
        { key: 'description', label: 'Description' }
      ]
      if (this.slots.length > 0 && this.slots.some(s => s.scope)) {
        fields.push({ key: 'scope', label: 'Scoped' })
      }
      return fields
    },
    propsItems() {
      const props = this.componentProps
      const propsMetaObj = this.componentPropsMetaObj

      return Object.keys(props).map(prop => {
        const p = props[prop]
        const meta = propsMetaObj[prop] || {}

        // Describe type
        let type = p.type
        if (Array.isArray(type)) {
          type = type.map(t => t.name).join(' or ')
        } else if (typeof type === 'undefined') {
          type = 'Any'
        } else {
          type = type.name
        }

        // Default value
        let defaultVal = p.default
        if (defaultVal instanceof Function && !Array.isArray(defaultVal)) {
          defaultVal = defaultVal()
        }
        if (typeof defaultVal === 'undefined' || defaultVal === null) {
          defaultVal = ''
        }
        defaultVal = JSON.stringify(defaultVal).replace(/"/g, "'")
        if (defaultVal === "''") {
          defaultVal = ''
        }

        const fallbackMeta = commonProps[prop] || {}
        const description =
          typeof meta.description === 'undefined' ? fallbackMeta.description : meta.description
        const version = typeof meta.version === 'undefined' ? fallbackMeta.version : meta.version

        return {
          prop: kebabCase(prop),
          type,
          defaultValue: defaultVal,
          required: p.required || false,
          description: description || '',
          version,
          xss: /[a-z]Html$/.test(prop),
          isVModel: this.componentVModel && this.componentVModel.prop === prop,
          deprecated: p.deprecated || false,
          deprecation: p.deprecation || false,
          _showDetails: typeof p.deprecated === 'string' || typeof p.deprecation === 'string'
        }
      })
    },
    slotsItems() {
      // We use object spread here so that _showDetails doesn't
      // mutate the original array objects
      return this.slots ? this.slots.map(s => ({ ...s })) : []
    },
    componentName() {
      return kebabCase(this.component).replace('{', '-{')
    },
    componentNameClean() {
      return this.componentName.replace('{', '').replace('}', '')
    },
    tag() {
      return `<${this.componentName}>`
    },
    githubURL() {
      const name = this.componentName.replace(/^b-/, '')
      if (name.indexOf('{') !== -1) {
        // Example component (most likely an auto generated component)
        return ''
      }
      const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/dev/src/components'
      const slug = this.$route.params.slug
      // Always point to the .js file (which may import a .vue file)
      return `${base}/${slug}/${name}.js`
    }
  },
  methods: {
    kebabCase
  }
}
</script>
