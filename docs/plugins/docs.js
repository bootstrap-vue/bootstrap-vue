// Disable vue global error handler
import Vue from 'vue'

export default function() {
  Vue.config.errorHandler = console.error
}
