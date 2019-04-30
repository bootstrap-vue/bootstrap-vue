<template>
  <section v-if="component" class="bd-content">
    <b-row tag="header" align-v="center">
      <b-col sm="9">
        <anchored-heading :id="`comp-ref-${componentName}`" level="3">
          <code>{{ tag }}</code>
        </anchored-heading>
      </b-col>
      <b-col sm="3" class="text-sm-right">
        <b-btn variant="outline-secondary" size="sm" :href="githubURL" target="_blank">
          View source
        </b-btn>
      </b-col>
    </b-row>

    <article v-if="aliases && aliases.length > 0">
      <anchored-heading :id="`comp-ref-${componentName}-aliases`" level="4">
        Component aliases
      </anchored-heading>
      <p><code>{{ tag }}</code> can also be used via the following aliases:</p>
      <ul>
        <li v-for="alias in aliases" :key="alias"><code>&lt;{{ kebabCase(alias) }}&gt;</code></li>
      </ul>
      <p class="small text-muted">
        Note: component aliases are only available when importing all of BootstrapVue or using
        the component group plugin.
      </p>
    </article>

    <article v-if="propsItems && propsItems.length > 0">
      <anchored-heading :id="`comp-ref-${componentName}-props`" level="4">
        Properties
      </anchored-heading>
      <b-table
        :items="propsItems"
        :fields="propsFields"
        class="bv-docs-table"
        responsive="sm"
        head-variant="default"
        bordered
        striped
      >
        <template slot="prop" slot-scope="{ value, item }">
          <code class="text-nowrap">{{ value }}</code>
          <b-badge v-if="item.required" variant="info">Required</b-badge>
          <b-badge v-else-if="item.deprecated" variant="danger">Deprecated</b-badge>
          <b-badge v-else-if="item.deprecation" variant="warning">Deprecation</b-badge>
        </template>
        <template slot="row-details" slot-scope="{ item }">
          <p v-if="typeof item.deprecated === 'string'" class="mb-1 small">
            {{ item.deprecated }}
          </p>
          <p v-if="typeof item.deprecation === 'string'" class="mb-1 small">
            {{ item.deprecation }}
          </p>
        </template>
        <template slot="defaultValue" slot-scope="{ value }">
          <code v-if="value">{{ value }}</code>
        </template>
      </b-table>

      <template v-if="componentVModel">
        <anchored-heading :id="`comp-ref-${componentName}-v-model`" level="4">
          v-model
        </anchored-heading>
        <b-table
          :items="[componentVModel]"
          :fields="['prop', 'event']"
          class="bv-docs-table"
          responsive="sm"
          head-variant="default"
          bordered
          striped
        >
          <template slot="prop" slot-scope="{ value }">
            <code>{{ kebabCase(value) }}</code>
          </template>
          <template slot="event" slot-scope="{ value }">
            <code>{{ value }}</code>
          </template>
        </b-table>
      </template>
    </article>

    <article v-if="slots && slots.length > 0">
      <anchored-heading :id="`comp-ref-${componentName}-slots`" level="4">
        Slots
      </anchored-heading>
      <b-table
        :items="slots"
        :fields="slotsFields"
        class="bv-docs-table"
        responsive="sm"
        head-variant="default"
        bordered
        striped
      >
        <template slot="name" slot-scope="{ value }">
          <code class="text-nowrap">{{ value }}</code>
        </template>
      </b-table>
    </article>

    <article v-if="events && events.length > 0">
      <anchored-heading :id="`comp-ref-${componentName}-events`" level="4">
        Events
      </anchored-heading>
      <b-table
        :items="events"
        :fields="eventsFields"
        class="bv-docs-table"
        responsive="sm"
        head-variant="default"
        bordered
        striped
      >
        <template slot="event" slot-scope="{ value }">
          <code class="text-nowrap">{{ value }}</code>
        </template>
        <template slot="args" slot-scope="{ value, item }">
          <div
            v-for="arg in value"
            :key="`event-${item.event}-${arg.arg ? arg.arg : 'none'}`"
          >
            <template v-if="arg.arg"><code class="text-nowrap">{{ arg.arg }}</code> - </template>
            <span>{{ arg.description }}</span>
          </div>
        </template>
      </b-table>
    </article>

    <article v-if="rootEventListeners && rootEventListeners.length > 0">
      <anchored-heading :id="`comp-ref-${componentName}-rootEventListeners`" level="4">
        $root Event Listeners
      </anchored-heading>
      <p>
        You can control <code>{{ tag }}</code> by emitting the following events on
        <samp>$root</samp>:
      </p>
      <b-table
        :items="rootEventListeners"
        :fields="rootEventListenersFields"
        class="bv-docs-table"
        responsive="sm"
        head-variant="default"
        bordered
        striped
      >
        <template slot="event" slot-scope="{ value }">
          <code class="text-nowrap">{{ value }}</code>
        </template>
        <template slot="args" slot-scope="{ value, item }">
          <div
            v-for="arg in value"
            :key="`event-${item.event}-${arg.arg ? arg.arg : 'none'}`"
          >
            <template v-if="arg.arg">
              <code class="text-nowrap">{{ arg.arg }}</code>
              <span v-if="arg.description"> - {{ arg.description }}</span>
            </template>
          </div>
        </template>
      </b-table>
    </article>
  </section>
</template>

<script>
import Vue from 'vue'
import kebabCase from 'lodash/kebabCase'
import AnchoredHeading from './anchored-heading'

export default {
  name: 'BDVComponentdoc',
  components: { AnchoredHeading },
  props: {
    component: {},
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
    componentVModel() {
      const model = this.componentOptions.model
      if (model && model.prop && model.event) {
        return model
      } else {
        return false
      }
    },
    componentProps() {
      return this.componentOptions.props || {}
    },
    propsFields() {
      return [
        { key: 'prop', label: 'Property' },
        { key: 'type', label: 'Type' },
        { key: 'defaultValue', label: 'Default Value' }
      ]
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
      return [{ key: 'name', label: 'Slot' }, { key: 'description', label: 'Description' }]
    },
    propsItems() {
      const props = this.componentProps

      return Object.keys(props).map(prop => {
        const p = props[prop]

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

        return {
          prop: kebabCase(prop),
          type,
          typeClass,
          defaultValue: defaultVal,
          required: p.required || false,
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
