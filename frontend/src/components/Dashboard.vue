<template lang="html">
  <div class="">
    <div class="">
      <FormulateInput
        v-model="selected_pm"
        :options="pms"
        type="select"
        placeholder="Select a PM"
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
      pms: null,
      selected_pm: null
    }
  },
  methods: {
    async wrapperPMs() {
      await this.$store.dispatch('fetchPMs');
      this.setPms();
    },
    setPms() {
      const pms = this.$store.getters['pms'];
      const ob = {};
      pms.forEach((pm, index) => {
        ob[String(index)] = pm.last_name
      })
      this.pms = ob;
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
