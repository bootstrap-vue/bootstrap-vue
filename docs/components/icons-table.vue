<template>
  <div key="_bv-icons-table_" class="bv-icons-table notranslate" role="group">
    <b-form @submit.prevent>
      <b-form-group
        label="Search icons"
        label-for="bv-icons-table-search"
        label-cols-sm="4"
        label-cols-md="6"
        label-cols-lg="7"
        label-cols-xl="8"
        label-align-sm="right"
        :description="`Showing ${filteredIcons.length} of ${totalIcons} icons`"
      >
        <b-form-input
          id="bv-icons-table-search"
          key="_bv-icons-table-search_"
          v-model="iconFilter"
          type="search"
          debounce="500"
          aria-controls="bv-icons-table-result"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <div id="bv-icons-table-result" class="py-3 border">
      <transition-group
        tag="ul"
        name="flip-icon-list"
        class="row-cols-3 row-cols-sm-4 row-cols-lg-6 list-unstyled mb-n3"
      >
        <b-col
          v-for="icon in filteredIcons"
          :key="`_icon_${icon.name}`"
          tag="li"
          class="flip-icon-list-icon d-inline-flex flex-column mb-3 text-center"
        >
          <b-card bg-variant="light" no-body>
            <b-card-body body-class="py-3">
              <b-icon :icon="icon.name"></b-icon>
            </b-card-body>
          </b-card>
          <b-form-text class="mt-1 text-break" :title="icon.name">{{ icon.name }}</b-form-text>
        </b-col>
      </transition-group>
      <div aria-live="polite" aria-atomic="true">
        <b-alert
          :show="filteredIcons.length === 0"
          :role="null"
          :aria-live="null"
          :aria-atomic="null"
          variant="light"
          class="text-center mt-4 d-flex align-items-center justify-content-center"
        >
          <b-icon icon="alert-triangle-fill" aria-hidden="true"></b-icon>
          <span>No matching icons found. Try searching again.</span>
        </b-alert>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bv-icons-table /deep/ .bi {
  font-size: 2rem;
}

.form-group /deep/ .form-text {
  text-align: right;
}

#bv-icons-table-result {
  height: calc(100vh - 12rem);
  overflow-y: scroll;
}

// Transion group classes
.flip-icon-list-icon {
  transition: all 0.3s;
}

.flip-icon-list-move {
  transition: transform 0.3s;
}

.flip-icon-list-leave-active {
  position: absolute;
}

.flip-icon-list-enter,
.flip-icon-list-leave-to {
  opacity: 0;
  transform: scale(0.25);
}
</style>

<script>
import { iconNames } from '~/../src/index'

const icons = iconNames
  .filter(name => name !== 'BIcon')
  .sort()
  .map(fullName => {
    return {
      component: fullName,
      name: fullName
        .replace(/^BIcon/, '')
        .replace(/\B([A-Z])/g, '-$1')
        .toLowerCase()
    }
  })

export default {
  name: 'BVDIconsTable',
  data() {
    return {
      iconFilter: '',
      totalIcons: icons.length
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
      return icons.filter(icon => terms.every(term => icon.name.indexOf(term) !== -1))
    }
  }
}
</script>
