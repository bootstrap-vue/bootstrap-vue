<template>
    <layout :docs="docs">
        <template slot="name">
            Modals

        </template>

        <template slot="description">
            Modals are streamlined, but flexible dialog prompts powered by JavaScript.
            They support a number of use cases from user notification to completely custom content and feature
            a handful of helpful sub-components, sizes, and more.

        </template>

        <template slot="demo">

            <b-btn @click="$root.$emit('show::modal','modal1')">Launch demo modal</b-btn>

            <div class="mt-3 mb-3">
                Submitted Names:

                <ul>
                    <li v-for="n in names">{{n}}</li>
                </ul>
            </div>

            <b-modal id="modal1" title="Submit your name" :onSave="onSave" saveTitle="Submit">
                <b-form-input type="text" placeholder="Enter your name" v-model="name"></b-form-input>
            </b-modal>
        </template>

        <template slot="usage">
            &lt;b-btn @click=&quot;$root.$emit(&#039;show::modal&#039;,&#039;example_modal&#039;)&quot;&gt;
                Show Modal
            &lt;/b-btn&gt;
            &lt;b-modal id=&quot;example_modal&quot; title=&quot;Example Modal&quot;&gt;
                Modal Body
            &lt;/b-modal&gt;

        </template>

    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data() {
            return {
                name: '',
                names: [],
                docs: {
                    component: 'bModal',
                    events: [],
                    slots: [
                        {
                            name: 'modal-header',
                            description: 'Entire modal header container'
                        },
                        {
                            name: 'modal-title',
                            description: 'Modal title'
                        },
                        {
                            name: 'modal-footer',
                            description: 'Modal footer content'
                        }
                    ]
                }
            };
        },
        methods: {
            onSave() {
                if (!this.name) {
                    /* eslint-disable no-alert */
                    alert('Please enter your name');
                    return false;
                }
                this.names.push(this.name);
                this.name = '';
            }
        }
    };
</script>
