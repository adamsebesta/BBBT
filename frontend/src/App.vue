<template>
  <div id="app">
    <main>
      <aside class="sidebar">
        <div class="">
          <h3 class='count' v-if='this.projects'>Projects: {{this.projectCount}}</h3>
        </div>
        <div @click='toggleCollapse' class="collapse">
          <font-awesome-icon :icon="['fas', 'chevron-left']"/>
        </div>
        <div class="" v-if="!asideShrunk">
          <router-link
            :key="project.code"
            v-for="project in projects"
            class="link"
            :to="{ name: 'project', params: { id: project._id } }">
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

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      projects: null,
      endpoint: 'http://localhost:8080/api/projects',
      asideShrunk: false,
    }
  },
  computed: {
    projectCount () {
      return this.$store.getters['projectCount'];
    }
  },
  methods: {
    async fetchProjects() {
      let res = await fetch(this.endpoint)
      let data = await res.json()
      return this.setResults(data);
    },
    setResults (results) {
      this.projects = results;
      this.$store.commit('setProjectCount', results.length);
    },
    toggleCollapse() {
      const d = document;
      if (!this.asideShrunk) {
         d.querySelector('aside').style.flex = '0 1 3%';
         d.querySelector('.collapse').style.transform = 'rotate(180deg)';
         d.querySelector('.collapse').style.left = '20%';
         d.querySelector('.project').style.marginLeft = '2rem'
         // d.querySelector('.project-product').style.flex = '0 1 59%'
         d.querySelector('.count').style.display = 'none';
         this.asideShrunk = true;
    } else {
        d.querySelector('aside').style.flex = '';
        d.querySelector('.collapse').style.transform = '';
        d.querySelector('.collapse').style.left = '85%';
        d.querySelector('.project').style.marginLeft = '';
        // d.querySelector('.project-product').style.flex = '0 1 70%'
        d.querySelector('.count').style.display = '';
        this.asideShrunk = false;
      }
    }
  },
  created() {
    this.fetchProjects();
  },
  watch: {
    listingCount () {
      this.fetchListings();
    }
  }
}
</script>

<style>

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
  border-radius: 5px;
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

.content {
  position: relative;
  flex: 1 1 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0.5%;

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
  border-radius: 5px;
  justify-content: center;
  cursor: pointer;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
  box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.1);
  outline: none;
}
.shadowed {
  text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
  height: 600px;
  background-color: #FFF;
  border-radius: 16px;

  padding: 25px;
}
</style>
