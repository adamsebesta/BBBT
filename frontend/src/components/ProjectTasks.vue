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

</template>

<script>

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
      current_tasks:this.selected_project.tasks
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
      return this.project.tasks
    },
    selected_project(){
      return "hi"
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
      this.tasksFiltered = this.project.tasks;
    },
    filterByCat() {
      this.tasksFilteredByCat = this.project.tasks.filter(task =>
        task.category === this.selected_cat)
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
      return t.assigned_workers.map(w => w.worker.last_name)
    },
    resetFilters() {
      if (this.combinedFiltered) {
      this.selected_worker = null;
      this.selected_cat = null;
      this.tasksFilteredByCat = null;
      this.tasksFilteredByWorker = null;
      }
    }
  },
  created() {
    this.selected_worker = null;
    this.selected_cat = null;
    this.tasksFilteredByCat = null;
    this.tasksFilteredByWorker = null;
    this.wrapperWorkers();
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
  margin-top: 0.2rem;
}

</style>
