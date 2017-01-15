<template>			
	<nav class="navbar navbar-toggleable-md navbar-light">
	  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	  </button>
	  
		<router-link class="navbar-brand" to="/">
			Bootstrap Vue
		</router-link>
		
		<div class="collapse navbar-collapse d-flex justify-content-between" id="bd-main-nav">
			<ul class="navbar-nav">
				<li class="nav-item">
					<router-link class="nav-item nav-link" to="/" active-class="active" :exact="true">
						Bootstrap Vue
					</router-link>
				</li>

				<li class="nav-item">
					<router-link class="nav-item nav-link " to="/docs" active-class="active">Documentation</router-link>
				</li>
			</ul>

			<ul class="navbar-nav">
			<li class="nav-item">
					<a class="nav-item nav-link "
					   href="https://github.com/bootstrap-vue/bootstrap-vue"
					   target="_blank"
					>❤ Fork on GitHub</a>
				</li>
			</ul>
		</div>
		
	</nav>
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