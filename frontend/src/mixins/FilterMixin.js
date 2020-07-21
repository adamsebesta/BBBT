export default {
  methods: {
    async wrapperWorkers() {
      await this.$store.dispatch('fetchWorkers');
      this.setWorkers();
    },
    setWorkers() {
      const w = this.$store.getters['workers'];
      const ob = {};
      w.forEach((pm) => {
        ob[pm.last_name] = pm.last_name
      })
      this.current_workers = ob;
    },
  }
}
