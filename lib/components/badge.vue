<template>
<span :class="['badge',badgeVariant,badgePill]">
	<slot></slot>
</span>
</template>

<script>
    export default {
        computed: {
            badgeVariant() {
                return `badge-${this.variant}`;
            },
            badgePill() {
                return this.pill ? 'badge-pill' : '';
            }
        },
        props: {
            variant: {
                type: String,
                default: 'secondary'
            },
            pill: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
