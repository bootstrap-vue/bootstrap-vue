<template>
    <div class="carousel slide" @mouseenter="pause" @mouseleave="start" :style="{background,height}">
        <!-- Indicators -->
        <ol class="carousel-indicators" v-show="indicators">
            <li v-for="n in slides.length"
                :class="{active:n-1 === index}"
                @click="index=n-1"
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
        next: {
            current: 'carousel-item-left',
            next: 'carousel-item-right',
            overlay: 'carousel-item-next'
        },
        prev: {
            current: 'carousel-item-right',
            next: 'carousel-item-left',
            overlay: 'carousel-item-prev'
        }
    };

    export default {
        data() {
            return {
                index: 0,
                isSliding: false,
                slides: []
            };
        },
        props: {
            interval: {
                type: Number,
                default: 5000
            },
            indicators: {
                type: Boolean,
                default: false
            },
            controls: {
                type: Boolean,
                default: false
            },
            height: {
                type: String
            },
            background: {
                type: String
            }
        },
        methods: {
            // Previous slide
            prev() {
                if (this.index <= 0) {
                    this.index = this.slides.length - 1;
                } else {
                    this.index--;
                }
            },

            // Next slide
            next() {
                if (this.index >= this.slides.length - 1) {
                    this.index = 0;
                } else {
                    this.index++;
                }
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
            this.slides = this.$el.querySelectorAll('.carousel-item');

            // Set first slide as active
            this.slides[0].classList.add('active');

            // Auto rotate slides
            this.start();
        },
        watch: {
            index(val, oldVal) {
                if (val === oldVal) {
                    return;
                }

                if (this.isSliding) {
                    this.index = oldVal;
                    return;
                }

                // Determine sliding direction
                let direction = (val > oldVal) ? DIRECTION.next : DIRECTION.prev;

                // Rotates
                if (oldVal === 0 && val === this.slides.length - 1) {
                    direction = DIRECTION.prev;
                } else if (oldVal === this.slides.length - 1 && val === 0) {
                    direction = DIRECTION.next;
                }

                // Determine current and next slides
                const currentSlide = this.slides[oldVal];
                const nextSlide = this.slides[val];

                if (!currentSlide || !nextSlide) {
                    return;
                }

                // Start animating
                this.isSliding = true;

                nextSlide.classList.add(direction.next, direction.overlay);
                currentSlide.classList.add(direction.current);

                this._carouselAnimation = setTimeout(() => {
                    this.isSliding = false;
                    this.$emit('slide', val);

                    currentSlide.classList.remove('active');
                    nextSlide.classList.add('active');

                    currentSlide.classList.remove(direction.current);
                    nextSlide.classList.remove(direction.next, direction.overlay);
                }, 500);
            }
        },
        destroyed() {
            clearTimeout(this._carouselAnimation);
            clearInterval(this._intervalId);
        }
    };

</script>
