// Extract docs into main chunk
// import '../../components'
// import '../../directives'
// import '../../reference'
// import '../../layout'
// import '../../misc'

// Disable vue global error handler
import Vue from 'vue'

export default function() {
  Vue.config.errorHandler = console.error
}
