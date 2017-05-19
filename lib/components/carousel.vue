<template>
    <div class="carousel slide"
         role="region"
         :id="id || null"
         :style="{background,height}"
         :aria-busy="isSliding ? 'true' : 'false'"
         @mouseenter="pause"
         @mouseleave="start"
         @focusin="pause"
         @focusout="restart($event)"
         @keydown.left.stop.prevent="prev"
         @keydown.right.stop.prevent="next"
    >

        <!-- Wrapper for slides -->
        <div class="carousel-inner"
             role="list"
             :id="id ? (id + '__BV_inner_') : null"
        >
            <slot></slot>
        </div>

        <!-- Controls -->
        <template v-if="controls">
            <a class="carousel-control-prev"
               href="#"
               role="button"
               :aria-controls="id ? (id + '__BV_inner_') : null"
               @click.stop.prevent="prev"
               @keydown.enter.stop.prevent="prev"
               @keydown.space.stop.prevent="prev"
            >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">{{labelPrev}}</span>
            </a>
            <a class="carousel-control-next"
               href="#"
               role="button"
               :aria-controls="id ? (id + '__BV_inner_') : null"
               @click.stop.prevent="next"
               @keydown.enter.stop.prevent="next"
               @keydown.space.stop.prevent="next"
            >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">{{labelNext}}</span>
            </a>
        </template>

        <!-- Indicators -->
        <ol class="carousel-indicators"
            role="group"
            v-show="indicators"
            :id="id ? (id + '__BV_indicators_') : null"
            :aria-hidden="indicators ? 'false' : 'true'"
            :aria-label="(indicators && labelIndicators) ? labelIndicators : null"
            :aria-owns="(indicators && id) ? (id + '__BV_inner_') : null"
        >
            <li v-for="n in slides.length"
                role="button"
                :id="id ? (id + '__BV_indicator_' + n + '_') : null"
                :tabindex="indicators ? '0' : '-1'"
                :class="{active:n-1 === index}"
                :aria-current="n-1 === index ? 'true' : 'false'"
                :aria-posinset="n"
                :aria-setsize="slides.length"
                :aria-label="labelGotoSlide + ' ' + n"
                :aria-describedby="slides[n-1].id || null"
                :aria-controls="id ? (id + '__BV_inner_') : null"
                @click="index=n-1"
                @keydown.enter.stop.prevent="index=n-1"
                @keydown.space.stop.prevent="index=n-1"
            ></li>
        </ol>

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
            id: {
                type: String
            },
            labelPrev: {
                type: String,
                default: 'Previous Slide'
            },
            labelNext: {
                type: String,
                default: 'Next Slide'
            },
            labelGotoSlide: {
                type: String,
                default: 'Goto Slide'
            },
            labelIndicators: {
                type: String,
                default: 'Select a slide to display'
            },
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
                if (typeof document !== 'undefined' && document.visibilityState && document.hidden) {
                    // Don't animate when page is not visible
                    return;
                }
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
                this._intervalId = null;
                // Make current slide focusable for screen readers
                this.slides[this.index].tabIndex = 0;
            },

            // Start auto rotate slides
            start() {
                if (this.interval === 0 || typeof this.interval === 'undefined') {
                    return;
                }
                this.slides.forEach(slide => {
                    slide.tabIndex = -1;
                });
                this._intervalId = setInterval(() => {
                    this.next();
                }, this.interval);
            },

            // Re-Start auto rotate slides when focus leaves the carousel
            restart(e) {
                if (!e.relatedTarget || !this.$el.contains(e.relatedTarget)) {
                    this.start();
                }
            }
            
        },
        mounted() {
            // Get all slides
            this.slides = Array.prototype.slice.call(this.$el.querySelectorAll('.carousel-item'));

            // Set first slide as active
            this.slides[0].classList.add('active');
            const self = this;
            this.slides.forEach((slide, idx) => {
                const n = idx + 1;
                slide.setAttribute('aria-current', idx === 0 ? 'true' : 'false');
                slide.setAttribute('aria-posinset', String(n));
                slide.setAttribute('aria-setsize', String(self.slides.length));
                slide.tabIndex = -1;
                if (self.id) {
                    slide.setAttribute('aria-controlledby', self.id + '__BV_indicator_' + n + '_');
                }
            });

            // Auto rotate slides
            this._intervalId = null;
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
                    this.$emit('slide', val);

                    currentSlide.classList.remove('active');
                    currentSlide.setAttribute('aria-current', 'false');
                    currentSlide.setAttribute('aria-hidden', 'true');
                    currentSlide.tabIndex = -1;
                    currentSlide.classList.remove(direction.current);

                    nextSlide.classList.add('active');
                    nextSlide.setAttribute('aria-current', 'true');
                    nextSlide.setAttribute('aria-hidden', 'false');
                    nextSlide.tabIndex = -1;
                    nextSlide.classList.remove(direction.next, direction.overlay);

                    if (!this._intervalId) {
                        // Focus the current slide for screen readers if not in play mode
                        currentSlide.tabIndex = 0;
                        this.$nextTick(() => {
                            currentSlide.focus();
                        });
                    }

                    this.isSliding = false;
                }, 500);
            }
        },
        destroyed() {
            clearTimeout(this._carouselAnimation);
            clearInterval(this._intervalId);
        }
    };

</script>
