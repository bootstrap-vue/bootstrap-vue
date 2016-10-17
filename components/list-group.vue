<template>
  <ul :class="{'list-group': true, 'list-group-flush': flush}">
    <slot></slot>
  </ul>
</template>


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
