<template lang="html">
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



        <FormulateInput
          v-model="selected_worker"
          :options="current_workers"
          type="select"
          placeholder="Select a worker"
          @change="filterByWorker"
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

      </div>

      <h2> All Tasks:</h2>
      <table style="width:100%">
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Estimated Hrs.</th>
          <th>Tracked Hours</th>
        </tr>
        <tr
          class= "task"
          v-for='(task) in combinedFiltered'
          v-bind:key='task._id'
          :content='compileTask(task)'
          v-tippy="{
            theme:'google translucent',
            delay:['500','0']
          }"
          data-html="true"

        >
          <td>{{task.category}}</td>
          <td>{{task.description}}</td>
          <td>{{task.estimation.time}} </td>
          <td>{{calcHours(task)}}</td>
        </tr>
      </table>
    </div>
  </div>

</template>

<script>
import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";
import FilterMixin from '../mixins/FilterMixin';

export default {
  name: 'ProjectTasks',
  mixins: [FilterMixin],
  data() {
    return {
      current_workers: null,
      selected_worker: null,
      selected_cat: null,
      tasksFilteredByCat: null,
      tasksFilteredByWorker: null,
    }
  },
  computed: {
    combinedFiltered() {
      if (this.selected_worker && this.selected_cat) {
        return this.tasksFilteredByWorker.filter(task =>
          task.category === this.selected_cat)
    }

      if (this.selected_worker && !this.selected_cat) {
        return this.tasksFilteredByWorker

      }

      if (!this.selected_worker && this.selected_cat) {
        return this.tasksFilteredByCat

      }
      return this.selected_project.tasks
    },
    selected_project() {
      return this.$store.getters['selected_project'];
    }
  },
  methods: {
    filterByCat() {
      this.tasksFilteredByCat = this.selected_project.tasks.filter(task =>
        task.category === this.selected_cat)
    },
    filterByWorker() {
      const newList = []
      this.selected_project.tasks.forEach((task) => {
        const wl = this.getWorkerList(task);
        if (wl.includes(this.selected_worker)) {
          newList.push(task);
        }
      })
      this.tasksFilteredByWorker = newList;
    },
    getWorkerList(t) {
      return t.assigned_workers.map(w => w.worker.last_name)
    },
    getWorkerFullName(t) {
      return t.assigned_workers.map(w =>
        ` ${w.worker.first_name} ${w.worker.last_name} (${w.tracked_hours}) `)
    },
    resetFilters() {
      if (this.combinedFiltered) {
      this.selected_worker = null;
      this.selected_cat = null;
      this.tasksFilteredByCat = null;
      this.tasksFilteredByWorker = null;
      }
    },
    calcHours(t) {
      let sum = 0;
      t.assigned_workers.forEach((worker) =>{
        sum += worker.tracked_hours;
    })
      return sum
    },
    compileTask(t) {
        return `Category: ${t.category} </br>
                Description: ${t.description} </br>
                Status: ${t.status} </br>
                Assigned:${this.getWorkerFullName(t)} </br>
                Created: ${t.createdAt}`
    },
  },
  created() {
    this.wrapperWorkers();
  },
  watch: {
    '$route'() {
      this.resetFilters();
    }
  }
}
</script>

<style lang="scss" scoped>

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
  margin-top: 0.4rem;
}

th {
  text-align: left;
  margin-bottom: 1.5rem;
}

td, th {
  padding: 0.5rem;
  color: #757575;
  min-width: 200px;
}

table { border-collapse: collapse; }
td { border-bottom: solid 0.5px #DBDBDB; }
tr:nth-child(even) {
    background-color: #f2f2f2;
}

.tippy-tooltip.honeybee-theme {
  /* Your styling here. Example: */
  background-color: yellow;
  border: 2px solid orange;
}

</style>
