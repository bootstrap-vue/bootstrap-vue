<template>
<div>
    <b-navbar toggleable class="main-nav pl-5 pr-5">
    
        <b-nav-toggle target="bd-main-nav"></b-nav-toggle>
    
        <b-link class="navbar-brand nuxt-link-active" to="/" exact>
            <img src="~static/icon.png" alt="BV">
            <span>BootstrapVue</span>
        </b-link>
    
        <b-collapse isNav class="justify-content-between" id="bd-main-nav">
    
            <b-nav isNavBar>
                <b-nav-item to="/docs">Documentation</b-nav-item>
    
                <b-nav-item to="/play">
                    <span>Playground</span>
                </b-nav-item>
    
            </b-nav>
    
            <b-nav isNavBar>
                <div class="nav-item nav-link">
                    <iframe src="https://ghbtns.com/github-btn.html?user=bootstrap-vue&repo=bootstrap-vue&type=fork&count=true" frameborder="0" scrolling="0" width="100px" height="20px">
                    </iframe>
                    <iframe src="https://ghbtns.com/github-btn.html?user=bootstrap-vue&repo=bootstrap-vue&type=star&count=true&" frameborder="0" scrolling="0" width="100px" height="20px">
                    </iframe>
                </div>
            </b-nav>
    
        </b-collapse>
    
    </b-navbar>
    <b-alert show class="mb-4" variant="warning">
        🔥 <a target="_blank" href="http://blog.getbootstrap.com/2017/08/10/bootstrap-4-beta">Bootstrap 4.Beta is out !</a>
        This docs are based on v4-alpha.6 release of Bootstrap.
        <br>
        We are heavily working on a stable version, If interested to preview see 
        <a target="_blank" href="https://bootstrap-vue.now.sh"> Beta Docs </a>
    </b-alert>
</div>
</template>

<style>
.main-nav {
    box-shadow: 0 0 5px rgba(57, 70, 78, .2) !important;
    background: white;
    z-index: 1050;
    padding-bottom: 0;
}

.main-nav .nav-link,
.main-nav .navbar-brand {
    padding-bottom: 10px;
    border-bottom: 3px solid transparent;
}

.main-nav .nav-link.nuxt-link-active {
    border-bottom: 3px solid #4fc08d;
}

.navbar-brand img {
    height: 1.5em;
    padding-right: .5em;
}
</style>

<script>
export default {};
</script>
