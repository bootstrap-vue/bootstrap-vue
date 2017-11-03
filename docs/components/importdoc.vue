<template>
    <section class="bd-content" v-if="components.length > 0 || directives.length > 0">

        <article v-if="components.length > 0">
            <h3>Importing Individual Components</h3>
            <b-table :items="componentImports" small head-variant="default" striped>
                <template slot="component" scope="field">
                    <code>{{field.value}}</code>
                </template>
                <template slot="import_path" scope="field">
                    <code>{{field.value}}</code>
                </template>
            </b-table>
        </article>

        <article v-if="directives.length > 0">
            <h3>Importing Individual Directives</h3>
            <b-table :items="directiveImports" small head-variant="default" striped>
                <template slot="directive" scope="field">
                    <code>{{field.value}}</code>
                </template>
                <template slot="import_path" scope="field">
                    <code>{{field.value}}</code>
                </template>
            </b-table>
        </article>

        <article>
            <h3>Importing {{meta.title}} as a Vue plugin</h3>
            <p v-if="$route.name === 'docs-components-slug'">
                This plugin includes all of the above listed individual
                components<span v-if="directives.length"> and directives</span>.
                Plugins also include any component aliases.
            </p>
            <p v-else>
                This plugin includes all of the above listed individual directives.
            </p>
            <p class="mb-0">
                <code v-if="$route.name === 'docs-components-slug'">
                     import {{pluginName}} from 'bootstrap-vue/es/components/{{$route.params.slug}};
                </code>
                <code v-else>
                     import {{pluginName}} from 'bootstrap-vue/es/directives/{{$route.params.slug}};
                </code>
            </p>
            <p>
                <code>Vue.use({{pluginName}});</code>
            </p>
            <template v-if="meta.plugins && meta.plugins.length > 0">
                <p>This plugin also automatically includes the following plugins:</p>
                <ul>
                    <li v-for="plugin in meta.plugins" :key="plugin"><code>{{plugin}}</code></li>
                </ul>
            </template>
        </article>

    </section>
</template>

<style scoped>
    h3 {
        padding: 20px 0;
    }
</style>

<script>
    import kebabCase from 'lodash/kebabCase';
    import startCase from 'lodash/startCase';
    export default {
        props: {
            meta: {}
        },
        methods: {
            componentTag(component) {
                return '<' + kebabCase(component) + '>';
            },
            componentPath(component) {
                return '/bootstrap-vue/es/components/' + this.$route.params.slug + '/' + kebabCase(component).replace(/^b-/, '');
            },
            directiveAttr(directive) {
                return kebabCase(directive);
            },
            directivePath(directive) {
                const slug = kebabCase(directive).replace(/^v-b-/, '')
                return '/bootstrap-vue/es/directives/' + slug + '/' + slug;
            },
        },
        computed: {
            pluginName() {
                return startCase(this.$route.params.slug).replace(/\s+/g, '');
            },
            componentImports() {
               return this.components.map(c => {
                   return {
                       component: this.componentTag(c),
                       import_path: this.componentPath(c)
                   };
               });
            },
            directiveImports() {
               return this.directives.map(d => {
                   return {
                       directive: this.directiveAttr(d),
                       import_path: this.directivePath(d)
                   };
               });
            },
            components() {
               return [].concat(this.meta.component, this.meta.components).filter(c => c);
            },
            directives() {
               return [].concat(this.meta.directive, this.meta.directives).filter(d => d);
            }
        }
    };
</script>
