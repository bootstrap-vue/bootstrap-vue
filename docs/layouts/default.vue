<template>
  <div class="bd-home">
    <m-nav></m-nav>
    <br>
    <nuxt></nuxt>

    <m-footer></m-footer>
  </div>
</template>

<script>
import mNav from '~/components/nav.vue'
import mFooter from '~/components/footer.vue'

export default {
  components: { mNav, mFooter }
}
</script>
