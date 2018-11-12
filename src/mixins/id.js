/*
 * SSR Safe Client Side ID attribute generation
 * id's can only be generated client side, after mount.
 * this._uid is not synched between server and client.
 */

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      localId_: null
    }
  },
  mounted () {
    // mounted only occurs client side
    this.localId_ = `__BVID__${this._uid}`
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
  }
}
