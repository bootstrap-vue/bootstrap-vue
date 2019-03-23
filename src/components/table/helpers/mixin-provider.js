import looseEqual from '../../../utils/loose-equal'
import { isArray } from '../../../utils/array'
import warn from '../../../utils/warn'

import listenOnRootMixin from '../../../mixins/listen-on-root'

export default {
  mixins: [listenOnRootMixin],
  props: {
    noProviderPaging: {
      type: Boolean,
      default: false
    },
    noProviderSorting: {
      type: Boolean,
      default: false
    },
    noProviderFiltering: {
      type: Boolean,
      default: false
    },
    apiUrl: {
      // Passthrough prop. Passed to the context object. Not used by b-table directly
      type: String,
      default: ''
    }
  },
  computed: {
    hasProvider() {
      return this.items instanceof Function
    },
    providerTriggerContext() {
      // Used to trigger the provider function via a watcher. Only the fields that
      // are needed for triggering a provider update are included. Note that the
      // regular this.context is sent to the provider during fetches though, as they
      // may neeed all the prop info.
      const ctx = {
        apiUrl: this.apiUrl
      }
      if (!this.noProviderFiltering) {
        // Either a string, or could be an object or array.
        ctx.filter = this.localFilter
      }
      if (!this.noProviderSorting) {
        ctx.sortBy = this.localSortBy
        ctx.sortDesc = this.localSortDesc
      }
      if (!this.noProviderPaging) {
        ctx.perPage = this.perPage
        ctx.currentPage = this.currentPage
      }
      return ctx
    }
  },
  watch: {
    // Provider update triggering
    items(newVal, oldVal) {
      // If a new provider has been specified, trigger an update
      if (this.hasProvider || newVal instanceof Function) {
        this.$nextTick(this._providerUpdate)
      }
    },
    providerTriggerContext(newVal, oldVal) {
      // Trigger the provider to update as the relevant context values have changed.
      if (!looseEqual(newVal, oldVal)) {
        this.$nextTick(this._providerUpdate)
      }
    }
  },
  mounted() {
    // Call the items provider if necessary
    if (this.hasProvider && (!this.localItems || this.localItems.length === 0)) {
      // Fetch on mount if localItems is empty
      this._providerUpdate()
    }
    // Listen for global messages to tell us to force refresh the table
    this.listenOnRoot('bv::refresh::table', id => {
      if (id === this.id || id === this) {
        this.refresh()
      }
    })
  },
  methods: {
    refresh() {
      // Public Method: Force a refresh of the provider function
      this.$off('refreshed', this.refresh)
      if (this.computedBusy) {
        // Can't force an update when forced busy by user (busy prop === true)
        if (this.localBusy && this.hasProvider) {
          // But if provider running (localBusy), re-schedule refresh once `refreshed` emitted
          this.$on('refreshed', this.refresh)
        }
      } else {
        this.clearSelected()
        if (this.hasProvider) {
          this.$nextTick(this._providerUpdate)
        } else {
          /* istanbul ignore next */
          this.localItems = isArray(this.items) ? this.items.slice() : []
        }
      }
    },
    // Provider related methods
    _providerSetLocal(items) {
      this.localItems = isArray(items) ? items.slice() : []
      this.localBusy = false
      this.$emit('refreshed')
      // New root emit
      if (this.id) {
        this.emitOnRoot('bv::table::refreshed', this.id)
      }
    },
    _providerUpdate() {
      // Refresh the provider function items.
      if (!this.hasProvider) {
        // Do nothing if no provider
        return
      }
      // If table is busy, wait until refereshed before calling again
      if (this.computedBusy) {
        // Schedule a new refresh once `refreshed` is emitted
        this.$nextTick(this.refresh)
        return
      }

      // Set internal busy state
      this.localBusy = true

      // Call provider function with context and optional callback after DOM is fully updated
      this.$nextTick(function() {
        try {
          // Call provider function passing it the context and optional callback
          const data = this.items(this.context, this._providerSetLocal)
          if (data && data.then && typeof data.then === 'function') {
            // Provider returned Promise
            data.then(items => {
              // Provider resolved with items
              this._providerSetLocal(items)
            })
          } else if (isArray(data)) {
            // Provider returned Array data
            this._providerSetLocal(data)
          } else if (this.items.length !== 2) {
            // Check number of arguments provider function requested
            // Provider not using callback (didn't request second argument), so we clear
            // busy state as most likely there was an error in the provider function
            /* istanbul ignore next */
            warn(
              "b-table provider function didn't request calback and did not return a promise or data"
            )
            /* istanbul ignore next */
            this.localBusy = false
          }
        } catch (e) /* istanbul ignore next */ {
          // Provider function borked on us, so we spew out a warning
          // and clear the busy state
          warn(`b-table provider function error [${e.name}] ${e.message}`)
          this.localBusy = false
          this.$off('refreshed', this.refresh)
        }
      })
    }
  }
}
