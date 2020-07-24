<template>
  <div id="app">
    <main>
      <transition id='overlay' appear>
        <div
          class='modal-overlay'
          @click='removeOverlay'
        >
        </div>
      </transition>
      <aside class="sidebar">
        <router-link
          :to="{ name: 'dashboard', params: {} }"
        >
          dashboard
        </router-link>
        <div class="">
          <h3 class='count' v-if='this.projects'>Open Projects: {{this.projectCount}}</h3>
        </div>
        <div @click='toggleCollapse' class="collapse">
          <font-awesome-icon :icon="['fas', 'chevron-left']"/>
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
import TaskModalMixin from '../src/mixins/TaskModalMixin';

export default {
  name: 'App',
  components: {
  },
  mixins: [TaskModalMixin],
  data() {
    return {
      projects: null,
      asideShrunk: false,
    }
  },
  computed : {
    projectCount() {
      return this.$store.getters['projectCount']
    }
  },
  methods: {
    async wrapperProjects() {
      await this.$store.dispatch('fetchProjects');
      this.setProjects();
    },
    setProjects() {
      this.projects = this.$store.getters['projects'];
    },
    toggleCollapse() {
      const d = document;
      if (!this.asideShrunk) {
         d.querySelector('aside').style.flex = '0 1 3%';
         d.querySelector('.collapse').style.transform = 'rotate(180deg)';
         d.querySelector('.collapse').style.left = '20%';
         //d.querySelector('.project').style.marginLeft = '2rem'
         // d.querySelector('.project-product').style.flex = '0 1 59%'
         d.querySelector('.count').style.display = 'none';
         this.asideShrunk = true;
    } else {
        d.querySelector('aside').style.flex = '';
        d.querySelector('.collapse').style.transform = '';
        d.querySelector('.collapse').style.left = '85%';
        //d.querySelector('.project').style.marginLeft = '';
        // d.querySelector('.project-product').style.flex = '0 1 70%'
        d.querySelector('.count').style.display = '';
        this.asideShrunk = false;
      }
    },
  },
  created() {
    this.wrapperProjects();
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
  height: calc(100vh - 90px);
  max-width: 1700px;
  margin: 90px 0;
  margin-left: auto;
  margin-right: auto;

}
aside {
  flex: 0 1 15%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  width: 20%;

  box-sizing: border-box;
  border-right: 2px solid rgba(246, 246, 246, 1);
  border-bottom: 2px solid rgba(246, 246, 246, 1);
  border-radius: 3px;
  flex-direction: column;
  justify-content: center;
  h3 {
    margin: 0;
  }
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
  cursor: pointer;
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


.close-button {
  display: flex;
  align-items: center;
  width: 25px;
  height: 25px;
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  font-weight: bold;
  opacity: .7;
  border: none;
  padding: 1rem;
  border-radius: 3px;
  justify-content: center;
  cursor: pointer;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
  box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.1);
  outline: none;
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
</style>
