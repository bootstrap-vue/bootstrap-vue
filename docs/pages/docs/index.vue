<template>
  <div
    class="container bd-content"
    v-html="readme"
  />
</template>

<script>
import readme from '~/markdown/intro/README.md'
import docsMixin from '~/plugins/docs-mixin'

export default {
  mixins: [docsMixin],
  layout: 'docs',
  computed: {
    readme() {
      return readme
    }
  }
}
</script>
