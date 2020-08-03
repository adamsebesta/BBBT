<template lang="html">
  <div
    id="task-modal-new"
    :style='{display: "none"}'
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

      <div class="worker-wrapper">
        <FormulateInput
          type='group'
          name='workers'
          :repeatable='true'
          label='Assigned workers:'
        >

          <div class="worker">
            <FormulateInput
              type="select"
              :options="current_workers"
              name="new_worker"
              placeholder='Add a new worker to this task'
            >
            </FormulateInput>

            <FormulateInput
              type="text"
              validation='number'
              name="tracked_hours"
              placeholder='Enter tracked hours'
            >
            </FormulateInput>
          </div>
        </FormulateInput>
      </div>
      <FormulateInput
        type="submit"
        label="Submit task"
      />
    </FormulateForm>
  </div>
</div>

</template>

<script>
import TaskMixin  from '../mixins/TaskMixin';
import ProjectMixin  from '../mixins/ProjectMixin';

export default {
  name: 'ProjectTasksNewTaskModal',
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
