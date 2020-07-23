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
                  v-model="task_fields"
                >

                  <FormulateInput
                    type="select"
                    name="category"
                    label="Category"
                    :value='task.category'
                    :placeholder='task.category'
                  >
                  </FormulateInput>

                  <FormulateInput
                    type="textarea"
                    name="description"
                    label="Description"
                    :value='task.category'
                    :placeholder='task.description'
                  >
                  </FormulateInput>

                  <FormulateInput
                    type="select"
                    name="status"
                    label="Status"
                    :placeholder='task.status'
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
                      <td>{{wkr.worker.first_name + " " +wkr.worker.last_name}}</td>
                      <td>
                        <FormulateInput
                          type="text"
                          name="tracked_hours"
                          :placeholder='wkr.tracked_hours'
                        >
                        </FormulateInput>
                      </td>
                    </tr>
                  </table>
                </FormulateForm>
                <h4>Created: {{task.createdAt}} </h4>
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
      current_workers: null,
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
    }
  },
  created() {
    this.wrapperWorkers();
  },
  watch: {
    '$route'() {
      this.resetFilters();
    },
    'modalOpen'() {
      this.task_fields = null
      console.log('hi')
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
    border-radius: 3px;
    justify-content: center;
    cursor: pointer;
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
