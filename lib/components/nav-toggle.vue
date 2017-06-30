<template>
    <button :class="classObject"
            type="button"
            :aria-label="label"
            :aria-controls="target.id ? target.id : target"
            :aria-expanded="toggleState ? 'true' : 'false'"
            @click="onclick"
    >
        <span class="navbar-toggler-icon"></span>
    </button>
</template>

<script>
import listenOnRoot from '../mixins/listen-on-root';

export default {
    mixins: [listenOnRoot],
    computed: {
        classObject() {
            return [
                'navbar-toggler',
                'navbar-toggler-' + this.position
            ];
        }
    },
    data() {
        return {
            toggleState: false
        };
    },
    props: {
        label: {
            type: String,
            default: 'Toggle navigation'
        },
        position: {
            type: String,
            default: 'right'
        },
        target: {
            required: true
        }
    },
    methods: {
        onclick() {
            const target = this.target;
            if (target.toggle) {
                target.toggle();
            }
            this.$root.$emit('collapse::toggle', this.target);
        },
        handleStateEvt(target, state) {
            if (target === this.target || target === this.target.id) {
                this.toggleState = state;
            }
        }
    },
    created() {
        this.listenOnRoot('collapse::toggle::state', this.handleStateEvt);
    }
};
</script>
