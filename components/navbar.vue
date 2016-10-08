<template>
  <nav :class="['navbar',navbarType,navbarVariant,navbarfixed,full ? 'navbar-full' : '']">
    <slot></slot>
  </nav>
</template>


<script>
  export default {
    replace: true,
    computed: {
      classObject() {
        return []
      },
      navbarType() {
        return !this.type || this.type === `default` || this.type === `light` ? `navbar-light` : `navbar-dark`
      },
      navbarVariant() {
        return !this.variant || this.variant === `default` ? `bg-faded` : `bg-${this.variant}`
      },
      navbarfixed() {
        return !this.fixed ? `` : `navbar-fixed-${this.fixed}`
      },
    },
    props: {
      type: {
        type: String,
        default: 'default',
      },
      variant: {
        type: String,
        default: 'default',
      },
      fixed: {
        type: String,
        default: '',
      },
      full: {
        type: Boolean,
        default: false,
      }
    },
  }

</script>
