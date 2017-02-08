<template>
    <b-navbar toggleable type="inverse" variant="inverse" class="main-nav shadow">

        <b-nav-toggle target="bd-main-nav"/>

        <router-link class="navbar-brand nuxt-link-active" to="/">
            <span>Bootstrap Vue</span>
        </router-link>

        <b-collapse isNav class="justify-content-between" id="bd-main-nav">

            <b-nav isNavBar>
                <b-nav-item to="/" exact>Home</b-nav-item>
                <b-nav-item to="/docs" exact>Documentation</b-nav-item>
            </b-nav>

            <b-nav isNavBar>
                <a class="nav-item nav-link "
                   href="https://github.com/bootstrap-vue/bootstrap-vue"
                   target="_blank"
                >❤ Fork on GitHub
                </a>
            </b-nav>

        </b-collapse>

    </b-navbar>

</template>

<style>
    .main-nav{
      background-color: #563d7c;
    }

    .navbar-brand span {
        color: white;
    }
</style>

<script>
    import site from  '../data/site';

    export default{
        data(){
            return {
                site,
            }
        }
    }
</script>