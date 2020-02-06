<template>
  <div v-b-visible.once.1000="visibleHandler">
    <!-- SPONSORS -->
    <template v-if="sponsors.length > 0">
      <h3 class="h4 mx-auto mt-4 text-muted">Sponsors</h3>

      <!-- PLATINUM SPONSORS -->
      <template v-if="platinumSponsors.length > 0">
        <h4 class="h5 mx-auto mt-3 text-muted">Platinum Sponsors</h4>
        <BVDContributorsContainer
          type="platinum-sponsors"
          :contributors="platinumSponsors"
        ></BVDContributorsContainer>
      </template>

      <!-- GOLD SPONSORS -->
      <template v-if="goldSponsors.length > 0">
        <h4 class="h5 mx-auto mt-3 text-muted">Gold Sponsors</h4>
        <BVDContributorsContainer
          type="gold-sponsors"
          :contributors="goldSponsors"
        ></BVDContributorsContainer>
      </template>

      <!-- SILVER SPONSORS -->
      <template v-if="silverSponsors.length > 0">
        <h4 class="h5 mx-auto mt-3 text-muted">Silver Sponsors</h4>
        <BVDContributorsContainer
          type="silver-sponsors"
          :contributors="silverSponsors"
        ></BVDContributorsContainer>
      </template>

      <!-- BRONZE SPONSORS -->
      <template v-if="bronzeSponsors.length > 0">
        <h4 class="h5 mx-auto mt-3 text-muted">Bronze Sponsors</h4>
        <BVDContributorsContainer
          type="bronze-sponsors"
          :contributors="bronzeSponsors"
        ></BVDContributorsContainer>
      </template>
    </template>

    <!-- BACKERS -->
    <template v-if="backers.length > 0">
      <h3 class="h4 mx-auto mt-4 text-muted">Backers</h3>
      <BVDContributorsContainer
        type="backers"
        :contributors="backers"
      ></BVDContributorsContainer>
    </template>

    <!-- DONORS -->
    <template v-if="donors.length > 0">
      <h3 class="h4 mx-auto mt-4 text-muted">Donors</h3>
      <BVDContributorsContainer
        type="donors"
        :contributors="donors"
        :show-name="false"
      ></BVDContributorsContainer>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.contributor {
  width: 55px;

  .contributor-thumbnail {
    width: 100%;
    height: 55px;
  }

  .backers & {
    width: 80px;

    .contributor-thumbnail {
      height: 80px;
    }
  }

  .bronze-sponsors & {
    width: 90px;

    .contributor-thumbnail {
      height: 90px;
    }
  }

  .silver-sponsors & {
    width: 100px;

    .contributor-thumbnail {
      height: 100px;
    }
  }

  .gold-sponsors & {
    width: 120px;

    .contributor-thumbnail {
      height: 120px;
    }
  }

  .platinum-sponsors & {
    width: 140px;

    .contributor-thumbnail {
      height: 140px;
    }
  }
}
</style>

<script>
import BVDContributorsContainer from '~/components/contributors-container'

const OC_BASE_URL = 'https://rest.opencollective.com/v2/bootstrap-vue/orders/'
const OC_DEFAULT_PARAMS = { status: 'active', tierSlug: null, limit: 100 }

const MAX_BACKERS = 16
const MAX_DONORS = 32

export default {
  name: 'BVDContributors',
  components: { BVDContributorsContainer },
  data() {
    return {
      platinumSponsors: [],
      goldSponsors: [],
      silverSponsors: [],
      bronzeSponsors: [],
      backers: [],
      donors: []
    }
  },
  computed: {
    sponsors() {
      return [
        ...this.platinumSponsors,
        ...this.goldSponsors,
        ...this.silverSponsors,
        ...this.bronzeSponsors
      ]
    }
  },
  methods: {
    makeOcRequest(cb, params = {}) {
      // Merge given params with defaults
      params = { ...OC_DEFAULT_PARAMS, ...params }
      // Build the query
      const query = Object.keys(params).reduce(
        (query, key) => (params[key] ? `${query}${query ? '&' : ''}${key}=${params[key]}` : query),
        ''
      )

      const url = `${OC_BASE_URL}?${query}`
      const xhr = new XMLHttpRequest()

      const onLoad = () => {
        if (xhr.readyState !== 4) {
          return
        }
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText) || {}
          cb(this.processOcNodes(response.nodes || []), null)
        } else {
          // We just return an empty node list rather than spew an error
          // eslint-disable-next-line standard/no-callback-literal
          cb([], xhr.statusText)
        }
      }

      xhr.open('GET', url, true)
      xhr.addEventListener('load', onLoad)
      // Initiate the request
      xhr.send()
    },
    processOcNodes(nodes = []) {
      return nodes.map(entry => {
        return {
          slug: entry.fromAccount.slug,
          name: entry.fromAccount.name,
          type: entry.fromAccount.type,
          imageUrl: entry.fromAccount.imageUrl,
          website: entry.fromAccount.website,
          status: entry.status,
          // For recurring donations, this is the installment amount
          // For one time donations, this is the donation amount (most recent)
          amount: entry.amount.value,
          // For recurring donations, this is the total amount donated
          // For users that donate multiple times, this will be the total of all one time donations
          totalAmount: entry.totalDonations.value,
          // For recurring donations, this is how often the donation is received
          frequency: entry.frequency,
          // We now have sponsor tiers, but some appear as
          // `null` (they were made before the tiers were created)
          tier: (entry.tier || {}).slug || null,
          date: new Date(entry.createdAt)
        }
      })
    },
    sortCompare(a = {}, b = {}) {
      // Sort first by amount, then by date
      return (b.totalAmount || 0) - (a.totalAmount || 0) || (b.date || 0) - (a.date || 0)
    },
    processPlatinumSponsors(platinumSponsors = []) {
      // Platinum sponsors are provided in reverse chronological order
      // so we sort by larger amount first, then by date
      this.platinumSponsors = platinumSponsors.sort(this.sortCompare)
    },
    processGoldSponsors(goldSponsors = []) {
      // Gold sponsors are provided in reverse chronological order
      // so we sort by larger amount first, then by date
      this.goldSponsors = goldSponsors.sort(this.sortCompare)
    },
    processSilverSponsors(silverSponsors = []) {
      // Silver sponsors are provided in reverse chronological order
      // so we sort by larger amount first, then by date
      this.silverSponsors = silverSponsors.sort(this.sortCompare)
    },
    processBronzeSponsors(bronzeSponsors = []) {
      // Bronze sponsors are provided in reverse chronological order
      // so we sort by larger amount first, then by date
      this.bronzeSponsors = bronzeSponsors.sort(this.sortCompare)
    },
    processBackers(backers = []) {
      // Backers are provided in reverse chronological order
      // so we sort by larger amount first, then by date
      // Limit to top 16 backers
      this.backers = backers.sort(this.sortCompare).slice(0, MAX_BACKERS)
    },
    processDonors(donors = []) {
      // Donors are provided in reverse chronological order,
      // but donors can be listed more than once (for each individual donation),
      // although the `totalDonations` is the same on each entry
      // We sort by larger amount first, then by date
      // Limit to top 32 most recent donors
      this.donors = donors
        .reduce((results, donor) => {
          if (results.map(d => d.slug).indexOf(donor.slug) === -1) {
            results.push(donor)
          }
          return results
        }, [])
        .sort(this.sortCompare)
        .slice(0, MAX_DONORS)
    },
    visibleHandler(visible) {
      if (!visible) {
        return
      }
      // Platinum sponors are people/organizations with a recurring (active) platinum sponorship
      this.makeOcRequest(this.processPlatinumSponsors.bind(this), { tierSlug: 'platinum-sponsors' })
      // Gold sponors are people/organizations with a recurring (active) gold sponorship
      this.makeOcRequest(this.processGoldSponsors.bind(this), { tierSlug: 'gold-sponsors' })
      // Silver sponors are people/organizations with a recurring (active) silver sponorship
      this.makeOcRequest(this.processSilverSponsors.bind(this), { tierSlug: 'silver-sponsors' })
      // Bronze sponors are people/organizations with a recurring (active) bronze sponorship
      this.makeOcRequest(this.processBronzeSponsors.bind(this), { tierSlug: 'bronze-sponsors' })
      // Backers are people/organizations with recurring (active) donations
      this.makeOcRequest(this.processBackers.bind(this), { tierSlug: 'backers' })
      // Donors are people/organizations with one-time (paid) donations
      this.makeOcRequest(this.processDonors.bind(this), { status: 'paid' })
    }
  }
}
</script>
