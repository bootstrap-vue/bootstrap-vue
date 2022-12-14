<template>
  <b-container id="content" fluid="lg" tag="main" class="py-5">
    <header class="pb-4 bd-content">
      <h1>Vue.js 3.x initial support</h1>
      <p class="bd-lead">
        BootstrapVue meets <code class="text-nowrap" translate="no">@vue-compat</code>!
      </p>
    </header>
    <section class="bd-content">
      With the release of <b>v2.23.0</b> you can now use  <span class="bd-text-purple-bright">BootstrapVue</span> with <a href="https://v3-migration.vuejs.org/migration-build.html" target="_blank">migration build</a> of Vue.js 3

      <b-alert show variant="warning" class="mt-3">
        @vue/compat support is designed for early migration to Vue.js 3 and will be eventually replaced with bootstrap-vue 3.0
      </b-alert>
      <h2 id="limitations" class="bv-no-focus-ring mb-3">
        <span class="bd-content-title">Important limitations<a href="#prerequisites" aria-labelledby="limitations" class="anchorjs-link"></a></span>
      </h2>
      <p><code class="text-nowrap" translate="no">@vue-compat</code> support is currently limited to <code class="text-nowrap" translate="no">{ MODE: 2 }</code> configuration both for compiler and Vue.js itself.
        You can find more details in <a href="https://v3-migration.vuejs.org/migration-build.html#compat-configuration" target="_blank">compat configuration</a> section of migration guide.
      </p>
      <p>That means that you can manually configure each your component with <code class="text-nowrap" translate="no">{ compatConfig: { MODE: 3 }}</code> to be ready for switching to Vue.js 3, however global configuration should be kept in legacy mode in order for all BootstrapVue functions to work</p>

      <pre class="hljs language-html text-monospace p-2 notranslate" translate="no">{{ cmpCode }}</pre>


      <h2 id="start" class="bv-no-focus-ring">
        <span class="bd-content-title">Getting started<a href="#prerequisites" aria-labelledby="start" class="anchorjs-link"></a></span>
      </h2>

      <ul>
        <li>Configure your application according to <a target="_blank" href="https://v3-migration.vuejs.org/migration-build.html#upgrade-workflow">upgrade workflow</a></li>
        <li>Upgrade bootstrap-vue to <b>v2.23.0</b> or higher</li>
        <li>Make sure you're still on bootstrap <b>v4</b></li>
      </ul>

      <p>You can use this <a href="https://stackblitz.com/edit/bootstrap-vue-with-compat">sandbox</a> for reference or reporting issues with @vue/compat</p>

    </section>
  </b-container>
</template>

<script>
import hljs from '../utils/hljs'

export default {
  head() {
    const title = `Vue.js 3 support | BootstrapVue`
    return {
      title
    }
  },
  computed: {
    cmpCode() {
      return [
        `<template>...</template>`,
        `<script>`,
        `export default {`,
        `  data() { /* ... */ },`,
        ``,
        `  // This will disable all Vue.js 2 legacy features for your component`,
        `  compatConfig: { MODE: 3 }`,
        ``,
        ` // ... rest of your component configuration ... `,
        `}`,
        // eslint-disable-next-line no-useless-escape
        `<\/script>`
      ].join('\n')
    }
  },
  mounted() {
    // Highlight code blocks
    ;[...this.$el.querySelectorAll('pre.hljs')].forEach(pre => {
      hljs.highlightBlock(pre)
    })
  }
}
</script>
