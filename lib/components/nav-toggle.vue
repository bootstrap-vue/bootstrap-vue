<template>
    <button :class="classObject"
            type="button"
            :aria-label="label"
            @click="onclick"
            :aria-controls="target"
            :aria-explanded="toggleState"
    >
        <span class="navbar-toggler-icon"></span>
    </button>
</template>

<script>

export default {
    computed: {
        classObject() {
            return [
                'navbar-toggler',
                'navbar-toggler-' + this.position
            ];
        },
        toggleState() {
            return false;
        }
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
        }
    }
};
</script>
