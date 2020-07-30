<template lang="html">
  <div
    id="project-modal-new"
    :style='{display: "none"}'
    class='modal'
  >
    <div class="project-details-modal"
      >
      <FormulateForm
        id='project-formulate-new'
        name='new-project'
        @submit='createProject'
        v-model='newProject'
        >
        <div class="upper-fields">

        <div class="">

          <FormulateInput
            type="text"
            name="name"
            label="Project name"
            validation='required'
          >
          </FormulateInput>

          <FormulateInput
            type="text"
            name="code"
            label="Project code"
            validation='required'
          >
          </FormulateInput>

          <FormulateInput
            type="select"
            name="client"
            label="Client"
            :options='current_clients'
            validation='required'
          >
          </FormulateInput>

          <FormulateInput
            type="select"
            name="fixed_budget"
            label="Fixed budget"
            :options="{
              'true': 'Yes',
              'false': 'No'
            }"
            placeholder='select budget type'
            validation='required'
          >
          </FormulateInput>

          <FormulateInput
            v-if="newProject.fixed_budget == 'true'"
            type="number"
            name="budget"
            label="Budget"
            placeholder='0'
            validation='required|number'
          >
          </FormulateInput>
        </div>
        <div class="">
          <FormulateInput
            v-if="newProject.fixed_budget == 'true'"
            type="number"
            name="buffer_percentage"
            label="Buffer percentage"
            validation='required|number'
          >
          </FormulateInput>

          <FormulateInput
            type="number"
            name="billing_rate"
            label="Billing rate"
            validation='required|number'
          >
          </FormulateInput>


          <FormulateInput
            type="date"
            name="start_date"
            label="Start date"
            validation='required'
          >
          </FormulateInput>

          <FormulateInput
            type="date"
            name="deadline"
            label='Deadline'
            :validation='deadlineFunc(newProject)'
          >
          </FormulateInput>
        </div>
      </div>
      <div class="double-wide">

        <FormulateInput
          type='group'
          name='workers'
          :repeatable='true'
        >
              <FormulateInput
                type="select"
                :options="current_workers"
                name="worker"
                placeholder='Add a new worker to this project'
              >
              </FormulateInput>

              <FormulateInput
                type="text"
                validation='number|required'
                name="factor"
                placeholder='Enter factor'
              >
              </FormulateInput>

              <FormulateInput
                type="text"
                validation='number|required'
                name="hours_planned"
                placeholder='Enter planned hours'
              >
              </FormulateInput>
            </FormulateInput>
          </div>
        <FormulateInput
          type="submit"
          label="Submit project"
        />

      </FormulateForm>
    </div>
  </div>
</template>

<script>

import ProjectMixin  from '../mixins/ProjectMixin';
import WorkerMixin  from '..//mixins/WorkerMixin';
import ClientMixin  from '../mixins/ClientMixin';

export default {
  name: 'DashboardNewProject',
  mixins: [ProjectMixin, WorkerMixin, ClientMixin ],
  data() {
    return {
      current_workers: null,
      current_clients: {},
      newProject: {
        fixed_budget: 'true'
      }
    }
  },
  created() {
    this.workerWrapper();
    this.clientWrapper();
  },
}
</script>

<style lang="scss" scoped>

  .project-details-modal {
    width: 95%;
  }

  .double-wide {
    display: flex;
    flex-direction: row;
  }

  .formulate-input-group-repeatable {
    display: flex;
    width: 100%;
  }
</style>
