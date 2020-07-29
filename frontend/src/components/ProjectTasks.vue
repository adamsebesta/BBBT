<template lang="html">
  <div class="project-details">
    <transition name="slide" appear>
      <div
        id="task-modal"
        :style='{display: "none"}'
        v-if='this.selected_task'
        class='modal'
      >
        <div class="task-details-modal"
          >
          <FormulateForm
            id='task-formulate'
            name='update-task'
          >
            <div class="upper-fields">
              <div class="">

                <FormulateInput
                  type="select"
                  name="category"
                  label="Category"
                  validation='required'
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
                  validation='required'
                  :options='task_statuses'
                  :value='this.selected_task.status'
                >
                </FormulateInput>
              </div>
              <div class="">
                <FormulateInput
                  type="text"
                  name="estimation"
                  label="Estimation"
                  placeholder='Enter time estimation (hrs)'
                  validation='number|required'
                  :value='this.selected_task.estimation.time'
                >
                </FormulateInput>

                <FormulateInput
                  type="select"
                  name="approval"
                  :options="{
                    'david': 'David',
                    'teams': 'Teams',
                    'bene': 'Bene'
                  }"
                  label="Approved By:"
                  placeholder='Select approval'
                  validation='required'
                  :value='this.selected_task.estimation.approved_via'

                >
                </FormulateInput>
              </div>
            </div>
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
          <h4
            v-if='this.selected_task.createdAt'
          >
            Created: {{this.selected_task.createdAt.slice(0,19)}}
          </h4>
          <div class="ctr-justify">

          <button
          @click='updateTask(selected_task)'
          class='button centered'
          >
            <span
              v-if='this.selected_task._id'
            >
              update
            </span>
          </button>

          <button
            type="button"
            name="button"
            @click="addOrDeleteTaskOnProject(
              selected_task,
              'removeTask',
              'PUT')"
            class='button'
          >
            Delete task
          </button>
          </div>
        </div>
      </div>

      <div
        id="task-modal-new"
        :style='{display: "none"}'
        v-if='!this.selected_task'
        class='modal'
      >
        <div class="task-details-modal"
          >
          <FormulateForm
            id='task-formulate-new'
            name='new-task'
            @submit='createTask'
            :key='this.selected_project._id'
            >
            <div class="upper-fields">

              <div class="">

            <FormulateInput
              type="select"
              name="category"
              label="Category"
              validation='required'
              :options='task_categories'
              placeholder='Select task category'
            >

            </FormulateInput>

            <FormulateInput
              type="textarea"
              name="description"
              label="Description"
              placeholder='Enter description'
            >
            </FormulateInput>

            <FormulateInput
              type="select"
              name="status"
              label="Status"
              :options='task_statuses'
              placeholder='Select task status'
              validation='required'
            >
            </FormulateInput>
              </div>
              <div class="">
                <FormulateInput
                  type="text"
                  name="estimation"
                  label="Estimation"
                  placeholder='Enter time estimation (hrs)'
                  validation='number|required'
                >
                </FormulateInput>

                <FormulateInput
                  type="select"
                  name="approval"
                  :options="{
                    'david': 'David',
                    'teams': 'Teams',
                    'bene': 'Bene'
                  }"
                  label="Approved By:"
                  placeholder='Select approval'
                  validation='required'

                >
                </FormulateInput>
              </div>

            </div>

            <table
              class='worker-table'
              style='width:100%'>
              <th>Name</th>
              <th>Tracked Hours</th>
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
                    placeholder='Enter hours worked (if applicable)'
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
                    placeholder='Enter hours worked (if applicable)'
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
                    placeholder='Enter hours worked (if applicable)'
                  >
                  </FormulateInput>
                </td>
              </tr>
            </table>
            <FormulateInput
              type="submit"
              label="Submit task"
            />
          </FormulateForm>
        </div>
      </div>
    </transition>
    <div class="tasks">
      <div class="ctr-justify">

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

        <button
          type="button"
          name="button"
          @click="taskModalWrapper('task-modal-new')"
          class='button'
        >
          +
        </button>

      </div>

      <h2> Tasks: {{this.selected_project.tasks.length}}</h2>
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
          @click="taskModalWrapper('task-modal', task)"
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
import TaskMixin  from '../mixins/TaskMixin';

export default {
  name: 'ProjectTasks',
  mixins: [TaskMixin],
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

  .ctr-justify {
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
  .task-details-modal {
    width: 90%;
  }



</style>
