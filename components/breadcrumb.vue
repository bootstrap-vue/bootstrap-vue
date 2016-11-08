<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="item in list" :class="{active:item.active}">
      <a href="#"
         @click.stop.prevent="onclick(item)"
         v-if="!item.active"
      >{{item.text}}</a>
      <span v-if="item.active">{{item.text}}</span>
    </li>
  </ol>
</template>

<script>

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
      onclick: function (item) {
        this.$emit('click',item);
      },
    },
  }
</script>
