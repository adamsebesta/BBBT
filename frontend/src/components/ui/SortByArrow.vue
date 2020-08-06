<template lang="html">
  <span>
    <font-awesome-icon
      v-if='sorts[field]'
      :icon="['fas', 'angle-down']"/>
    <font-awesome-icon
      v-if='sorts[field] == false'
      :icon="['fas', 'angle-up']"/>
  </span>
</template>

<script>
export default {
  props: {
    field: String,
    sorts: Object
  },
  name: 'SortByArrow'
}
</script>

<style lang="css" scoped>
</style>
