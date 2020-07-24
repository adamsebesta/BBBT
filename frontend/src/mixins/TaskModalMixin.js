export default {
  methods: {
    async taskModalWrapper(t) {
      await this.$store.commit('SET_SELECTED_TASK', t);
      this.showModal();
      },
      showModal () {
        this.$store.commit('SET_MODAL_OPEN', true);
        if (this.modalOpen) {
          document.querySelector('.modal-overlay').style.display = "block";
          document.getElementById('task-modal').style.display = "";
        }
      },
    async removeOverlay() {
      await this.$store.commit('SET_SELECTED_TASK', null);
      this.$store.commit('SET_MODAL_OPEN', false);
      document.querySelector('.modal-overlay').style.display = 'none';
      document.getElementById('task-modal').style.display = 'none';
    }
  }
}
