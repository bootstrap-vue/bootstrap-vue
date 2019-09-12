<template>
  <div>
    <template v-if="backers.length > 0">
      <h3 class="mx-auto">Backers</h3>
      <div class="backer-container d-flex flex-wrap mx-n2 text-center font-weight-bold">
        <div v-for="backer in backers" :key="backer.slug" class="m-2 position-relative">
          <div class="img-thumbnail bg-light mx-auto d-flex align-items-center justify-content-center overflow-hidden">
            <b-img-lazy :src="backer.imageUrl" fluid block aria-hidden="true"></b-img-lazy>
          </div>
          <h4 class="h6 pt-2">
            <b-link v-if="backer.url" :href="backer.url" class="stretched-link text-reset">
              {{ backer.name }}
            </b-link>
            <template v-else>
              {{ backer.name }}
            </template>
          </h4>
        </div>
      </div>
    </template>

    <template v-if="donors.length > 0">
      <h3 class="mx-auto">Donors</h3>
      <div class="donor-container d-flex flex-wrap mx-n1 text-center">
        <div v-for="donor in donors" :key="donor.slug" class="m-1 position-relative">
          <div class="img-thumbnail d-flex align-items-center justify-content-center overflow-hidden">
            <b-link v-if="donor.url" :href="donor.url" class="stretched-link" :title="donor.name">
              <b-img-lazy :src="donor.imageUrl" fluid block :alt="donor.name"></b-img-lazy>
            </b-link>
            <b-img-lazy v-else :src="donor.imageUrl" fluid block :alt="donor.name"></b-img-lazy>
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
  width: 50px;
  height: 50px;
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
      this.requestOC(this.processBackers, 'active')
      // Donors are  are people/organizations with one-time (paid) donations
      this.requestOC(this.processDonors, 'paid')
    },
    methods: {
      requestOC(cb, type = 'active') {
        // Do the async request
        const ocURL = `${baseURL}${type}?limit=100`
        const xhr = new XMLHttpRequest()

        xhr.open('GET', ocURL, true)
        xhr.addEventListener('load', function () {
          if (xhr.readyState !== 4) {
            return
          }
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText) || {}
            cb(processOcNodes(response.nodes))
          } else {
            // We just return an empty node list rather than spew an error
            cb([])
          }
        })
        // Initiate the request
        xhr.send()
      },
      processOcNodes(nodes = []) {
        return nodes.map(n => {
          return {
            name: n.fromAccount.name,
            slug: n.fromAccount.slug,
            imageUrl: n.fromAccount.imageUrl,
            website: n.fromAccount.website,
            amount: n.totalDonations
            status: n.status,
            frequency: n.frequency,
            tier: n.tier.slug
            date: new Date(n.createdAt)
          }
        })
      },
      sortCompare(a = {}, b = {}) {
        // sort first by amount, then by date
        return (a.amount || 0) - (b.amount || 0) || (a.date || 0) - (b.date || 0)
      },
      processBackers(backers = []) {
        // Backers are provided in reverse chronological order
        // so we sort by larger amount first, then by date
        // Limit to top 10 backers
        this.backers = backers
          .filter(b => b.status === 'ACTIVE')
          .sort(this.sortCompare)
          .slice(0, 10)
      },
      processDonors(donors = []) {
        // Donors are provided in reverse chronological order,
        // but donors can be listed more than once (for each individual donation),
        // although the totalDonations is the same on each entry.
        // We sort by larger amount first, then by date
        // Limit to top 20 most recent donors
        this.donors = donors
          .filter(d => d.status === 'PAID')
          .reduce((arr, d) => {
            if (arr.map(i => i.slug).indexOf(d.slug) === -1) {
              arr.push(d)
            }
            return arr
          }, [])
          .sort(this.sortCompare)
          .slice(0, 20)
      }
    }
  }
</script>
