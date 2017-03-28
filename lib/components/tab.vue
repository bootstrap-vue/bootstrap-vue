<template>
    <transition @after-enter="afterEnter">
        <div role="tabpanel" class="tab-pane"
             :class="[{fade, disabled, active: localActive}]"
             v-if="localActive"
             ref="panel"
        >
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
                fade: null,
                localActive: false
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
