import { extend } from '../../../vue'
import { NAME_TABLE } from '../../../constants/components'
import { EVENT_NAME_REFRESH, EVENT_NAME_REFRESHED } from '../../../constants/events'
import {
  PROP_TYPE_ARRAY_FUNCTION,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_STRING
} from '../../../constants/props'
import { getRootActionEventName, getRootEventName } from '../../../utils/events'
import { isArray, isFunction, isPromise } from '../../../utils/inspect'
import { looseEqual } from '../../../utils/loose-equal'
import { clone } from '../../../utils/object'
import { makeProp } from '../../../utils/props'
import { safeVueInstance } from '../../../utils/safe-vue-instance'
import { warn } from '../../../utils/warn'
import { listenOnRootMixin } from '../../../mixins/listen-on-root'

// --- Constants ---

const ROOT_EVENT_NAME_REFRESHED = getRootEventName(NAME_TABLE, EVENT_NAME_REFRESHED)
const ROOT_ACTION_EVENT_NAME_REFRESH = getRootActionEventName(NAME_TABLE, EVENT_NAME_REFRESH)

// --- Props ---

export const props = {
  // Passed to the context object
  // Not used by `<b-table>` directly
  apiUrl: makeProp(PROP_TYPE_STRING),
  // Adds in 'Function' support
  items: makeProp(PROP_TYPE_ARRAY_FUNCTION, []),
  noProviderFiltering: makeProp(PROP_TYPE_BOOLEAN, false),
  noProviderPaging: makeProp(PROP_TYPE_BOOLEAN, false),
  noProviderSorting: makeProp(PROP_TYPE_BOOLEAN, false)
}

// --- Mixin ---

// @vue/component
export const providerMixin = extend({
  mixins: [listenOnRootMixin],
  props,
  computed: {
    hasProvider() {
      return isFunction(this.items)
    },
    providerTriggerContext() {
      // Used to trigger the provider function via a watcher. Only the fields that
      // are needed for triggering a provider update are included. Note that the
      // regular this.context is sent to the provider during fetches though, as they
      // may need all the prop info.
      const ctx = {
        apiUrl: this.apiUrl,
        filter: null,
        sortBy: null,
        sortDesc: null,
        perPage: null,
        currentPage: null
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
      return clone(ctx)
    }
  },
  watch: {
    // Provider update triggering
    items(newValue) {
      // If a new provider has been specified, trigger an update
      if (this.hasProvider || isFunction(newValue)) {
        this.$nextTick(this._providerUpdate)
      }
    },
    providerTriggerContext(newValue, oldValue) {
      // Trigger the provider to update as the relevant context values have changed.
      if (!looseEqual(newValue, oldValue)) {
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
    this.listenOnRoot(ROOT_ACTION_EVENT_NAME_REFRESH, id => {
      if (id === this.id || id === this) {
        this.refresh()
      }
    })
  },
  methods: {
    refresh() {
      const { items, refresh, computedBusy } = safeVueInstance(this)

      // Public Method: Force a refresh of the provider function
      this.$off(EVENT_NAME_REFRESHED, refresh)
      if (computedBusy) {
        // Can't force an update when forced busy by user (busy prop === true)
        if (this.localBusy && this.hasProvider) {
          // But if provider running (localBusy), re-schedule refresh once `refreshed` emitted
          this.$on(EVENT_NAME_REFRESHED, refresh)
        }
      } else {
        this.clearSelected()
        if (this.hasProvider) {
          this.$nextTick(this._providerUpdate)
        } else {
          /* istanbul ignore next */
          this.localItems = isArray(items) ? items.slice() : []
        }
      }
    },
    // Provider related methods
    _providerSetLocal(items) {
      this.localItems = isArray(items) ? items.slice() : []
      this.localBusy = false
      this.$emit(EVENT_NAME_REFRESHED)
      // New root emit
      if (this.id) {
        this.emitOnRoot(ROOT_EVENT_NAME_REFRESHED, this.id)
      }
    },
    _providerUpdate() {
      // Refresh the provider function items.
      if (!this.hasProvider) {
        // Do nothing if no provider
        return
      }
      // If table is busy, wait until refreshed before calling again
      if (safeVueInstance(this).computedBusy) {
        // Schedule a new refresh once `refreshed` is emitted
        this.$nextTick(this.refresh)
        return
      }

      // Set internal busy state
      this.localBusy = true

      // Call provider function with context and optional callback after DOM is fully updated
      this.$nextTick(() => {
        try {
          // Call provider function passing it the context and optional callback
          const data = this.items(this.context, this._providerSetLocal)
          if (isPromise(data)) {
            // Provider returned Promise
            data.then(items => {
              // Provider resolved with items
              this._providerSetLocal(items)
            })
          } else if (isArray(data)) {
            // Provider returned Array data
            this._providerSetLocal(data)
          } else {
            /* istanbul ignore if */
            if (this.items.length !== 2) {
              // Check number of arguments provider function requested
              // Provider not using callback (didn't request second argument), so we clear
              // busy state as most likely there was an error in the provider function
              /* istanbul ignore next */
              warn(
                "Provider function didn't request callback and did not return a promise or data.",
                NAME_TABLE
              )
              this.localBusy = false
            }
          }
        } catch (e) /* istanbul ignore next */ {
          // Provider function borked on us, so we spew out a warning
          // and clear the busy state
          warn(`Provider function error [${e.name}] ${e.message}.`, NAME_TABLE)
          this.localBusy = false
          this.$off(EVENT_NAME_REFRESHED, this.refresh)
        }
      })
    }
  }
})
