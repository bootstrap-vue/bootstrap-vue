<template>
    <layout>
        <div class="bd-pageheader">
            <div class="container">
                <h1>
                    <slot name="title"></slot>
                </h1>
                <p class="lead">
                    <slot name="lead"></slot>
                </p>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12 col-md-3 push-md-9 bd-sidebar">
                    <m-sidebar></m-sidebar>
                </div>
                <div class="col-12 col-md-9 pull-md-3 bd-content">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>

    </layout>
</template>

<script>
    import layout from './default.vue';
    import mSidebar from '../includes/sidebar.vue';

    export default{
        components: {layout, mSidebar}
    }
</script>