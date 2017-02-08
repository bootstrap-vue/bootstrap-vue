<template>
    <layout :docs="docs">
        <template slot="name">
            Navbar
        </template>

        <template slot="description">
            The navbar is a wrapper that positions branding, navigation, and other elements into a concise header.
            It’s easily extensible and thanks to our Collapse plugin, it can easily integrate responsive behaviors.
        </template>

        <template slot="demo">

            <b-navbar toggleable>

                <b-nav-toggle target="nav_collapse"/>

                <a class="navbar-brand" to="/">
                    <span>Bootstrap4</span>
                </a>

                <b-collapse isNav id="nav_collapse">
                    <b-nav isNavBar>
                        <b-nav-item>Support</b-nav-item>
                        <b-nav-item>Docs</b-nav-item>
                        <b-nav-item>Contact Us</b-nav-item>
                    </b-nav>
                </b-collapse>

            </b-navbar>

        </template>

        <template slot="usage">
            &lt;b-navbar toggleable&gt;

            &lt;b-nav-toggle target=&quot;nav_collapse&quot;/&gt;

            &lt;a class=&quot;navbar-brand&quot; to=&quot;/&quot;&gt;
            &lt;span&gt;Bootstrap4&lt;/span&gt;
            &lt;/a&gt;

            &lt;b-collapse isNav id=&quot;nav_collapse&quot;&gt;
            &lt;b-nav isNavBar&gt;
            &lt;b-nav-item&gt;Support&lt;/b-nav-item&gt;
            &lt;b-nav-item&gt;Docs&lt;/b-nav-item&gt;
            &lt;b-nav-item&gt;Contact Us&lt;/b-nav-item&gt;
            &lt;/b-nav&gt;
            &lt;/b-collapse&gt;

            &lt;/b-navbar&gt;
        </template>

    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data(){
            return {
                docs: {
                    component: 'bNavbar',
                }
            }
        },
        methods: {},
    }
</script>