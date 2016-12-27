<template>
    <layout :docs="docs">
        <template slot="name">
            Navs
        </template>

        <template slot="description">
            Navigation available in Bootstrap share general markup and styles,
            from the base <code>.nav</code> class to the active and disabled states.
            Swap modifier classes to switch between each style.
        </template>

        <template slot="demo">

            <b-nav>
                <b-nav-item link="#" active>Active</b-nav-item>
                <b-nav-item link="#">Link</b-nav-item>
                <b-nav-item link="#">Another Link</b-nav-item>
                <b-nav-item link="#" disabled>Disabled</b-nav-item>
            </b-nav>

            <br>
            <br>

            <b-nav tabs>
                <b-nav-item link="#" active>Active</b-nav-item>
                <b-nav-item link="#">Link</b-nav-item>
                <b-nav-item link="#">Another Link</b-nav-item>
                <b-nav-item link="#" disabled>Disabled</b-nav-item>
            </b-nav>

            <br>
            <br>

            <b-nav pills>
                <b-nav-item link="#" active>Active</b-nav-item>
                <b-nav-item link="#">Link</b-nav-item>
                <b-nav-item link="#">Another Link</b-nav-item>
                <b-nav-item link="#" disabled>Disabled</b-nav-item>
            </b-nav>

            <br>
            <br>

        </template>

        <template slot="usage">
            &lt;b-nav pills&gt;
            &lt;b-nav-item link=&quot;#&quot; active&gt;Active&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot;&gt;Link&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot;&gt;Another Link&lt;/b-nav-item&gt;
            &lt;b-nav-item link=&quot;#&quot; disabled&gt;Disabled&lt;/b-nav-item&gt;
            &lt;/b-nav&gt;
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
                    component: 'bNav',
                }
            }
        },
        methods: {},
    }
</script>