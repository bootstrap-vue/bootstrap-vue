<template>
  <section
    v-if="component"
    class="bd-content"
  >
    <b-row
      tag="header"
      align-v="center"
    >
      <b-col sm="9"><h2 :id="`comp-ref-${componentName}`"><code>{{ tag }}</code></h2></b-col>
      <b-col
        sm="3"
        class="text-sm-right"
      >
        <b-btn
          variant="outline-secondary"
          size="sm"
          :href="githubURL"
          target="_blank"
        >
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

    <article v-if="props_items && props_items.length > 0">
      <h4 :id="`comp-ref-${componentName}-props`">Properties</h4>
      <b-table
        :items="props_items"
        :fields="props_fields"
        small
        head-variant="default"
        striped
      >
        <template
          slot="default"
          slot-scope="field"
        >
          <code v-if="field.value">{{ field.value }}</code>
        </template>
      </b-table>
    </article>

    <article v-if="slots && slots.length > 0">
      <h4 :id="`comp-ref-${componentName}-slots`">Slots</h4>
      <b-table
        :items="slots"
        :fields="slots_fields"
        small
        head-variant="default"
        striped
      />
    </article>

    <article v-if="events && events.length > 0">
      <h4 :id="`comp-ref-${componentName}-events`">Events</h4>
      <b-table
        :items="events"
        :fields="events_fields"
        small
        head-variant="default"
        striped
      >
        <template
          slot="args"
          slot-scope="field"
        >
          <div
            v-for="arg in field.value"
            :key="`event-${field.item.event}-${arg.arg ? arg.arg : 'none'}`"
          >
            <code v-if="arg.arg">{{ arg.arg }}</code> -
            <span v-html="arg.description" />
          </div>
        </template>
      </b-table>
    </article>

    <article v-if="rootEventEmitters && rootEventEmitters.length > 0">
      <h4 :id="`comp-ref-${componentName}-rootEventEmitters`">$root Event Emitters</h4>
      <b-table
        :items="rootEventEmitters"
        :fields="rootEventEmitters_fields"
        small
        head-variant="default"
        striped
      >
        <template
          slot="args"
          slot-scope="field"
        >
          <div
            v-for="arg in field.value"
            :key="`event-${field.item.event}-${arg.arg ? arg.arg : 'none'}`"
          >
            <code v-if="arg.arg">{{ arg.arg }}</code> -
            <span v-html="arg.description" />
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
    rootEventEmitters: {
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
      return component && component.options ? component.options : {}
    },
    props_fields() {
      const component = Vue.options.components[this.component]
      let props = []
      if (component) {
        props = component.options.props
      }
      const hasRequired = props.length > 0 && props.filter(p => p.required).length > 0

      const fields = {
        prop: { label: 'Property' },
        type: { label: 'Type' },
        default: { label: 'Default Value' }
      }

      // Add the required column if there are required field(s)
      if (hasRequired) {
        fields.required = { label: 'Required' }
      }

      return fields
    },
    events_fields() {
      return {
        event: { label: 'Event' },
        args: { label: 'Arguments' },
        description: { label: 'Description' }
      }
    },
    rootEventEmitters_fields() {
      return {
        event: { label: 'Event' },
        args: { label: 'Arguments' },
        description: { label: 'Description' }
      }
    },
    slots_fields() {
      return {
        name: { label: 'Slot' },
        description: { label: 'Description' }
      }
    },
    props_items() {
      const component = Vue.options.components[this.component]
      if (!component) {
        return {}
      }

      const props = component.options.props
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

        return {
          prop: kebabCase(prop),
          type,
          required,
          typeClass,
          default: defaultVal
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
