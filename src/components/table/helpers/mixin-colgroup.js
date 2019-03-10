export default {
  methods: {
    renderColgroup(h) {
      // Build the colgroup
      const fields = this.computedFields
      let $colgroup = h(false)

      if (this.hasNormalizedSlot('table-colgroup')) {
        $colgroup = h('colgroup', { key: 'colgroup' }, [
          this.normalizeSlot('table-colgroup', { columns: fields.length, fields: fields })
        ])
      }

      return $colgroup
    }
  }
}
