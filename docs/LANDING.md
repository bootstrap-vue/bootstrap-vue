<h2 class="bd-featurette-title">Easy to get started.</h2>

<p class="lead">
   Quickly include packaged js inside your templates or use NPM.
</p>

<div class="row">
   <div class="col-sm-6 mb-3">
      <h4>NPM</h4>
      <p>Install via your favorite package manager</p>
      <div class="hljs">
      ```
      # Using YARN
      yarn add bootstrap-vue
      
      # Using NPM
      npm install --save bootstrap-vue
      ```
      </div>
      <p>Register components</p>
      <div class="hljs">
      ```
         import Vue from 'vue'
         import BootstrapVue from 'bootstrap-vue'
         
         Vue.use(BootstrapVue)
      ```
      </div>
   </div>
   <div class="col-sm-6 mb-3">
      <h4>CDN</h4>
      <p>Simply include js inside your HTML templates</p>
      <div class="hljs">
      ```
         <!-- Add this after vue.js -->
         <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
      ```
      </div>
   </div>
</div>