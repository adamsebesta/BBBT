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
    selected_task: null,
    selected_worker: null
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
    SET_CLIENTS(state, results) {
      state.clients = results;
    },
    SET_SELECTED_PROJECT(state, p) {
      state.selected_project = p
    },
    SET_SELECTED_TASK(state, t) {
      state.selected_task = t
    },
    SET_SELECTED_WORKER(state, w) {
      state.selected_worker = w
    },
    SET_MODAL_OPEN (state, bool) {
      state.modalOpen = bool
    },
  },
  getters: {
    projects: state => state.projects,
    projectCount: state => state.projectCount,
    modalOpen: state => state.modalOpen,
    workers: state => state.workers,
    selected_project: state => state.selected_project,
    selected_task: state => state.selected_task,
    selected_worker: state => state.selected_worker,
    endpoint: state => state.selected_task,
    clients: state => state.clients,
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
    async fetchClients({commit}) {
      let res = await fetch(`${this.state.endpoint}clients/`)
      let data = await res.json();
      commit('SET_CLIENTS', data);
    },
    async clearSelections({commit}) {
      commit('SET_SELECTED_TASK', null);
      commit('SET_SELECTED_WORKER', null);
    }
  }
})
