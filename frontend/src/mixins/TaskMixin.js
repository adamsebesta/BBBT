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
      filterByCat() {
        this.tasksFilteredByCat = this.selected_project.tasks.filter(task =>
          task.category === this.selected_cat)
      },

      filterByWorker() {
        const newList = []
        this.selected_project.tasks.forEach((task) => {
          const wl = this.getWorkerList(task);
          if (wl.includes(this.selected_worker)) {
            newList.push(task);
          }
        })
        this.tasksFilteredByWorker = newList;
      },

      getWorkerList(t) {
        return t.assigned_workers.map(w => w.worker._id);
      },

      resetFilters() {
        if (this.combinedFiltered) {
        this.selected_worker = null;
        this.selected_cat = null;
        this.tasksFilteredByCat = null;
        this.tasksFilteredByWorker = null;
        }
      },

      calcHours(t) {
        let sum = 0;
        t.assigned_workers.forEach((worker) =>{
          sum += parseFloat(worker.tracked_hours);
      })
        return sum
      },

      updateTask(t) {
        // initialise findByIdAndUpdate payload
        const updateObj = {};
        // find formulate by ID and iterate through childen
        document.getElementById('task-formulate').forEach((child) => {
          // compare values of form inputs to those with the same name in task
          if (child.value != t[child.name]) {
              var value;
              // convert values to float in case of number field
              if (child.name == 'tracked_hours' || child.name == 'estimated_hours'){
                value = parseFloat(child.value);
              } else {value = child.value}
            // add field with different value to the payload
            updateObj[child.name] = value;
          }
        })
        // call API from store
        this.$store.dispatch('updateTask', updateObj);
      },
    },
    computed: {
      selected_project() {
        return this.$store.getters['selected_project'];
      },
      modalOpen() {
        return this.$store.getters['modalOpen'];
      },
      selected_task() {
        return this.$store.getters['selected_task'];
      },

      task_categories() {
        const ob = {};
        this.selected_project.task_categories.map(cat => ob[cat] = cat);
        return ob;
      },

      task_statuses() {
        const ob = {};
        this.selected_project.task_statuses.map(stat => ob[stat] = stat);
        return ob;
      },

      current_workers() {
        const ob = {};
        this.selected_project.workers.forEach((w) => {
          ob[w.worker._id] = `${w.worker.first_name} ${w.worker.last_name}`;
        });
        return ob;
      },
      combinedFiltered() {
          if (this.selected_worker && this.selected_cat) {
            return this.tasksFilteredByWorker.filter(task =>
              task.category === this.selected_cat)
        }

        if (this.selected_worker && !this.selected_cat) {
          return this.tasksFilteredByWorker

        }

        if (!this.selected_worker && this.selected_cat) {
          return this.tasksFilteredByCat

        }
        return this.selected_project.tasks
      },
      current_workers_not_assigned() {
        const ob = {};
        const t = this.selected_task;
        if (t) {
          const tl = t.assigned_workers.map(w => w.worker);
          const wl = this.selected_project.workers.map(w => w.worker);
          wl.forEach((w) => {
            if (!tl.some(x => x._id === w._id)) {
              ob[w._id] = `${w.first_name} ${w.last_name}`;
            }
          });
        }
        return ob;
      }
    }
  }
