<template>
    <nav class="bd-links" id="docsNavbarContent">
        <div class="bd-toc-item active" v-for="group in site.nav">
            <router-link class="bd-toc-link" :to="'/docs/'+group.slug">
                {{ group.title }}
            </router-link>

            <ul class="nav bd-sidenav">
                <li v-for="page in group.pages">
                    <router-link :to="'/docs/'+group.slug+'/'+page.title.replace(' ','-').toLowerCase()"
                                 active-class="active"
                    >
                        {{ page.title }}
                    </router-link>
                </li>
            </ul>

        </div>
    </nav>
</template>

<script>
    import site from '../data/site';

    export default {
        data(){
            return {
                site,
            }
        }
    }
</script>