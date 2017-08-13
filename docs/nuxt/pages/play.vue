<template>
    <div class="container mt-3">

        <div class="mb-3 row">
            <div class="col-md-10">
                <span>Here you can interactively play and test components with a fresh vue instance.</span>
                <br>
                <Strong>TIP: </Strong>
                <span>You can clone docs repo, to hack and develop components.</span>
                <span> changes will be reflected and hot-reloaded instantly.</span>
                <br>
                <span>Please refer to</span>
                <router-link to="/docs"> Docs </router-link>
                <span>for more info about available tags and usage.</span>
            </div>
            <div class="col-md-1">
                <form method='post' action='https://jsfiddle.net/api/post/library/pure/'
                      target='_blank' v-if="vm">
                    <input type="hidden" :value="html_fiddle" name="html">
                    <input type="hidden" :value="js_fiddle" name="js">
                    <input type="hidden" value="l" name="js_wrap">
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
</template>

<style>
    .flip-move {
        transition: all .3s;
    }
</style>

<script>
    import Vue from 'vue';
    import {debounce} from 'lodash';
  
    export default {
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
                lazy_run_: null
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
            this.load();
            this.run();

            if (typeof window !== 'undefined') {
                this.originalLog = console.log;
                this.originalWarn = console.warn;
                this.originalError = console.error;
                const self = this;

                console.warn = function () {
                    self.log('warning', arguments);
                };

                console.log = function () {
                    self.log('info', arguments);
                };

                console.error = function () {
                    self.log('danger', arguments);
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
                const js = `new Vue({el:'#app',\r\n${this.js.trim()}})`.trim();
                return `window.onload = function() {${js}}`;
            },
            html_fiddle() {
                return `<div id='app'>\r\n${this.html}\r\n</div>`.trim();
            },
            lazy_run() {
                if (!this.lazy_run_) {
                    this.lazy_run_ = debounce(this.run.bind(this), 500);
                }
                return this.lazy_run_;
            }
        },
        methods: {
            log(tag, args) {
                // We have to ignore props mutation warning due to vue bug when we have two instances
                if (String(args[0]).indexOf('Avoid mutating a prop directly') !== -1) {
                    return;
                }

                const argsArr = [tag];
                for (let i = 0; i < args.length; i++) {
                    argsArr.push(args[i]);
                }

                this.originalLog.apply(console, argsArr);

                if (this.messages.length > 10) {
                    this.messages.splice(10);
                }
                this.messages.unshift([argsArr.shift(), argsArr.map(String).join(' ')]);
            },
            run() {
                // Commit latest changes
                this.commit();

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
                        eval('options={' + this.js + '}');
                    } catch (err) {
                        throw new Error(`Compiling JS: ${err}`);
                    }
                    options.el = '#result';
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
            },
            load() {
                if (typeof window === 'undefined' || !window.localStorage) {
                    return;
                }
                this.js = window.localStorage.getItem('playground_js') || '';
                this.html = window.localStorage.getItem('playground_html') || '';
            },
            commit() {
                if (typeof window === 'undefined' || !window.localStorage) {
                    return;
                }
                window.localStorage.setItem('playground_js', this.js);
                window.localStorage.setItem('playground_html', this.html);
            }
        }
    };
</script>
