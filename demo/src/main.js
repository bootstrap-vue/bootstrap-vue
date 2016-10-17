import Vue from 'vue'
import App from './App.vue'
import {register} from 'bootstrap-vue';
register(Vue);

new Vue({
  el: '#app',
  render: h => h(App)
});
