import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    projectCount: null,
    modalOpen: false
  },
  mutations: {
    incrementProjectCount (state) {
      state.projectCount++
    },
    setProjectCount (state, count) {
      state.projectCount = count;
    }
  },
  getters: {
    projectCount: state => state.projectCount,
    modalOpen: state => state.modalOpen
  }
})
