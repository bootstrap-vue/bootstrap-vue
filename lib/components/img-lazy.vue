<template>
    <b-img :src="computedSrc"
           :blank="computedBlank"
           :blank-color="blankColor"
           :width="computedWidth"
           :height="computedHeight"
           :fluid="fluid"
           :fluid-grow="fluidGrow"
           :block="block"
           :thumbnail="thumbnail"
           :rounded="rounded"
           :left="left"
           :right="right"
           :center="center"
    ></b-img>
</template>

<script>
    import bImg from './img';
    import { isVisible, getBCR, eventOn, eventOff } from '../utils/dom';

    const THROTTLE = 100;

    export default {
        components: { bImg },
        data() {
            return {
              isShown: false,
              scrollTimeout: null
          }
        },
        props: {
            src: {
                type: String,
                default: null,
                rqeuired: true
            },
            width: {
                type: [Number, String],
                default: null
            },
            height: {
                type: [Number, String],
                default: null
            },
            blankSrc: {
                // If null, a blank image is generated
                type: String,
                default: null
            },
            blankColor: {
                type: String,
                default: 'transparent'
            },
            blankWidth: {
                type: [Number, String],
                default: null
            },
            blankHeight: {
                type: [Number, String],
                default: null
            },
            fluid: {
                type: Boolean,
                default: false
            },
            fluidGrow: {
                type: Boolean,
                default: false
            },
            block: {
                type: Boolean,
                default: false
            },
            thumbnail: {
                type: Boolean,
                default: false
            },
            rounded: {
                type: [Boolean, String],
                default: false
            },
            left: {
                type: Boolean,
                default: false
            },
            right: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: false
            },
            offset: {
                type: [Number, String],
                default: 360
            },
            throttle: {
                type: [Number, String],
                default: THROTTLE
            }
        },
        computed: {
            computedSrc() {
                return (!this.blankSrc || this.isShown) ? this.src : this.blankSrc;
            },
            computedBlank() {
                return (this.isShown || this.blankSrc) ? false : true;
            },
            computedWidth() {
                return this.isShown ? this.width : (this.blankWidth || this.width);
            },
            computedHeight() {
                return this.isShown ? this.height : (this.blankHeight || this.height);
            }
        },
        mounted() {
            this.setListeners(true);
            this.checkView();
        },
        activated() {
            this.setListeners(true);
            this.checkView();
        },
        deactivated() {
            this.setListeners(false);
        },
        beforeDdestroy() {
            this.setListeners(false);
        },
        methods: {
            setListeners(on) {
                clearTimeout(this.scrollTimer);
                this.scrollTimout = null;
                const root = window;
                if (on) {
                    eventOn(root, 'scroll', this.onScroll);
                    eventOn(root, 'resize', this.onScroll);
                    eventOn(root, 'orientationchange', this.onScroll);
                } else {
                    eventOff(root, 'scroll', this.onScroll);
                    eventOff(root, 'resize', this.onScroll);
                    eventOff(root, 'orientationchange', this.onScroll);
                }
            },
            checkView() {
                // check bounding box + offset to see if we should show 
                if (!isVisible(this.$el)) {
                    // Element is hidden, so skip for now
                    return;
                }
                const offset = parseInt(this.offset,10) || 0;
                const docElement = document.documentElement;
                const view = {
                    l: 0 - offset,
                    t: 0 - offset,
                    b: docElement.clientHeight + offset,
                    r: docElement.clientWidth + offset
                };
                const box = getBCR(this.$el);
                if (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b) {
                     // image is in view (or about to be in view)
                     this.isShown = true;
                     this.setListeners(false);
                }
            },
            onScroll() {
                if (this.isShown) {
                    this.setListeners(false);
                } else {
                    clearTimeout(this.scrollTimeout);
                    this.scrollTimeout = setTimeout(this.checkView, parseInt(this.throttle, 10) || THROTTLE);
                }
            }
        }
    };
</script>
