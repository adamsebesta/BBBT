export default {
  methods: {
    async clientWrapper() {
      await this.$store.dispatch('fetchClients');
      const w = await this.$store.getters['clients'];
      const ob = {};
      w.forEach((c) => {
        ob[c._id] = `${c.name}`;
      });
      this.current_clients = ob;
    }
  }
}
