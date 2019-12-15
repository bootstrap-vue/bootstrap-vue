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
        class="row-cols-3 row-cols-sm-4 row-cols-lg-6 list-unstyled mb-n3 position-relative"
      >
        <b-col
          v-for="icon in filteredIcons.slice(0, curentPageSize)"
          :key="`_icon_${icon.name}`"
          tag="li"
          class="flip-icon-list-icon d-inline-flex flex-column mb-3 text-center"
        >
          <b-card bg-variant="light" no-body>
            <b-card-body body-class="py-3">
              <b-icon :icon="icon.name" :title="icon.name"></b-icon>
            </b-card-body>
          </b-card>
          <b-form-text class="mt-1 text-break" :title="icon.name">{{ icon.name }}</b-form-text>
        </b-col>
        <b-col
          key="__infinite_scroll__"
          v-b-visible.250="onInfinite"
          v-show="currentPageSize < filteredIcons.length"
          tag="li"
        >
          <b-button
            block
            variant="outline-secondary"
            class="mt-3"
            @click="onInfinite(true)"
          >
            Load more icons
          </b-button>
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

// Icon zoom on hover
.flip-icon-list-icon /deep/ .card {
  .bi {
    transition: transform 0.15s;
  }

  &:hover .bi {
    transform: scale(2);
  }
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
  transform: scale(0.5);
}
</style>

<script>
import { iconNames } from '~/../src/index'

const INITIAL_SIZE = 50
const INFINITE_INCREMENT = 24

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
      totalIcons: icons.length,
      curentPageSize: INITIAL_SIZE,
      noIntersectionObserver: false
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
  },
  watch: {
    iconFilter(newVal, oldVal) {
      // Reset the page size to the initial value
      this.curentPageSize = INITIAL_SIZE
    }
  },
  methods: {
    onInfinite(visible) {
      if (visible === null) {
        // Intersection observer not supported
        this.curentPageSize = this.totalIcons
        this.noIntersectionObserver = true
        return
      }
      if (visible) {
        this.curentPageSize = Math.min(this.curentPageSize + INFINITE_INCREMENT, this.totalIcons)
      }
    }
  }
}
</script>
