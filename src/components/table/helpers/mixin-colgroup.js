export default {
  methods: {
    renderColgroup() {
      const h = this.$createElement

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
