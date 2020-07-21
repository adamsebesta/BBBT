<template lang="html">
  <div class="">
    <div class="">
      <FormulateInput
        v-model="selected_worker"
        :options="current_workers"
        type="select"
        placeholder="Select a worker"
        @click='filterByWorker'
      >
      </FormulateInput>
    </div>
    <br>
    <div class=""
      v-for="(project, index) in projects"
      :key="project.code"
    >
      <span>{{index + 1}} {{project.name}}</span>
    </div>


  </div>
</template>

<script>
import '../assets/scss/main.scss';
export default {
  components: {
  },
  data() {
    return {
      current_workers: null,
      selected_worker: null
    }
  },
  methods: {
    async wrapperPMs() {
      await this.$store.dispatch('fetchPMs');
      this.setWorkers();
    },
    setWorkers() {
      const w = this.$store.getters['workers'];
      const ob = {};
      w.forEach((pm, index) => {
        ob[String(index)] = pm.last_name
      })
      this.current_workers = ob;
    },
    filterByWorker() {

    }
  },
  computed: {
    projectCount() {
      return this.$store.getters['projectCount'];
    },
    projects() {
      return this.$store.getters['projects'];
    },
  },
  created() {
    this.wrapperPMs();
  }
}

</script>

<style lang="scss" scoped>
</style>
