<template>
  <section
    v-if="component"
    class="bd-content"
  >
    <b-row tag="header" align-v="center">
      <b-col sm="9">
        <anchored-heading :id="`comp-ref-${componentName}`" level="2">
          <code>{{ tag }}</code>
        </anchored-heading>
      </b-col>
      <b-col sm="3" class="text-sm-right">
        <b-btn variant="outline-secondary" size="sm" :href="githubURL" target="_blank">
          view source
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
    </article>

    <article v-if="propsItems && propsItems.length > 0">
      <anchored-heading :id="`comp-ref-${componentName}-props`" level="4">
        Properties
      </anchored-heading>
      <b-table
        :items="propsItems"
        :fields="propsFields"
        small
        head-variant="default"
        striped
      >
        <template slot="prop" slot-scope="{ value }">
          <code>{{ value }}</code>
        </template>
        <template slot="row-details" slot-scope="{ item }">
          <b-badge variant="warning">
            {{ typeof item.deprecated === 'string' ? 'deprecation' : 'deprecated' }}
          </b-badge>
          <!-- if deprecated is a string, show the string value -->
          <small v-if="typeof item.deprecated === 'string'">{{ item.deprecated }}</small>
        </template>
        <template slot="defaultValue" slot-scope="{ value }">
          <code v-if="value">{{ value }}</code>
        </template>
      </b-table>

      <template v-if="componentVModel">
        <anchored-heading :id="`comp-ref-${componentName}-v-model`" level="4">
          V-Model
        </anchored-heading>
        <b-table
          :items="[componentVModel]"
          :fields="['prop', 'event']"
          small
          head-variant="default"
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
        small
        head-variant="default"
        striped
      />
    </article>

    <article v-if="events && events.length > 0">
      <anchored-heading :id="`comp-ref-${componentName}-events`" level="4">
        Events
      </anchored-heading>
      <b-table
        :items="events"
        :fields="eventsFields"
        small
        head-variant="default"
        striped
      >
        <template slot="args" slot-scope="{ value, item }">
          <div
            v-for="arg in value"
            :key="`event-${item.event}-${arg.arg ? arg.arg : 'none'}`"
          >
            <template v-if="arg.arg"><code>{{ arg.arg }}</code> - </template>
            <span v-html="arg.description"></span>
          </div>
        </template>
      </b-table>
    </article>

    <article v-if="rootEventListeners && rootEventListeners.length > 0">
      <anchored-heading :id="`comp-ref-${componentName}-rootEventListeners`" level="4">
        $root Event Listeners
      </anchored-heading>
      <p>You can control <code>{{ tag }}</code> by emitting the following events on <samp>$root</samp>:</p>
      <b-table
        :items="rootEventListeners"
        :fields="rootEventListenersFields"
        small
        head-variant="default"
        striped
      >
        <template slot="args" slot-scope="{ value, item }">
          <div
            v-for="arg in value"
            :key="`event-${item.event}-${arg.arg ? arg.arg : 'none'}`"
          >
            <template v-if="arg.arg"><code>{{ arg.arg }}</code> - </template>
            <span v-html="arg.description"></span>
          </div>
        </template>
      </b-table>
    </article>
  </section>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5 {
  padding: 20px 0;
}
</style>

<script>
import Vue from 'vue'
import kebabCase from 'lodash/kebabCase'
import AnchoredHeading from './anchored-heading'

export default {
  components: {
    AnchoredHeading
  },
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
        component(opts => {
          options = opts ? { ...opts } : {}
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
      const props = this.componentProps

      const hasRequired = Object.keys(props).some(p => props[p].required)

      const fields = [
        { key: 'prop', label: 'Property' },
        { key: 'type', label: 'Type' },
        { key: 'defaultValue', label: 'Default Value' }
      ]

      // Add the required column if there are required field(s)
      if (hasRequired) {
        // Insert required field after prop name
        fields.splice(1, 0, { key: 'required', label: 'Required' })
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

        // Requied prop?
        const required = p.required ? 'Yes' : ''
        // Deprecation?
        const deprecated = p.deprecated || false

        return {
          prop: kebabCase(prop),
          type,
          required,
          typeClass,
          defaultValue: defaultVal,
          deprecated,
          _showDetails: !!deprecated
        }
      })
    },
    componentName() {
      return kebabCase(this.component)
    },
    tag() {
      return '<' + this.componentName + '>'
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
