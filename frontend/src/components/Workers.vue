<template lang="html">
  <div class="worker-table">
    <button
      type="button"
      name="button"
      @click="showModal('worker-new-modal')"
      class='button'
    >
      +
    </button>
    <h2 v-if='this.all_workers'> Workers: {{this.all_workers.length}}</h2>
    <workers-update-modal v-if='selected_worker'>
    </workers-update-modal>
    <workers-new-modal v-if='!selected_worker'>
    </workers-new-modal>
    <table style="width:100%">
      <tr>
        <th @click="sortByWrapper('first_name')">
          Name
          <sort-by-arrow
            field='first_name'
            :sorts='sorts'>
          </sort-by-arrow>
        </th>
        <th @click="sortByWrapper('rate_brutto')">
          Brutto Rate (€)
          <sort-by-arrow
            field='rate_brutto'
            :sorts='sorts'>
          </sort-by-arrow>
      </th>
        <th @click="sortByWrapper('internal')">Internal
          <sort-by-arrow
            field='internal'
            :sorts='sorts'>
          </sort-by-arrow>
        </th>
        <th @click="sortByWrapper('role')">Role
          <sort-by-arrow
            field='role'
            :sorts='sorts'>
          </sort-by-arrow>
        </th>
      </tr>
      <tr
        class= "main-workers"
        v-for='worker in all_workers'
        v-bind:key='worker._id'
        @click="workerModalWrapper('worker-update-modal', worker)"
      >
        <td>{{worker.first_name + " " + worker.last_name}}</td>
        <td>{{worker.rate_brutto}}</td>
        <td>{{worker.internal == true ? 'Yes' : 'No'}} </td>
        <td>{{worker.role}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import WorkerMixin  from '../mixins/WorkerMixin';
import WorkersUpdateModal from './WorkersUpdateModal';
import WorkersNewModal from './WorkersNewModal';
import SortByArrow from './ui/SortByArrow';

export default {
  name: 'Workers',
  mixins: [WorkerMixin],
  components: {
    WorkersUpdateModal,
    WorkersNewModal,
    SortByArrow
  },
  data() {
    return {
      sorts: {
          first_name: null,
          rate_brutto: null,
          internal: null,
          role: null
      }
    }
  }
}
</script>

  <style lang="scss" scoped>

  .worker-table {
    margin-left: 4rem;
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
  .worker-table{
    width: 85%;
  }

</style>
