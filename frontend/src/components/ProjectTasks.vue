<template lang="html">
  <div class="project-details">
    <transition name="slide" appear>

    <project-tasks-update-task-modal v-if='this.selected_task'>
    </project-tasks-update-task-modal>

    <project-tasks-new-task-modal v-if='!this.selected_task'>
    </project-tasks-new-task-modal>
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
          <th @click="sortByWrapper('category')">
            Category
            <sort-by-arrow
              field='category'
              :sorts='sorts'>
            </sort-by-arrow>
          </th>
          <th @click="sortByWrapper('description')">
            Description
            <sort-by-arrow
              field='description'
              :sorts='sorts'>
            </sort-by-arrow>
          </th>
          <th @click="sortByWrapper('estimation.time')">
            Estimated Hrs.
            <sort-by-arrow
              field='estimation.time'
              :sorts='sorts'>
            </sort-by-arrow>
          </th>
          <th @click="sortByWrapper('tracked_hours')">
            Tracked Hours
            <sort-by-arrow
              field='tracked_hours'
              :sorts='sorts'>
            </sort-by-arrow>
          </th>
          <th @click="sortByWrapper('status')">
            Status
            <sort-by-arrow
              field='status'
              :sorts='sorts'>
            </sort-by-arrow>
          </th>
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
          <td>{{task.status}}</td>
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
import SortByArrow from './ui/SortByArrow';

export default {
  name: 'ProjectTasks',
  mixins: [TaskMixin, ProjectMixin],
  components: {
    ProjectTasksNewTaskModal,
    ProjectTasksUpdateTaskModal,
    SortByArrow
  },
  data() {
    return {
      selected_worker: null,
      selected_cat: null,
      tasksFilteredByCat: null,
      tasksFilteredByWorker: null,
      sorts: {
        category: null,
        description: null,
        estimation: {
          time: null
        },
        tracked_hours: null,
        status: null
      }
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

  .filters {
    display: flex;
    margin: 0 auto;
    justify-content: flex-start;
    button, div {
      margin-right: 1em;
    }
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
