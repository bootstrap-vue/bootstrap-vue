<template>
  <ul :class="{'list-group': true, 'list-group-flush': flush}">
    <slot></slot>
  </ul>
</template>

<style lang="scss">
  @import '../theme/default.scss';

  .list-group {
    li.list-group-item {
      // Hover state
      @include hover-focus {
        color: $list-group-link-hover-color;
        text-decoration: none;
        background-color: $list-group-hover-bg;
      }
    }
  }
</style>

<script>
  export const listGroup = {
    replace: true,
    props: {
      flush: {
        type: Boolean,
        default: false,
      },
    },
  };

  export const listGroupItem = {
    template: '<li :class="[\'list-group-item\',listState,active ? \'active\' : \'\',disabled ? \'disabled\' : \'\']"><slot></slot></li>',
    computed: {
      listState() {
        return !this.state || this.state === `default` ? `` : `list-group-item-${this.state}`
      },
    },
    replace: true,
    props: {
      active: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      state: {
        type: String,
        default: 'default',
      },
    }
  }


</script>
