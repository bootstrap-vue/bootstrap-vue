<template>
  <div class="bv-icons-table notranslate" role="group" key="_bv-icons-table_">
    <b-form @submit.prevent>
      <b-form-group
        label="Search icons"
        label-cols-sm="4"
        label-cols-md="6"
        label-cols-lg="7"
        label-cols-xl="8"
        label-align-sm="right"
      >
        <b-form-input
          key="_bv-icons-table-input_"
          v-model="iconFilter"
          type="search"
          aria-controls="bv-icons-table"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <b-row
      id="bv-icons-table"
      tag="ul"
      cols="3"
      cols-sm="4"
      cols-lg="6"
      class="list-unstyled mb-0"
    >
      <b-col
        v-for="icon in filteredIcons"
        :key="`_icon_${icon}`"
        tag="li"
        class="mb-2 text-center"
      >
        <b-card bg-variant="light" no-body>
          <b-card-body body-class="py-3">
            <b-icon :icon="icon"></b-icon>
          </b-card-body>
        </b-card>
        <b-form-text class="mt-1">{{ icon }}</b-form-text>
      </b-col>
    </b-row>
    <div aria-live="polite" aria-atomic="true">
      <b-alert :show="filteredIcons.length === 0" class="text-center mb-0">
        No matching icons found. Try searching again.
      </b-alert>
    </div>
  </div>
</template>

<style scoped>
.bv-icons-table .bi {
  font-size: 2rem;
}
</style>

<script>
import { iconNames } from '~/../src/index'

const icons = iconNames
  .filter(name => name !== 'BIcon')
  .map(name => name.replace(/^BIcon/, '')
  .map(name => name.replace(/\B([A-Z])/g, '-$1'))
  .map(name => name.toLowerCase())

export default {
  name: 'BVDIconsTable',
  data() {
    return {
      iconFilter: ''
    }
  },
  computed: {
    filteredIcons() {
      const terms = this.iconFilter
        .trim()
        .toLowerCase()
        .split(/\s+/)
      if (terms.length === 0) {
        return icons.slice()
      }
      return icons.filter(icon => terms.every(term => icon.indexOf(term) !== -1))
    }
  }
}
</script>
