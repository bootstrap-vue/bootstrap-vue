<template>
  <ul :class="{'nav': true, 'nav-stacked': vertical, 'nav-pills': type == 'pills', 'navbar-nav': type == 'navbar' }">
    <slot></slot>
  </ul>
</template>


<script>
  import {changeLocation} from '../utils/helpers.js'

  export const nav = {
    replace: true,
    computed: {},
    props: {
      vertical: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: '',
      },
    },
  };

  // export slide object
  export const navItem = {
    template: '<li class="nav-item"><a href="#" v-on:click.stop.prevent="changeLocation($router, link)" :class="[\'nav-link\',active ? \'active\' : \'\',disabled ? \'disabled\' : \'\']"><slot></slot></a></li>',
    replace: true,
    props: {
      link: {
        type: String,
        default: '',
      },
      active: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      changeLocation: changeLocation
    },
  }

</script>
