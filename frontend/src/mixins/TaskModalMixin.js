export default {
  methods: {
    async taskModalWrapper(id, t) {
      if (t) {
        await this.$store.commit('SET_SELECTED_TASK', t);
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
      await this.$store.commit('SET_SELECTED_TASK', null);
      this.$store.commit('SET_MODAL_OPEN', false);
      document.querySelector('.modal-overlay').style.display = 'none';
      document.querySelectorAll('.modal').forEach((modal) =>{
        modal.style.display = 'none';
      });
    },
    async addTaskToProject(t) {
      // const p = this.selected_project;
      // const taskList = p.tasks;
      // const final = taskList.concat([t]).map(t => t._id);
      // console.log(JSON.stringify({
      //   'tasks': final
      // }))
      let res = await fetch(`http://localhost:8080/api/projects/addTask`, {
        method: 'PUT',
        body: JSON.stringify({
          'projectId': t.project,
          'taskId': t._id
        }),
        headers: {
        'Content-Type': 'application/json'
        }
      })
      await res.json();
      this.$store.dispatch('fetchProject', t.project);
    },

    async postTask(t) {
      let res = await fetch(`http://localhost:8080/api/tasks`, {
        method: 'POST',
        body: t,
        headers: {
        'Content-Type': 'application/json'
        }
      })
      let data = await res.json();
      console.log(data);
      await this.addTaskToProject(data);
    },
  }
}
