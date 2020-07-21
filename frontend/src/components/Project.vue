<template lang="html">
  <div class="project" v-if="project">
    <div class="project_name">
      <h1> <span>Name:</span> {{ project.name }}</h1>
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
          <div class="project-details">
            <div class="tasks">
              <div class="filters">

                <FormulateInput
                  v-model="selected_cat"
                  :options="{
                    'Project Management': 'Project Management',
                    'Design': 'Design',
                    'Programming': 'Programming'
                  }"
                  type="select"
                  placeholder="Select a category"
                  @change="filterByCat"
                >
                </FormulateInput>

                <button
                  type="button"
                  name="button"
                  @click="resetFilters"
                  class='clear-button'
                >
                  clear
                </button>

                <FormulateInput
                  v-model="selected_worker"
                  :options="current_workers"
                  type="select"
                  placeholder="Select a worker"
                  @change="filterByWorker"
                >
                </FormulateInput>

              </div>

              <h2>Tasks:</h2>
              <div
                class= "task"
                v-for='(task, index) in combinedFiltered'
                v-bind:key='task._id'
              >
                <div class="task-number">
                {{index + 1}}.
                </div>
                  <div class="task-details">
                    <div class="">
                      description: {{task.description}}
                      <br>
                      <br>
                      category: {{task.category}}
                      <br>
                      <br>
                    </div>
                    <h3>Assigned workers:</h3>
                    <div
                      v-for= '(workerObject, index) in task.assigned_workers'
                      v-bind:key='workerObject.worker._id'
                    >
                    {{index + 1}}.
                  <p>
                    {{workerObject.worker.first_name +
                       " " +
                       workerObject.worker.last_name}}
                  </p>
                    </div>
                  --------------
                  </div>
              </div>
            </div>
          </div>
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
import FilterMixin from '../mixins/FilterMixin';

export default {
  props: {
    id: String
  },
  components: {
  },
  mixins: [FilterMixin],
  data() {
    return {
      project: null,
      endpoint: 'http://localhost:8080/api/projects/',
      activetab: 1,
      current_workers: null,
      selected_worker: null,
      current_cats: null,
      selected_cat: null,
      tasksFilteredByCat: null,
      tasksFilteredByWorker: null
    }
  },
  computed: {
    combinedFiltered() {
      if (this.selected_worker && this.selected_cat) {
        const newList = [];
        this.tasksFilteredByWorker.forEach((task) => {
          if (task.category === this.selected_cat) {
            newList.push(task);
          }
        })
        return newList;

      }

      if (this.selected_worker && !this.selected_cat) {
        return this.tasksFilteredByWorker

      }

      if (!this.selected_worker && this.selected_cat) {
        return this.tasksFilteredByCat

      }
      return this.project.tasks
    }
  },
  methods: {
    async fetchListing(id) {
      let res = await fetch(`${this.endpoint}${id}`);
      let data = await res.json()
      return this.setResults(data);
    },
    setResults(results) {
      this.project = results
      this.tasksFiltered = results.tasks;
    },
    filterByCat() {
      const newList = [];
      this.project.tasks.forEach((task) => {
        if (task.category === this.selected_cat) {
          newList.push(task);
        }
      })
      this.tasksFilteredByCat = newList;
    },
    filterByWorker() {
      const newList = []
      this.project.tasks.forEach((task) => {
        const wl = this.getWorkerList(task);
        if (wl.includes(this.selected_worker)) {
          newList.push(task);
        }
      })
      this.tasksFilteredByWorker = newList;
    },
    getWorkerList(t) {
      const wl = [];
        t.assigned_workers.forEach((w) => {
          wl.push(w.worker.last_name);
        })
      return wl;
    },
    resetFilters() {
      if (this.tasksFiltered) {
      this.selected_worker = null;
      this.selected_cat = null;
      }
    }
  },
  created() {
    this.selected_worker = null;
    this.fetchListing(this.id);
    this.wrapperWorkers();
  },
  watch: {
    '$route'() {
      this.fetchListing(this.id);
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

  .filters {
    display: flex;
    width: 50%;
    margin: 0 auto;
    justify-content: space-around;

  }

  .clear-button {
    display: flex;
    align-items: center;
    width: 75px;
    height: 25px;
    font-size: 12px;
    font-weight: bold;
    opacity: .7;
    border: none;
    border-radius: 5px;
    justify-content: center;
    cursor: pointer;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
    box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.1);
    outline: none;
    margin-right: 2rem;
    margin-top: 0.2rem;
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
