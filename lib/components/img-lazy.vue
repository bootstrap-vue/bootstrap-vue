<template>
    <b-img :src="computedSrc"
           :blank="computedBlank"
           :blank-color="blankColor"
           :width="computedWidth"
           :height="computedHeight"
           :fluid="fluid"
           :fluid-grow="fluidGrow"
           :thumbnail="thumbnail"
           :rounded="rounded"
           :left="left"
           :right="right"
           :center="center"
    ></b-img>
</template>

<script>
    import bImg from './img';

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
        destroyed() {
            this.setListeners(flase);
        },
        methods: {
            setListeners(on) {
                const root = window;
                if (on) {
                    root.addEventListener('scroll'), this.onScroll);
                    root.addEventListener('resize'), this.onScroll);
                    root.addEventListener('orientationchange'), this.onScroll);
                } else {
                    root.removeEventListener('scroll'), this.onScroll);
                    root.removeEventListener('resize'), this.onScroll);
                    root.removeEventListener('orientationchange'), this.onScroll);
                    clearTimeout(this.scrollTimer);
                    this.scrollTimout = null;
                }
            },
            checkView() {
                // check bounding box + offset to see if we should show 
                if (this.$el.offsetParent === null || !(this.$el.offsetWidth > 0 || this.$el.offsetHeight > 0)) {
                    // Element is hidden, so skip for now
                    return;
                }
                const offset = parseInt(this.offset,10) || 0;
                const view = {
                    left: 0 - offset,
                    top: 0 - offset,
                    bottom: document.documentElement.clientHeight + offset,
                    right: document.documentElement.clientWidth + offset
                };
                const box = this.$el.getBoundingClientRect();
                if (box.right >= view.left && box.bottom >= view.top && box.left <= view.right && box.top <= view.bottom) {
                     // image is in view (or about to be in view)
                     this.isShown = true;
                     this.setListeners(false);
                }
            },
            onScroll() {
                if (this.isShown) {
                    this.setListeners(false);
                    return;
                }
                clearTimeout(this.scrollTimeout);
                this.scrollTimeout = setTimeout(this.checkView, THROTTLE);
            }
        |
    };
</script>
