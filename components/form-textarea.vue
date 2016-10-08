<template>
    <fieldset :class="['form-group',inputState]">
        <label :for="id" v-if="label" class="control-label">{{label}}</label>
        <textarea class="form-control" :id="id" :rows="rows" v-model="model"></textarea>
        <small class="text-muted" v-if="description" v-html="description"></small>
    </fieldset>
</template>

<script>
    import {uniqueId} from '../utils/helpers.js'

    export default {
        replace: true,
        computed: {
            inputState() {
                return !this.state || this.state === `default` ? `` : `has-${this.state}`
            },
        },
        props: {
            model: {
                // TODO: http://vuejs.org/guide/migration.html#twoWay-Prop-Option-deprecated
                required: true
            },
            id: {
                type: String,
                default: uniqueId
            },
            label: {
                type: String,
                default: false
            },
            description: {
                type: String,
                default: false
            },
            state: {
                type: String,
                default: ''
            },
            rows: {
                type: Number,
                default: 3
            }
        }
    }

</script>
