/*
 * SSR Safe Client Side ID attribute generation
 *
 */

export default {
    props: {
        id: {
            typ: String,
            default: null
        }
    },
    data() {
        return {
            localId_: null
        }
    },
    mounted() {
        if (!this.$isServer && !this.id && this._uid) {
            this.localId_ = `__BVID__${this._uid}_`;
        }
    },
    methods: {
        safeId(suffix = '') {
            const id = this.id || this.localId_ || null;
            if (!id) {
                return null;
            }
            suffix = String(suffix).replace(/\s+/g, '_');
            return Boolean(suffix) ? `${id}_${suffix}` : id;
        }
    }
};
