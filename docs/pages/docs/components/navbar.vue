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

                <b-nav>
                    <b-nav-item link="#" active>Home <span class="sr-only">(current)</span></b-nav-item>
                    <b-nav-item link="#">Features</b-nav-item>
                    <b-nav-item link="#">Pricing</b-nav-item>
                    <b-nav-item link="#">About</b-nav-item>
                </b-nav>

                <b-form inline class="ml-sm-3">
                    <input class="form-control" type="text" placeholder="Search">
                </b-form>

            </b-navbar>

        </template>

        <template slot="usage">
            &lt;b-navbar fixed=&quot;top&quot; type=&quot;light&quot; full&gt;

            &lt;a class=&quot;navbar-brand&quot; href=&quot;#&quot;&gt;BootStrap VUE&lt;/a&gt;

            &lt;b-nav&gt;
            &lt;b-nav-item link=&quot;#&quot; active&gt;Home &lt;span class=&quot;sr-only&quot;&gt;(current)&lt;/span&gt;&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot;&gt;Features&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot;&gt;Pricing&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot;&gt;About&lt;/b-nav-item&gt;
            &lt;/b-nav&gt;

            &lt;b-form inline&gt;
            &lt;input class=&quot;form-control mr-sm-2&quot; type=&quot;text&quot; placeholder=&quot;Search&quot;&gt;
            &lt;b-btn class=&quot;my-2 my-sm-0&quot;&gt;Search&lt;/b-btn&gt;
            &lt;/b-form&gt;

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