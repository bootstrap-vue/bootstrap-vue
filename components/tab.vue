<template>
  <div role="tabpanel" class="tab-pane" :class="{active: active, disabled: disabled, fade: fade, in: animate, show: active}">
    <slot></slot>
  </div>
</template>

<script>
export default {
    replace: true,
    data() {
        return {
            fade: this.$parent.fade,
            animate: false,
            active: false
        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        const items = this.$parent.items;
        items.push({id: this.id, title: this.title, active: this.active, disabled: this.disabled});
    }
};

</script>
