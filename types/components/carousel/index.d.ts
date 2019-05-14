//
// Carousel
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
export declare const CarouselPlugin: BvPlugin
export default CarouselPlugin

// Component: b-carousel
export declare class BCarousel extends Vue {
  setSlide: (slide: number) => void
  prev: () => void
  next: () => void
  start: () => void
  pause: () => void
  restart: () => void
}

// Component: b-carousel-slide
export declare class BCarouselSlide extends Vue {}
