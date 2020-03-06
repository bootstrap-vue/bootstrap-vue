<template>
  <div v-b-visible.once.1000="visibleHandler">
    <!-- SPONSORS -->
    <template v-if="sponsors.length > 0">
      <h3 class="h4 mx-auto mt-4 text-muted">Sponsors</h3>

      <!-- PLATINUM SPONSORS -->
      <template v-if="platinumSponsors.length > 0">
        <h4 class="h5 mx-auto mt-3 text-muted">Platinum Sponsors</h4>
        <BVContributorsContainer
          type="platinum-sponsors"
          :contributors="platinumSponsors"
          :nofollow="false"
        ></BVContributorsContainer>
      </template>

      <!-- GOLD SPONSORS -->
      <template v-if="goldSponsors.length > 0">
        <h4 class="h5 mx-auto mt-3 text-muted">Gold Sponsors</h4>
        <BVContributorsContainer
          type="gold-sponsors"
          :contributors="goldSponsors"
          :nofollow="false"
        ></BVContributorsContainer>
      </template>

      <!-- SILVER SPONSORS -->
      <template v-if="silverSponsors.length > 0">
        <h4 class="h5 mx-auto mt-3 text-muted">Silver Sponsors</h4>
        <BVContributorsContainer
          type="silver-sponsors"
          :contributors="silverSponsors"
          :nofollow="false"
        ></BVContributorsContainer>
      </template>

      <!-- BRONZE SPONSORS -->
      <template v-if="bronzeSponsors.length > 0">
        <h4 class="h5 mx-auto mt-3 text-muted">Bronze Sponsors</h4>
        <BVContributorsContainer
          type="bronze-sponsors"
          :contributors="bronzeSponsors"
          :nofollow="false"
        ></BVContributorsContainer>
      </template>
    </template>

    <!-- BACKERS -->
    <template v-if="backers.length > 0">
      <h3 class="h4 mx-auto mt-4 text-muted">Backers</h3>
      <BVContributorsContainer
        type="backers"
        :contributors="backers"
      ></BVContributorsContainer>
    </template>

    <!-- DONORS -->
    <template v-if="donors.length > 0">
      <h3 class="h4 mx-auto mt-4 text-muted">Donors</h3>
      <BVContributorsContainer
        type="donors"
        :contributors="donors"
        :show-name="false"
      ></BVContributorsContainer>
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

  a:hover .contributor-thumbnail {
    background-color: #6c757d40;
  }

  .contributor-name {
    font-size: 80%;
    font-weight: 400;
  }

  .backers & {
    width: 70px;

    .contributor-name {
      font-size: 60%;
    }

    .contributor-thumbnail {
      height: 70px;
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

    .contributor-name {
      font-size: 90%;
      font-weight: bold;
    }

    .contributor-thumbnail {
      height: 100px;
    }
  }

  .gold-sponsors & {
    width: 120px;

    .contributor-name {
      font-size: 90%;
      font-weight: bold;
    }

    .contributor-thumbnail {
      height: 120px;
    }
  }

  .platinum-sponsors & {
    width: 140px;

    .contributor-name {
      font-size: 100%;
      font-weight: bold;
    }

    .contributor-thumbnail {
      height: 140px;
    }
  }
}
</style>

<script>
import BVContributorsContainer from '~/components/contributors-container'

const OC_BASE_URL = 'https://rest.opencollective.com/v2/bootstrap-vue/orders/'
const OC_DEFAULT_PARAMS = { status: 'active', tierSlug: null, limit: 200 }

const MAX_BACKERS = 32
const MAX_DONORS = 64

// This value needs to be less than or equal to our bronze tier amount
// We may want to set two thresholds: a single donation amount and
// a total dontation amount. This determines if we link to the donors
// website or not. Used to help prevent abuse of opencollective via
// small dontations to gain cheep backlinks for Google page rank.
// A threshold of 24 means that it will take 12 months for a $2/month
// backer to get a back link rendered in our docs
const LINK_AMT_THRESHOLD = 24

export default {
  name: 'BVContributors',
  components: { BVContributorsContainer },
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
        // For recurring donations, this is the total amount donated
        // For users that donate multiple times, this will be the total of all one time donations
        const totalAmount = entry.totalDonations.value
        const amount = entry.amount.value
        // Fallback URL
        const slug = entry.fromAccount.slug
        const fallbackUrl = slug ? `https://opencollective.com/${slug}` : null
        // Return the normalized result
        return {
          slug: slug,
          name: entry.fromAccount.name,
          // type: 'ORGANIZATION', 'INDIVIDUAL'
          type: entry.fromAccount.type,
          imageUrl: entry.fromAccount.imageUrl,
          // We only link their website when the total amount is at or above a certain
          // threshold to prevent some questionable websites from abusing opencollective
          // as a means to improve thier Google page ranking via backlinks
          website:
            Math.max(amount || 0, totalAmount || 0) < LINK_AMT_THRESHOLD
              ? null
              : entry.fromAccount.website || fallbackUrl,
          // status: 'ACTIVE' = typically recurring, 'PAID' = typially one time donation
          status: entry.status,
          // For recurring donations, this is the installment amount
          // For one time donations, this is the donation amount (most recent)
          amount: amount,
          // For recurring donations, this is the total amount donated
          // For users that donate multiple times, this will be the total of all one time donations
          totalAmount: totalAmount,
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
      // Some backers have the tier level as `null`, which started
      // backing before we started the tier levels
      // Limit to top N backers
      this.backers = backers
        .filter(b => b.tier === null || b.tier === 'backers')
        .sort(this.sortCompare)
        .slice(0, MAX_BACKERS)
    },
    processDonors(donors = []) {
      // Donors are provided in reverse chronological order,
      // but donors can be listed more than once (for each individual donation),
      // although the `totalDonations` is the same on each entry. We filter out
      // duplicate donors by slug, then sort by larger amount first, then by date
      // Limit to top N most recent donors
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
      // Some backers are not tagged as "backers" slug (`null` slug), but have status "active"
      this.makeOcRequest(this.processBackers.bind(this), { status: 'active' })
      // Donors are people/organizations with one-time (paid) donations
      this.makeOcRequest(this.processDonors.bind(this), { status: 'paid' })
    }
  }
}
</script>
