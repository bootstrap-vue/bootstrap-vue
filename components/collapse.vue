<template>
    <div :class="classObject"
         :aria-expanded="show"
         :style="styleObject"
    >
        <slot></slot>
    </div>
</template>

<script>
import {TRANSITION_DURATION} from '../utils/helpers';

// export component object
export default {

    data() {
        return {
            collapsing: false,
            show: false,
            height: 0
        };
    },

    computed: {
        classObject() {
            return {
                'navbar-collapse': this.isNav,
                collapsing: this.collapsing,
                collapse: !this.collapsing,
                show: this.show
            };
        },

        styleObject() {
            const obj = {};
            if (this.collapsing && this.height) {
                obj.height = this.height + 'px';
            }
            return obj;
        },

        scrollHeight() {
            return 100;// this.$el.scrollHeight;
        }
    },

    props: {
        isNav: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            required: true
        }
    },

    methods: {
        toggle() {
            if (this.collapsing) {
                return;
            }

            this.collapsing = true;
            this.height = (this.show ? 0 : this.scrollHeight);

            this._collapseAnimation = setTimeout(() => {
                this.collapsing = false;
                this.show = !this.show;
            }, TRANSITION_DURATION);
        }
    },

    created() {
        this.$root.$on('collapse::toggle', target => {
            if (target !== this.id) {
                return;
            }
            this.toggle();
        });
    },

    destroyed() {
        clearTimeout(this._collapseAnimation);
    }
};

</script>
