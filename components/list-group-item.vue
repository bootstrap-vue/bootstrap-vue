<template>
  <li :class="['list-group-item',listState,active ? 'active' : '',disabled ? 'disabled' : '']">
    <slot></slot>
  </li>
</template>

<script>
export default {
    computed: {
        listState() {
            return !this.state || this.state === `default` ? `` : `list-group-item-${this.state}`;
        }
    },
    replace: true,
    props: {
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        state: {
            type: String,
            default: 'default'
        }
    }
};
</script>
