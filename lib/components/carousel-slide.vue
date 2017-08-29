<template>
    <div class="carousel-item"
         role="listitem"
         :id="safeId()"
         :style="{background}"
    >
        <slot name="img">
            <b-img v-if="imgSrc || imgBlank"
                   fluid-grow
                   block
                   :blank="imgBlank"
                   :blank-color="imgBlankColor"
                   :src="imgSrc"
                   :width="computedWidth"
                   :height="computedHeight"
                   :alt="imgAlt"></b-img>
        </slot>
        <div :is="contentTag" :class="contentClasses">
            <h3 v-if="caption" :is="captionTag" v-html="caption"></h3>
            <p v-if="text" :is="textTag" v-html="text"></p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import bImg from './img';
    import { warn } from '../utils';
    import { idMixin } from '../mixins';

    export default {
        components: { bImg },
        mixins: [ idMixin ],
        props: {
            imgSrc: {
                type: String,
                default() {
                    if (this && this.src) {
                        // Deprecate src
                        warn("b-carousel-slide: prop 'src' has been deprecated. Use 'img-src' instead");
                        return this.src;
                    }
                    return null;
                }
            },
            src: {
                // Deprecated: use img-src instead
                type: String
            },
            imgAlt: {
                type: String
            },
            imgWidth: {
                type: [Number, String]
            },
            imgHeight: {
                type: [Number, String]
            },
            imgBlank: {
                type: Boolean,
                default: false
            },
            imgBlankColor: {
                type: String,
                default: 'transparent'
            },
            contentVisibleUp: {
                type: String
            },
            contentTag: {
                type: String,
                default: "div"
            },
            caption: {
                type: String
            },
            captionTag: {
                type: String,
                default: "h3"
            },
            text: {
                type: String
            },
            textTag: {
                type: String,
                default: "p"
            },
            background: {
                type: String
            }
        },
        computed: {
            contentClasses() {
                return [
                    'carousel-caption',
                    this.contentVisibleUp ? 'd-none' : '',
                    this.contentVisibleUp ? `d-${this.contentVisibleUp}-block` : ''
                ];
            },
            computedWidth() {
                // Use local width, or try parent width
                return this.imgWidth || this.$parent.imgWidth;
            },
            computedHeight() {
                // Use local height, or try parent height
                return this.imgHeight || this.$parent.imgHeight;
            }
        }
    };
</script>
