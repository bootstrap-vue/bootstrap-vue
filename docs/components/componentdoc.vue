<template>
  <section v-if="component" class="bd-content">
    <b-row tag="header" align-v="center">
      <b-col sm="9">
        <anchored-heading :id="`comp-ref-${componentName}`" level="3">
          <code class="notranslate" translate="no">{{ tag }}</code>
        </anchored-heading>
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
        <b-btn variant="outline-secondary" size="sm" :href="githubURL" target="_blank">
          View source
        </b-btn>
      </b-col>
    </b-row>

    <article v-if="aliases && aliases.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-aliases`" level="4">
        Component aliases
      </anchored-heading>
      <p><code class="notranslate" translate="no">{{ tag }}</code> can also be used via the following aliases:</p>
      <ul>
        <li v-for="alias in aliases" :key="alias">
          <code class="notranslate" translate="no">&lt;{{ kebabCase(alias) }}&gt;</code>
        </li>
      </ul>
      <p class="small text-muted">
        Note: component aliases are only available when importing all of BootstrapVue or using
        the component group plugin.
      </p>
    </article>

    <article v-if="propsItems && propsItems.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-props`" level="4">
        Properties
      </anchored-heading>
      <b-table
        :items="propsItems"
        :fields="propsFields"
        table-class="bv-docs-table"
        responsive="sm"
        striped
      >
        <template v-slot:cell(prop)="{ value, item }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
          <b-badge v-if="item.required" variant="info">Required</b-badge>
          <b-badge v-if="item.isVModel" variant="primary">v-model</b-badge>
          <b-badge v-if="item.deprecated" variant="danger">Deprecated</b-badge>
          <b-badge v-else-if="item.deprecation" variant="warning">Deprecation</b-badge>
        </template>
        <template v-slot:cell(defaultValue)="{ value }">
          <code v-if="value" class="notranslate" translate="no">{{ value }}</code>
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
      <p v-if="hasRouterProps">
        This component supports generating
        <code class="notranslate" translate="no">&lt;router-link&gt;</code> and
        <code class="notranslate" translate="no">&lt;nuxt-link&gt;</code> components. For more
        details on the router link specific props, see the
        [Router support](/docs/reference/router-links) reference section.
      </p>
   </article>

   <article v-if="componentVModel">
      <anchored-heading :id="`comp-ref-${componentName}-v-model`" level="4">
        v-model
      </anchored-heading>
      <b-table
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
      </b-table>
    </article>

    <article v-if="slots && slots.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-slots`" level="4">
        Slots
      </anchored-heading>
      <b-table
        :items="slots.map(s => ({ ...s }))"
        :fields="slotsFields"
        table-class="bv-docs-table"
        responsive="sm"
        striped
      >
        <template v-slot:cell(name)="{ value }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
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
              <template v-slot:cell(prop)="{ value }">
                <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
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
      <anchored-heading :id="`comp-ref-${componentName}-events`" level="4">
        Events
      </anchored-heading>
      <b-table
        :items="events"
        :fields="eventsFields"
        table-class="bv-docs-table"
        responsive="sm"
        striped
      >
        <template v-slot:cell(event)="{ value }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
        </template>
        <template v-slot:cell(args)="{ value, item }">
          <p
            v-for="arg in value"
            :key="`event-${item.event}-${arg.arg ? arg.arg : 'none'}`"
            class="mb-1"
          >
            <template v-if="arg.arg">
              <code class="text-nowrap notranslate" translate="no">{{ arg.arg }}</code> -
            </template>
            <span>{{ arg.description }}</span>
          </p>
        </template>
      </b-table>
    </article>

    <article v-if="rootEventListeners && rootEventListeners.length > 0" class="bd-content">
      <anchored-heading :id="`comp-ref-${componentName}-rootEventListeners`" level="4">
        <code class="notranslate" translate="no">$root</code> Event Listeners
      </anchored-heading>
      <p>
        You can control <code class="notranslate" translate="no">{{ tag }}</code> by emitting the
        following events on <samp class="notranslate" translate="no">$root</samp>:
      </p>
      <b-table
        :items="rootEventListeners"
        :fields="rootEventListenersFields"
        table-class="bv-docs-table"
        responsive="sm"
        striped
      >
        <template v-slot:cell(event)="{ value }">
          <code class="text-nowrap notranslate" translate="no">{{ value }}</code>
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
      </b-table>
    </article>
  </section>
</template>

<script>
import Vue from 'vue'
import kebabCase from 'lodash/kebabCase'
import AnchoredHeading from './anchored-heading'
// Fallback descriptions for common props (mainly router-link props)
import commonProps from '../common-props.json'

export default {
  name: 'BDVComponentdoc',
  components: { AnchoredHeading },
  props: {
    component: {},
    propsMeta: {
      // For getting pro descriptions
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
    }
  },
  computed: {
    componentOptions() {
      const component = Vue.options.components[this.component]
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
      return this.propsItems.some(p => p.prop === 'to')
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
        { key: 'prop', label: 'Property' },
        { key: 'type', label: 'Type' },
        { key: 'defaultValue', label: 'Default Value' }
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
        { key: 'name', label: 'Slot Name' },
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
        let type = p.type || Object
        let typeClass = String
        if (Array.isArray(type)) {
          typeClass = type[0]
          type = type.map(t => t.name).join(' or ')
        } else {
          typeClass = type
          type = type.name
        }

        // Describe value
        let defaultVal = p.default
        if (defaultVal instanceof Function && !Array.isArray(defaultVal)) {
          defaultVal = defaultVal()
        }
        if (typeof defaultVal !== 'string') {
          defaultVal = JSON.stringify(defaultVal)
        }
        if (defaultVal === '' || defaultVal === null || defaultVal === 'null') {
          defaultVal = ''
        }
        defaultVal = (defaultVal || '').replace(/"/g, "'")

        const fallbackMeta = commonProps[prop] || {}
        const description =
          typeof meta.description === 'undefined' ? fallbackMeta.description : meta.description

        return {
          prop: kebabCase(prop),
          type,
          typeClass,
          defaultValue: defaultVal,
          required: p.required || false,
          description: description || '',
          isVModel: this.componentVModel && this.componentVModel.prop === prop,
          deprecated: p.deprecated || false,
          deprecation: p.deprecation || false,
          _showDetails: typeof p.deprecated === 'string' || typeof p.deprecation === 'string'
        }
      })
    },
    componentName() {
      return kebabCase(this.component)
    },
    tag() {
      return `<${this.componentName}>`
    },
    githubURL() {
      const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/dev/src/components'
      const slug = this.$route.params.slug
      const name = kebabCase(this.component).replace(/^b-/, '')
      // Always point to the .js file (which may import a .vue file)
      return `${base}/${slug}/${name}.js`
    }
  },
  methods: {
    kebabCase
  }
}
</script>
