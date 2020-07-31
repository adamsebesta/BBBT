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
        v-bind:key='this.selected_project._id'
        v-model='updateForm'
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
              :value='String(selected_project.fixed_budget)'
            >
            </FormulateInput>

            <FormulateInput
              v-if="updateForm.fixed_budget == 'true'"
              type="number"
              name="budget"
              label="Budget"
              placeholder='0'
              validation='number'
              :value='selected_project.budget'
            >
            </FormulateInput>
          </div>
          <div class="">
            <FormulateInput
              v-if="updateForm.fixed_budget == 'true'"
              type="number"
              name="buffer_percentage"
              label="Buffer percentage"
              validation='number'
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
        <div class="worker-wrapper">
          <h5>Workers:</h5>
            <div class="worker"
              v-for='wkr in selected_project.workers'
              v-bind:key='wkr.worker._id'
            >

            <FormulateInput
              type="select"
              :options='current_workers'
              name="worker"
              :value='wkr.worker._id'
              disabled='disabled'
            >
            </FormulateInput>

              <FormulateInput
                type="text"
                validation='number'
                name="factor"
                :value='wkr.factor'
              >
              </FormulateInput>

              <FormulateInput
                type="text"
                validation='number'
                name="hours_planned"
                :value='wkr.hours_planned'
              >
              </FormulateInput>

              <FormulateInput
                v-if='!checkTasks(wkr)'
                type="checkbox"
                label="Remove from project"
              >
              </FormulateInput>
            </div>
          <FormulateInput
            type='group'
            name='newWorkers'
            :repeatable='true'
          >
          <h5>Add workers to the project:</h5>
            <div class="worker">
              <FormulateInput
                type="select"
                :options="current_workers_not_assigned"
                name="newWorker"
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
      workers: [],
      updateForm: {},
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
      // .filter(w =>
      //    w.name == 'worker');
         // console.log(wl);
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
  methods: {
    checkTasks(w) {
      let found;
      this.selected_project.tasks.forEach((task) => {
        const wl = this.getWorkerList(task);
        console.log(w.worker._id)
        console.log(wl)
        if (wl.includes(w.worker._id)) {
           found = true
        }
      })
      return found;
    },
    getWorkerList(t) {
      return t.assigned_workers.map(w => w.worker._id);
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

  .wkr-name {
    margin-right: 5rem;
    margin-left: 1rem;
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
    align-items: baseline;
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
