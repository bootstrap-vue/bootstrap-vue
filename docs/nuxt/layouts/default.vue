<template>
    <div class="bd-home">
        <m-nav></m-nav>

        <m-alert/>
        <nuxt/>

        <m-footer></m-footer>
    </div>
</template>

<script>
    import mNav from '~/components/nav.vue';
    import mFooter from '~/components/footer.vue';
    import mAlert from '~/components/alert.vue';

    export default {
        components: {mNav, mFooter, mAlert}
    };
</script>
