import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import ProjectIndex from './components/ProjectIndex.vue';
import VueFormulate from '@braid/vue-formulate';
import { store } from './state/store.js'

Vue.use(VueFormulate);

Vue.config.productionTip = false

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectIndex,
    }
  ],
});

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store
});
