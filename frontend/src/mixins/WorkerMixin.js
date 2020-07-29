export default {
  methods: {
    async workerWrapper() {
      await this.$store.dispatch('fetchWorkers');
      const w = await this.$store.getters['workers'];
      const ob = {};
      w.forEach((w) => {
        ob[w._id] = `${w.first_name} ${w.last_name}`;
      });
      this.current_workers = ob;
    }
  }
}
