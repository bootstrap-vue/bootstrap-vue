<template>
  <fieldset :class="['form-group',inputState]">
    <label :for="id" v-if="label" class="control-label">{{label}}</label>
    <!-- single select -->
    <select :class="['form-control',inputSize]" :id="id" v-model="model" :options="allOptions" v-if="!multiple">
      <option v-for="option in allOptions" :value="option.value">{{option.text}}</option>
    </select>
    <small class="text-muted" v-if="description" v-html="description"></small>
  </fieldset>
</template>

<script>
  import {uniqueId} from '../utils/helpers.js'

  export default {
    replace: true,
    computed: {
      allOptions(){
        if (this.defaultOption.text && this.defaultOption.value) {
          return [this.defaultOption].concat(this.options)
        }
        return this.options
      },
      inputState() {
        return !this.state || this.state === `default` ? `` : `has-${this.state}`
      },
      inputSize() {
        return !this.size || this.size === `default` ? `` : `form-control-${this.size}`
      },
    },
    props: {
      model: {
        // TODO: http://vuejs.org/guide/migration.html#twoWay-Prop-Option-deprecated
        required: true
      },
      options: {
        type: Array,
        default: [],
        required: true,
      },
      id: {
        type: String,
        default: uniqueId
      },
      label: {
        type: String,
        default: false
      },
      defaultOption: {
        type: Object,
        default() {
          return {}
        }
      },
      description: {
        type: String,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
      state: {
        type: String,
        default: ''
      },
    },
    watch: {
      model(val, oldVal) {
        if (val === oldVal) return;
        // Emit an event from the current vm that propagates all the way up to it's $root
        this.$root.$emit('selected::option', val)
      }
    }
  }

</script>
