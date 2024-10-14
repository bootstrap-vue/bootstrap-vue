<template>
  <b-container id="content" fluid="lg" tag="main" class="py-5">
    <header class="pb-4 bd-content">
      <h1>Transitioning to Vue.js 3.x</h1>
      <p class="bd-lead">
        BootstrapVue evolves with <code class="text-nowrap" translate="no">@vue-compat</code>!
      </p>
    </header>
    <section class="bd-content">
      With the release of <b>v2.23.0</b>, you can begin using <span class="bd-text-purple-bright">BootstrapVue</span> with the <a href="https://v3-migration.vuejs.org/migration-build.html" target="_blank">migration build</a> of Vue.js 3.

      <b-alert show variant="warning" class="mt-3">
        While <code class="text-nowrap" translate="no">@vue/compat</code> can assist with simple migrations, it is not intended for long-term use. We highly recommend migrating to <a href="https://bootstrap-vue-next.github.io/bootstrap-vue-next/" target="_blank" rel="noopener">BootstrapVueNext</a>, a complete rewrite that supports Bootstrap v5 and fully utilizes Vue.js 3's capabilities.
      </b-alert>

      <h2 id="limitations" class="bv-no-focus-ring mb-3">
        <span class="bd-content-title">Important Limitations<a href="#prerequisites" aria-labelledby="limitations" class="anchorjs-link"></a></span>
      </h2>
      <p><code class="text-nowrap" translate="no">@vue-compat</code> support is currently limited to the <code class="text-nowrap" translate="no">{ MODE: 2 }</code> configuration for both the compiler and Vue.js. For more details, refer to the <a href="https://v3-migration.vuejs.org/migration-build.html#compat-configuration" target="_blank">compat configuration</a> section of the migration guide.</p>
      <p>This means that while you can configure individual components with <code class="text-nowrap" translate="no">{ compatConfig: { MODE: 3 }}</code>, you should maintain global configuration in legacy mode to ensure all BootstrapVue functions operate correctly.</p>

      <pre class="hljs language-html text-monospace p-2 notranslate" translate="no">{{ cmpCode }}</pre>

      <h2 id="start" class="bv-no-focus-ring">
        <span class="bd-content-title">Getting Started<a href="#prerequisites" aria-labelledby="start" class="anchorjs-link"></a></span>
      </h2>

      <ul>
        <li>Follow the <a target="_blank" href="https://v3-migration.vuejs.org/migration-build.html#upgrade-workflow">upgrade workflow</a> to configure your application.</li>
        <li>Upgrade to <b>bootstrap-vue v2.23.0</b> or higher.</li>
        <li>Ensure you are using Bootstrap <b>v4</b>.</li>
      </ul>

      <p>For a reference implementation or to report issues with <code class="text-nowrap" translate="no">@vue/compat</code>, you can use this <a href="https://stackblitz.com/edit/bootstrap-vue-with-compat">sandbox</a>.</p>

    </section>
  </b-container>
</template>

<script>
import hljs from '../utils/hljs'

export default {
  head() {
    const title = `Vue.js 3 Support | BootstrapVue`
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
        `  // Disable all Vue.js 2 legacy features for your component`,
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
