<template>
  <b-container id="content" tag="main" class="pb-5">
    <section>
      <header class="bd-content pb-4">
        <h1>Custom themes and dashboards</h1>
        <p>
          With the below themes and dahsboards built by our partners you can build eye catching apps
          and pages, all using BootstrapVue.
        </p>
      </header>

      <article class="bvd-theme">
        <b-card no-body>
          <b-row no-gutters>
            <b-col md="auto">
              <b-card-img src="https://picsum.photos/320/240/?image=84" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col>
              <b-card-body class="d-flex flex-column">
                <h2 class="h3">To be determined</h2>
                <b-card-text>
                  TBD
                </b-card-text>
                <b-card-text class="text-muted">
                  <i>Provided by: <b>XXXXXXXX</b></i>
                </b-card-text>
                <b-button href="#" disabled variant="bd-primary">Get theme</b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </article>

      <article class="bvd-theme">
        <b-card no-body>
          <b-row no-gutters>
            <b-col md="auto">
              <b-card-img src="https://picsum.photos/320/240/?image=82" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col>
              <b-card-body class="d-flex flex-column">
                <h2 class="h3">To be determined</h2>
                <b-card-text>
                  TBD
                </b-card-text>
                <b-card-text class="text-muted">
                  <i>Provided by: <b>XXXXXXXX</b></i>
                </b-card-text>
                <b-button href="#" disabled variant="bd-primary">Get theme</b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>

      <article class="bvd-theme">
        <b-card no-body>
          <b-row no-gutters>
            <b-col md="auto">
              <b-card-img src="https://picsum.photos/320/240/?image=54" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col>
              <b-card-body class="d-flex flex-column">
                <h2 class="h3">To be determined</h2>
                <b-card-text>
                  TBD
                </b-card-text>
                <b-card-text class="text-muted">
                  <i>Provided by: <b>XXXXXXXX</b></i>
                </b-card-text>
                <b-button href="#" disabled variant="bd-primary">Get theme</b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </article>
    </section>
  </b-container>
</template>

<style lang="scss" scoped>
.bvd-theme {
  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  .card {
    // Simple way to get rounded corners
    overflow: hidden;
  }
}
</style>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    title() {
      return 'Themes and dashboards'
    }
  },
  head() {
    const title = `${this.title} | BootstrapVue`
    const description = 'Premium and free themes and dashboards for BootstrapVue.'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ]
    }
  }
}
</script>
