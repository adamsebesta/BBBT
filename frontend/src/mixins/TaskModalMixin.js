export default {
  methods: {
    async taskModalWrapper(id, t) {
      await this.$store.commit('SET_SELECTED_TASK', t);
      this.showModal(id);
      },
      showModal (id) {
        this.$store.commit('SET_MODAL_OPEN', true);
        if (this.modalOpen) {
          document.querySelector('.modal-overlay').style.display = "block";
          document.getElementById(id).style.display = "";
        }
      },
    removeOverlay() {
      this.$store.commit('SET_MODAL_OPEN', false);
      document.querySelector('.modal-overlay').style.display = 'none';
      document.querySelectorAll('.modal').forEach((modal) => {
        modal.style.display = 'none';
      });
    }
  }
}
