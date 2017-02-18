<template>
<span :class="['badge',badgeVariant,badgeType,badgePill]">
	<slot></slot>
</span>
</template>

<script>
    export default {
        replace: true,
        computed: {
            badgeVariant() {
                return !this.variant || this.variant === `default` ? `badge-default` : `badge-${this.variant}`;
            },
            badgeType() {
                return this.type ? `badge-${this.type}` : '';
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
            type: {
                type: String,
                default: ''
            },
            pill: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
