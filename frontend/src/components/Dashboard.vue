<template lang="html">
  <div class="container">
    <div class="filters">
      <FormulateInput
        v-model="selected_worker"
        :options="current_workers"
        type="select"
        placeholder="Select a worker"
        @change='filterByWorker'
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
        @click="showModal"
        class='button'
      >
        +
      </button>
    </div>
    <dashboard-new-project>
    </dashboard-new-project>
    <br>
    <div class="cards">
      <div class="card box-shadow"
        v-for='project in combinedFiltered'
        :key="project.code"
      >
        <router-link
          class='link'
          :to="{ name: 'project', params: { id: project._id } }"
        >
            <div class="top-row">
              <div class="img">
                <img class='' src="https://news.pg.com/sites/pg.newshq.businesswire.com/files/logo/image/2018_PGlogo.png" alt="">
              </div>
              <div class="right">
                  <p><strong>{{project.code}}</strong></p>
                  <p>{{project.name}}</p>
                  <p><strong>Client</strong></p>
                  <p>{{project.client.name}}</p>
              </div>
            </div>
            <div class="low-row">
              <p>Rate: €{{project.billing_rate}}</p>
              <p v-if='project.fixed_budget'>
                Budget Remaining: {{budgetRemaining(
                  project.tasks,
                  project.budget * (1 - (project.buffer_percentage / 100)),
                  project.billing_rate,
                  project.workers)}}
              </p>
              <p>Duration: {{dateDiffInDays(project.createdAt)}}</p>
              <p>Deadline: {{project.deadline.slice(0,10)}}</p>
            </div>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import '../assets/scss/main.scss';
import ProjectMixin  from '..//mixins/ProjectMixin';
import WorkerMixin  from '..//mixins/WorkerMixin';
import ClientMixin  from '../mixins/ClientMixin';
import DashboardNewProject from './DashboardNewProject.vue';

export default {
  components: {
    DashboardNewProject
  },
  mixins: [ProjectMixin, WorkerMixin, ClientMixin],
  data() {
    return {
      selected_worker: null,
      current_workers: null,
      current_clients: null,
      projectsFilteredByWorker: null,
    }
  },
  methods: {
    budgetRemaining(tasks, b, br, wl) {
      // tasks, budget, billing_rate, and workerList given
      // iterate through project tasks and sum the total amount of tracked_hours
      const sum = tasks.map(t =>
        t.assigned_workers.map(w =>
          // for each worker, divide tracked hours, by their factor
          // find function searches the given worker list and return factor
          w.tracked_hours / wl.find(pw => pw.worker._id == w.worker._id).factor)
        // sum individial task
        .reduce((a,b) => a + b, 0))
      // sum all hours for all tasks
      .reduce((a,b) => a + b, 0);
      const hoursRem = Math.floor((b / br) - sum);
      // subtract the sum of (hours * billing rate) from total budget
      return `€${Math.floor(b - (sum * br))} / ${hoursRem} hours`;
    },
    dateDiffInDays(d) {
      // d is date in "2020-02-10 format"
      // Discard the time and time-zone information.
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const date = new Date(d.slice(0,10));
      // change given date to UTC format
      const c = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      const days = Math.floor( (new Date - c) / _MS_PER_DAY)
      return (days <= 1 ? `1 day` : `${days} days`);
    },
    filterByWorker() {
      //iterates through all projects and checks workers
      const newList = []
      this.projects.forEach((p) => {
        //maps workers objects to their IDs
        const wl = p.workers.map(w => w.worker._id)
        if (wl.includes(this.selected_worker)) {
          newList.push(p);
        }
      })
      this.projectsFilteredByWorker = newList;
    },
    resetFilters() {
      if (this.combinedFiltered) {
      this.selected_worker = null;
      this.projectsFilteredByWorker = null;
      }
    },
  },
  computed: {
    projectCount() {
      return this.$store.getters['projectCount'];
    },
    projects() {
      return this.$store.getters['projects'];
    },
    combinedFiltered() {
      if (this.projectsFilteredByWorker) {
        return this.projectsFilteredByWorker
      } else {
        return this.projects
      }
    },
    modalOpen () {
      return this.$store.getters['modalOpen'];
    }
  },
  created() {
    this.workerWrapper();
    this.$store.dispatch('fetchProjects');
  },
}

</script>

<style lang="scss" scoped>

  .container {
    width: 95%;
    height: 100%;
  }

  .filters {
      display: flex;
      width: 50%;
      justify-content:  flex-start;
  }

  .link {
      display: block;
      text-decoration: none;
      margin-bottom: 10px;
      color: #2c3e50;
    }
  .cards {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 3.5rem;
  }
  .card {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 5px;
    background-color: rgba(209, 209, 209, .2);
    margin-top: 2rem;
  }

  .top-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
      div {
        width: 40%;
        align-items: flex-start;
      }
      .right {
        margin-left: 1rem;
      }
  }

  .img img {
    width: 100%;
  }

  .low-row {
    display: flex;
    align-items: left;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0.5rem;
  }


  a:hover, a:visited, a:link, a:active{
    text-decoration: none;
    color: black;
  }

  .shadowed {
    text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  }

  .box-shadow {
    box-shadow: -2px 0px 5px rgba(7, 23, 79, 0.5) !important;
  }

  .button {
    display: flex;
    align-items: center;
    width: 75px;
    height: 25px;
    font-size: 12px;
    font-weight: bold;
    opacity: .7;
    border: none;
    border-radius: 3px;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.1);
    outline: none;
    margin-left: 2rem;
    margin-top: .1rem;
    padding: 18px;
  }




</style>
