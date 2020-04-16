<template>
  <main id="content" role="main">
    <section>
      <h1>Custom themes and dashboards</h1>

      <article class="bvd-theme">
        <b-card no-body>
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img src="https://picsum.photos/320/280/?image=84" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="To be determined">
                <b-card-text>
                  TBD
                </b-card-text>
                <b-button disabled variant="bd-primary">Get theme</b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </article>

      <article class="bvd-theme">
        <b-card no-body>
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img src="https://picsum.photos/320/280/?image=82" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="To be determined">
                <b-card-text>
                  TBD
                </b-card-text>
                <b-button disabled variant="bd-primary">Get theme</b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </article>
    </section>
  </main>
</template>

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
