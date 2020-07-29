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
            validation='required'
          >
          </FormulateInput>

          <FormulateInput
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
            validation='required'
          >
          </FormulateInput>
        </div>
      </div>

        <FormulateInput
          type='group'
          name='worker'
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
                type="number"
                validation='number'
                name="factor"
                placeholder='Enter factor'
              >
              </FormulateInput>

              <FormulateInput
                type="number"
                validation='number'
                name="hours_planned"
                placeholder='Enter planned hours'
              >
              </FormulateInput>
            </FormulateInput>
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
      newProject: null
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
</style>
