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
            this.localId_ = `__BV__${this._uid}_`;
        }
    },
    computed: {
        safeId() {
            return this.id || this.localId_ || null;
        }
    }
};
