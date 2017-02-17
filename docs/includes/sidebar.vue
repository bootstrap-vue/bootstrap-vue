<template>
    <nav class="bd-links" id="docsNavbarContent">
        <div class="bd-toc-item active" v-for="group in site.nav">
            <router-link class="bd-toc-link" :to="'/docs/'+group.slug">
                {{ group.title }}
            </router-link>

            <b-nav class="bd-sidenav">
                <b-nav-item
                        v-for="page in group.pages"
                        :to="'/docs/'+group.slug+'/'+page.title.replace(' ','-').toLowerCase()"
                >
                    {{ page.title }}
                    <span class="badge badge-danger" v-if="page.new">NEW</span>
                </b-nav-item>
            </b-nav>

        </div>
    </nav>
</template>

<style>
    .bd-sidebar .nav > li > a.active {
        /*color: #0275d8;*/
        color: black;
        font-weight: bold;
    }
</style>

<script>
    import site from '../data/site';

    export default {
        data() {
            return {
                site
            };
        }
    };
</script>
