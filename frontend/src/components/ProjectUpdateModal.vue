<template lang="html">
  <div
    id="project-modal-update"
    :style='{display: "none"}'
    class='modal'
  >
    <div class="project-details-modal"
      >
      <FormulateForm
        id='project-formulate-update'
        name='update-project'
        @submit='updateProject'
        >
        <div class="upper-fields">

          <div class="">

            <FormulateInput
              type="text"
              name="name"
              label="Project name"
              validation='required'
              :value='selected_project.name'
            >
            </FormulateInput>

            <FormulateInput
              type="text"
              name="code"
              label="Project code"
              validation='required'
              :value='selected_project.code'
            >
            </FormulateInput>

            <FormulateInput
              type="select"
              name="client"
              label="Client"
              :value='selected_project.client._id'
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
              :value='selected_project.fixed_budget'
            >
            </FormulateInput>

            <FormulateInput
              v-if="selected_project.fixed_budget == 'true'"
              type="number"
              name="budget"
              label="Budget"
              placeholder='0'
              validation='required|number'
              :value='selected_project.budget'
            >
            </FormulateInput>
          </div>
          <div class="">
            <FormulateInput
              v-if="selected_project.fixed_budget == 'true'"
              type="number"
              name="buffer_percentage"
              label="Buffer percentage"
              validation='required|number'
              :value='selected_project.buffer_percentage'
            >
            </FormulateInput>

            <FormulateInput
              type="number"
              name="billing_rate"
              label="Billing rate"
              validation='required|number'
              :value='selected_project.billing_rate'
            >
            </FormulateInput>


            <FormulateInput
              type="date"
              name="start_date"
              label="Start date"
              validation='required'
              :value='selected_project.start_date.slice(0,10)'
            >
            </FormulateInput>

            <FormulateInput
              type="date"
              name="deadline"
              label='Deadline'
              :validation='deadlineFunc(selected_project)'
              :value='selected_project.deadline.slice(0,10)'
            >
            </FormulateInput>
          </div>
        </div>
        <div class="">
          <div class="worker-wrapper">
        <table
          class='worker-table'
          style='width:100%'
        >
          <th>Name</th>
          <th>Factor</th>
          <th>Hours planned</th>
          <tr
            v-for='wkr in selected_project.workers'
            v-bind:key='wkr.worker._id'
          >
            <td>
              {{wkr.worker.first_name + " " + wkr.worker.last_name}}
            </td>
            <td>
              <FormulateInput
                type="text"
                validation='required|number'
                name="factor"
                :value='wkr.factor'
              >
              </FormulateInput>
            </td>
            <td>
              <FormulateInput
                type="text"
                validation='required|number'
                name="hours_planned"
                :value='wkr.hours_planned'
              >
              </FormulateInput>
            </td>
          </tr>
        </table>

          <FormulateInput
            type='group'
            name='workers'
            :repeatable='true'
            v-model='newWorkers'
          >
            <div class="worker">
              <FormulateInput
                type="select"
                :options="current_workers_not_assigned"
                name="worker"
                placeholder='Add a new worker to this project'
              >
              </FormulateInput>

              <FormulateInput
                type="text"
                validation='number'
                name="factor"
                placeholder='Enter factor'
              >
              </FormulateInput>

              <FormulateInput
                type="text"
                validation='number'
                name="hours_planned"
                placeholder='Enter planned hours'
              >
              </FormulateInput>
            </div>
          </FormulateInput>
        </div>
        </div>
        <FormulateInput
          type="submit"
          label="Update project"
        />
      </FormulateForm>
    </div>
  </div>
</template>

<script>

import ProjectMixin  from '../mixins/ProjectMixin';
import ClientMixin  from '../mixins/ClientMixin';
import WorkerMixin  from '../mixins/WorkerMixin';

export default {
  name: 'ProjectUpdateModal',
  mixins: [ProjectMixin, ClientMixin, WorkerMixin],
  data() {
    return {
      current_clients: {},
      current_workers: {},
      newWorkers: {}
    }
  },
  computed: {
    selected_project() {
      return this.$store.getters['selected_project'];
    },
    modalOpen() {
      return this.$store.getters['modalOpen'];
    },
    assigned_workers() {
      const ob = {};
      this.selected_project.workers.forEach((w) => {
        ob[w.worker._id] = `${w.worker.first_name} ${w.worker.last_name}`;
      });
      return ob;
    },
    current_workers_not_assigned() {
      const ob = {};
      const wl = this.$store.getters['workers'];
      wl.forEach((w) => {
        if (!this.assigned_workers[w._id]) {
          ob[w._id] = `${w.first_name} ${w.last_name}`;
        }
      });
      return ob;
    }
  },
  created() {
    this.clientWrapper();
    this.workerWrapper();
  }
}

</script>

<style lang="scss" scoped>

.worker-wrapper {
  padding: 1.5em 0em;
  max-width: 85%;


}

.worker-wrapper::v-deep .formulate-input-element {
  max-width: 56rem;
}

@media (min-width: 650px) {
  .worker {
    display: flex;
  }
}

@media (min-width: 720px) {
  .worker {
    display: block;
  }
}

@media (min-width: 850px) {
  .worker {
    display: flex;
  }
  .worker .formulate-input {
    margin-right: 1.5em;
  }
}

th {
  text-align: left;
}

td, th {
  padding: 0.5rem;
  color: #757575;
  min-width: 200px;
}



</style>
