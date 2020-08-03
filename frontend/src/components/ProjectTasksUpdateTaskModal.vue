<template lang="html">
  <div
    id="task-modal"
    :style='{display: "none"}'
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

</template>

<script>
import TaskMixin  from '../mixins/TaskMixin';
import ProjectMixin  from '../mixins/ProjectMixin';

export default {
  name: 'ProjectTasksUpdateTaskModal',
  mixins: [TaskMixin, ProjectMixin],
}
</script>

<style lang="css" scoped>

.task-details-modal {
  width: 90%;
}

.worker-wrapper::v-deep .formulate-input-element {
  max-width: 56rem;

}

.ctr-justify {
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: space-around;
}


</style>
