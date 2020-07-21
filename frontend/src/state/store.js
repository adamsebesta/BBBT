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
  },
  getters: {
    projects: state => state.projects,
    projectCount: state => state.projectCount,
    modalOpen: state => state.modalOpen,
    workers: state => state.workers
  },
  actions: {
    async fetchProjects({commit}) {
      let res = await fetch(`${this.state.endpoint}projects`);
      let data = await res.json();
      commit('SET_PROJECTS', data);
      commit('SET_PROJECT_COUNT', data.length);
  },
    async fetchPMs({commit}) {
      let res = await fetch(`${this.state.endpoint}workers/`)
      let data = await res.json();
      commit('SET_WORKERS', data);
    }
  }
})
// projectCount () {
//   return this.$store.getters['projectCount'];
// }
