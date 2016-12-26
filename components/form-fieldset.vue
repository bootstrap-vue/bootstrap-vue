<template>
    <fieldset :class="['form-group','row',inputState]">
        <label :for="id" v-if="label" :class="['col-form-label','col-xs-2']" v-html="label"/>
        <div class="col-xs-10">
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
