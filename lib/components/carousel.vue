<template>
    <div class="carousel slide" @mouseenter="pause" @mouseleave="start">
        <!-- Indicators -->
        <ol class="carousel-indicators" v-show="indicators">
            <li v-for="(item,indicatorIndex) in slides"
                :class="{active:indicatorIndex === index}"
                @click="changeSlide(indicatorIndex)"
            ></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <slot></slot>
        </div>

        <!-- Controls -->
        <template v-if="controls">
            <a class="carousel-control-prev" href="#" role="button" data-slide="prev" @click.stop.prevent="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#" role="button" data-slide="next" @click.stop.prevent="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </template>
    </div>
</template>

<script>
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
        data() {
            return {
                index: 0,
                slidesCount: 0,
                animating: false,
                slides: [],
                direction:DIRECTION.rtl
            };
        },
        props: {
            interval: {
                type: Number,
                default: 5000
            },
            rtl: {
                type: Boolean,
                default: false
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
                }, 1000);
            }
        },
        destroyed() {
            clearTimeout(this._carouselAnimation);
            clearInterval(this._intervalId);
        }
    };

</script>
