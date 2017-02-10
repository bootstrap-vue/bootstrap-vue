<template>
    <fieldset :class="['form-group','row',inputState]" v-if="enabled">
        <label :for="id" v-if="label" :class="['col-form-label',labelLayout]" v-html="label"/>
        <div :class="inputLayout">
            <slot :state="state"></slot>
            <div class="form-text text-muted" v-if="feedback" v-html="feedback"></div>
            <small class="form-text text-muted" v-if="description" v-html="description"></small>
        </div>
    </fieldset>
    <div v-else>
        <slot></slot>
    </div>
</template>

<script>
export default {
    computed: {
        inputState() {
            return this.state ? `has-${this.state}` : '';
        },
        labelLayout() {
            return this.horizontal ? 'col-xs-2' : 'col-xs-12';
        },
        inputLayout() {
            return this.horizontal ? 'col-xs-10' : 'col-xs-12';
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
        horizontal: {
            type: Boolean,
            default: false
        },
        enabled: {
            type: Boolean,
            default: true
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
        }
    }
};
</script>
