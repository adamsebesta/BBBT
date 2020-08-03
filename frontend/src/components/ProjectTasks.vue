<template lang="html">
  <div class="project-details">
    <transition name="slide" appear>

    <project-tasks-update-task-modal v-if='this.selected_task'>
    </project-tasks-update-task-modal>

    <project-tasks-new-task-modal v-if='!this.selected_task'>
    </project-tasks-new-task-modal>
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
import ProjectMixin  from '../mixins/ProjectMixin';
import ProjectTasksNewTaskModal from './ProjectTasksNewTaskModal';
import ProjectTasksUpdateTaskModal from './ProjectTasksUpdateTaskModal';

export default {
  name: 'ProjectTasks',
  mixins: [TaskMixin, ProjectMixin],
  components: {
    ProjectTasksNewTaskModal,
    ProjectTasksUpdateTaskModal

  },
  data() {
    return {
      selected_worker: null,
      selected_cat: null,
      tasksFilteredByCat: null,
      tasksFilteredByWorker: null,
    }
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

  .worker-wrapper::v-deep .formulate-input-element {
    max-width: 56rem;

  }
</style>
