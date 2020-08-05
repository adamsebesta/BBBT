<template lang="html">
  <div
    id="worker-update-modal"
    :style='{display: "none"}'
    class='modal'
  >
    <div class="worker-details-modal">
      <FormulateForm
        id='worker-formulate-update'
        name='update-worker'
        @submit='updateWorker'
      >
        <div class="upper-fields">
          <div class="">

            <FormulateInput
              type="text"
              name="first_name"
              label="First Name"
              validation='required'
              :value='selected_worker.first_name'
            >
            </FormulateInput>
            <FormulateInput
              type="text"
              name="rate_brutto"
              label="Brutto Rate"
              validation='required|number'
              :value='selected_worker.rate_brutto'
            >
            </FormulateInput>

            <FormulateInput
              type="select"
              name="internal"
              label="Internal"
              validation='required'
              :options="{
                'true': 'Yes',
                'false': 'No'
              }"
              :value='selected_worker.internal'
            >
            </FormulateInput>
          </div>
          <div class="">
            <FormulateInput
              type="text"
              name="last_name"
              label="Last Name"
              validation='required'
              :value='selected_worker.last_name'
            >
            </FormulateInput>

            <FormulateInput
              type="text"
              name="role"
              label="Role"
              validation='required'
              :value='selected_worker.role'
            >
            </FormulateInput>
          </div>
        </div>
        <br>
        <br>
        <br>
        <FormulateInput
          type="submit"
          label="Update worker"
        />
      </FormulateForm>
    </div>
  </div>
</template>

<script>

import WorkerMixin  from '../mixins/WorkerMixin';

export default {
  name: 'WorkerUpdateModal',
  mixins: [WorkerMixin]
}
</script>

<style lang="scss" scoped>

.worker-details-modal {
  width: 100%;
  margin-left: 5.5rem;
}

.modal {
  width: 50%;
  height: 50%;
}

</style>
