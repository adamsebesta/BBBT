import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import VueFormulate from '@braid/vue-formulate';
import { store } from './state/store.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Project from './components/Project.vue';
import Dashboard from './components/Dashboard.vue';
import Workers from './components/Workers.vue';
import VueTippy, { TippyComponent } from "vue-tippy";
import Notifications from 'vue-notification';

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);
Vue.use(Notifications);

Vue.use(VueFormulate);
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',

    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project,
      props: true
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      props: true
    },
    {
      path: '/workers',
      name: 'workers',
      component: Workers,
      props: true
    }
  ],
});

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store
});
