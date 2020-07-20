import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    projectCount: null,
    modalOpen: false,
    projects: null,
    endpoint: 'http://localhost:8080/api/projects',
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
  },
  getters: {
    projects: state => state.projects,
    projectCount: state => state.projectCount,
    modalOpen: state => state.modalOpen

  },
  actions: {
    async fetchProjects({commit}) {
      let res = await fetch(this.state.endpoint);
      let data = await res.json();
      commit('SET_PROJECTS', data);
      commit('SET_PROJECT_COUNT', data.length);
  },
}
})
// projectCount () {
//   return this.$store.getters['projectCount'];
// }
