<template lang="html">
  <div class="project-details">
    <transition name="slide" appear>
      <div
        id="task-modal"
        :style='{display: "none"}'
        v-if='this.selected_task'
      >
        <div class="task-details-modal"
          >
          <FormulateForm
            id='task-formulate'
            >

            <FormulateInput
              type="select"
              name="category"
              label="Category"
              :options='task_categories'
              :value='this.selected_task.category'
            >

            </FormulateInput>

            <FormulateInput
              type="textarea"
              name="description"
              label="Description"
              :value='this.selected_task.description'
            >
            </FormulateInput>

            <FormulateInput
              type="select"
              name="status"
              label="Status"
              :options='task_statuses'
              :value='this.selected_task.status'
            >
            </FormulateInput>

            <table
              class='worker-table'
              style='width:100%'>
              <th>Name</th>
              <th>Tracked Hours</th>
              <tr
                v-for= 'wkr in this.selected_task.assigned_workers'
                v-bind:key='wkr.worker._id'
              >
                <td>
                  {{wkr.worker.first_name + " " + wkr.worker.last_name}}
                </td>
                <td>
                  <FormulateInput
                    type="text"
                    validation='number'
                    name="tracked_hours"
                    :value='wkr.tracked_hours'
                  >
                  </FormulateInput>
                </td>
              </tr>
              <tr>
                <td>
                  <FormulateInput
                    type="select"
                    :options="current_workers_not_assigned"
                    name="new_worker"
                    placeholder='Add a new worker to this task'
                  >
                  </FormulateInput>
                </td>
                <td>
                  <FormulateInput
                    type="text"
                    validation='number'
                    name="new_worker_tracked_hours"
                    placeholder='Enter hours worked (if applicable)'
                  >
                  </FormulateInput>
                </td>
              </tr>
            </table>
          </FormulateForm>
          <h4>Created: {{this.selected_task.createdAt.slice(0,19)}} </h4>
          <button
          @click='updateTask(selected_task)'
          class='button centered'
          >
            update
          </button>
        </div>
      </div>
    </transition>
    <div class="tasks">
      <div class="filters">

        <FormulateInput
          v-model="selected_cat"
          :options="task_categories"
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
          class='button'
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
          class= "main-tasks"
          v-for='task in combinedFiltered'
          v-bind:key='task._id'
          @click='taskModalWrapper(task)'
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
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";
import FilterMixin from '../mixins/FilterMixin';
import TaskModalMixin  from '..//mixins/TaskModalMixin';

export default {
  name: 'ProjectTasks',
  mixins: [FilterMixin, TaskModalMixin],
  data() {
    return {
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
    },

    modalOpen () {
      return this.$store.getters['modalOpen'];
    },

    selected_task() {
      return this.$store.getters['selected_task'];
    },

    task_categories() {
      const ob = {};
      this.selected_project.task_categories.map(cat => ob[cat] = cat);
      return ob;
    },

    task_statuses() {
      const ob = {};
      this.selected_project.task_statuses.map(stat => ob[stat] = stat);
      return ob;
    },

    current_workers() {
      const ob = {};
      this.selected_project.workers.forEach((w) => {
        ob[w.worker._id] = `${w.worker.first_name} ${w.worker.last_name}`;
      });
      return ob;
    },

    current_workers_not_assigned() {
      const ob = {};
      const t = this.selected_task;
      if (t) {
        const tl = t.assigned_workers.map(w => w.worker);
        const wl = this.selected_project.workers.map(w => w.worker);
        wl.forEach((w) => {
          if (!tl.some(x => x._id === w._id)) {
            ob[w._id] = `${w.first_name} ${w.last_name}`;
          }
        });
      }
      return ob;
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
      return t.assigned_workers.map(w => w.worker._id);
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
        sum += parseFloat(worker.tracked_hours);
    })
      return sum
    },

    updateTask(t) {
      // initialise findByIdAndUpdate payload
      const updateObj = {};
      // find formulate by ID and iterate through childen
      document.getElementById('task-formulate').forEach((child) => {
        // compare values of form inputs to those with the same name in task
        if (child.value != t[child.name]) {
            var value;
            // convert values to float in case of number field
            if (child.name == 'tracked_hours' || child.name == 'estimated_hours'){
              value = parseFloat(child.value);
            } else {value = child.value}
          // add field with different value to the payload
          updateObj[child.name] = value;
        }
      })
      // call API from store
      this.$store.dispatch('updateTask', updateObj);
    },

    createTask(t) {
      const ob = {};
      const newHours = [];
      document.getElementById('task-formulate').forEach((cld) => {
        if (cld.name != 'tracked_hours') {
          ob[cld.name] = cld.value
        } else {
        newHours.push(cld.value)
        }
      })
      ob['newHours'] = newHours;
      ob['estimation'] = t.estimation;
      ob['project'] = t.project;
      const finalOb = this.buildWorkerObForTask(t, ob);
      this.$store.dispatch('createTask', finalOb);
    },

    buildWorkerObForTask(t, ob) {
      const finalOb = ob
      finalOb['assigned_workers'] = t.assigned_workers;
      finalOb['_id'] = t._id;
      if (ob['new_worker']) {
        const workerOb = this.selected_project.workers.find(w =>
          w.worker._id === ob['new_worker'] ).worker;
          finalOb['new_worker'] = {
          'worker': workerOb,
          'tracked_hours': ob['new_worker_tracked_hours'] || 0
        };
      }
      return finalOb;
    },
  },
  created() {

  },
  watch: {
    '$route'() {
      this.resetFilters();
    },
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


  .button {
    display: flex;
    align-items: center;
    width: 75px;
    height: 25px;
    font-size: 12px;
    font-weight: bold;
    opacity: .7;
    border: none;
    border-radius: 3px;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.1);
    outline: none;
    margin-right: 2rem;
    padding: 18px;
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
  tr {
    cursor: pointer
  }

  #task-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
    height: 600px;
    background-color: #FFF;
    border-radius: 3px;
    cursor: default;
    padding: 5px;
    overflow-y: scroll;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .task-details-modal {
    width: 90%;
  }

</style>
