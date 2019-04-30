//
// Carousel
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Carousel: Carousel
export default Carousel
export interface Carousel extends BvPlugin {}

// Component: b-carousel
export interface BCarousel extends Vue {
  setSlide: (slide: number) => void
  prev: () => void
  next: () => void
  start: () => void
  pause: () => void
  restart: () => void
}

// Component: b-carousel-slide
export interface BCarouselSlide extends Vue {}
