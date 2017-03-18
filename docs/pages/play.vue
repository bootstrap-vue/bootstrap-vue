<template>
    <layout>
        <div class="container mt-3">

            <div class="mb-3 row">
                <div class="col-md-10">
                    <span>Welcome to BootstrapVue playground! </span>
                    <span>Here you can interactively play and test components with a fresh vue instance.</span>
                    <br>
                    <Strong>TIP: </Strong>
                    <span>You can clone docs repo, to hack and develop components.</span>
                    <span> changes will be reflected and hot-reloaded instantly.</span>
                    <br>
                    Please refer to






                    <router-link to="/docs">Documentation</router-link>
                    for more info about available tags.







                </div>
                <div class="col-md-1">
                    <form method='post' action='https://jsfiddle.net/api/post/library/pure/'
                          target='_blank'
                          v-if="vm"
                    >
                        <input type="hidden" :value="html_fiddle" name="html">
                        <input type="hidden" :value="js_fiddle" name="js">
                        <input name="resources" type="hidden" :value="fiddle_dependencies.join(',')">
                        <b-btn size="sm" type="submit">
                            <span>Export to JSFiddle</span>
                        </b-btn>
                    </form>
                </div>
            </div>

            <transition-group class="row" tag="div" name="flip">
                <div key="A" :class="full?'col-12':'col'">
                    <transition-group class="row" tag="div" name="flip">
                        <div :class="`col-md-${(vertical&&!full)?6:12} col-sm-12`" key="A1">
                            <!--Template-->
                            <div class="card mt-2">
                                <div class="card-header card-outline-info">
                                    <span>Template</span>
                                    <b-btn size="sm" @click="toggleFull" variant="outline-info" class="float-right">
                                        <span>{{full ? 'Split' : 'Full'}}</span>
                                    </b-btn>
                                </div>
                                <codemirror v-model="html" mode="htmlmixed"></codemirror>
                            </div>
                        </div>
                        <div :class="`col-md-${(vertical&&!full)?6:12} col-sm-12`" key="A2">
                            <!--JS-->
                            <div class="card mt-2">
                                <div class="card-header card-outline-warning">
                                    <span>JS</span>
                                    <b-btn size="sm" @click="toggleFull" variant="outline-info" class="float-right">
                                        <span>{{full ? 'Split' : 'Full'}}</span>
                                    </b-btn>
                                </div>
                                <codemirror v-model="js" mode="javascript"></codemirror>
                            </div>
                        </div>
                    </transition-group>
                </div>

                <div key="B" :class="`col-md-${(vertical || full)?12:6} col-sm-12`">
                    <!--Result-->
                    <div class="card mt-2">
                        <div class="card-header card-outline-success">
                            <span>Result</span>
                            <b-btn size="sm" @click="toggleVertical" variant="outline-info" class="float-right"
                                   v-if="!full">
                                <span>{{vertical ? 'Horizontal' : 'Vertical'}}</span>
                            </b-btn>
                        </div>
                        <div class="card-block">
                            <div id="result-container" ref="result"></div>
                        </div>
                    </div>

                    <!--Console-->
                    <div class="">
                        <div class="card mt-2">
                            <div class="card-header card-outline-secondary">
                                <span>Console</span>
                                <b-btn size="sm" @click="clear" variant="outline-danger" class="float-right"
                                       v-if="messages.length">
                                    <span>Clear</span>
                                </b-btn>
                            </div>
                            <div class="card-block">
                                <div v-for="message in messages">
                                    <b-badge :variant="message[0]">{{message[0]}}</b-badge>
                                    <span class="text-muted"> {{message[1]}}</span>
                                    <br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>

        </div>
    </layout>
</template>

<style>
    .flip-move {
        transition: all .3s;
    }
</style>

<script>
    import Vue from 'vue/dist/vue.common';
    import layout from '../layouts/site.vue';
    import * as Components from '../../components';
    import {debounce} from 'lodash';

    const exampleHTML = `
<b-tooltip content="Click on me" placement="right" show>
  <b-btn class="mb-4" @click="clicked">{{text}}</b-btn>
</b-tooltip>

<b-progress v-model="counter"
            variant="success"
            :precision="1"
            show-progress
            animated
></b-progress>
`;

    const exampleJS = `
{
    data: {
        text: "Click me",
        counter: 45,
    },
    methods: {
        clicked() {
            this.counter = Math.random()*100;
            console.log("Change progress to " +
                        Math.round(this.counter*100)/100);
        }
    }
}`;

    export default {
        components: {layout},
        data() {
            return {
                html: '',
                js: '',
                vm: null,
                messages: [],
                originalLog: null,
                originalWarn: null,
                originalError: null,
                vertical: false,
                full: false,
                lazy_run_: null,
            };
        },
        head() {
            return {
                title: 'Playground - BootstrapVue'
            };
        },
        watch: {
            html() {
                this.lazy_run();
            },
            js() {
                this.lazy_run();
            }
        },
        mounted() {
            this.html = exampleHTML.trim();
            this.js = exampleJS.trim();

            this.run();

            if (typeof window !== 'undefined') {
                this.originalLog = console.log;
                this.originalWarn = console.warn;
                this.originalError = console.error;
                const self = this;

                console.warn = function (text) {
                    self.log('warning', text);
                    self.originalWarn.apply(console, arguments);
                };

                console.log = function (text) {
                    self.log('info', text);
                    self.originalLog.apply(console, arguments);
                };

                console.error = function (text) {
                    self.log('danger', text);
                    self.originalError.apply(console, arguments);
                };
            }
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                console.log = this.originalLog;
                console.warn = this.originalWarn;
                console.error = this.originalError;
            }
        },
        computed: {
            fiddle_dependencies() {
                return [
                    '//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css',
                    '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css',
                    '//unpkg.com/vue@latest/dist/vue.min.js',
                    '//unpkg.com/tether@latest/dist/js/tether.min.js',
                    '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js'
                ];
            },
            js_fiddle() {
                // Inject options
                let js = this.js.trim();
                js = `{el:'#app',\r\n` + js.substring(1);
                return `new Vue(${js})`.trim();
            },
            html_fiddle() {
                return `
<div id='app'>
    ${this.html}
</div>`.trim();
            },
            lazy_run() {
                if (!this.lazy_run_) {
                    this.lazy_run_ = debounce(this.run.bind(this), 500);
                }
                return this.lazy_run_;
            }
        },
        methods: {
            log(tag, text) {
                if (!text) {
                    return;
                }

                if (!text.indexOf) {
                    text = String(text);
                }

                if (text.indexOf('[HMR]') !== -1) {
                    return;
                }

                // There is a bug when having more than 2 vue instances in detecting mutations.
                if (text.indexOf('Avoid mutating a prop directly') !== -1) {
                    return;
                }

                if (text.indexOf('[Vue warn]') !== -1) {
                    tag = 'warning';
                }

                text = text.replace('[Vue warn]: ', '');

                if (this.messages.length > 10) {
                    this.messages.splice(10);
                }

                this.messages.unshift([tag, text]);
            },
            run() {
                // Destroy old VM if exists
                if (this.vm) {
                    try {
                        this.vm.$destroy();
                    } catch (err) {
                    }
                    this.vm = null;
                }

                // Set HTML
                this.$refs.result.innerHTML = `<div id="result"></div>`;

                // Clear messages
                this.clear();

                // Try Create new VM
                try {
                    let options;
                    try {
                        /* eslint-disable no-eval */
                        eval('options=' + this.js);
                    } catch (err) {
                        throw new Error(`Compiling JS: ${err}`);
                    }
                    options.el = '#result';
                    options.components = Components;
                    options.template = `<div>${this.html}</div>`;
                    this.vm = new Vue(options);
                } catch (err) {
                    console.error(err);
                }
            },
            toggleVertical() {
                this.vertical = !this.vertical;
            },
            toggleFull() {
                this.full = !this.full;
            },
            clear() {
                this.messages.splice(0);
            }
        }
    };
</script>
