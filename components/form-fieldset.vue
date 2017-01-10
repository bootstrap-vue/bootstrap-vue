<template>
    <fieldset :class="['form-group','row',inputState]">
        <label :for="id" v-if="label" :class="['col-form-label',labelLayout]" v-html="label"/>
        <div :class="inputLayout">
            <slot></slot>
            <div class="form-text text-muted" v-if="feedback" v-html="feedback"></div>
            <small class="form-text text-muted" v-if="description" v-html="description"></small>
        </div>
    </fieldset>
</template>

<script>
    export default {
        computed: {
            inputState() {
                return this.state ? `has-${this.state}` : '';
            },
            labelLayout() {
              return this.layout == 'horizontal' ? 'col-xs-2' : 'col-xs-12';
            },
            inputLayout() {
              return this.layout == 'horizontal' ? 'col-xs-10' : 'col-xs-12';
            }
        },
        props: {
            id: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            },
            layout: {
                type: String,
                default: 'horizontal'
            },
            label: {
                type: String,
                default: null
            },
            description: {
                type: String,
                default: null
            },
            feedback: {
                type: String,
                default: null
            },
        },
    }
</script>
