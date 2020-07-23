<template lang="html">
  <div class="project-details">
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
          v-for='(task) in combinedFiltered'
          v-bind:key='task._id'
          @click='showModal(task._id)'
        >
          <transition name="slide" appear>
            <div
              class="modal"
              :id='task._id'
              :style='{display: "none"}'
            >
              <div class="task-details-modal"
                >
                <FormulateForm
                  :id='buildFormID(task._id)'
                  >

                  <FormulateInput
                    type="select"
                    name="category"
                    label="Category"
                    :options='task_categories'
                    :value='task.category'
                  >
                  </FormulateInput>

                  <FormulateInput
                    type="textarea"
                    name="description"
                    label="Description"
                    :value='task.description'
                  >
                  </FormulateInput>

                  <FormulateInput
                    type="select"
                    name="status"
                    label="Status"
                    :options='task_statuses'
                    :value='task.status'
                  >
                  </FormulateInput>

                  <table
                    class='worker-table'
                    style='width:100%'>
                    <th>Name</th>
                    <th>Tracked Hours</th>
                    <tr
                      v-for= 'wkr in task.assigned_workers'
                      v-bind:key='wkr.worker._id'
                    >
                      <td

                      >
                        {{wkr.worker.first_name + " " + wkr.worker.last_name}}</td>
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
                          :options="current_workers"
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
                          placeholder='Enter hours worked if applicable'
                        >
                        </FormulateInput>
                      </td>
                    </tr>
                  </table>
                </FormulateForm>
                <h4>Created: {{task.createdAt.slice(0,19)}} </h4>
                <button
                @click='updateTask(task)'
                class='button centered'
                >
                  update
                </button>
              </div>
            </div>
          </transition>
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
import ModalMixin from '..//mixins/ModalMixin';

export default {
  name: 'ProjectTasks',
  mixins: [FilterMixin, ModalMixin],
  data() {
    return {
      selected_worker: null,
      selected_cat: null,
      tasksFilteredByCat: null,
      tasksFilteredByWorker: null,
      task_fields: null
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
        ob[w.worker.last_name] = w.worker.last_name
      });
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
      return t.assigned_workers.map(w => w.worker.last_name)
    },
    getWorkersFullNames(wl) {
      return wl.map(w =>
        ` ${w.worker.first_name} ${w.worker.last_name} `)
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
    updateTask(t) {
      const ob = {};

      document.getElementById(`formulate-${t._id}`).forEach((cld) => {
        if (cld.name != 'tracked_hours') {
          ob[cld.name] = cld.value
        }
        document.getElementById(`${t._id} tr td`).forEach((worker) => {
          ob[worker.value] = cld.value
        });
      });
      //think of way to grab names from assigned workers list 
      // need to implelement logic to update existing workers hours
      ob['estimation'] = t.estimation;
      ob['project'] = t.project;
      this.buildWorkerObForTask(t, ob);

      //const pl = this.buildWorkerOb(ob);

      //await this.$store.dispatch('updateTask');
    },
    buildWorkerObForTask(t, ob) {
      const finalOb = ob
      const workerOb = this.selected_project.workers.find(w =>
        w.worker.last_name === ob['new_worker'] ).worker;
      delete finalOb['new_worker'];
      delete finalOb['new_worker_tracked_hours'];
      t.assigned_workers.push({
        'worker': workerOb,
        'tracked_hours': ob['new_worker_tracked_hours'] || 0
      });
      finalOb['assigned_workers'] = t.assigned_workers;
      finalOb['_id'] = t._id;
      console.log(finalOb);
    },
    buildFormID(id) {
      return `formulate-${id}`
    }
  },
  created() {

  },
  watch: {
    '$route'() {
      this.resetFilters();
    },
    'modalOpen'() {
      this.task_fields = null
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

  .modal {
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
