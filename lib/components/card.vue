<template>
    <component :is="tag" :class="['card',cardVariant,cardAlign,cardInverse]">
        <!-- Card Image Slot-->
        <slot name="img" ref="img">
            <img v-if="img" :src="img" :alt="imgAlt" :class="['card-img', 'img-fluid']">
        </slot>

        <!-- Card Header-->
        <component v-if="header || $slots['header']"
                   :is="headerTag"
                   :class="['card-header', headerVariant?('bg-'+headerVariant):'', headerClass]"
        >
            <slot name="header">
                <div v-html="header"></div>
            </slot>
        </component>

        <!--Show custom block when no-body prop is set-->
        <template v-if="noBody">
            <slot></slot>
        </template>

        <!-- Card Standard Body-->
        <div :class="blockClass" v-else>
            <h4 v-if="title" :is="titleTag" class="card-title" v-html="title"></h4>
            <h6 v-if="subTitle" :is="subTitleTag" class="card-subtitle mb-2 text-muted" v-html="subTitle"></h6>
            <slot></slot>
        </div>

        <!-- Card Footer-->
        <component v-if="footer || $slots['footer']"
                   :is="footerTag"
                   :class="['card-footer', footerVariant?('bg-'+footerVariant):'', footerClass]"
        >
            <slot name="footer">
                <div v-html="footer"></div>
            </slot>
        </component>
    </component>
</template>

<script>
    export default {
        computed: {
            blockClass() {
                return [
                    'card-body',
                    (this.overlay || this.imgOverlay) ? 'card-img-overlay' : null
                ];
            },
            cardVariant() {
                if (this.bordered) {
                    return this.variant ? `border-${this.variant}` : null;
                } else {
                    return this.variant ? `bg-${this.variant}` : null;
                }
            },
            cardInverse() {
                return this.inverse ? 'text-white' : ''
            },
            cardAlign() {
                return this.align ? `text-${this.align}` : null;
            }
        },
        props: {
            align: {
                type: String,
                default: null
            },
            inverse: {
                type: Boolean,
                default: false
            },
            variant: {
                type: String,
                default: null
            },
            bordered: {
                type: Boolean,
                default: false
            },
            tag: {
                type: String,
                default: 'div'
            },

            // Header
            header: {
                type: String,
                default: null
            },
            headerVariant: {
                type: String,
                default: null
            },
            headerClass: {
                type: [String, Array],
                default: ''
            },
            headerTag: {
                type: String,
                default: 'div'
            },

            // Footer
            footer: {
                type: String,
                default: null
            },
            footerVariant: {
                type: String,
                default: null
            },
            footerClass: {
                type: [String, Array],
                default: ''
            },
            footerTag: {
                type: String,
                default: 'div'
            },

            // Main body
            title: {
                type: String,
                default: null
            },
            titleTag: {
                type: String,
                default: 'h4'
            },
            subTitle: {
                type: String,
                default: null
            },
            subTitleTag: {
                type: String,
                default: 'h6'
            },
            noBody: {
                type: Boolean,
                default: false
            },

            // Image
            img: {
                type: String,
                default: null
            },
            imgAlt: {
                type: String,
                default: null
            },
            imgOverlay: {
                type: Boolean,
                default: false
            },
            overlay: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
