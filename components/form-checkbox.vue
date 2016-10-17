<template>
  <fieldset :class="['form-group',inputState]">
    <div class="checkbox"
         v-for="item in list"
         :class="{ 'checkbox-inline': !vertical, disabled: item.disabled }">
      <label :class="{ 'c-input': custom, 'c-checkbox': custom }">
        <input
          :id="item.id"
          type="checkbox"
          :value="item.value"
          autocomplete="off"
          v-model="item.checked"
          :disabled="item.disabled">
        <span class="c-indicator" v-if="custom"></span> {{item.text}}
      </label>
    </div>
  </fieldset>
</template>


<script>
  export default {
    replace: true,
    computed: {
      inputState() {
        return !this.state || this.state === `default` ? `` : `has-${this.state}`
      },
    },
    props: {
      list: {
        type: Array,
        // TODO: http://vuejs.org/guide/migration.html#twoWay-Prop-Option-deprecated
        default: [],
        required: true
      },
      model: {
        type: Array,
        // TODO: http://vuejs.org/guide/migration.html#twoWay-Prop-Option-deprecated
        default: []
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
      list: {
        handler() {
          this.model = []
          this.list.forEach(function (item) {
            if (item.checked) {
              if (this.returnObject) {
                this.model.push(item)
              } else {
                this.model.push(item.value)
              }
            }
          })
          // dispatch an event
          this.$root.$emit('changed::button-checkbox', this.model);
        },
        deep: true,
      }
    },
    mounted() {
      // handle initial selection
      this.list.forEach(function (item) {
        if (this.returnObject) {
          this.model.forEach(function (modelItem) {
            if (modelItem.value === item.value) {
              item.checked = true
            }
          })
        } else {
          if (this.model.indexOf(item.value) !== -1) {
            item.checked = true
          }
        }
      })
    }
  }

</script>
