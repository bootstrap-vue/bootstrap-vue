<template>
<span :class="['badge',badgeVariant,badgePill]">
	<slot></slot>
</span>
</template>

<script>
    export default {
        computed: {
            badgeVariant() {
                return !this.variant || this.variant === `default` ? `badge-default` : `badge-${this.variant}`;
            },
            badgePill() {
                return this.pill ? 'badge-pill' : '';
            }
        },
        props: {
            variant: {
                type: String,
                default: 'default'
            },
            pill: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
