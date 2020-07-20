<template lang="html">
  <div class="">
    <div class=""
      v-for="(project, index) in projects"
      :key="project.code"
    >
      <span>{{index + 1}} {{project.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {

    }
  },
  computed : {
    projectCount() {
    return this.$store.getters['projectCount']
  },
  projects() {
    return this.$store.getters['projects']
  }
  }
}
</script>

<style lang="scss" scoped>
</style>
