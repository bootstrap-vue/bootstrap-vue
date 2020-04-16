// Add redirect from old URL to new one
// @vue/component
export default {
  fetch({ redirect, route = {} }) {
    // Use a 301 (permanent) redirect instead of default 302 (found)
    redirect(301, `/docs/reference/contributing${route.hash || ''}`)
  }
}
