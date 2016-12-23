<template>
    <layout>
        <template slot="title">Getting Started</template>
        <template slot="lead">Let's go!</template>
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
            <b-alert :show="true">
                <strong>Important</strong>
                Bootstrap Vue Does not ships with bootstrap 4 css files! With both methods,
                you have to add bootstrap stylesheets to everything working fine!
            </b-alert>

            <h3 id="cdn">CDN</h3>
            If you are simply including vue in your website, then the only thing to get started with bootstrap-vue
            components is adding this line AFTER including vue.js:
            <code v-code class="html">
                &lt;script src=&quot;https://unpkg.com/bootstrap-vue/dist/bootstrap-vue.js&quot;&gt;&lt;/script&gt;
            </code>

            <h3 id="npm">NPM</h3>
            <p>
                If you are using module bundlers such as Webpack, Rollup, Laravel elixir, etc you may prefer directly
                include package into your project.
                To get started use <strong>yarn</strong> or <strong>npm</strong> to get latest version.
            </p>
            <code v-code class="shell">
                npm i bootstrap-vue@latest
                yarn add bootstrap-vue@latest
            </code>
            <p>
                Now you have to register bootstrap-vue components inside Vue.
            </p>
            <h4>Option 1: use pre-compiled version to include all components</h4>
            <p>
                This is the simplest way, as is does not requires you having library dependencies.
                The drawback is you have to include full commonjs bundle, which is about ~70kb minified.
            </p>
            <code v-code class="js">
                import Vue from 'vue'
                import BootstrapVue from 'bootstrap-vue';

                // Globally register bootstrap-vue components
                Vue.use(BootstrapVue);
            </code>
            <h4>Option 2: import individual components</h4>
            <p>
                With this option you only will require the components you need.
            </p>
            <code v-code class="js">
                import Vue from 'vue';
                import Alert from 'bootstrap-vue/components/alert.vue'

                // Register Alert component
                Vue.use('bAlert',Alert);

                // OR Inside your templates:
                export default {
                &emsp; components: {bAlert:Alert}
                }
            </code>

        </template>
    </layout>
</template>

<script>
    import layout from '../../layouts/docs.vue';
    import site from  '../../data/site';

    export default {
        components: {layout},
        computed:{
            site
        },
    }
</script>