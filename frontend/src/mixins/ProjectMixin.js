
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
    },
    async postProject(p) {
      let res = await fetch(`http://localhost:8080/api/projects`, {
        method: 'POST',
        body: p,
        headers: {
        'Content-Type': 'application/json'
        }
      })
      let data = await res.json();
      await this.addOrDeleteTaskOnProject(data, 'addTask', 'PUT');
    },
    createProject() {
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
      this.postProject(JSON.stringify(ob))
    },
    showModal () {
      this.$store.commit('SET_MODAL_OPEN', true);
      if (this.modalOpen) {
        document.querySelector('.modal-overlay').style.display = "block";
        document.getElementById('project-modal-new').style.display = "";
      }
    },
    async removeOverlay() {
      await this.$store.commit('SET_SELECTED_TASK', null);
      this.$store.commit('SET_MODAL_OPEN', false);
      document.querySelector('.modal-overlay').style.display = 'none';
      document.querySelectorAll('.modal').forEach((modal) =>{
        modal.style.display = 'none';
      });
    }
  }
}
