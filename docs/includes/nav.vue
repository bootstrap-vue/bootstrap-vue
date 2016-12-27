<template>
    <header class="navbar navbar-light navbar-static-top bd-navbar">
        <div class="container">


            <nav>
                <div class="clearfix">
                    <button class="navbar-toggler float-xs-right hidden-sm-up" type="button" data-toggle="collapse" data-target="#bd-main-nav" aria-controls="bd-main-nav" aria-expanded="false" aria-label="Toggle navigation"></button>
                    <router-link class="navbar-brand hidden-sm-up" to="/">
                        Bootstrap Vue
                    </router-link>
                </div>
                <div class="collapse navbar-toggleable-xs" id="bd-main-nav">
                    <ul class="nav navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-item nav-link" to="/" active-class="active" :exact="true">
                                Bootstrap Vue
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link class="nav-item nav-link " to="/docs" active-class="active">Documentation</router-link>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav" style="float: right;">
                    <li class="nav-item">
                            <a class="nav-item nav-link "
                               href="https://github.com/bootstrap-vue/bootstrap-vue"
                               target="_blank"
                            >❤ Fork on GitHub</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>

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