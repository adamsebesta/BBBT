<template lang="html">
  <div class="project" v-if="selected_project">
    <div class="project_name">
      <h1>{{ selected_project.name }}</h1>
      <button
        type="button"
        @click='deleteProject(selected_project._id)'
        class='button'
      >
        Delete Project
      </button>
    </div>

    <div id="tabs" class="container">

    <div class="tabs">
        <a
          v-on:click="activetab=1"
          v-bind:class="[ activetab === 1 ? 'active' : '' ]"
        >
          Tasks
        </a>
        <a
          v-on:click="activetab=2"
          v-bind:class="[ activetab === 2 ? 'active' : '' ]"
        >
          Budget
        </a>
        <a
          v-on:click="activetab=3"
          v-bind:class="[ activetab === 3 ? 'active' : '' ]"
        >
          Timeline
        </a>
    </div>
    <div class="content">
        <div v-if="activetab === 1" class="tabcontent">
          <project-tasks>
          </project-tasks>
        </div>
        <div v-if="activetab === 2" class="tabcontent">
            Content for tab two
        </div>
        <div v-if="activetab === 3" class="tabcontent">
            Content for tab three
        </div>
    </div>

</div>

  </div>

</template>

<script>
import ProjectTasks from './ProjectTasks.vue';
import ProjectMixin from '../mixins/ProjectMixin';

export default {
  props: {
    id: String
  },
  mixins: [ProjectMixin],
  components: {
    ProjectTasks
  },
  data() {
    return {
      endpoint: 'http://localhost:8080/api/projects/',
      activetab: 1,
      selected_project: null
    }
  },
  created() {
    this.wrapperProject();
  },
  watch: {
    '$route'() {
      this.wrapperProject();
    }
  }
}
</script>

<style lang="scss" scoped>

.project {
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0px 10px 10px;
    height: 100vh;

  }

  .project-details {
    display: flex;
    margin-top: 5rem;
    margin-left: 10px;
    width: 100%;
    flex-direction: column;
  }



  .tasks {
    flex-direction: column;
    display: flex;
  }


  .task-details {
    flex-direction: column;
    display: flex;
    margin-top: 1rem;
  }


  .project .project_name {
    position: relative;
    text-transform: uppercase;
    z-index: 1;
    margin-top: 0;
    text-align: center;
  }
  .project .project_description {
    position: relative;
    z-index: 1;
    }
  .project .project_price {
      font-size: 16px;
      opacity: .9;
      margin-bottom: 5rem;
      line-height: 2;
      font-weight: 900;
      z-index: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

.container {
   max-width: 95%;
   min-width: 420px;
   height: 100vh;
   margin: 40px auto;
   font-family: Arial, Helvetica, sans-serif;
   font-size: 0.9em;
   color: #888;
}

/* Style the tabs */
.tabs {
   overflow: hidden;
   margin-left: 20px;
   margin-bottom: -2px; // hide bottom border
}

.tabs ul {
   list-style-type: none;
   margin-left: 20px;
}

.tabs a{
   float: left;
   cursor: pointer;
   padding: 12px 24px;
   transition: background-color 0.2s;
   border: 1px solid #ccc;
   border-right: none;
   background-color: #f1f1f1;
   border-radius: 3px 3px 0 0;
   font-weight: bold;
}
.tabs a:last-child {
   border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
   background-color: #aaa;
   color: #fff;
}

/* Styling for active tab */
.tabs a.active {
   background-color: #fff;
   color: #484848;
   border-bottom: 2px solid #fff;
   cursor: default;
}

/* Style the tab content */
.tabcontent {
   padding: 30px;
   padding-bottom: 10rem;
   border: 1px solid #ccc;
   border-radius: 3px;
   box-shadow: 3px 3px 6px #e1e1e1;
   width: 100%;

}

</style>
