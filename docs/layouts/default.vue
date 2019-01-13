<template>
  <div class="bd-home">
    <m-nav />
    <br>
    <nuxt />

    <m-footer />
  </div>
</template>

<script>
import mNav from '~/components/nav.vue'
import mFooter from '~/components/footer.vue'

export default {
  components: { mNav, mFooter }
}
</script>
