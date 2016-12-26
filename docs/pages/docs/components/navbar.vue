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

            <b-navbar fixed="top" type="light" full>

                <a class="navbar-brand" href="#">BootStrap VUE</a>

                <b-nav class="navbar-nav">
                    <b-nav-item link="#" active>Home <span class="sr-only">(current)</span></b-nav-item>
                    <b-nav-item link="#">Features</b-nav-item>
                    <b-nav-item link="#">Pricing</b-nav-item>
                    <b-nav-item link="#">About</b-nav-item>
                </b-nav>
                <form class="form-inline float-xs-right">
                    <input class="form-control" type="text" placeholder="Search">
                    <b-btn>Search</b-btn>
                </form>
            </b-navbar>

            <br>
            <br>
            <br>
            <br>

            <b-navbar fixed="bottom" type="dark" variant="inverse" full>

                <a class="navbar-brand" href="#">Footer</a>

                <b-nav class="navbar-nav">
                    <b-nav-item link="#" active>Home <span class="sr-only">(current)</span></b-nav-item>
                    <b-nav-item link="#">Features</b-nav-item>
                    <b-nav-item link="#">Pricing</b-nav-item>
                    <b-nav-item link="#">About</b-nav-item>
                </b-nav>
                <form class="form-inline float-xs-right">
                    <input class="form-control" type="text" placeholder="Search">
                    <b-btn>Search</b-btn>
                </form>
            </b-navbar>


        </template>

        <template slot="usage">
            &lt;b-navbar fixed=&quot;top&quot; type=&quot;light&quot; full&gt;

            &lt;a class=&quot;navbar-brand&quot; href=&quot;#&quot;&gt;BootStrap VUE&lt;/a&gt;

            &lt;b-nav class=&quot;navbar-nav&quot;&gt;
            &lt;b-nav-item link=&quot;#&quot; active&gt;Home &lt;span class=&quot;sr-only&quot;&gt;(current)&lt;/span&gt;&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot;&gt;Features&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot;&gt;Pricing&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot;&gt;About&lt;/b-nav-item&gt;
            &lt;/b-nav&gt;

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