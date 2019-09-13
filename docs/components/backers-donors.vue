<template>
  <div>
    <template v-if="backers.length > 0">
      <h5 class="mx-auto">Backers</h5>
      <div class="backer-container d-flex flex-wrap mx-n2 text-center justify-content-center font-weight-bold">
        <div v-for="backer in backers" :key="backer.slug" class="m-2 position-relative">
          <div class="backer img-thumbnail bg-light mx-auto d-flex align-items-center justify-content-center overflow-hidden">
            <b-img-lazy :src="backer.imageUrl" fluid block alt="Backer image"></b-img-lazy>
          </div>
          <small class="pt-2">
            <b-link
              v-if="backer.url"
              :href="backer.url"
              target="_blank"
              class="stretched-link text-reset"
            >
              {{ backer.name }}
            </b-link>
            <template v-else>
              {{ backer.name }}
            </template>
          </small>
        </div>
      </div>
    </template>

    <template v-if="donors.length > 0">
      <h5 class="mx-auto">Donors</h5>
      <div class="donor-container d-flex flex-wrap mx-n1 text-center justify-content-center">
        <div v-for="donor in donors" :key="donor.slug" class="m-1 position-relative">
          <div class="donor img-thumbnail d-flex align-items-center justify-content-center overflow-hidden">
            <b-link
              v-if="donor.url"
              :title="donor.name"
              :href="donor.url"
              target="_blank"
              class="stretched-link"
            >
              <b-img-lazy :src="donor.imageUrl" fluid block alt="Donor image"></b-img-lazy>
            </b-link>
            <b-img-lazy
              v-else
              :src="donor.imageUrl"
              :title="donor.name" 
              alt="Donor image"
              fluid
              block 
            ></b-img-lazy>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.backer {
  width: 100px;
  height: 100px;
}

.donor {
  width: 80px;
  height: 80px;
}
</style>

<script>
const baseURL = 'https://rest.opencollective.com/v2/bootstrap-vue/orders/incoming/'

export default {
  data() {
    return {
      backers: [],
      donors: []
    }
  },
  mounted() {
    // Backers are people/organizations with recurring (active) donations
    this.requestOC(this.processBackers.bind(this), 'active')
    // Donors are people/organizations with one-time (paid) donations
    this.requestOC(this.processDonors.bind(this), 'paid')
  },
  methods: {
    requestOC(cb, type = 'active') {
      // Do the async request
      const ocURL = `${baseURL}${type}?limit=100`
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

      xhr.open('GET', ocURL, true)
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
          amount: entry.totalDonations.value,
          frequency: entry.frequency,
          tier: (entry.tier || {}).slug,
          date: new Date(entry.createdAt)
        }
      })
    },
    sortCompare(a = {}, b = {}) {
      // Sort first by amount, then by date
      return (b.amount || 0) - (a.amount || 0) || (b.date || 0) - (a.date || 0)
    },
    processBackers(backers = []) {
      // Backers are provided in reverse chronological order
      // so we sort by larger amount first, then by date
      // Limit to top 16 backers
      this.backers = backers
        .filter(backer => backer.status === 'ACTIVE')
        .sort(this.sortCompare)
        .slice(0, 16)
    },
    processDonors(donors = []) {
      // Donors are provided in reverse chronological order,
      // but donors can be listed more than once (for each individual donation),
      // although the totalDonations is the same on each entry.
      // We sort by larger amount first, then by date
      // Limit to top 25 most recent donors
      this.donors = donors
        .filter(donor => donor.status === 'PAID')
        .reduce((arr, donor) => {
          if (arr.map(d => d.slug).indexOf(donor.slug) === -1) {
            arr.push(donor)
          }
          return arr
        }, [])
        .sort(this.sortCompare)
        .slice(0, 25)
    }
  }
}
</script>
