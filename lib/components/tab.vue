<template>
    <transition enter-to-class="show" leave-class="show" @after-enter="afterEnter" mode="out-in">
        <div role="tabpanel"
             class="tab-pane"
             :class="[{fade, disabled, active: localActive}]"
             v-if="localActive || !lazy"
             v-show="localActive || lazy"
             ref="panel">
             <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        methods: {
            afterEnter(el) {
                el.classList.add('show');
            }
        },
        data() {
            return {
                fade: false,
                localActive: false,
                lazy: true
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
            headHtml: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            active: {
                type: Boolean,
                default: false
            },
            href: {
                type: String,
                default: '#'
            }
        }
    };

</script>
