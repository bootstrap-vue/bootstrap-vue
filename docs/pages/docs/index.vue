<template>
    <layout>
        <template slot="title">Getting Started</template>
        <template slot="lead"></template>
        <template slot="content">
            <h1 class="bd-title" id="content">
                Introduction
            </h1>
            <p>
                Bootstrap is the world’s most popular framework for building responsive, mobile-first sites and
                applications.
                Inside you’ll find high quality HTML, CSS, and JavaScript to make starting any project easier than ever.
                Vue is a library that focuses heavily on the ViewModel—the two-way data bindings that tie what we see
                and interact with on the screen with the application's data mode.
                <br>
                This library helps you quickly integrate bootstrap 4 components with vue.js 2.
            </p>

            <h2>Quick start</h2>
            <br>

            <h3 id="npm">NPM (Webpack, Rollup)</h3>
            <p>
                If you are using module bundlers such as Webpack, Rollup, Laravel elixir, etc you may prefer directly
                include package into your project.
                To get started use <strong>yarn</strong> or <strong>npm</strong> to get latest version.
            </p>
            <code v-code class="shell">
                # Using YARN
                yarn add bootstrap-vue

                # Using NPM
                npm install --save bootstrap-vue
            </code>
            <p>
                Then register components in your app entrypoint:
            </p>
            <code v-code class="js">
                import Vue from 'vue'

                // ES build is more efficient by reducing unneeded components with tree-shaking.
                // (Needs Webpack 2 or Rollup)
                import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.es';

                // Use commonjs version if es build is not working
                // import BootstrapVue from 'bootstrap-vue';

                // Import styles if style-loader is available
                // You have to manually add css files if lines below are not working
                import 'bootstrap/dist/css/bootstrap.css'
                import 'bootstrap-vue/dist/bootstrap-vue.css'

                // Globally register components
                Vue.use(BootstrapVue);
            </code>

            <br>

            <h3 id="cdn">CDN (Browser)</h3>
            UMD Bundle size about 86kb (<strong>~16kb gzipped</strong>)

            <code v-code class="html">
                &lt;!-- Add this to &lt;head&gt; --&gt;
                &lt;link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css&quot;/&gt;
                &lt;link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;//unpkg.com/bootstrap-vue/dist/bootstrap-vue.css&quot;/&gt;

                &lt;!-- Add this after vue.js --&gt;
                &lt;script src=&quot;//unpkg.com/bootstrap-vue/dist/bootstrap-vue.js&quot;&gt;&lt;/script&gt;
            </code>

        </template>
    </layout>
</template>

<script>
    import layout from '../../layouts/docs.vue';

    export default {
        components: {layout}
    };
</script>
