<template>
    <div :class="['card',cardVariant,cardAlign,cardInverse]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        replace: true,
        computed: {
            cardVariant() {
                return !this.variant || this.variant === `default` ? `card-default` : `card-${this.variant}`;
            },
            cardInverse() {
                return (this.type === `image-overlay` || this.type === `inverse`) ? `card-inverse` : ``;
            },
            cardAlign() {
                return `text-${this.align}`;
            }
        },
        props: {
            align: {
                type: String,
                default: 'left'
            },
            type: {
                type: String,
                default: 'default'
            },
            variant: {
                type: String,
                default: 'default'
            }
        },
        watch: {
            'type'(val) {
                // get first card-block or div and apply a card-image-overlay class if image-overlay slected
                const div = this.$el.getElementsByClassName('card-block')[0] || this.$el.getElementsByTagName('div')[0];
                if (val === 'image-overlay') {
                    div.classList.add('card-img-overlay');
                } else {
                    div.classList.remove('card-img-overlay');
                }
            }
        }
    };
</script>
