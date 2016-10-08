<template>
  <ol class="breadcrumb">
    <li v-for="item in list" :class="{active:item.active}">
      <a href="#"
         @click.stop.prevent="changeLocation($router, item.link)"
         v-if="item.active"
      >{{item.text}}</a>
      <span v-if="!item.active">{{item.text}}</span>
    </li>
  </ol>
</template>

<script>
  import {changeLocation} from '../utils/helpers.js'

  export default {
    replace: true,
    computed: {},
    props: {
      list: {
        type: Array,
        default: [],
        required: true
      },
    },
    methods: {
      changeLocation: changeLocation
    },
  }
</script>
