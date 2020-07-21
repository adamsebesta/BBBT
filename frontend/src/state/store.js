import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    projectCount: null,
    modalOpen: false,
    projects: null,
    pms: null,
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
    SET_PMS (state, results) {
      state.pms = results;
    },
  },
  getters: {
    projects: state => state.projects,
    projectCount: state => state.projectCount,
    modalOpen: state => state.modalOpen,
    pms: state => state.pms

  },
  actions: {
    async fetchProjects({commit}) {
      let res = await fetch(`${this.state.endpoint}projects`);
      let data = await res.json();
      commit('SET_PROJECTS', data);
      commit('SET_PROJECT_COUNT', data.length);
  },
    async fetchPMs({commit}) {
      let res = await fetch(`${this.state.endpoint}workers/pm`)
      let data = await res.json();
      commit('SET_PMS', data);
    }
  }
})
// projectCount () {
//   return this.$store.getters['projectCount'];
// }
