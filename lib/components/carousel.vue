<template>
    <div class="carousel slide" data-ride="carousel" @mouseenter="pause()" @mouseleave="start()">

        <!-- Indicators -->
        <ol class="carousel-indicators" v-show="indicators">
            <li v-for="(item,indicatorIndex) in slides" :class="{active:indicatorIndex === index}"
                @click="changeSlide(indicatorIndex)"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <slot></slot>
        </div>

        <!-- Controls -->
        <a class="carousel-control-prev" href="#" role="button" data-slide="prev" @click.stop.prevent="prev" v-show="controls">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#" role="button" data-slide="next" @click.stop.prevent="next" v-show="controls">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>

    /**
     * Carousel Notes
     * - Ie9 does not support transitions and might require javascript fallbacks. B4 deliberately dropped support for this.
     * - It is not accessible.
     *
     * How it works:
     * - active element applies the transition to the slide but not triggers it
     * - we need to use 'right' and 'left' classes to trigger animation
     * - 'next' and 'prev' class makes the incoming slide positioned absolute, so it can follow outgoing slide
     *
     * To slide right to left we have to:
     * - add class 'active', 'next', and right to the next slide
     * - add class 'left' on the current slide same time as remove the 'right' class on the incoming one
     * - remove all classes and only leave 'active' on the incoming slide
     *
     */

    import {csstransitions} from '../utils/helpers';

    // This is directly linked to the bootstrap animation timing in _carousel.scss
    // For browsers that do not support transitions like IE9 just change slide immediately
    const TRANSITION_DURATION = csstransitions() ? 600 : 0;

    // When next is set, we want to move from right to left
    // When previous is set, we want to move from left to right
    const DIRECTION = {
        rtl: {
            outgoing: 'left',
            incoming: 'right',
            overlay: 'next'
        },
        ltr: {
            outgoing: 'right',
            incoming: 'left',
            overlay: 'prev'
        }
    };

    export default {
        replace: true,
        computed: {},
        data() {
            return {
                index: 0,
                slidesCount: 0,
                animating: false,
                slides: [],
                direction: DIRECTION.rtl
            };
        },
        props: {
            interval: {
                type: Number,
                default: 5000
            },
            indicators: {
                type: Boolean,
                default: true
            },
            controls: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            // Previous slide
            prev() {
                if (this.animating) {
                    return;
                }
                this.index--;
                if (this.index < 0) {
                    this.index = this.slidesCount;
                }
            },
            // Next slide
            next() {
                if (this.animating) {
                    return;
                }
                this.index++;
                if (this.index > this.slidesCount) {
                    this.index = 0;
                }
            },
            // On slide change
            changeSlide(index) {
                this.index = index;
            },
            // Pause auto rotation
            pause() {
                if (this.interval === 0 || typeof this.interval === 'undefined') {
                    return;
                }
                clearInterval(this._intervalId);
            },
            // Start auto rotate slides
            start() {
                if (this.interval === 0 || typeof this.interval === 'undefined') {
                    return;
                }
                this._intervalId = setInterval(() => {
                    this.next();
                }, this.interval);
            }
        },
        mounted() {
            // Get all slides
            this._items = this.$el.querySelectorAll('.carousel-item');
            this.slidesCount = this._items.length - 1;
            this.slides = Array.apply(null, {length: this._items.length}).map(Number.call, Number);

            // Set first slide as active
            this._items[0].classList.add('active');

            // Auto rotate slides
            this.start();
        },
        watch: {
            index(val, oldVal) {
                this.animating = true;
                this.direction = DIRECTION.rtl;

                // When previous is pressed we want to move from left to right
                if (val < oldVal) {
                    this.direction = DIRECTION.ltr;
                }

                // Lets animate
                // prepare next slide to animate (position it on the opposite side of the direction as a starting point)
                this._items[val].classList.add(this.direction.incoming, this.direction.overlay);
                // Reflow
                // this._items[val].offsetWidth;
                // add class active
                this._items[val].classList.add('active');
                // Trigger animation on outgoing and incoming slide
                this._items[oldVal].classList.add(this.direction.outgoing);
                this._items[val].classList.remove(this.direction.incoming);
                // Wait for animation to finish and cleanup classes
                this._carouselAnimation = setTimeout(() => {
                    this._items[oldVal].classList.remove(this.direction.outgoing, 'active');
                    this._items[val].classList.remove(this.direction.overlay);
                    this.animating = false;
                    // Trigger an event
                    this.$root.$emit('slid::carousel', val);
                }, TRANSITION_DURATION);
            }
        },
        destroyed() {
            clearTimeout(this._carouselAnimation);
            clearInterval(this._intervalId);
        }
    };

</script>
