<template>
    <a class="nav-item"
       href="#"
       @click.stop.prevent="onclick"
       :class="classObject">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        computed: {
            classObject(){
                return ['nav-link', this.active ? 'active' : '', this.disabled ? 'disabled' : ''];
            }
        },
        props: {
            link: {
                type: String,
                default: ''
            },
            active: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onclick: function () {
                this.$emit('click', this.link);
                try {
                    this.$router.push(this.link);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
</script>
