<template>
  <b-container id="content" fluid="lg" tag="main" class="pb-5">
    <section>
      <header class="bd-content pb-4">
        <h1>Custom themes and dashboards</h1>
        <p class="lead">
          With the below themes and dashboards built by our partners, you can build eye-catching
          apps and pages &mdash; all using BootstrapVue! The following items have been curated by
          the BootstrapVue team.
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
            <b-col md="6" lg="4" xl="4" aria-hidden="true">
              <b-aspect aspect="4:3">
                <b-card-img-lazy
                  :src="theme.img"
                  alt="Image"
                  blank-width="400"
                  blank-height="300"
                  class="rounded-0"
                ></b-card-img-lazy>
              </b-aspect>
            </b-col>
            <b-col class="d-flex flex-column p-4">
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
            </b-col>
          </b-row>
        </b-card>
      </article>

      <aside id="theme-notes" class="text-muted mb-3">
        <h2 class="h6">Notes:</h2>
        <ul class="small">
          <li>
            Prices shown are in US dollars unless otherwise noted. Prices are subject to change.
            Refer to the vendor/provider website for current pricing.
          </li>
          <li>
            BootstrapVue receives a commission on themes purchased via the above affiliate links.
          </li>
          <li>
            Refer to the <b-link to="/docs/reference/theming">Theming section</b-link> for
            details on incorporating custom theme SCSS files.
          </li>
        </ul>
      </aside>

      <aside id="theme-providers" class="text-muted">
        <h2 class="h6">Are you a theme provider?</h2>
        <p class="small mb-2">
          If you are interested in being an affiliate and listing your theme or dashboard on this
          page, your product must meet the following guidelines:
        </p>
        <ul class="small">
          <li>It must be based on (or extends) BootstrapVue components.</li>
          <li>
            Must be be compatible with BootstrapVue so that users can incorporate native
            BootstrapVue components if they wish.
          </li>
          <li>Should avoid the need for jQuery or Bootstrap v4 JavaScript files.</li>
          <li>Should provide source SCSS/SASS files/variables for BootstrapVue custom SCSS.</li>
          <li>Should promote that it is based on (or compatable with) <i>BootstrapVue</i>.</li>
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
          provider: 'Innovative Ivan',
          price: '$500.00'
        },
        {
          title: 'Funky dashboard extreme',
          type: 'dashboard',
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
