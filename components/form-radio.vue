<template>
  <fieldset :class="['form-group',inputState]">
    <div class="radio" v-for="item in list" :class="{ 'radio-inline': !vertical, disabled: item.disabled }">
      <label :class="{ 'c-input': custom, 'c-radio': custom }">
        <input
          :id="item.id"
          type="radio"
          :name="name"
          :value="item.value"
          autocomplete="off"
          v-model="selection"
          :disabled="item.disabled">
        <span class="c-indicator" v-if="custom"></span> {{item.name}}
      </label>
    </div>
  </fieldset>
</template>


<script>
  export default {
    replace: true,
    data() {
      return {
        selection: '',
      }
    },
    computed: {
      inputState() {
        return !this.state || this.state === `default` ? `` : `has-${this.state}`
      },
    },
    props: {
      model: {
        // TODO: http://vuejs.org/guide/migration.html#twoWay-Prop-Option-deprecated
        required: true
      },
      name: {
        type: String,
        default: 'options'
      },
      list: {
        type: Array,
        default: [],
        required: true
      },
      custom: {
        type: Boolean,
        default: true
      },
      vertical: {
        type: Boolean,
        default: false
      },
      state: {
        type: String,
        default: 'default'
      },
      returnObject: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      selection: {
        handler() {
          // set the model based on selection
          if (this.returnObject) {
            this.list.forEach(function (item) {
              if (item.value === this.selection) {
                this.model = item
              }
            })
          } else {
            this.model = this.selection
          }
          // dispatch an event
          this.$root.$emit('changed::button-radio', this.model)
        },
        deep: true,
      }
    },
    mounted() {
      // handle initial selection
      this.selection = this.model.value
    }
  }


</script>
