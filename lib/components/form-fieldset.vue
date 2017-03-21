<template>
    <div :class="['form-group','row',inputState]" v-if="enabled">
        <label :for="for_id" v-if="label" :class="['col-form-label',labelLayout]" v-html="label"/>
        <div :class="inputLayout">
            <slot></slot>
            <div class="form-text text-muted" v-if="feedback" v-html="feedback"></div>
            <small class="form-text text-muted" v-if="description" v-html="description"></small>
        </div>
    </div>
    <div v-else>
        <slot></slot>
    </div>
</template>

<script>
    import {uniqueId} from '../utils/helpers';

    export default {
        computed: {
            inputState() {
                return this.state ? `has-${this.state}` : '';
            },
            labelLayout() {
                return this.horizontal ? ('col-sm-' + this.labelSize) : ('col-sm-' + (12 - this.labelSize));
            },
            inputLayout() {
                return this.horizontal ? ('col-sm-' + (12 - this.labelSize)) : ('col-sm-' + this.labelSize);
            }
        },
        props: {
            for_id: {
                type: String,
                default: uniqueId
            },
            state: {
                type: String,
                default: null
            },
            horizontal: {
                type: Boolean,
                default: false
            },
            labelSize: {
                type: Number,
                default: 6
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
