<template>
  <section
    v-if="component"
    class="bd-content"
  >
    <b-row tag="header" align-v="center">
      <b-col sm="9">
        <h2 :id="`comp-ref-${componentName}`"><code>{{ tag }}</code></h2>
      </b-col>
      <b-col sm="3" class="text-sm-right">
        <b-btn variant="outline-secondary" size="sm" :href="githubURL" target="_blank">
          view source
        </b-btn>
      </b-col>
    </b-row>

    <article v-if="aliases && aliases.length > 0">
      <h4 :id="`comp-ref-${componentName}-aliases`">Component aliases</h4>
      <p><code>{{ tag }}</code> can also be used via the following aliases:</p>
      <ul>
        <li v-for="alias in aliases" :key="alias"><code>&lt;{{ kebabCase(alias) }}&gt;</code></li>
      </ul>
    </article>

    <article v-if="propsItems && propsItems.length > 0">
      <h4 :id="`comp-ref-${componentName}-props`">Properties</h4>
      <b-table
        :items="propsItems"
        :fields="propsFields"
        small
        head-variant="default"
        striped
      >
        <template slot="prop" slot-scope="{ value, item }">
          <code>{{ value }}</code>
          <template v-if="item.deprecated">
            <br>
            <b-badge variant="warning">
              {{ typeof item.deprecated === 'string' ? 'deprecation' : 'deprecated' }}
            </b-badge>
            <!-- if deprecated is a string, show the string value -->
            <small v-if="typeof item.deprecated === 'string'"> {{ item.deprecated }}</small>
          </template>
        </template>
        <template slot="default" slot-scope="{ value }">
          <code v-if="value">{{ value }}</code>
        </template>
      </b-table>
    </article>

    <article v-if="slots && slots.length > 0">
      <h4 :id="`comp-ref-${componentName}-slots`">Slots</h4>
      <b-table
        :items="slots"
        :fields="slotsFields"
        small
        head-variant="default"
        striped
      />
    </article>

    <article v-if="events && events.length > 0">
      <h4 :id="`comp-ref-${componentName}-events`">Events</h4>
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
      <h4 :id="`comp-ref-${componentName}-rootEventListeners`">$root Event Listeners</h4>
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

export default {
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
    componentProps() {
      const component = Vue.options.components[this.component]
      if (!component) {
        return {}
      }

      let props = {}
      if (!component.options && typeof component === 'function') {
        // Async component that hans't been resolved yet.
        component(opts => {
          props = opts.props ? { ...opts.props } : {}
        })
      } else {
        // Regular component
        props = component.options.props || {}
      }

      return props
    },
    propsFields() {
      const props = this.componentProps

      const hasRequired = Object.keys(props).some(p => props[p].required)

      const fields = [
        { key: 'prop', label: 'Property' },
        { key: 'type', label: 'Type' },
        { key: 'default', label: 'Default Value' }
      ]

      // Add the required column if there are required field(s)
      if (hasRequired) {
        // Insert Required field after prop name
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
          default: defaultVal,
          deprecated
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
