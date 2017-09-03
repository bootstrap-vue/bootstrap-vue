<template>
    <b-collapse tag="nav" is-nav class="bd-links" id="bd-docs-nav">
        <router-link tag="div" class="bd-toc-item" v-for="group in site.nav"
         :key="group.slug" :to="'/docs/'+group.slug" active-class="active" :exact="group.exact">
            <router-link class="bd-toc-link" :to="'/docs/'+group.slug" :exact="group.exact">
                {{ group.title }}
                <small class="badge badge-success" v-if="group.new">NEW</small>
                <small class="badge badge-warning" v-if="group.experimental">BETA</small>
                <small class="badge badge-danger" v-if="group.breaking">BREAKING CHANGE</small>
            </router-link>
    
            <b-nav class="bd-sidenav">
                <b-nav-item v-for="page in group.pages" 
                            :to="('/docs/'+group.slug+(page.slug||(page.title.replace(' ','-').toLowerCase()))).replace(/\/\//g,'/')"
                            exact
                            :key="page.title
                ">
                    {{ page.title }}
                    <small class="badge badge-success" v-if="page.new">NEW</small>
                    <small class="badge badge-warning" v-if="page.experimental">BETA</small>
                    <small class="badge badge-danger" v-if="page.breaking">BREAKING CHANGE</small>
                </b-nav-item>
            </b-nav>
    
        </router-link>
    </b-collapse>
</template>

<style>
.bd-sidebar .nav>li>a.active {
    /*color: #0275d8;*/
    color: black;
    font-weight: bold;
}
</style>

<script>
import site from '../..';

export default {
    data() {
        return {
            site
        };
    }
};
</script>
