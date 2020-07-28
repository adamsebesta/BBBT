<template lang="html">
  <div class="container">
    <div class="">
      <FormulateInput
        v-model="selected_worker"
        :options="current_workers"
        type="select"
        placeholder="Select a worker"
        @click='filterByWorker'
      >
      </FormulateInput>
    </div>
    <br>
    <div class="cards">
      <div class="card box-shadow"
        v-for="(project) in projects"
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
              <p>Rate:€ {{project.billing_rate}}</p>
              <p :v-if='project.fixed'>
                Budget Remaining: {{budgetRemaining(
                  project.tasks,
                  project.budget * (1 - (project.buffer_percentage / 100)),
                  project.billing_rate)}}
              </p>
              <p>Duration: {{dateDiffInDays(project.createdAt)}} days</p>
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
import FilterMixin  from '..//mixins/FilterMixin';

export default {
  components: {
  },
  mixins: [ProjectMixin, FilterMixin],
  data() {
    return {
      current_workers: null,
      selected_worker: null,
    }
  },
  methods: {
    async wrapperWorkers() {
      await this.$store.dispatch('fetchWorkers');
      this.setWorkers();
    },
    setWorkers() {
      const w = this.$store.getters['workers'];
      const ob = {};
      w.forEach((pm, index) => {
        ob[String(index)] = pm.last_name
      })
      this.current_workers = ob;
    },
    filterByWorker() {

    },
    budgetRemaining(tasks, b, br) {
      // tasks, budget, and billing_rate given
      // iterate through project tasks and sum the total amount of tracked_hours
      const sum = tasks.map(t =>
        t.assigned_workers.map(w =>
          w.tracked_hours).reduce((a,b) => a + b, 0)).reduce((a,b) => a + b, 0);
      const hoursRem = Math.floor(b / br) - sum;
      return `€${b - (sum * br)}/${hoursRem} hours`;
    },
    dateDiffInDays(a) {
      // Discard the time and time-zone information.
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const now = new Date;
      const date = new Date(a.slice(0,10));
      const c = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      return Math.floor( (now - c) / _MS_PER_DAY)
    }
  },
  computed: {
    projectCount() {
      return this.$store.getters['projectCount'];
    },
    projects() {
      return this.$store.getters['projects'];
    },
  },
  created() {
    this.wrapperWorkers();
    this.$store.dispatch('fetchProjects');
  },
}

</script>

<style lang="scss" scoped>

  .container {
    width: 95%;
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

</style>
