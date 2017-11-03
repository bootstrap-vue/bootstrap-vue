<template>
    <div class="bd-content" v-if="components.length > 0 || directives.length > 0">

        <section v-if="components.length > 0">
            <h3>Importing Individual Components</h3>
            <b-table :items="componentImports" small head-variant="default" striped>
                <template slot="component" scope="field">
                    <code>{{field.value}}</code>
                </template>
                <template slot="import_path" scope="field">
                    <code>{{field.value}}</code>
                </template>
            </b-table>
        </section>

        <section v-if="directives.length > 0">
            <h3>Importing Individual Directives</h3>
            <b-table :items="directiveImports" small head-variant="default" striped>
                <template slot="directive" scope="field">
                    <code>{{field.value}}</code>
                </template>
                <template slot="import_path" scope="field">
                    <code>{{field.value}}</code>
                </template>
            </b-table>
        </section>
    </div>
</template>

<style scoped>
    h3 {
        padding: 20px 0;
    }
</style>

<script>
    import kebabCase from 'lodash/kebabCase';
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
                 }
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
