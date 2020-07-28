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
    async addOrDeleteTaskOnProject(t, e, m) {
      //task, endpoint, and method
      let res = await fetch(`http://localhost:8080/api/projects/${e}`, {
        method: m,
        body: JSON.stringify({
          'projectId': t.project,
          'taskId': t._id
        }),
        headers: {
        'Content-Type': 'application/json'
        }
      })
      const text = await res.text();
      //notify with server response
      this.$notify({
          group: 'foo',
          title: 'Project Update:',
          text: text
      });
      this.removeOverlay();
      // refetch project to refresh tasks list
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
      await this.addOrDeleteTaskOnProject(data, 'addTask', 'PUT');
    },
    createTask() {
      const ob = {};
      ob['assigned_workers'] = [];
      const fields = document.getElementById('task-formulate-new');
      fields.forEach((cld, i) => {
        // build new workers
        if (cld.name == 'new_worker' && cld.value)  {
          ob['assigned_workers'].push({
            'worker': cld.value,
            'tracked_hours': parseFloat(fields[i + 1].value)  || 0
          });
        }
        // build estimation
        if (cld.name == 'estimation') {
          ob['estimation'] = {
            'time': parseFloat(cld.value),
            'approved_via': fields[i + 1].value,
            'approved_date': new Date()
          }
        }
        // build rest of task
        if (['category', 'description', 'status'].includes(cld.name)) {
          ob[cld.name] = cld.value;
        }
      });
      // set project ID and dispatch to store
      ob['project'] = this.selected_project._id;
      this.postTask(JSON.stringify(ob))
    },
  }
}
