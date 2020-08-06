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
    async postUpdatedWorker(w) {
      await fetch(`http://localhost:8080/api/workers`, {
        method: 'PUT',
        body: JSON.stringify(w),
        headers: {
        'Content-Type': 'application/json'
        }
      });
      //notify with server response
      this.$notify({
          group: 'foo',
          title: 'Worker Update:',
          text: `${w['first_name']} ${w['last_name']} successfully updated`
      });
      this.removeOverlay();
      // refetch worker to refresh worker list
      this.$store.dispatch('fetchWorkers');
    },
    updateWorker() {
      const ob = {};
      const fields = document.getElementById('worker-formulate-update');
      fields.forEach((f) => {
        if (f.value) {
          if (f.name == 'rate_brutto') {
            ob[f.name] = parseFloat(f.value);
          } else {
            ob[f.name] = f.value;
          }
        }
      });
      // change internal to boolean for DB
      ob['internal'] = ob['internal'] == 'true';
      ob['_id'] = this.selected_worker._id;
      this.postUpdatedWorker(ob);
    },
    async postNewWorker(w) {
      await fetch(`http://localhost:8080/api/workers`, {
        method: 'POST',
        body: JSON.stringify(w),
        headers: {
        'Content-Type': 'application/json'
        }
      });
      //notify with server response
      this.$notify({
          group: 'foo',
          title: 'Worker Update:',
          text: `${w['first_name']} ${w['last_name']} successfully created`
      });
      this.removeOverlay();
      // refetch worker to refresh worker list
      this.$store.dispatch('fetchWorkers');
    },
    async deleteWorker(w) {
      await fetch(`http://localhost:8080/api/workers/deleteWorker`, {
        method: 'DELETE',
        body: JSON.stringify(w),
        headers: {
        'Content-Type': 'application/json'
        }
      });
      //notify with server response
      this.$notify({
          group: 'foo',
          title: 'Worker Update:',
          text: `${w['first_name']} ${w['last_name']} successfully deleted`
      });
      this.removeOverlay();
      // refetch worker to refresh worker list
      this.$store.dispatch('fetchWorkers');
    },
    createWorker() {
      const ob = {};
      const fields = document.getElementById('worker-formulate-new');
      fields.forEach((f) => {
        if (f.value) {
          if (f.name == 'rate_brutto') {
            ob[f.name] = parseFloat(f.value);
          } else {
            ob[f.name] = f.value;
          }
        }
      });
      // change internal to boolean for DB
      ob['internal'] = ob['internal'] == 'true';
      this.postNewWorker(ob);
    },
    sortBy(field, sort) {
      // field to be sorted, sort direction, and primer case insensitivity
      this.all_workers.sort((a, b) => {
        var x =  typeof a[field] == 'string'? a[field].toUpperCase(): a[field]; // ignore upper and lowercase
        var y =  typeof b[field] == 'string'? b[field].toUpperCase(): b[field];

        if (sort == 'asc') {
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        }

        if (sort == 'desc') {
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
        }
          return 0;
        }
      });
    },
    sortByWrapper(field) {
      //if field has not been sorted or is false
      if (!this.sorts[field]) {
        this.sortBy(field, 'asc');
        //reset sortby state
        this.sorts = {
          first_name: null,
          rate_brutto: null,
          internal: null,
          role: null
        }
        this.sorts[field] = true;
        //reverse sort
      } else {
        this.sortBy(field, 'desc');
        this.sorts[field] = false;
      }
    }
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
