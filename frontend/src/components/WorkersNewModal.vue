<template lang="html">
  <div
    id="worker-new-modal"
    :style='{display: "none"}'
    class='modal'
  >
    <div class="worker-details-modal">
      <FormulateForm
        id='worker-formulate-new'
        name='new-worker'
        @submit='createWorker'
      >
        <div class="upper-fields">
          <div class="">

            <FormulateInput
              type="text"
              name="first_name"
              label="First Name"
              validation='required'
              placeholder='Enter first name'
            >
            </FormulateInput>

            <FormulateInput
              type="text"
              name="last_name"
              label="Last Name"
              validation='required'
              placeholder='Enter last name'
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
            >
            </FormulateInput>
          </div>
          <div class="">

            <FormulateInput
              type="text"
              name="rate_brutto"
              label="Brutto Rate"
              validation='required|number'
              placeholder='Enter hourly rate'
            >
            </FormulateInput>

            <FormulateInput
              type="text"
              name="role"
              label="Role"
              validation='required'
              placeholder='Enter worker role'
            >
            </FormulateInput>
          </div>
        </div>
        <br>
        <br>
        <br>
        <FormulateInput
          type="submit"
          label="Create worker"
        />
      </FormulateForm>
    </div>
  </div>
</template>

<script>

import WorkerMixin  from '../mixins/WorkerMixin';

export default {
  name: 'WorkersNewModal',
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
