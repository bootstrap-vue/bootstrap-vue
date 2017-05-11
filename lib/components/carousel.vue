<template>
    <div class="carousel slide"
         role="region"
         :id="id || null"
         :style="{background,height}"
         tabindex="-1"
         @mouseenter="pause"
         @mouseleave="start"
         @focusin="pause"
         @focusout="restart($event)"
         @keydown.left="prev"
         @keydown.right="next"
    >
        <!-- Indicators -->
        <ol role="menu" 
            class="carousel-indicators"
            v-show="indicators"
            :aria-hidden="indicators ? 'false' : 'true'"
            :aria-owns="indictors && id ? (id + '__BV_inner_') : null"
            :aria-activedescendant="slides[index].id || null"
            :tabindex="indicators ? '0' : '-1'"
            @focusin.self="focusActiveIndicator"
            @keydown.left.stop.prevent="focusPrevIndicator"
            @keydown.up.stop.prevent="focusPrevIndicator"
            @keydown.right.stop.prevent="focusNextIndicator"
            @keydown.down.stop.prevent="focusNextIndicator"
        >
            <li v-for="n in slides.length"
                role="menuitem"
                tabindex="-1"
                ref="indcators"
                :id="id ? (id + '__BV_indicator_' + n + '_') : null"
                :class="{active:n-1 === index}"
                :aria-current="n-1 === index ? 'true' : 'false'"
                :aria-posinset="n"
                :aria-setsize="slides.length"
                :aria-label="labelGoto + ' ' + n"
                :aria-describedby="slides[n-1].id || null"
                :aria-controls="id ? (id + '__BV_inner_') : null"
                @click="index=n-1"
                @keydown.enter.stop.prevent="index=n-1"
                @keydown.space.stop.prevent="index=n-1"
            ></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner"
             role="listbox"
            :id="id ? (id + '__BV_inner_') : null"
        >
            <slot></slot>
        </div>

        <!-- Controls -->
        <template v-if="controls">
            <a class="carousel-control-prev"
               href="#"
               role="button"
               data-slide="prev"
               :aria-controls="id ? (id + '__BV_inner_') : null"
               @click.stop.prevent="prev"
            >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">{{labelPrev}}</span>
            </a>
            <a class="carousel-control-next"
               href="#"
               role="button"
               data-slide="next"
               :aria-controls="id ? (id + '__BV_inner_') : null"
               @click.stop.prevent="next"
            >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">{{labelNext}}</span>
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
            labelGoto: {
                type: String,
                default: 'Goto Slide'
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
            },
            
            // Re-Start auto rotate slides when focus leaves the carousel
            restart(e) {
                if (!e.relatedTarget || !this.$el.contains(e.relatedTarget)) {
                    this.start();
                }
            },
            
            // Focus first indicator
            focusActiveIndicator() {
                if (indicators & this.$refs.indicators.length > 0) {
                    thjis.$nextTick(() => {
                        this.$refs.indicators[this.index].focus();
                    });
                }
            },

            // Focus prev indicator
            focusPrevIndicator() {
                if (indicators & this.$refs.indicators.length > 0) {
                    const idx = this.$refs.indicators.indexOf(el => Boolean(el == document.activeElement)
                    if (idx > 0) {
                        idx--;
                        this.$nextTick(() => {
                            this.$refs.indicators[idx].focus();
                        });
                    }
                }
            },

            focusNextIndicator() {
                if (indicators & this.$refs.indicators.length > 0) {
                    const idx = this.$refs.indicators.indexOf(el => Boolean(el === document.activeElement);
                    if (idx > 0 && idx < this.$refs.indicators - 1) {
                        idx++;
                        this.$nextTick(() => {
                            this.$refs.indicators[idx].focus();
                        });
                    }
                }
            }
        },
        mounted() {
            // Get all slides
            this.slides = this.$el.querySelectorAll('.carousel-item');

            // Set first slide as active
            this.slides[0].classList.add('active');
            this.slides.forEach((slide, idx) => {
                const n = idx + 1;
                slide.setAttribute('aria-current', idx === 0 ? 'true', 'flase');
                slide.setAttribute('aria-posinset', String(n));
                slide.setAttribute('aria-setsize', String(this.slides.length));
                if (this.id) {
                    slide.setAttribute('aria-controlledby', id + '__BV_indicator_' + n + '_');
                }
            })

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
                    currentSlide.setAttribute('aria-current','false');
                    nextSlide.classList.add('active');
                    nextSlide.setAttribute('aria-current','true');

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
