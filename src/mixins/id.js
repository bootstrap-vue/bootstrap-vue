/*
 * SSR Safe Client Side ID attribute generation
 *
 */

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  methods: {
    safeId (suffix = '') {
      const id = this.id || this.localId_ || null
      if (!id) {
        return null
      }
      suffix = String(suffix).replace(/\s+/g, '_')
      return suffix ? id + '_' + suffix : id
    }
  },
  computed: {
    localId_ () {
      if (!this.$isServer && !this.id && typeof this._uid !== 'undefined') {
        return '__BVID__' + this._uid
      }
    }
  }
}
