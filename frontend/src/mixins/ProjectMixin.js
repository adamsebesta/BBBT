
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
      await fetch(`http://localhost:8080/api/projects`, {
        method: 'POST',
        body: JSON.stringify(p),
        headers: {
        'Content-Type': 'application/json'
        }
      })
      //notify with server response
      this.$notify({
          group: 'foo',
          title: 'Project Update:',
          text: `project ${p['name']} successfully added `
      });
      this.removeOverlay();
      // refetch project to refresh tasks list
      this.$store.dispatch('fetchProjects');
    },

    async deleteProject(id) {
      let res = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
      })
      //notify with server response
      const text = await res.text();
      //notify with server response
      this.$notify({
          group: 'foo',
          title: 'Project Update:',
          text: text
      });
      window.location.href = "http://localhost:8081/#/dashboard";
    },
    createProject() {
      const ob = this.newProject;
      //parse initial values to numbers
      Object.keys(ob).forEach((k) => {
        if (['billing_rate', 'buffer_percentage', 'budget'].includes(k)) {
          ob[k] = Number(ob[k])
        }
        //parse worker values to number
        if (k == 'workers') {
          ob[k].forEach((w, i) => {
            ob[k][i].factor = parseFloat(w.factor);
            ob[k][i].hours_planned = parseFloat(w.hours_planned);
          });
        }
      });
      // change fixed budget value to boolean, and set default tasks
      ob['fixed_budget'] = ob['fixed_budget'] == 'true';
      ob['tasks'] = [];
      this.postProject(ob);
    },
    async postUpdatedProject(p) {
      await fetch(`http://localhost:8080/api/projects/${p._id}`, {
        method: 'PUT',
        body: JSON.stringify(p),
        headers: {
        'Content-Type': 'application/json'
        }
      });
      //notify with server response
      this.$notify({
          group: 'foo',
          title: 'Project Update:',
          text: `project ${p['name']} successfully updated `
      });
      this.removeOverlay();
      // refetch project to refresh tabs list
      this.$store.dispatch('fetchProject', p._id);
    },
    updateProject() {
      const ob = {};
      const workers = [];
      const fields = document.getElementById('project-formulate-update');
      fields.forEach((f, i) => {
        //create worker object
        // if existing worker field checkbox is not clicked keep in worker array
        if (f.name == 'worker' && f.value)  {
          if (!fields[i + 3].checked) {
            workers.push(this.buildWorkerOb(f, i, fields))
          }
        }
        // if newWorker has name selected push to worker array
        if (f.name == 'newWorker' && f.value) {
          workers.push(this.buildWorkerOb(f, i, fields))
        }

        //build remainder of object ommiting uncessesary keys
        if (f.value && !['factor','hours_planned','worker'].includes(f.name)) {
          // parse to floats for the below keys
          if (['buffer_percentage','budget','billing_rate'].includes(f.name)) {
            ob[f.name] = parseFloat(f.value);
          } else {
          ob[f.name] = f.value;
          }
        }
      });
      ob['workers'] = workers;
      // change fixed_budget to boolean for DB
      ob['fixed_budget'] = ob['fixed_budget'] == 'true';
      ob['_id'] = this.selected_project._id;
      this.postUpdatedProject(ob);
    },
    buildWorkerOb(f, i, arr) {
      return {
        "worker": f.value,
        "factor": parseFloat(arr[i + 1].value) || 1,
        "hours_planned": parseFloat(arr[i + 2].value) || 0,
      }
    },
    showModal (id) {
      this.$store.commit('SET_MODAL_OPEN', true);
      // if (this.modalOpen) {
        document.querySelector('.modal-overlay').style.display = "block";
        document.getElementById(id).style.display = "";
      // }
    },
    async removeOverlay() {
      await this.$store.commit('SET_SELECTED_TASK', null);
      this.$store.commit('SET_MODAL_OPEN', false);
      document.querySelector('.modal-overlay').style.display = 'none';
      document.querySelectorAll('.modal').forEach((modal) =>{
        modal.style.display = 'none';
      });
    },
    deadlineFunc(p) {
      return `required|after:${p.start_date}`
    }
  }
}
