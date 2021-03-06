<template>
  <div id="app">
    <main>
      <notifications group="foo" />
      <transition id='overlay' appear>
        <div
          class='modal-overlay'
          @click='removeOverlay()'
        >
        </div>
      </transition>
      <div class="fixed-sidebar"
        @mouseover='growSidebar'
      >
        <router-link
          :to="{ name: 'dashboard', params: {} }"
        >
          <button
            class='button button-sqr'
          >
          <font-awesome-icon :icon="['fas', 'home']"/>
          </button>
        </router-link>
        <br>
        <router-link
          :to="{ name: 'workers', params: {} }"
        >
          <button
            class='button button-sqr'
          >
            <font-awesome-icon :icon="['fas', 'users']"/>
          </button>
        </router-link>
      </div>
      <aside
        @mouseleave='shrinkSidebar'
        class="sidebar">
        <br>
        <div class="">
          <h3 class='count'
            v-if="!asideShrunk && this.projects"
          >
            Open Projects: {{this.projectCount}}
          </h3>
          <br>
        </div>
        <div class="" v-if="!asideShrunk">
          <router-link
            :key="project.code"
            v-for="project in projects"
            class="link"
            :to="{ name: 'project', params: { id: project._id } }"
          >
            {{project.name}}
          </router-link>
        </div>
      </aside>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import TaskMixin from '../src/mixins/TaskMixin';
import ProjectMixin from '../src/mixins/ProjectMixin';
import "tippy.js/themes/google.css";

export default {
  name: 'App',
  components: {
  },
  mixins: [TaskMixin, ProjectMixin],
  data() {
    return {
      projects: null,
      asideShrunk: true,
    }
  },
  computed : {
    projectCount() {
      return this.$store.getters['projectCount'];
    },
  },
  methods: {
    shrinkSidebar() {
      const d = document;
      d.querySelector('aside').style.display = 'none';
      this.asideShrunk = true;
    },
    growSidebar() {
      const d = document;
      d.querySelector('aside').style.display = 'block';
      this.asideShrunk = false;
    },
    async removeOverlay() {
      await this.$store.dispatch('clearSelections');
      this.$store.commit('SET_MODAL_OPEN', false);
      document.querySelector('.modal-overlay').style.display = 'none';
      document.querySelectorAll('.modal').forEach((modal) =>{
        modal.style.display = 'none';
      });
    }
  },
  created() {
    this.wrapperProjects();
    this.$store.dispatch('fetchWorkers');
  },
}
</script>

<style lang="scss">

  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }

  main {
    display: flex;
    height: calc(100vh - 10px);
    max-width: 1700px;


  }
  aside {
    position: absolute;
    display: none;
    left: 4rem;
    background: white;
    z-index: 2;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    width: 15%;
    transition: 0.3s;
    box-sizing: border-box;
    border-bottom: 2px solid rgba(246, 246, 246, 1);
    border-right: 2px solid rgba(246, 246, 246, 1);
    border-radius: 3px;
    flex-direction: column;
    justify-content: center;
    h3 {
      margin: 0;
    }
    .count {
      margin-top: 1rem;
    }
    margin-left: 15px;
  }

  .fixed-sidebar {
    max-width: 3%;
    border-right: 2px solid rgba(246, 246, 246, 1);
    padding-top: 1.5rem;
    padding-right: 0.4rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    position: sticky
  }

  .collapse {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    align-items: center;
    display: flex;
    justify-content: center;
    top: 50%;
    left: 85%;
    opacity: .5;
    padding: 2px;
    z-index: auto;
  }

  .centered {
    margin: 0 auto;
    text-align: center;
  }

  .content {
    position: relative;
    flex: 1 1 85%;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0.5%;
    flex-direction: column;
  }
  .link {
    display: block;
    text-decoration: none;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  .button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .3em;
    border: 1px solid #cecece;
    box-sizing: border-box;
    background-color: transparent;
    font-size: .9em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: .50em 1em;
    display: block;
    width: 100%;
    font-weight: 400;
    line-height: 1.2em;
    opacity: 0.9;
    margin: 0;
    border-color: #41b883;
    background-color: #41b883;
    color: white;
    min-width: 0;
    width: auto;
    font-weight: bold;
    cursor: pointer;
    align-items: center;
    height: 35px;
    outline: none;
  }


  .formulate-input[data-classification='button'] button {
    padding: .50em 1em;
  }

  .button:hover {
    opacity: 1;
  }

  .button-sqr {
    width: 30px;
    height: 30px;
    padding: 0rem;
  }

  .shadowed {
    text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
  }

  .modal-overlay {
    display: none;
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);
    min-height: 2000px;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1200px;
    margin: 2rem 0;
    height: 800px;
    background-color: #FFF;
    border-radius: 3px;
    cursor: default;
    overflow-y: scroll;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .upper-fields {
    display: flex;
    justify-content: space-between;
    div {
      width: 100%;
    }
  }

  .project-details-modal {
    width: 95%;
    margin-left: 10rem
  }


  .worker {
    display: flex;
  }

  .worker-wrapper {
    padding: 1.5em 0em;
    max-width: 85%;
  }

  .wkr-name {
    margin-right: 5rem;
    margin-left: 1rem;
  }

  .worker-wrapper::v-deep .formulate-input-element {
    max-width: 56rem;
  }

  @media (min-width: 650px) {
    .worker {
      display: flex;
    }
  }

  @media (min-width: 720px) {
    .worker {
      display: block;
    }
  }

  @media (min-width: 850px) {
    .worker {
      display: flex;
      align-items: baseline;
    }
    .worker .formulate-input {
      margin-right: 1.5em;
    }
  }

</style>
