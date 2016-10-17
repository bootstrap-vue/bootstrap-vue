<template>
  <fieldset :class="['form-group',inputState]">
    <label :for="id" v-if="label" class="control-label">{{label}}</label>
    <div class="inputClass">
      <input
        :type="type"
        :class="['form-control',stateIconType,inputSize]"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        @input="onInput"
      >
    </div>
    <small class="text-muted" v-if="description" v-html="description"></small>
  </fieldset>
</template>

<script>
  import {uniqueId} from '../utils/helpers.js'

  export default {
    replace: true,
    computed: {
      inputState() {
        return !this.state || this.state === `default` ? `` : `has-${this.state}`
      },
      stateIconType() {
        return !this.stateIcon || this.stateIcon === `default` ? `` : `form-control-${this.state}`
      },
      inputSize() {
        return !this.size || this.size === `default` ? `` : `form-control-${this.size}`
      },
      row() {
        return labelClass && inputClass
      }
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value)
      }
    },
    props: {
      value: {
        required: true,
        type: String
      },
      type: {
        type: String,
        default: 'text',
        required: true
      },
      id: {
        type: String,
        default: uniqueId
      },
      label: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      state: {
        type: String,
        default: ''
      },
      stateIcon: {
        type: Boolean,
        default: true
      },
    },
  }


</script>
