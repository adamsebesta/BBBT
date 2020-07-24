import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    projectCount: null,
    modalOpen: false,
    projects: null,
    workers: null,
    endpoint: 'http://localhost:8080/api/',
    selected_project: null,
    selected_task: null
  },
  mutations: {
    INCREMENT_PROJECT_COUNT(state) {
      state.projectCount++
    },
    SET_PROJECT_COUNT (state, count) {
      state.projectCount = count;
    },
    SET_PROJECTS (state, results) {
      state.projects = results;
    },
    SET_WORKERS(state, results) {
      state.workers = results;
    },
    SET_SELECTED_PROJECT(state, results) {
      state.selected_project = results
    },
    SET_MODAL_OPEN (state, bool) {
      state.modalOpen = bool
    },
    SET_SELECTED_TASK(state, results) {
      state.selected_task = results
    }
  },
  getters: {
    projects: state => state.projects,
    projectCount: state => state.projectCount,
    modalOpen: state => state.modalOpen,
    workers: state => state.workers,
    selected_project: state => state.selected_project,
    selected_task: state => state.selected_task
  },
  actions: {
    async fetchProjects({commit}) {
      let res = await fetch(`${this.state.endpoint}projects`);
      let data = await res.json();
      commit('SET_PROJECTS', data);
      commit('SET_PROJECT_COUNT', data.length);
  },
    async fetchProject({commit}, id) {
      let res = await fetch(`${this.state.endpoint}projects/${id}`);
      let data = await res.json();
      commit('SET_SELECTED_PROJECT', data);
  },
    async fetchWorkers({commit}) {
      let res = await fetch(`${this.state.endpoint}workers/`)
      let data = await res.json();
      commit('SET_WORKERS', data);
    },
    async updateTask({commit}, t) {
      t['assigned_workers'].forEach((w, i) => {
        w.tracked_hours = t['newHours'][i];
      });
      t['assigned_workers'].push(t['new_worker']);
      ['new_worker_tracked_hours', 'tracked_hours', 'newHours'].forEach(e =>
        delete t[e]);
      console.log(t);

      let res = await fetch(`${this.state.endpoint}tasksa/${t._id}`, {

      })
      let data = await res.json();
      commit('SET_SELECTED_TASK', data);
    },
  }
})
// const finalizeTaskObject = (ob) => {
//   //clean up object to be sent to API
//   ['new_worker_tracked_hours', 'tracked_hours', 'newHours']
//   .forEach(e =>
//      delete ob[e]);
// }
