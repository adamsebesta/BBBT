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
    },
    async workerModalWrapper(id, w) {
      if (w) {
        await this.$store.commit('SET_SELECTED_WORKER', w);
      }
      this.showModal(id);
    },
    showModal (id) {
      this.$store.commit('SET_MODAL_OPEN', true);
      if (this.modalOpen) {
        document.querySelector('.modal-overlay').style.display = "block";
        document.getElementById(id).style.display = "";
      }
    },
    async removeOverlay() {
      await this.$store.commit('SET_SELECTED_WORKER', null);
      this.$store.commit('SET_MODAL_OPEN', false);
      document.querySelector('.modal-overlay').style.display = 'none';
      document.querySelectorAll('.modal').forEach((modal) =>{
        modal.style.display = 'none';
      });
    },
  },
  computed: {
    all_workers() {
      return this.$store.getters['workers'];
    },
    selected_worker() {
      return this.$store.getters['selected_worker'];
    },
    modalOpen() {
      return this.$store.getters['modalOpen'];
    }
  }
}
