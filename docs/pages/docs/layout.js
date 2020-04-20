// Add redirect from old URL to new one
// @vue/component
export default {
  fetch({ redirect }) {
    redirect(301, '/docs/components/layout')
  }
}
