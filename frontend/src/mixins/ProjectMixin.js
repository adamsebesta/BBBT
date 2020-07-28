
export default {
  methods: {
    async wrapperProject() {
      await this.$store.dispatch('fetchProject', this.id);
      this.setProject();
    },
    setProject() {
      this.selected_project = this.$store.getters['selected_project'];
    },
    async wrapperProjects() {
      await this.$store.dispatch('fetchProjects');
      this.setProjects();
    },
    setProjects() {
      this.projects = this.$store.getters['projects'];
    }
  }
}
