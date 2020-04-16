<template>
  <b-container id="content" fluid="lg" tag="main" class="pb-5">
    <section>
      <header class="bd-content pb-4">
        <h1>Custom themes and dashboards</h1>
        <p class="lead">
          With the below themes and dashboards built by our partners, you can build eye catching
          apps and pages &mdash; all using BootstrapVue!
        </p>
      </header>

      <article v-if="!themes || themes.length === 0" class="bvd-theme">
        <h2 class="h4">Coming soon!</h2>
      </article>

      <article
        v-for="(theme, idx) in themes"
        :key="idx"
        :aria-labelledby="`theme-label-${idx}`"
        class="bvd-theme mb-5"
      >
        <b-card no-body bg-variant="light">
          <b-row no-gutters>
            <b-col md="5" lg="4" xl="4" aria-hidden="true">
              <b-card-img-lazy
                :src="theme.img"
                width="400"
                alt="Image"
                class="rounded-0"
              ></b-card-img-lazy>
            </b-col>
            <b-col>
              <b-card-body class="d-flex flex-column h-100">
                <!-- We use `<h2>` for correct semantics, but `.h5` style -->
                <h2 :id="`theme-label-${idx}`" class="h5">{{ theme.title }}</h2>
                <b-card-text class="flex-grow-1">
                  {{ theme.description }}
                </b-card-text>
                <b-card-text class="text-muted small">
                  <i>Provided by: {{ theme.provider }}</i>
                </b-card-text>
                <b-card-text class="d-flex align-items-center">
                  <b-button :href="theme.href" target="_blank" variant="bd-primary">
                    Get {{ theme.type || 'theme' }}
                  </b-button>
                  <small v-if="theme.price" class="text-muted position-relative ml-3">
                    Price: {{ theme.price }}
                    <b-link href="#theme-notes" title="See notes" class="stretched-link">
                      <b>*</b>
                    </b-link>
                  </small>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </article>

      <aside id="theme-notes" class="text-muted">
        <h2 class="h6">Notes:</h2>
        <ul class="small">
          <li clas="mb-2">
            Prices shown are in US dollars unless otherwise noted. Prices are subject to change.
            Refer to the vendor/provider website for current pricing.
          </li>
          <li>
            BootstrapVue may receive a commission on themes purchased via the above affiliate links.
          </li>
          <li>
            Refer to the <b-link to="/docs/reference/theming">Theming section</b-link> for
            details on incorporating custom theme SCSS files.
          </li>
        </ul>
      </aside>
    </section>
  </b-container>
</template>

<style lang="scss" scoped>
.bvd-theme {
  .card {
    // Simple way to get rounded corners
    overflow: hidden;
  }
}
</style>

<script>
export default {
  data() {
    return {
      // This could be async data that comes from a JSON file
      themes: [
        {
          title: 'Superduper Dashboard - PRO',
          type: 'dashboard',
          img: 'https://picsum.photos/800/600/?image=84',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'Innovative Bob',
          price: '$500.00'
        },
        {
          title: 'To be determined',
          type: 'dahsboard',
          img: 'https://picsum.photos/800/600/?image=82',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'Dashboards-R-Us',
          price: 'Free'
        },
        {
          title: 'Some mystery theme theatre',
          img: 'https://picsum.photos/800/600/?image=54',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'Cyberdyne Terminators',
          price: '$75.00'
        }
      ]
    }
  },
  computed: {
    title() {
      return 'Themes and dashboards'
    }
  },
  head() {
    const title = `${this.title} | BootstrapVue`
    const description = 'BootstrapVue based premium themes and dashboards.'
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
