<template lang="html">
  <span>
    <font-awesome-icon
      v-if='checkForValue(field)'
      :icon="['fas', 'angle-down']"/>
    <font-awesome-icon
      v-if='checkForValue(field) == false'
      :icon="['fas', 'angle-up']"/>
  </span>
</template>

<script>
export default {
  props: {
    field: String,
    sorts: Object
  },
  name: 'SortByArrow',
  methods: {
    checkForValue(field) {
      let _ = require("lodash");
      return _.get(this.sorts, field)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
