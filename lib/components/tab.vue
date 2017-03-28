<template>
  <transition @after-enter="afterEnter">
    <div role="tabpanel" class="tab-pane" :class="[{fade: fade, active: active, disabled: disabled}]" v-show="active">
    <slot></slot>
  </div>
  </transition>
</template>

<script>
export default {
    replace: true,
    methods:{
        afterEnter(el){
            el.classList.add('show');
        },
    },
    data() {
        return {
            fade: null,
            active: false
        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
};

</script>
