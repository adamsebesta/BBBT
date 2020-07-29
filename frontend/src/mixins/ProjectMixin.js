
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
      const ob = this.newProject;
      //parse initial values to numbers
      Object.keys(ob).forEach((k) => {
        if (['billing_rate', 'buffer_percentage', 'budget'].includes(k)) {
          ob[k] = Number(ob[k])
        }
        //parse worker values to number
        if (k == 'worker') {
          ob[k].forEach((w) => {
            w.factor = Number(ob['worker'].factor);
            w.hours_planned = Number(ob['worker'].hours_planned);
          });
        }
      });
      console.log(ob)
      //this.postProject(JSON.stringify(ob))
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
